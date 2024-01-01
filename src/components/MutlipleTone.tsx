
import { notes } from "../data/note";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
interface ToneGenProps {
    h1?: string;
    p?: string;
    title?: string;
    description?: string;

}
interface ToneData {
    frequency: number;
    volume: number;
    panning: number;
    oscillatorType: Tone.ToneOscillatorType;
    isPlaying: boolean;
    oscRef: React.MutableRefObject<Tone.Oscillator | null>;
    volRef: React.MutableRefObject<Tone.Volume | null>;
    pannerRef: React.MutableRefObject<Tone.Panner | null>;
}
export default function MultipleToneGen({

}: ToneGenProps) {

    const data: ToneData = {
        frequency: 432,
        volume: -3.1,
        panning: 0,
        oscillatorType: 'sine',
        isPlaying: false,
        oscRef: useRef<Tone.Oscillator>(),
        volRef: useRef<Tone.Volume>(),
        pannerRef: useRef<Tone.Panner>(),
    }
    // const [frequency, setFrequency] = useState(432);
    // const [volume, setVolume] = useState(-3.1);
    // const [panning, setPanning] = useState(0);
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [toneOscillatorType, setToneOscillatorType] = useState<Tone.ToneOscillatorType>("sine");

    // const oscRef = useRef<Tone.Oscillator | null>(null);
    // const volRef = useRef<Tone.Volume | null>(null);
    // const pannerRef = useRef<Tone.Panner | null>(null);
    const [tones, setTones] = useState<ToneData[]>([
        // {
        //     frequency: 432,
        //     volume: -3.1,
        //     panning: 0,
        //     oscillatorType: 'sine',
        //     isPlaying: false,
        //     oscRef: useRef<Tone.Oscillator | null>(null),
        //     volRef: useRef<Tone.Volume | null>(null),
        //     pannerRef: useRef<Tone.Panner | null>(null),
        // }, {
        //     frequency: 432,
        //     volume: -3.1,
        //     panning: 0,
        //     oscillatorType: 'sine',
        //     isPlaying: false,
        //     oscRef: useRef<Tone.Oscillator | null>(null),
        //     volRef: useRef<Tone.Volume | null>(null),
        //     pannerRef: useRef<Tone.Panner | null>(null),
        // },
    ]);


    const changeFrequency = (index: number, newFrequency: number) => {
        setTones((prevTones) => {
            const newTones = [...prevTones];
            const tone = { ...newTones[index], frequency: newFrequency };
            if (tone.oscRef.current) {
                tone.oscRef.current.frequency.value = newFrequency;
            }

            newTones[index] = tone;
            return newTones;
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            tones.forEach((tone) => {
                tone.volRef.current = new Tone.Volume(tone.volume).toDestination();
                tone.pannerRef.current = new Tone.Panner(tone.panning).connect(tone.volRef.current);
                const newOsc = new Tone.Oscillator(tone.frequency, tone.oscillatorType).connect(
                    tone.pannerRef.current
                );
                tone.oscRef.current = newOsc;
            });

        }
        return () => {
            tones.forEach((tone) => {
                if (tone.oscRef.current) {
                    tone.oscRef.current.dispose();
                }
            });
        };
    }, [
        tones

        // tones.map((tone) => tone.frequency),
        // tones.map((tone) => tone.volume),
        // tones.map((tone) => tone.panning),
        // tones.map((tone) => tone.oscillatorType),
    ]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            tones.forEach((tone) => {
                tone.volRef.current = new Tone.Volume(tone.volume).toDestination();

                // tone.pannerRef.current = new Tone.Panner(tone.panning).connect(tone.volRef.current);
                // const newOsc = new Tone.Oscillator(tone.frequency, tone.oscillatorType).connect(
                //     tone.pannerRef.current
                // );
                // tone.oscRef.current = newOsc;
            });


        }
        return () => {
            // tones.forEach((tone) => {
            //     if (tone.oscRef.current) {
            //         tone.oscRef.current.dispose();
            //     }
            // });
        };
    }, [
        // tones
        // 
        changeFrequency
        // tones.map((tone) => tone.volume),
        // tones.map((tone) => tone.panning),
        // tones.map((tone) => tone.oscillatorType),
    ]);
    const startTone1 = (tone: ToneData) => {
        if (tone.oscRef.current) {
            tone.isPlaying = true;
            // console.log(tone.oscRef.current);
            tone.oscRef.current.frequency.value = tone.frequency;
            tone.oscRef.current.start();
        }
    };

    const stopTone1 = (tone: ToneData) => {
        if (tone.oscRef.current) {
            tone.isPlaying = false;
            console.log(tone.oscRef.current);

            tone.oscRef.current.stop();
        }
    };

    const addTone = () => {

        setTones((prevTones) => [
            ...prevTones,
            data
        ]);
        console.log(tones);
    };
    const changeVolume = (index: number, newVolume: number) => {
        setTones((prevTones) => {
            const newTones = [...prevTones];
            const tone = { ...newTones[index], volume: newVolume };
            if (tone.volRef.current) {
                tone.volRef.current.volume.value = newVolume;
            }
            newTones[index] = tone;
            return newTones;
        });
    };




    function dbToPercentage(db: number, decimalPlaces: number): string {
        let percentage = 100 * Math.pow(10, db / 20);
        return percentage.toFixed(decimalPlaces);
    }
    return (
        <div className="max-w-2xl p-5">
            <table>
                <thead>
                    <tr>
                        <th>Tone</th>
                        <th>Start</th>
                        <th>Stop</th>
                        <th>Frequency</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {tones.map((tone, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <button onClick={() => startTone1(tone)}>Start</button>
                            </td>
                            <td>
                                <button onClick={() => stopTone1(tone)}>Stop</button>
                            </td>
                            <td>
                                <input
                                    type="range"
                                    min="20"
                                    max="20000"
                                    step="1"
                                    value={tone.frequency}
                                    onChange={(event) => changeFrequency(index, parseFloat(event.target.value))}
                                />
                            </td>
                            <td>
                                <input
                                    type="range"
                                    min="-60"
                                    max="0"
                                    step="0.1"
                                    value={tone.volume}
                                    onChange={(event) => changeVolume(index, parseFloat(event.target.value))}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addTone}>Add Tone</button>
            <div>
                {tones.map((tone, index) => (
                    <div key={index}>
                        {/* Render controls for each tone */}

                        <button onClick={() => startTone1(tone)}>Start</button>
                        <button onClick={() => stopTone1(tone)}>Stop</button>
                        <input
                            type="range"
                            min="20"
                            max="20000"
                            step="1"
                            value={tone.frequency}
                            onChange={(event) => changeFrequency(index, parseFloat(event.target.value))}
                        />
                        <input
                            type="range"
                            min="-60"
                            max="0"
                            step="0.1"
                            value={tone.volume}
                            onChange={(event) => changeVolume(index, parseFloat(event.target.value))}
                        />

                        {/* Add more controls as needed */}
                    </div>
                ))}
                <button onClick={addTone}>Add Tone</button>
            </div>



        </div>
    );
}
