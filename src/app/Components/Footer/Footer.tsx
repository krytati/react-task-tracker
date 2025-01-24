"use client"
import styles from "./footer.module.css";
import {todoStore} from "@/app/taskStore.ts";
import {FooterButton} from "@/app/Components/Footer/FooterButton/FooterButton.tsx";
import {Buttons} from "@/utils/enums.ts";
import {observer} from "mobx-react-lite";

export const Footer = observer(() => {
    return (
        <div className={styles.cardFooter}>
            <div className={styles.taskCountText}>{todoStore.taskCountText}</div>
            <div className={styles.tabGroup}>
                <FooterButton button={Buttons.All}/>
                <FooterButton button={Buttons.Active}/>
                <FooterButton button={Buttons.Completed}/>
            </div>
            <FooterButton button={Buttons.ClearCompleted}/>
        </div>
    );
});