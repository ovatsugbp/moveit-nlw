import { useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import styles from "../style/components/Profile.module.css";
export function Profile() {
    const { level } = useContext(ChallengesContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/ovatsugbp.png" alt="logo" />
            <div>
                <strong>Gustavo Goulart</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}
