import styles from "./circleCheckbox.module.css";
const CircleCheckbox = ({ state, handler }: { state: boolean, handler: () => void } ) => {
    return (
        <div className={ styles.checkboxWrapper }>
            <input type="checkbox" checked={ state } onChange={handler} />
        </div>
    );
};
export default CircleCheckbox;