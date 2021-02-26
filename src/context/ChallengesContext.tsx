import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface challenge {
    type: "body" | "eye";
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: challenge;
    resetChallenge: () => void;
    completeChallenge: () => void;
    experienceToNextLevel: number;
    closeModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({
    children,
    ...rest
}: ChallengesProviderProps) => {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(
        rest.currentExperience ?? 0
    );
    const [challengesCompleted, setChallengesCompleted] = useState(
        rest.challengesCompleted ?? 0
    );

    const [activeChallenge, setActiveChallenge] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set("level", String(level));
        Cookies.set("challengesCompleted", String(challengesCompleted));
        Cookies.set("currentExperience", String(currentExperience));
    }, [level, challengesCompleted, currentExperience]);

    function levelUp() {
        setLevel(level + 1);
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(
            Math.random() * challenges.length
        );
        const challenge = challenges[randomChallengeIndex];

        new Audio("/notification.mp3").play();

        setActiveChallenge(challenge);
        if (Notification.permission == "granted") {
            new Notification("Novo desafio disponível 🏁", {
                body: `Valendo ${challenge.amount} xp`,
            });
        }
    }
    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) return;
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                levelUp,
                level,
                startNewChallenge,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeModal,
            }}
        >
            {children}
            {isModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
};
