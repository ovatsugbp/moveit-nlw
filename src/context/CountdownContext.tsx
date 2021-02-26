import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    isActive: boolean;
    resetCountdown: () => void;
    startCountdown: () => void;
    hasFinished: boolean;
    seconds: number;
    minutes: number;
}
interface CountdownProviderProps {
    children: ReactNode;
}
let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setHasFinished(false);
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
        <CountdownContext.Provider
            value={{
                isActive,
                resetCountdown,
                startCountdown,
                hasFinished,
                seconds,
                minutes,
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}
