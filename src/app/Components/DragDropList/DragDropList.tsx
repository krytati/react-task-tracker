"use client"
import styles from "@/app/Components/DragDropList/dragDropList.module.css";
import taskStyles from "@/app/Components/sharedTaskStyles.module.css";
import {todoStore} from "@/app/taskStore.ts";
import {Task} from "@/app/Components/Task/Task.tsx";
import {observer} from "mobx-react-lite";
import React, {useRef, useState} from "react";
import {Buttons} from "@/utils/enums.ts";
import {smoothScroll, YDir} from "@/utils/functions/smoothScroll.ts";

export const DragDropList = observer( () => {

    const [draggingIndex, setDraggingIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLUListElement>(null);

    const handleDragStart = (index: number) => {
        setDraggingIndex(index);
    };

    const handleDragOver = (event: React.DragEvent<HTMLLIElement>, index: number) => {
        event.preventDefault();
        if (draggingIndex == index) { return }

        if (containerRef.current) {
            const container = containerRef.current;
            const scrollThreshold = 50;

            if (event.clientY > container.getBoundingClientRect().bottom - scrollThreshold) {
                smoothScroll(YDir.down, container);
            }

            if (event.clientY < container.getBoundingClientRect().top + scrollThreshold) {
                smoothScroll(YDir.up, container);
            }
        }

        todoStore.moveTask(index, draggingIndex);
        setDraggingIndex(index);
    };

    const handleDrop = () => {
        setDraggingIndex(-1);
    };

    return (
        <ul className={styles.tasksBox} ref={containerRef}>
            { todoStore.currentTaskView?.map((task, index) => (
                <li key={ task.id }
                    className={taskStyles.task}
                    draggable={todoStore.selectedButton === Buttons.All}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(event) => handleDragOver(event,index)}
                    onDrop={handleDrop}
                >
                    <Task task={task}/>
                    <div className={styles.inlineBox}>
                        <button className={taskStyles.inlineButton} onClick={() => todoStore.deleteTask(task.id)}>x</button>
                    </div>
                </li>
            ))}
        </ul>
    );
});