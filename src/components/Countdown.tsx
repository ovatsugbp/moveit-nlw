import { useContext } from "react";
import { CountdownContext } from "../context/CountdownContext";
import styles from "../style/components/Countdown.module.css";

export default function Countdown() {
    const {
        hasFinished,
        isActive,
        minutes,
        seconds,
        resetCountdown,
        startCountdown,
    } = useContext(CountdownContext);

    const [minutesFirstBox, minutesSecondBox] = String(minutes)
        .padStart(2, "0")
        .split("");
    const [secondsFirstBox, secondsSecondBox] = String(seconds)
        .padStart(2, "0")
        .split("");

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
