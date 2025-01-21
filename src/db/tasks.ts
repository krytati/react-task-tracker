import {TaskSet} from "@/utils/types/Task.ts";

export const taskSet: TaskSet = {
    stacks: [
        {
            id: "73784",
            name: "todos",
            tasks: [
                { id: '76349', text: "Сделать шаблон приложения", state: true },
                { id: '73489', text: "Написать css", state: true },
                { id: '95854', text: "Написать основные экшены", state: true },
                { id: '75893', text: "Сделать стопки", state: true },
                { id: '01987', text: "Причесать css (адаптив в том числе)", state: true },
                { id: '74653', text: "Подключить состояние", state: true },
                { id: '63839', text: "Выделить state", state: false },
                { id: '74848', text: "Написать тесты", state: false },
                { id: '64831', text: "Сервисы", state: false },
                { id: '37488', text: "Рефакторинг", state: false },
                { id: '64748', text: "Подключить БД", state: false }
            ]
        },
        {
            id: "83948",
            name: "very long name list",
            tasks: [
                { id: '23454', text: "test2", state: true },
                { id: '58837', text: "test2222", state: false }
            ]
        },
        {
            id: "74852",
            name: "todos2",
            tasks: [
                { id: '09387', text: "test", state: false }
            ]
        },
        {
            id: "02864",
            name: "emptyList2",
            tasks: [],
        }
    ]
};