import { useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import { CountdownContext } from "../context/CountdownContext";
import styles from "../style/components/ChallengeBox.module.css";

export default function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(
        ChallengesContext
    );
    const { resetCountdown } = useContext(CountdownContext);

    function handleFailedButton() {
        resetChallenge();
        resetCountdown();
    }

    function handleSucceededButton() {
        completeChallenge();
        resetCountdown();
    }
    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleFailedButton}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handleSucceededButton}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="ícone level up" />
                        Avance de level completando desafios
                    </p>
                </div>
            )}
        </div>
    );
}
