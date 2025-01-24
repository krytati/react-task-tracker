import {generateId} from '@/utils/functions/generateId.ts';
import {tasksService} from '@/app/services/tasksService.ts';
import {Buttons, NavStack} from '@/utils/enums.ts';
import {TaskSet} from "@/utils/types/Task.ts";

vi.mock('../src/app/services/tasksService.ts');

describe('store actions', () => {

    const mockedTasksService = vi.mocked(tasksService);

    afterEach(() => vi.resetModules());

    test('SHOULD invert task state', async () => {
        //Arrange
        const expectedId = generateId();

        const expectedTasks = [
            { id: 'taskId', text: 'text1', state: false },
            { id: expectedId, text: 'text2', state: true },
        ];

        mockedTasksService.getTaskSet.mockReturnValue({
            stacks: [{
                id: 'stackId',
                name: 'name',
                tasks: [
                    {id: 'taskId', text: 'text1', state: false},
                    {id: expectedId, text: 'text2', state: false},
                ]
            }]
        });
        const { todoStore } = await import('@/app/taskStore.ts');

        //act
        todoStore.processTask(expectedId);

        //Assert
        expect(todoStore.allTasks).toMatchObject(expectedTasks);
    });

    test('SHOULD set stuckIndex to 0 WHEN stacks has items ', async () => {

        //Arrange
        mockedTasksService.getTaskSet.mockReturnValue({
            stacks: [{
                id: 'stackId',
                name: 'name',
                tasks: []
            }]
        });
        const { todoStore } = await import('@/app/taskStore.ts');

        //Assert
        expect(todoStore.stackIndex).toBe(0);
    });

    test('SHOULD set stuckIndex, currentTaskView to null WHEN stacks field does not have items ', async () => {
        //Arrange
        mockedTasksService.getTaskSet.mockReturnValue({ stacks: [] });
        const { todoStore } = await import('@/app/taskStore.ts');

        //Assert
        expect(todoStore.stackIndex).toBeNull();
        expect(todoStore.currentTaskView).toBeNull();
    });

    test('SHOULD make a round WHEN it was on the left edge', async () => {

        //Arrange
        const expectedStack3 = [
            { id: 'taskId3', text: 'text3', state: false },
        ];
        const expectedStackName = 'StackName';

        mockedTasksService.getTaskSet.mockReturnValue({
            stacks: [
                {
                    id: 'stackId1',
                    name: 'name1',
                    tasks: [],
                },
                {
                    id: 'stackId2',
                    name: 'name2',
                    tasks: [],
                },
                {
                    id: 'stackId3',
                    name: expectedStackName,
                    tasks: expectedStack3,
                },
            ]
        });
        const { todoStore } = await import('@/app/taskStore.ts');

        //act
        todoStore.switchStack(NavStack.left);

        //Assert
        expect(todoStore.allTasks).toMatchObject(expectedStack3);
        expect(todoStore.stackName).toBe(expectedStackName);
    });

    test('SHOULD make a round WHEN it was on the right edge', async () => {
        //Arrange
        const expectedStack1 = [
            { id: 'taskId3', text: 'text3', state: false },
        ];
        const expectedStackName = 'StackName';

        mockedTasksService.getTaskSet.mockReturnValue({
            stacks: [
                {
                    id: 'stackId1',
                    name: expectedStackName,
                    tasks: expectedStack1,
                },
                {
                    id: 'stackId2',
                    name: 'name2',
                    tasks: [],
                },
                {
                    id: 'stackId3',
                    name: 'name3',
                    tasks: [],
                },
            ]
        });
        const { todoStore } = await import('@/app/taskStore.ts');

        //act
        todoStore.switchStack(NavStack.left);
        todoStore.switchStack(NavStack.right);

        //Assert
        expect(todoStore.allTasks).toMatchObject(expectedStack1);
        expect(todoStore.stackName).toBe(expectedStackName);
    });

    test('SHOULD add a new task to currentTaskView WHEN Active view was selected', async () => {
        //Arrange
        const expectedTaskText = 'new task'

        const expectedTasks = [
            { id: 'taskId', text: 'text1', state: false },
            { text: expectedTaskText, state: false },
        ];

        mockedTasksService.getTaskSet.mockReturnValue({
            stacks: [{
                id: 'stackId',
                name: 'name',
                tasks: [
                    {id: 'taskId', text: 'text1', state: false},
                ]
            }]
        });
        const { todoStore } = await import('@/app/taskStore.ts');

        //act
        todoStore.addTask(expectedTaskText);
        todoStore.selectButton(Buttons.Active);

        //Assert
        expect(todoStore.allTasks).toMatchObject(expectedTasks);
        expect(todoStore.currentTaskView).toMatchObject(expectedTasks);
    });

    test('SHOULD NOT add a new task to currentTaskView WHEN Completed view was selected', async () => {
        //Arrange
        const expectedTaskText = 'new task'

        const expectedAllTasks = [
            { id: 'taskId', text: 'text1', state: true },
            { text: expectedTaskText, state: false },
        ];

        const expectedCompletedTasks = [
            { id: 'taskId', text: 'text1', state: true },
        ];

        mockedTasksService.getTaskSet.mockReturnValue({
            stacks: [{
                id: 'stackId',
                name: 'name',
                tasks: [
                    {id: 'taskId', text: 'text1', state: true},
                ]
            }]
        });
        const { todoStore } = await import('@/app/taskStore.ts');

        //act
        todoStore.addTask(expectedTaskText);
        todoStore.selectButton(Buttons.Completed);

        //Assert
        expect(todoStore.allTasks).toMatchObject(expectedAllTasks);
        expect(todoStore.currentTaskView).toMatchObject(expectedCompletedTasks);
    });

    test('SHOULD remove selected task', async () => {
        //Arrange
        const expectedRemovedTaskId = generateId();

        const expectedTasks = [
            { id: 'taskId1', text: 'text1', state: false },
            { id: 'taskId3', text: 'text3', state: false },
        ];

        mockedTasksService.getTaskSet.mockReturnValue({
            stacks: [{
                id: 'stackId',
                name: 'name',
                tasks: [
                    {id: 'taskId1', text: 'text1', state: false},
                    {id: expectedRemovedTaskId, text: 'text2', state: false},
                    {id: 'taskId3', text: 'text3', state: false},
                ]
            }]
        });
        const { todoStore } = await import('@/app/taskStore.ts');

        //act
        todoStore.deleteTask(expectedRemovedTaskId);

        //Assert
        expect(todoStore.allTasks).toMatchObject(expectedTasks);
        expect(todoStore.currentTaskView).toMatchObject(expectedTasks);
    });

    test('SHOULD clear completed tasks and THEN currentTaskView wont have items ' +
        'WHEN Completed view was selected', async () => {

        //Arrange
        const expectedAllTasks = [{id: 'taskId3', text: 'text3', state: false}];

        mockedTasksService.getTaskSet.mockReturnValue({
            stacks: [{
                id: 'stackId',
                name: 'name',
                tasks: [
                    {id: 'taskId1', text: 'text1', state: true},
                    {id: 'taskId2', text: 'text2', state: true},
                    ...expectedAllTasks,
                ]
            }]
        });
        const { todoStore } = await import('@/app/taskStore.ts');

        //act
        todoStore.selectButton(Buttons.Completed)
        todoStore.clearCompleted();

        //Assert
        expect(todoStore.allTasks).toMatchObject(expectedAllTasks);
        expect(todoStore.currentTaskView).toHaveLength(0);
    });

    test('SHOULD clear completed tasks and THEN currentTaskView wont have items ' +
      'WHEN Active view was selected', async () => {

        //Arrange
        const expectedAllTasks = [{id: 'taskId3', text: 'text3', state: false}];

        mockedTasksService.getTaskSet.mockReturnValue({
            stacks: [{
                id: 'stackId',
                name: 'name',
                tasks: [
                    {id: 'taskId1', text: 'text1', state: true},
                    {id: 'taskId2', text: 'text2', state: true},
                    ...expectedAllTasks,
                ]
            }]
        });
        const { todoStore } = await import('@/app/taskStore.ts');

        //act
        todoStore.selectButton(Buttons.Active)
        todoStore.clearCompleted();

        //Assert
        expect(todoStore.allTasks).toMatchObject(expectedAllTasks);
        expect(todoStore.currentTaskView).toHaveLength(1);
    });

    test('SHOULD get doneCount correctly', async () => {
        //Arrange
        vi.mocked(tasksService).getTaskSet.mockReturnValue({
            stacks: [{
                id: 'stackId',
                name: 'name',
                tasks: [
                    {id: 'taskId1', text: 'text1', state: true},
                    {id: 'taskId2', text: 'text2', state: true},
                    {id: 'taskId3', text: 'text3', state: false},
                ]
            }]
        });

        //Act
        const { todoStore } = await import('@/app/taskStore.ts');

        //Assert
        expect(todoStore.doneCount).toBe(2);
    });

    describe('moveTask', () => {

        const stacks: TaskSet = {
            stacks: [{
                id: 'stackId',
                name: 'name',
                tasks: [
                    {id: 'taskId1', text: 'text1', state: true},
                    {id: 'taskId2', text: 'text2', state: true},
                    {id: 'taskId3', text: 'text3', state: false},
                    {id: 'taskId4', text: 'text4', state: true},
                    {id: 'taskId5', text: 'text5', state: true},
                    {id: 'taskId6', text: 'text6', state: false},
                ],
            }],
        };

        test('SHOULD move a task to a new position #1', async () => {
            //Arrange
            vi.mocked(tasksService).getTaskSet.mockReturnValue(stacks);
            const { todoStore } = await import('@/app/taskStore.ts');
            const expectedNewIndex = 5;
            const expectedOldIndex = 3;

            const expectedTasks = [
                {id: 'taskId1', text: 'text1', state: true},
                {id: 'taskId2', text: 'text2', state: true},
                {id: 'taskId3', text: 'text3', state: false},
                {id: 'taskId5', text: 'text5', state: true},
                {id: 'taskId6', text: 'text6', state: false},
                {id: 'taskId4', text: 'text4', state: true},
            ];

            //Act
            todoStore.moveTask(expectedNewIndex, expectedOldIndex)

            //Assert
            expect(todoStore.allTasks).toMatchObject(expectedTasks);
        });

        test('SHOULD move a task to a new position #2', async () => {
            //Arrange
            vi.mocked(tasksService).getTaskSet.mockReturnValue(stacks);
            const { todoStore } = await import('@/app/taskStore.ts');
            const expectedNewIndex = 0;
            const expectedOldIndex = 2;

            const expectedTasks = [
                {id: 'taskId3', text: 'text3', state: false},
                {id: 'taskId1', text: 'text1', state: true},
                {id: 'taskId2', text: 'text2', state: true},
                {id: 'taskId4', text: 'text4', state: true},
                {id: 'taskId5', text: 'text5', state: true},
                {id: 'taskId6', text: 'text6', state: false},
            ];

            //Act
            todoStore.moveTask(expectedNewIndex, expectedOldIndex)

            //Assert
            expect(todoStore.allTasks).toMatchObject(expectedTasks);
        });

        test('SHOULD move a task to a new position #2', async () => {
            //Arrange
            vi.mocked(tasksService).getTaskSet.mockReturnValue(stacks);
            const { todoStore } = await import('@/app/taskStore.ts');
            const expectedNewIndex = 4;
            const expectedOldIndex = 3;

            const expectedTasks = [
                {id: 'taskId1', text: 'text1', state: true},
                {id: 'taskId2', text: 'text2', state: true},
                {id: 'taskId3', text: 'text3', state: false},
                {id: 'taskId5', text: 'text5', state: true},
                {id: 'taskId4', text: 'text4', state: true},
                {id: 'taskId6', text: 'text6', state: false},
            ];

            //Act
            todoStore.moveTask(expectedNewIndex, expectedOldIndex)

            //Assert
            expect(todoStore.allTasks).toMatchObject(expectedTasks);
        });

    });

});