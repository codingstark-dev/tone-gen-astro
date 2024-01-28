import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const BinauralBeats = () => {
    const [freq1, setFreq1] = useState(500);
    const [freq2, setFreq2] = useState(503);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const osc1 = new Tone.Oscillator(freq1, "sine");
        const osc2 = new Tone.Oscillator(freq2, "sine");

        const panner1 = new Tone.Panner(-1).toDestination();
        const panner2 = new Tone.Panner(1).toDestination();
        const volume = new Tone.Volume(-4.44);
        volume.toDestination();
        osc1.connect(panner1);
        osc2.connect(panner2);
        if (isPlaying) {
            osc1.start();
            osc2.start();
        } else {
            osc1.stop();
            osc2.stop();
        }
        return () => {
            osc1.stop();
            osc2.stop();
        };
    }, [freq1, freq2, isPlaying]);

    const handleFreq1Change = (event) => {
        setFreq1(event.target.value);
    };

    const handleFreq2Change = (event) => {
        setFreq2(event.target.value);
    };
    const handleStart = () => {
        setIsPlaying(true);
    };

    const handleStop = () => {
        setIsPlaying(false);
    };
    return (
        <div className="grid grid-cols-1 gap-4 items-center justify-center text-center ">
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center">

                    <input
                        type="number"
                        className="input input-bordered  p-0 m-0 w-14 text-center "
                        value={freq1}
                        onChange={handleFreq1Change}
                    />
                    <span>Hz</span>
                </div>
                <span className="mx-2 font-bold text-2xl">+</span>
                <div className="flex justify-center items-center">

                    <input
                        type="number"
                        className="input input-bordered p-0 m-0 w-14 text-center"
                        value={freq2}
                        onChange={handleFreq2Change}
                    />
                    <span>Hz</span>
                </div>
            </div>
            <div className="space-y-2">
                <button className='btn-square btn btn-wide font-bold bg-green-300' onClick={handleStart}>Start</button>
                <button className='btn-square btn btn-wide font-bold bg-red-500 text-white' onClick={handleStop}>Stop</button></div>
        </div>
    );
};

export default BinauralBeats;
