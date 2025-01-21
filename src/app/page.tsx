"use client"
import styles from "./page.module.css";
import {Task} from "@/app/Components/Task/Task";
import {FooterButton} from "@/app/Components/FooterButton/FooterButton";
import React from "react";
import NavButton from "@/app/Components/NavButton/NavButton";
import {Buttons, NavStack} from "@/utils/enums";
import {todoStore} from "@/app/taskStore.ts";
import {observer} from "mobx-react-lite";
import {InputField} from "@/app/Components/InputField/InputField.tsx";

const Home = observer(() => {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <NavButton position={NavStack.left}/>
                        <span className={styles.cardHeaderText}>{todoStore.stackName}</span>
                        <NavButton position={NavStack.right}/>
                    </div>
                    <div className={styles.shadowBox}>
                        <InputField/>
                        <ul className={styles.tasksBox}>
                            { todoStore.currentTaskView?.map((task) => (
                                <li key={ task.id } className={styles.task}>
                                    <Task task={task}/>
                                    <div className={styles.inlineBox}>
                                        {/*TODO open form*/}
                                        {/*<button className={styles.inlineButton} onClick={() => todoStore.changeTask(task.id, {text: 'lala'})}>edit</button>*/}
                                        <button className={styles.inlineButton} onClick={() => todoStore.deleteTask(task.id)}>x</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.cardFooter}>
                            <div className={styles.taskCountText}>{todoStore.taskCountText}</div>
                            <div className={styles.tabGroup}>
                                <FooterButton button={Buttons.All}/>
                                <FooterButton button={Buttons.Active}/>
                                <FooterButton button={Buttons.Completed}/>
                            </div>
                            <FooterButton button={Buttons.ClearCompleted}/>
                        </div>
                    </div>
                    <div className={`${styles.pseudoStack} ${styles.lvl1}`}/>
                    <div className={`${styles.pseudoStack} ${styles.lvl2}`}/>
                </div>
            </main>
        </div>
    );
});

export default Home;
