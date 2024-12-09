import styles from "@/app/Components/NavButton/navButton.module.css";
import {NavStack} from "@/utils/enums";

const NavButton = ({ position, handler }: { position: NavStack, handler: () => void } ) => {
    const style = `${styles.angleBracket} ${position === NavStack.left ? styles.left : styles.right}`;
    return (
        <div className={style}>
            <button onClick={handler}/>
        </div>
    );
}

export default NavButton;