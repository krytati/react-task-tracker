export default {
    stacks: [
        {
            id: "1",
            name: "todos",
            created: "21.11.2024",
            dueDate: "25.11.2024",
            tasks: [
                { id: 1, text: "Сделать шаблон приложения", state: true },
                { id: 2, text: "Написать css", state: true },
                { id: 3, text: "Написать основные экшены", state: true },
                { id: 4, text: "Сделать стопки", state: true },
                { id: 5, text: "Причесать css (адаптив в том числе)", state: true },
                { id: 6, text: "Подключить состояние", state: true },
                { id: 7, text: "Выделить state", state: false },
                { id: 8, text: "Написать тесты", state: false },
                { id: 9, text: "Сервисы", state: false },
                { id: 10, text: "Рефакторинг", state: false },
                { id: 11, text: "Подключить БД", state: false }
            ]
        },
        {
            id: "2",
            name: "very long name list",
            created: "21.11.2024",
            dueDate: "25.11.2024",
            tasks: [
                { id: 1, text: "test2", state: true },
                { id: 2, text: "test2222", state: false }
            ]
        },
        {
            id: "3",
            name: "todos2",
            created: "21.11.2024",
            dueDate: "25.11.2024",
            tasks: [
                { id: 1, text: "test", state: false }
            ]
        }
    ]
}