import { registerRoot } from "remotion";
import { PreRegistrationIntro } from "./pre-registration-intro";
import { Composition } from "remotion";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="PreRegistrationIntro"
                component={PreRegistrationIntro}
                durationInFrames={30 * 8} // 8 seconds
                fps={30}
                width={800}
                height={1000}
            />
        </>
    );
};

// Only call registerRoot if we are in the Remotion context
if (typeof window !== "undefined" && (window as any).remotion_is_studio) {
    registerRoot(RemotionRoot);
}