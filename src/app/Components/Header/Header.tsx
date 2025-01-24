"use client"
import NavButton from "@/app/Components/NavButton/NavButton.tsx";
import {NavStack} from "@/utils/enums.ts";
import styles from "./header.module.css";
import {todoStore} from "@/app/taskStore.ts";
import {observer} from "mobx-react-lite";

export const Header = observer(() => {
    return (
        <div className={styles.cardHeader}>
            <NavButton position={NavStack.left}/>
            <span className={styles.cardHeaderText}>{todoStore.stackName}</span>
            <NavButton position={NavStack.right}/>
        </div>
    );
});