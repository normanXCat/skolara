"use client";

import React from "react";
import { Player } from "@remotion/player";
import { PreRegistrationIntro } from "./pre-registration-intro";
import { useTheme } from "next-themes";

const RegistrationPlayer: React.FC = () => {
    const { resolvedTheme } = useTheme();

    return (
        <div className="w-full aspect-[4/5] overflow-hidden">
            <Player
                component={PreRegistrationIntro}
                durationInFrames={30 * 10}
                compositionWidth={800}
                compositionHeight={1000}
                fps={30}
                loop={true}
                autoPlay
                inputProps={{
                    theme: resolvedTheme as "light" | "dark",
                }}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                controls={false}
            />
        </div>
    );
};

export default RegistrationPlayer;
