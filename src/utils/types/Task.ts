export type TaskItem = {
    id: string;
    text: string,
    state: boolean
}

export type TaskSet = {
    stacks: {
        id: string,
        name: string,
        tasks: TaskItem[];
    }[]
}
