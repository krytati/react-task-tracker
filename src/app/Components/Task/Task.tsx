import styles from "./task.module.css";
import CircleCheckbox from "@/app/Components/CircleCheckbox/CircleCheckbox";

export function Task({ text, state, handler }: {text: string, state: boolean, handler: () => void}) {
    return (
        <>
            <CircleCheckbox state={ state } handler={handler}/>
            <span className={ state ? styles.done : ''}>
                { text }
            </span>
        </>
    );
}