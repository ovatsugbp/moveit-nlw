import { ChallengesProvider } from "../context/ChallengesContext";

import "../style/global.css";
function MyApp({ Component, pageProps }) {
    return (
        <ChallengesProvider>
            <Component {...pageProps} />;
        </ChallengesProvider>
    );
}

export default MyApp;
