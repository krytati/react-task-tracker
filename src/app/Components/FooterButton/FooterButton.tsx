import styles from "./footerButton.module.css";

export const FooterButton = ({ children, selected, handler, disabled }: {
    children: string,
    selected: boolean,
    handler: () => void,
    disabled?: boolean,
}) => {
    return (
        <button
            className={`
                ${styles.footerButton} 
                ${selected ? styles.selectedTab : ''}
                ${disabled ? styles.disabledButton : ''}
            `}
            onClick={ handler }
            disabled={ disabled || selected }
        >{ children }</button>
    );
};