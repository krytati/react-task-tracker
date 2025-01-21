import styles from "./footerButton.module.css";
import {todoStore} from "@/app/taskStore.ts";
import {Buttons} from "@/utils/enums.ts";

export const FooterButton = ({ button }: {
    button: Buttons
}) => {

    let selected: boolean;
    let handler: () => void;
    let disabled: boolean;

    if (button === Buttons.ClearCompleted) {
        selected = false;
        handler = (() => todoStore.clearCompleted());
        disabled = todoStore.doneCount == 0;
    } else {
        selected = todoStore.selectedButton === button;
        handler = (() => todoStore.selectButton(button));
        disabled = false;
    }

    return (
        <button
            className={`
                ${styles.footerButton} 
                ${selected ? styles.selectedTab : ''}
                ${disabled ? styles.disabledButton : ''}
            `}
            onClick={ handler }
            disabled={ disabled || selected }
        >{ button }</button>
    );
};