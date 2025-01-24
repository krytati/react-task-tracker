"use client"
import React, {useCallback, useState} from "react";
import {todoStore} from "@/app/taskStore.ts";
import styles from "@/app/Components/sharedTaskStyles.module.css";

export const InputField = () => {

    const [inputValue, setInputValue] = useState('');

    const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" && inputValue.trim()) {
            todoStore.addTask(inputValue);
            setInputValue("");
        }
    };

    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        setInputValue(event.currentTarget.value);
    }, [setInputValue]);

    return (
        <>
            <input
                type='text'
                placeholder='What need to be done?'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleEnterKeyDown}
                className={`${styles.task} ${styles.taskInput}`}
            />
        </>
    );
};