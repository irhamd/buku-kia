import React, { useState, useEffect } from "react";
import { useSuara } from "services/Sound/UseSuara";

import sirine from "./../../assets/sound/sirine.m4a"

function TestSound() {



    const [playing, toggle] = useSuara("");


    return (
        <div>
            <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        </div>
    )
}

export default TestSound
