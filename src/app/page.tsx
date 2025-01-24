import styles from "./page.module.css";
import {DragDropList} from "@/app/Components/DragDropList/DragDropList.tsx";
import {Footer} from "@/app/Components/Footer/Footer.tsx";
import {InputField} from "@/app/Components/InputField/InputField.tsx";
import {Header} from "@/app/Components/Header/Header.tsx";

const Home = () => {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.card}>
                    <Header/>
                    <div className={styles.shadowBox}>
                        <InputField/>
                        <DragDropList/>
                        <Footer/>
                    </div>
                    <div className={`${styles.pseudoStack} ${styles.lvl1}`}/>
                    <div className={`${styles.pseudoStack} ${styles.lvl2}`}/>
                </div>
            </main>
        </div>
    );
};

export default Home;
