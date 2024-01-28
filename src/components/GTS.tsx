import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

const GTS: React.FC = () => {
    const [synth, setSynth] = useState<Tone.Synth | null>(null);
    // const [isPlaying, setIsPlaying] = useState(false);
    const start = () => {

        const newSynth = new Tone.Synth().toDestination();
        setSynth(newSynth);
        // setIsPlaying(true);
        const now = Tone.now();
        for (let i = 0; i < 5; i++) {

            // setIsPlaying(true);

            newSynth.triggerAttackRelease("C4", "32n", now + i);
        }
        newSynth.triggerAttackRelease("C4", "2n", now + 5);
        if (synth) {
            // setIsPlaying(false);
            // synth.dispose();
        }
    };

    const stop = () => {
        if (synth) {
            // setIsPlaying(false);
            synth.dispose();
            setSynth(null);
        }
    };

    useEffect(() => {
        return () => {
            if (synth) {
                // setIsPlaying(false);
                synth.dispose();
            }
        };
    }, [synth]);

    return (
        <div className='grid grid-cols-1 gap-4 items-center justify-center text-center '>

            <div>
                <button className='btn-square btn btn-wide font-bold' onClick={start}>Pips (GTS)
                    {/* {
                        isPlaying == true ? <span className='text-green-500 font-extrabold'>ON</span> : <span className='text-red-500 font-extrabold'>OFF</span>
                    }    */}

                </button>
            </div>

            <div> <button className='btn-square btn btn-wide font-bold bg-red-500 text-white' onClick={stop}>Stop GTS</button></div>
        </div>
    );
};

export default GTS;