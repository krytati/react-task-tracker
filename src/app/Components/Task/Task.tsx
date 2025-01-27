import styles from "./task.module.css";
import CircleCheckbox from "@/app/Components/Task/CircleCheckbox/CircleCheckbox";
import {todoStore} from "@/app/taskStore.ts";
import {TaskItem} from "@/utils/types/Task.ts";

export function Task({ task }: {task: TaskItem}) {
    return (
        <>
            <CircleCheckbox state={ task.state } handler={() => todoStore.toggleTask(task.id)}/>
            <span className={ task.state ? styles.done : ''}>
                { task.text }
            </span>
        </>
    );
}