import {makeAutoObservable, reaction, toJS} from 'mobx';
import { WritableDraft, produce} from 'immer';
import {TaskItem, TaskSet} from "@/utils/types/Task.ts";
import {Nullable} from "@/utils/types/generics.ts";
import {Buttons, NavStack} from "@/utils/enums.ts";
import {generateId} from "@/utils/functions/generateId.ts";
import {tasksService} from "@/app/services/tasksService.ts";

export class TodoStore {

    taskSet: Nullable<TaskSet> = null;
    selectedButton: Nullable<Buttons> = null;
    stackIndex: Nullable<number> = null;
    currentTaskView: Nullable<TaskItem[]> = null;

    constructor() {
        this._initializeData();
        makeAutoObservable(this);
    }

    private _initializeData(): void {
        this.taskSet = produce(toJS(this.taskSet), () => tasksService.getTaskSet());
        this.selectedButton = Buttons.All;
        if (this.taskSet) {
            this.stackIndex = this.taskSet.stacks.length > 0 ? 0 : null;
            this.currentTaskView = this.allTasks;
        }
    }

    processTask(id: string): void {
        this._produceCurrentStack( (draft) => {
            const task = draft.find(el => el.id === id);
            if (task) {
                task.state = !task.state;
            }
        });
    }

    changeTask(id: string, data: Partial<TaskItem>): void {
        this._produceCurrentStack( (draft) => {
            const task= draft.find(el => el.id === id);
            if (task) {
                for (const key in data) {
                    if (key != 'id') {
                        (task as any)[key] = data[key as keyof TaskItem];
                    }
                }
            }
        });
    }

    addTask = (text: string): void => {
        this._produceCurrentStack( (draft) => {
            draft.push({text: text, id: generateId(), state: false});
        });
    }

    deleteTask(id: string): void {
        this._produceCurrentStack( (draft) => {
            const deletionIndex = draft.findIndex((task) => task.id === id);
            draft.splice(deletionIndex, 1);
        });
    }

    clearCompleted(): void {
        if (!this.taskSet || this.stackIndex == null) { return }
        this.taskSet.stacks[this.stackIndex].tasks = this.taskSet.stacks[this.stackIndex].tasks.filter((task) => !task.state);
        this._produceCurrentStack( (draft) => {
            draft.filter((task) => !task.state);
        });
    }

    selectButton(button: Buttons) {
        this.selectedButton = button;
    }

    filterTasks(): void {
        switch (this.selectedButton) {
            case Buttons.Completed:
                this.currentTaskView = this.allTasks?.filter((task) => task.state) ?? null;
                break;
            case Buttons.Active:
                this.currentTaskView = this.allTasks?.filter((task) => !task.state) ?? null;
                break;
            case Buttons.All:
                this.currentTaskView = produce([], () => toJS(this.allTasks));
                break;
        }
    }

    private _produceCurrentStack(callback: (draft: WritableDraft<TaskItem>[]) => void) {
        if (!this.taskSet || this.stackIndex == null) { return }
        const plainItems = toJS(this.taskSet.stacks[this.stackIndex].tasks);
        this.taskSet.stacks[this.stackIndex].tasks = produce(plainItems, callback);
    }

    switchStack(nav: NavStack) {
        if (!this.taskSet || this.stackIndex == null) { return }
        const length = this.taskSet.stacks.length;
        this.stackIndex = (this.stackIndex + (nav === NavStack.left ? -1 : 1) + length) % length;
    }

    get toDoCount(): number {
        return this.allTasks?.filter((task) => !task.state).length ?? 0;
    }
    get doneCount(): number {
        return this.allTasks?.filter((task) => task.state).length ?? 0;
    }
    get taskCountText(): string {
        const count = this.toDoCount;
        return `${count > 0 ? (count + ' item' + (count > 1 ? 's' : '') + ' left' ) : 'Nothing to do'}`;
    }

    get stackName(): string | undefined {
        if (!this.taskSet || this.stackIndex == null) { return undefined }
        return this.taskSet.stacks[this.stackIndex].name;
    }

    get allTasks(): Nullable<TaskItem[]> {
        if (!this.taskSet || this.stackIndex == null) { return null }
        return this.taskSet.stacks[this.stackIndex].tasks;
    }
}

export const todoStore = new TodoStore();

reaction(
    () =>[todoStore.selectedButton, todoStore.stackIndex, todoStore.allTasks],
    () => todoStore.filterTasks()
);
