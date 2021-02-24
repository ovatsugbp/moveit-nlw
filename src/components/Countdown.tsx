import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import styles from "../style/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

export default function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(5);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minutesFirstBox, minutesSecondBox] = String(minutes)
        .padStart(2, "0")
        .split("");
    const [secondsFirstBox, secondsSecondBox] = String(seconds)
        .padStart(2, "0")
        .split("");

    function startCountdown() {
        setIsActive(true);
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setIsActive(false);
            setHasFinished(true);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesFirstBox}</span>
                    <span>{minutesSecondBox}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsFirstBox}</span>
                    <span>{secondsSecondBox}</span>
                </div>
            </div>
            {hasFinished ? (
                <button
                    disabled
                    className={`${styles.countdownButton}`}
                    onClick={resetCountdown}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button
                            type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar novo ciclo
                        </button>
                    )}
                </>
            )}
        </>
    );
}
