import { useState } from "react";
import styles from "./Header.module.css";


export function Header({ setView }: {setView: (value: number) => void}) {
    const [active, setActive] = useState(0);

    return (
        <ul className={styles.btonContainer}>
            <li className={active === 0 ? styles.active : ""} 
                onClick={() => {
                    setView(0);
                    setActive(0);
                }}>SELECTION</li>
            <li className={active === 1 ? styles.active : ""} 
                onClick={() => {
                    setView(1);
                    setActive(1);
                }}>PRICES</li>
        </ul>
    );
}