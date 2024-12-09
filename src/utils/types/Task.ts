export type TaskItem = {
    id: number;
    text: string,
    state: boolean
}
export type TaskSet = {
    stacks: {
        "id": number,
        "name": string,
        tasks: TaskItem[]
    }[]
}
