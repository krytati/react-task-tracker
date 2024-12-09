"use client"
import styles from "./page.module.css";
import {Task} from "@/app/Components/Task/Task";
import {FooterButton} from "@/app/Components/FooterButton/FooterButton";
import React, {useCallback, useEffect, useState} from "react";
import taskSet from "@/db/tasks.ts"
import NavButton from "@/app/Components/NavButton/NavButton";
import {NavStack} from "@/utils/enums";
import { useImmer} from "use-immer";
import {TaskItem} from "@/utils/types/Task";

enum Buttons {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
    ClearCompleted = 'Clear completed',
}

export default function Home() {

    const [index, setIndex] = useState(0);
    const [stack, setStack] = useState(taskSet.stacks[0].name)

    const [allTasks, setAllTasks] = useImmer<TaskItem[]>(taskSet.stacks[0].tasks);

    const [selectedButton,setButtonSelected] = useState(Buttons.All);

    const [tasks, setTasks] = useImmer<TaskItem[]>([...allTasks]);
    const [inputValue, setInputValue] = useState('');

    const filterTasks = (tab: Buttons) => {
        switch (tab){
            case Buttons.All:
                setTasks([...allTasks]);
                setButtonSelected(Buttons.All);
                break;
            case Buttons.Completed:
                setTasks(allTasks.filter((task) => task.state));
                setButtonSelected(Buttons.Completed);
                break;
            case Buttons.Active:
                setTasks(allTasks.filter((task) => !task.state));
                setButtonSelected(Buttons.Active);
                break;
        }
    };

    useEffect(() => filterTasks(selectedButton), [allTasks, selectedButton]);
    useEffect(() => {
        setStack(taskSet.stacks[index].name);
        setAllTasks(taskSet.stacks[index].tasks)
    }, [index]);

    const clearCompleted = () => {
        setAllTasks(allTasks.filter((task) => !task.state));
    }

    const processTask = (id: number) => {
        setAllTasks(draft => {
            const task = draft.find(elem => elem.id === id);
            if (task) {
                task.state = !task.state;
            }
        });
    }

    const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" && inputValue.trim()) {
            addTask(inputValue);
            setInputValue("");
        }
    };

    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        setInputValue(event.currentTarget.value);
    }, [setInputValue])

    const addTask = (text: string) => {
        const nextId = allTasks.reduce((acc, curr) => (curr.id > acc ? curr.id : acc), 0) + 1;
        setAllTasks(draft => { draft.push({text: text, id: nextId, state: false}) });
    }

    // const changeTask = (id: number, text: string) =>  {
    //     setTasks(draft => {
    //         const task = draft.find(elem => elem.id === id);
    //         if (task) {
    //             task.text = text;
    //         }
    //     })
    // }

    function deleteTask(id: number) {
        const deletionIndex = tasks.findIndex((task) => task.id === id);
        setTasks(draft => { draft.splice(deletionIndex,1) });
    }

    const switchStack = (nav: NavStack) => {
        const length = taskSet.stacks.length;
        setIndex((index + (nav === NavStack.left ? -1 : 1) + length) % length);
    }

    const getToDoCount = (): number => allTasks.filter((task) => !task.state).length;
    const getDoneCount = (): number => allTasks.filter((task) => task.state).length;
    const taskCountText = (): string => {
        const count = getToDoCount();
        return `${count > 0 ? (count + ' item' + (count > 1 ? 's' : '') + ' left' ) : 'Nothing to do'}`;
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <NavButton position={NavStack.left} handler={() => switchStack(NavStack.left)}/>
                        <span className={styles.cardHeaderText}>{stack}</span>
                        <NavButton position={NavStack.right} handler={() => switchStack(NavStack.right)}/>
                    </div>
                    <div className={styles.shadowBox}>
                        <input
                            type='text'
                            placeholder='What need to be done?'
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterKeyDown}
                            className={`${styles.task} ${styles.taskInput}`}
                        />
                        <ul className={styles.tasksBox}>
                            { tasks.map((task) => (
                                <li key={ task.id } className={styles.task}>
                                    <Task text={ task.text} state={ task.state } handler={() => processTask(task.id)} />
                                    <div className={styles.inlineBox}>
                                        {/*<button className={styles.inlineButton} onClick={() => changeTask(task.id, '')}>edit</button>*/}
                                        <button className={styles.inlineButton} onClick={() => deleteTask(task.id)}>x</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.cardFooter}>
                            <div className={styles.taskCountText}>{taskCountText()}</div>
                            <div className={styles.tabGroup}>
                                <FooterButton
                                    selected={ selectedButton === Buttons.All }
                                    handler={ () => setButtonSelected(Buttons.All)}>
                                        {Buttons.All}
                                </FooterButton>
                                <FooterButton
                                    selected={ selectedButton === Buttons.Active }
                                    handler={ () => setButtonSelected(Buttons.Active)}>
                                        {Buttons.Active}
                                </FooterButton>
                                <FooterButton
                                    selected={ selectedButton === Buttons.Completed }
                                    handler={ () => setButtonSelected(Buttons.Completed)}>
                                        {Buttons.Completed}
                                </FooterButton>
                            </div>
                            <FooterButton selected={ false } handler={clearCompleted} disabled={ getDoneCount() == 0 }>
                                {Buttons.ClearCompleted}
                            </FooterButton>
                        </div>
                    </div>
                    <div className={`${styles.pseudoStack} ${styles.lvl1}`}/>
                    <div className={`${styles.pseudoStack} ${styles.lvl2}`}/>
                </div>
            </main>
        </div>
    );
}
