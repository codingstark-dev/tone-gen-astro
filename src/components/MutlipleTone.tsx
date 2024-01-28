
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
    const oscRef = useRef<Tone.Oscillator | null>(null);
    const volRef = useRef<Tone.Volume | null>(null);
    const pannerRef = useRef<Tone.Panner | null>(null);

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
        {
            frequency: 432,
            volume: -3.1,
            panning: 0,
            oscillatorType: 'sine',
            isPlaying: false,
            oscRef: useRef<Tone.Oscillator | null>(null),
            volRef: useRef<Tone.Volume | null>(null),
            pannerRef: useRef<Tone.Panner | null>(null),
        },
        //{
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
        tones.forEach((tone, index) => {
            if (tone.oscRef && tone.oscRef.current === null) {
                const vol = new Tone.Volume(tone.volume).toDestination();
                const panner = new Tone.Panner(tone.panning).connect(vol);
                const osc = new Tone.Oscillator(tone.frequency, tone.oscillatorType).connect(panner);
                tone.oscRef.current = osc;
                tone.volRef.current = vol;
                tone.pannerRef.current = panner;
            }
        });
    }, [tones]);
    ;
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
            {
                frequency: 432,
                volume: -3.1,
                panning: 0,
                oscillatorType: 'sine',
                isPlaying: false,
                oscRef: { current: null },
                volRef: { current: null },
                pannerRef: { current: null },
            }
        ]);
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
        <div className="p-5">
            <div className="overflow-x-auto">
                <table className="table table-zebra table-sm" >
                    <thead>
                        <tr>
                            {/* <th>Tone</th> */}
                            <th>WaveForm</th>
                            <th>Frequency</th>
                            <th>Volume</th>
                            <th>Panning (Left/Right)</th>
                            <th>On/Off</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tones.map((tone, index) => (
                            <tr key={index}>
                                {/* <td className="btn btn-square btn-sm">{index + 1}</td> */}
                                <td>
                                    <select
                                        className="input input-ghost p-0 m-0 w-18 text-center"
                                        value={tone.oscillatorType}
                                        onChange={(event) => {
                                            setTones((prevTones) => {
                                                const newTones = [...prevTones];
                                                const tone = { ...newTones[index], oscillatorType: event.target.value as Tone.ToneOscillatorType };
                                                if (tone.oscRef.current) {
                                                    tone.oscRef.current.type = event.target.value as Tone.ToneOscillatorType;
                                                }
                                                newTones[index] = tone;
                                                return newTones;
                                            });
                                        }}
                                    >
                                        {["sine", "square", "sawtooth", "triangle"].map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td >
                                    <div className="flex justify-center items-center" >
                                        <input
                                            type="number"
                                            min="20"
                                            max="20000"
                                            step="1"
                                            className="input input-ghost p-0 m-0 w-14 text-center" value={tone.frequency}
                                            onChange={(event) => {
                                                if (event.target.valueAsNumber > 20154) {
                                                    changeFrequency(index, 20154);
                                                } else if (event.target.valueAsNumber < 1) {
                                                    changeFrequency(index, 1);
                                                } else if (isNaN(event.target.valueAsNumber)) {
                                                    changeFrequency(index, 1);
                                                } else {
                                                    changeFrequency(index, event.target.value as unknown as number);
                                                }
                                            }}
                                        />   <span>
                                            Hz
                                        </span></div>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="1"
                                        className="input input-ghost p-0 m-0 w-14 text-center"
                                        value={((tone.volume + 60) / 60) * 100} // Convert volume to 0-100 range for display
                                        onChange={(event) => {
                                            let volume = ((event.target.valueAsNumber / 100) * 60) - 60; // Convert back to -60 to 0 range for actual volume
                                            if (volume > 0) {
                                                volume = 0;
                                            } else if (volume < -60) {
                                                volume = -60;
                                            } else if (isNaN(volume)) {
                                                volume = -60;
                                            }
                                            changeVolume(index, volume);
                                        }}
                                    />
                                    {/* <input
                                        type="range"
                                        min="-60"
                                        max="0"
                                        step="0.1"
                                        value={tone.volume}
                                        onChange={(event) => changeVolume(index, parseFloat(event.target.value))}
                                    /> */}
                                </td>
                                <td>
                                    <input
                                        type="range"
                                        min="-1"
                                        max="1"
                                        step="0.1"
                                        value={tone.panning}
                                        onChange={(event) => {
                                            setTones((prevTones) => {
                                                const newTones = [...prevTones];
                                                const tone = { ...newTones[index], panning: parseFloat(event.target.value) };
                                                if (tone.pannerRef.current) {
                                                    tone.pannerRef.current.pan.value = parseFloat(event.target.value);
                                                }
                                                newTones[index] = tone;
                                                return newTones;
                                            });
                                        }}
                                    />
                                </td>
                                <td >
                                    <div className="flex flex-wrap">
                                        <button className="btn btn-square btn-sm bg-green-300 px-6" onClick={() => startTone1(tone)}>Start</button>

                                        <button className="btn btn-square btn-sm bg-red-300 px-6" onClick={() => stopTone1(tone)}>Stop</button>
                                    </div>  </td>
                                <td >                                    <div className="flex justify-center items-center" >

                                    <button className="btn btn-square btn-sm bg-red-300 px-6" onClick={() => {
                                        stopTone1(tone);
                                        setTones((prevTones) => {
                                            const newTones = prevTones.filter((_, toneIndex) => toneIndex !== index);
                                            return newTones;
                                        });
                                    }}>Delete</button>
                                </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table></div>
            <div className="flex justify-center">

                <button onClick={addTone} className="btn btn-square w-40">Add Tone</button></div>




        </div>
    );
}
