import {fireEvent, render, screen} from '@testing-library/react';
import Home from "@/app/page.tsx";
import {Buttons} from "@/utils/enums.ts";
import {todoStore, TodoStore} from "@/app/taskStore.ts";

let mockedToDoStore: Partial<TodoStore>;

vi.mock('@/app/taskStore.ts', () => ({
    get todoStore() {
        return mockedToDoStore;
    },
}));

describe('page.tsx', () => {

    describe('footer', () => {

        test('SHOULD disable Clear completed button WHEN stuck does not have tasks', () => {

            mockedToDoStore = {
                get taskCountText() {
                    return 'Nothing to do';
                },
                get doneCount() {
                    return 0;
                },
            };

            render(<Home/>);

            expect(screen.getByText('Nothing to do')).toBeInTheDocument();
            expect(screen.getByText(Buttons.ClearCompleted)).toBeInTheDocument();
            expect(screen.getByText(Buttons.ClearCompleted)).toBeDisabled();
        });

        test('SHOULD enable Clear completed button WHEN stuck has completed tasks', () => {

            mockedToDoStore = {
                get taskCountText() {
                    return '1 item left';
                },
                get doneCount() {
                    return 2;
                },
            };

            render(<Home/>);

            expect(screen.getByText('1 item left')).toBeInTheDocument();
            expect(screen.getByText(Buttons.ClearCompleted)).toBeInTheDocument();
            expect(screen.getByText(Buttons.ClearCompleted)).not.toBeDisabled();
        });

        test('SHOULD disable Clear completed button WHEN stuck does not have completed tasks', () => {

            mockedToDoStore = {
                get taskCountText() {
                    return '2 items left';
                },
                get doneCount() {
                    return 0;
                },
            };

            render(<Home/>);

            expect(screen.getByText('2 items left')).toBeInTheDocument();
            expect(screen.getByText(Buttons.ClearCompleted)).toBeInTheDocument();
            expect(screen.getByText(Buttons.ClearCompleted)).toBeDisabled();

        });

        test('SHOULD disable Active button WHEN it was selected', () => {

            mockedToDoStore = {
                selectedButton: Buttons.Active,
            };

            render(<Home/>);

            expect(screen.getByText(Buttons.Active)).toBeInTheDocument();
            expect(screen.getByText(Buttons.Active)).toBeDisabled();
        });

        test('SHOULD call clearCompleted method WHEN Clear completed button was clicked', () => {

            mockedToDoStore = {
                clearCompleted: vi.fn(),
            }

            const clearCompletedSpy = vi.spyOn(todoStore, 'clearCompleted');

            render(<Home/>);

            const clearCompletedButton = screen.getByText(Buttons.ClearCompleted);
            fireEvent.click(clearCompletedButton);

            expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
        });

        test('SHOULD not call selectButton method WHEN selected button was clicked again', () => {

            mockedToDoStore = {
                selectedButton: Buttons.Active,
                selectButton: vi.fn(),
            }

            const selectButtonSpy = vi.spyOn(todoStore, 'selectButton');

            render(<Home/>);

            const ActiveButton = screen.getByText(Buttons.Active);
            fireEvent.click(ActiveButton);

            expect(selectButtonSpy).toHaveBeenCalledTimes(0);
        });
    });

    describe('tasks', () => {
        test('SHOULD show all tasks existed in current view field', () =>{
            mockedToDoStore = {
                currentTaskView: [
                    { id: 'taskId1', text: 'text1', state: false },
                    { id: 'taskId2', text: 'text2', state: true },
                ]
            };

            render(<Home/>);

            expect(screen.getByText('text1')).toBeInTheDocument();
            expect(screen.getByText('text2')).toBeInTheDocument();
        });
    });
});
