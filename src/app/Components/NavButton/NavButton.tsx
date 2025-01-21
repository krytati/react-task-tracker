import styles from "@/app/Components/NavButton/navButton.module.css";
import {NavStack} from "@/utils/enums";
import {todoStore} from "@/app/taskStore.ts";

const NavButton = ({ position }: { position: NavStack } ) => {
    const style = `${styles.angleBracket} ${position === NavStack.left ? styles.left : styles.right}`;
    return (
        <div className={style}>
            <button onClick={() => todoStore.switchStack(position)}/>
        </div>
    );
}

export default NavButton;