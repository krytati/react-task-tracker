import { taskSet } from "@/db/tasks.ts"
import {TaskSet} from "@/utils/types/Task.ts";

export const tasksService = {
    getTaskSet: (): TaskSet => taskSet,
};