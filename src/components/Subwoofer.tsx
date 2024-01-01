
import { notes } from "../data/note";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
interface ToneGenProps {
    h1?: string;
    p?: string;
    title?: string;
    description?: string;
}
export default function Subwoofer({

}: ToneGenProps) {
    const [frequency, setFrequency] = useState(0);
    const [volume, setVolume] = useState(-3.1);
    const [panning, setPanning] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [toneOscillatorType, setToneOscillatorType] = useState<Tone.ToneOscillatorType>("sine");

    const oscRef = useRef<Tone.Oscillator | null>(null);
    const volRef = useRef<Tone.Volume | null>(null);
    const pannerRef = useRef<Tone.Panner | null>(null);
    // let freqInterval: NodeJS.Timer | null = null;
    const freqInterval = useRef<NodeJS.Timeout | null>(null);
    const freqTimeout = useRef<NodeJS.Timeout | null>(null);
    // let freqTimeout: NodeJS.Timeout | null = null;

    // const volRef = typeof window !== 'undefined' ? useRef<Tone.Volume>( new Tone.Volume(volume).toDestination()): null;
    // const pannerRef = typeof window !== 'undefined' ? useRef<Tone.Panner>(new Tone.Panner(panning).connect(volRef!.current)) : null;

    useEffect(() => {
        if (typeof window !== "undefined") {
            volRef.current = new Tone.Volume(volume).toDestination();
            pannerRef.current = new Tone.Panner(panning).connect(volRef.current);
            const newOsc = new Tone.Oscillator(0, toneOscillatorType).connect(
                pannerRef!.current
            );
            oscRef.current = newOsc;
        }
        return () => {
            if (oscRef.current) {
                oscRef.current.dispose();
            }
        };
    }, []);
    useEffect(() => {
        if (oscRef.current) {

            oscRef.current.restart();
            oscRef.current.type = toneOscillatorType;
        }
    }, [toneOscillatorType]);

    // useEffect(() => {
    //     if (oscRef.current && oscRef.current.state ) {
    //         oscRef.current.state === "started" ? setIsPlaying(true) : setIsPlaying(false);
    //     }
    // }, [ oscRef.current?.state ]);

    // useEffect(() => {
    //     if (oscRef.current && oscRef.current.frequency) {
    //         // oscRef.current.frequency.value = frequency;
    //         startTone();
    //     }
    // }, [frequency]);

    useEffect(() => {
        if (volRef.current) {
            volRef.current.volume.value = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (pannerRef.current) {
            pannerRef.current.pan.value = panning;
        }
    }, [panning]);

    //set setFrequency start 0 to 20000 in 1 minute

    const startTone = () => {
        //start 0 to 20000 in 1 minute

        if (oscRef.current) {
            const now = Tone.now();
            const rampTime = 60;
            const endTime = now + rampTime;

            oscRef.current!.frequency.setValueAtTime(150, now);
            oscRef.current!.frequency.linearRampToValueAtTime(0, endTime).exponentialRampToValueAtTime(1, endTime);
            oscRef.current!.start(now);
            freqInterval.current = setInterval(() => {
                setFrequency(
                    oscRef.current!.frequency.value as unknown as number
                );
            }
                , 1000);

            freqTimeout.current = setTimeout(() => {
                oscRef.current!.stop();

                clearInterval(freqInterval.current!);
                setIsPlaying(false);
            }, 80000);
            setIsPlaying(true);

            // setIsPlaying(true);
            // oscRef.current.start();
        }
    };

    const stopTone = () => {
        if (oscRef.current) {
            setIsPlaying(false);
            clearInterval(freqInterval.current);
            clearTimeout(freqTimeout.current);
            //stop frequency
            const now = Tone.now();
            const rampTime = 80;
            const endTime = now + rampTime;
            oscRef.current!.frequency.setValueAtTime(
                oscRef.current!.frequency.value,
                now
            );
            oscRef.current!.frequency.linearRampToValueAtTime(0, endTime);

            oscRef.current.stop();
            setFrequency(0);
        }
    };

    function dbToPercentage(db: number, decimalPlaces: number): string {
        let percentage = 100 * Math.pow(10, db / 20);
        return percentage.toFixed(decimalPlaces);
    }
    return (
        <div className="max-w-2xl p-5">
            <div className="flex items-center justify-center">
                <button
                    className="btn btn-wide border border-gray-500"
                    onClick={isPlaying ? stopTone : startTone}
                >
                    {isPlaying ? "Stop" : "Start"}
                </button>
            </div>
            <div className="my-8"></div>
            <input
                className="range range-sm"
                type="range"
                min="0"
                max="150"
                step={1}
                value={frequency}
                onChange={(event) =>
                    setFrequency(parseInt(event.target.value))
                }
            />

            <div className="my-6"></div>

            <div className="flex flex-wrap items-center justify-center my-4">

                <div className="flex items-center space-x-2 w-56">
                    <svg
                        className="w-20"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M6.603 10L10 7.22v9.56L6.603 14H3v-4h3.603ZM2 16h3.889l5.294 4.332a.5.5 0 0 0 .817-.387V4.055a.5.5 0 0 0-.817-.387L5.89 8H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1Zm21-4c0 3.292-1.446 6.246-3.738 8.262l-1.418-1.418A8.98 8.98 0 0 0 21 12a8.98 8.98 0 0 0-3.155-6.844l1.417-1.418A10.974 10.974 0 0 1 23 12Zm-5 0a5.99 5.99 0 0 0-2.287-4.713l-1.429 1.429A3.996 3.996 0 0 1 16 12c0 1.36-.679 2.561-1.716 3.284l1.43 1.43A5.99 5.99 0 0 0 18 12Z"
                        ></path>
                    </svg>
                    <input
                        className="range range-xs"
                        type="range"
                        min="0"
                        max="100"
                        // step={0.1}

                        value={Math.pow(10, volume / 20) * 100}
                        onChange={(event) => {
                            if (volRef.current) {
                                const newVolume = Tone.gainToDb(
                                    event.target.valueAsNumber / 100
                                );
                                volRef.current.volume.value = newVolume;
                                setVolume(newVolume);
                            }
                        }}
                    />{" "}
                    <span>{dbToPercentage(volume, 0)}%</span>
                </div>
                <div className="mx-3"></div>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <br />
                        <input
                            className="range range-sm bg-transparent! range1 "
                            type="range"
                            min="-1"
                            max="1"
                            step="0.1"
                            style={{
                                "boxShadow": "none"
                            }}
                            value={panning}
                            onChange={(event) =>
                                setPanning(event.target.value as unknown as number)
                            }
                        />

                        <div className="w-full flex justify-between text-xs px-2">
                            <div className="flex justify-center items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.5em"
                                    height="1.5em"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M6.603 10L10 7.22v9.56L6.603 14H3v-4h3.603ZM2 16h3.889l5.294 4.332a.5.5 0 0 0 .817-.387V4.055a.5.5 0 0 0-.817-.387L5.89 8H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1Zm21-4c0 3.292-1.446 6.246-3.738 8.262l-1.418-1.418A8.98 8.98 0 0 0 21 12a8.98 8.98 0 0 0-3.155-6.844l1.417-1.418A10.974 10.974 0 0 1 23 12Zm-5 0a5.99 5.99 0 0 0-2.287-4.713l-1.429 1.429A3.996 3.996 0 0 1 16 12c0 1.36-.679 2.561-1.716 3.284l1.43 1.43A5.99 5.99 0 0 0 18 12Z"
                                    ></path>
                                </svg>
                                <div className="flex flex-col items-center">
                                    <div>Left</div>
                                    <div>
                                        {panning.toString().includes("-")
                                            ? ` ${Math.abs(100 * panning)}`
                                            : " 0"}
                                    </div>
                                </div>
                            </div>
                            <span>|</span>
                            <div className="flex justify-center items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.5em"
                                    height="1.5em"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M6.603 10L10 7.22v9.56L6.603 14H3v-4h3.603ZM2 16h3.889l5.294 4.332a.5.5 0 0 0 .817-.387V4.055a.5.5 0 0 0-.817-.387L5.89 8H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1Zm21-4c0 3.292-1.446 6.246-3.738 8.262l-1.418-1.418A8.98 8.98 0 0 0 21 12a8.98 8.98 0 0 0-3.155-6.844l1.417-1.418A10.974 10.974 0 0 1 23 12Zm-5 0a5.99 5.99 0 0 0-2.287-4.713l-1.429 1.429A3.996 3.996 0 0 1 16 12c0 1.36-.679 2.561-1.716 3.284l1.43 1.43A5.99 5.99 0 0 0 18 12Z"
                                    ></path>
                                </svg>
                                <div className="flex flex-col items-center">
                                    <div>Right</div>
                                    <div>
                                        {!panning.toString().includes("-")
                                            ? ` ${Math.abs(100 * panning)}`
                                            : " 0"}
                                    </div>
                                </div>{" "}
                            </div>
                        </div>
                    </div>
                </dialog>

                <button
                    className="btn btn-sm flex space-x-1"
                    onClick={() =>
                        (
                            document.getElementById("my_modal_3") as HTMLDialogElement
                        ).showModal()
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill="currentColor"
                            d="M16 6v8l-5.2 3.9c-.3.3-.8 0-.8-.5V2.6c0-.5.5-.8.8-.5zm0 8h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-3M3.6 17.4a1 1 0 0 0 .7-1.7a8 8 0 0 1 0-11.4A1 1 0 0 0 3 3a10 10 0 0 0 0 14.2a1 1 0 0 0 .7.3z"
                        ></path>
                        <path
                            fill="currentColor"
                            d="M6.5 14.5a1 1 0 0 0 .7-.3a1 1 0 0 0 0-1.4a4 4 0 0 1 0-5.6a1 1 0 0 0-1.4-1.4a6 6 0 0 0 0 8.4a1 1 0 0 0 .7.3z"
                        ></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill="currentColor"
                            d="M4 6v8l5.2 3.9c.3.3.8 0 .8-.5V2.6c0-.5-.5-.8-.8-.5zm0 8H1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3m12.4 11.4a1 1 0 0 1-.7-1.7a8 8 0 0 0 0-11.4A1 1 0 0 1 17 3a10 10 0 0 1 0 14.2a1 1 0 0 1-.7.3z"
                        ></path>
                        <path
                            fill="currentColor"
                            d="M13.5 14.5a1 1 0 0 1-.7-.3a1 1 0 0 1 0-1.4a4 4 0 0 0 0-5.6a1 1 0 0 1 1.4-1.4a6 6 0 0 1 0 8.4a1 1 0 0 1-.7.3z"
                        ></path>
                    </svg>
                </button>
                <div className="flex m-2 items-center my-4">
                    <button className="btn btn-sm" onClick={
                        () => {
                            if (frequency > 20154) {
                                setFrequency(20154);
                            } else if (frequency < 1) {
                                setFrequency(1);
                            } else if (isNaN(frequency)) {
                                setFrequency(1);
                            } else {
                                if (oscRef.current) {
                                    setFrequency(frequency / 2);
                                }
                            }
                        }
                    }>×½</button>
                    <button
                        className="mr-1"
                        onClick={() => {
                            if (frequency > 20154) {
                                setFrequency(20154);
                            } else if (frequency < 1) {
                                setFrequency(1);
                            } else if (isNaN(frequency)) {
                                setFrequency(1);
                            } else {
                                if (oscRef.current) {
                                    setFrequency(frequency - 1);
                                }
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2.5em"
                            height="2.5em"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="m13.42 2.296l-8.047 6.94A.923.923 0 0 0 5 10c0 .315.137.58.41.797l8.01 6.907c.32.268.664.357 1.032.267c.3-.087.482-.29.548-.607v-14.7a.758.758 0 0 0-.526-.628c-.383-.091-.734-.005-1.054.26Z"
                            ></path>
                        </svg>
                    </button>
                    <div>
                        <input
                            type="number"
                            className="input input-ghost p-0 m-0 w-14 text-center"
                            value={frequency}
                            // style={{ width: `${frequency.toString().length + 3}ch` }}
                            onChange={(event) => {
                                if (event.target.valueAsNumber > 20154) {
                                    setFrequency(20154);
                                } else if (event.target.valueAsNumber < 1) {
                                    setFrequency(1);
                                } else if (isNaN(event.target.valueAsNumber)) {
                                    setFrequency(1);
                                } else {
                                    setFrequency(event.target.value as unknown as number);
                                }
                            }}
                        />
                        <span>
                            Hz
                        </span>
                    </div>


                    <button
                        onClick={() => {
                            if (frequency > 20154) {
                                setFrequency(20154);
                            } else if (frequency < 1) {
                                setFrequency(1);
                            } else if (isNaN(frequency)) {
                                setFrequency(1);
                            } else {
                                if (oscRef.current) {
                                    setFrequency(frequency + 1);
                                }
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2.5em"
                            height="2.5em"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M5 2.643v14.765c.092.32.299.511.619.572c.32.061.633-.024.94-.255l8.107-6.993A.944.944 0 0 0 15 10a.94.94 0 0 0-.334-.73L6.58 2.295c-.232-.197-.639-.383-1.061-.253c-.282.087-.455.287-.519.6Z"
                            ></path>
                        </svg>
                    </button>
                    <button className="btn btn-sm"
                        onClick={
                            () => {
                                if (frequency > 20154) {
                                    setFrequency(20154);
                                } else if (frequency < 1) {
                                    setFrequency(1);
                                } else if (isNaN(frequency)) {
                                    setFrequency(1);
                                } else {
                                    if (oscRef.current) {
                                        setFrequency(frequency * 2);
                                    }
                                }
                            }
                        }
                    >x2</button>
                </div>
                <div className="mx-2"></div>
                {/* <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6"
                        width="1.8em"
                        height="1.8em"
                        viewBox="0 0 20 20"
                    >
                        <g fill="currentColor">
                            <path d="M9.781 1.698c4.323 2.937 6.469 5.064 6.469 6.606c0 1.492-.82 2.7-2.396 3.583c-.436.245-.922-.232-.685-.672c.407-.758.273-1.607-.461-2.617c-.774-1.065-1.89-1.84-3.365-2.328A.5.5 0 0 1 9 5.795V2.111a.5.5 0 0 1 .781-.413ZM7.75 17.75c-1.77 0-3.25-1.143-3.25-2.625S5.98 12.5 7.75 12.5S11 13.643 11 15.125S9.52 17.75 7.75 17.75Z"></path>
                            <path d="M10 4a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Z"></path>
                        </g>
                    </svg>
                    <button
                        className="btn btn-sm"
                        onClick={() =>
                            (
                                document.getElementById("my_modal_1") as HTMLDialogElement
                            ).showModal()
                        }
                    >
                        {notes.filter(
                            (note) => Number(note.split("~")[1]) == frequency
                        )[0] || "Select a note"}
                    </button>


                </div> */}

            </div>
            <div className=" w-full lg:max-w-3xl mx-auto   ">
                <dialog
                    id="my_modal_1"
                    className="modal m-0 w-full lg:max-w-3xl mx-auto  "
                >
                    <div className="modal-box p-2 ">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <br />
                        <div className="grid lg:grid-cols-12 grid-cols-6  gap-1 pt-2 ">
                            {notes.map((note, index) => {
                                return (
                                    <button
                                        className={
                                            frequency == Number(note.split("~")[1])
                                                ? "bg-gray-300 dark:text-white dark:bg-gray-700 dark:border-cyan-200  rounded-lg text-center justify-center border"
                                                : "bg-gray-300 dark:text-white dark:bg-gray-700 rounded-lg text-center justify-center "
                                        }
                                        key={index}
                                        onClick={() =>
                                            setFrequency(parseInt(note.toString().split("~")[1]))
                                        }
                                    >
                                        <div className="font-bold text-sm">
                                            {note.split("~")[0]}
                                        </div>
                                        <div className="text-xs">~{note.split("~")[1]}</div>
                                    </button>
                                );
                            })}
                        </div>
                        {/* <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div> */}
                    </div>
                </dialog>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {" "}
                <button className={toneOscillatorType == "sine" ? "btn btn-lg flex flex-col justify-center items-center border border-gray-700" : "btn btn-lg flex flex-col justify-center items-center"} onClick={() =>
                    setToneOscillatorType("sine")
                } >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 256 256"
                    >
                        <path
                            fill="currentColor"
                            d="M239.24 131.4c-22 46.8-41.4 68.6-61.2 68.6c-25.1 0-40.73-33.32-57.28-68.6C107.7 103.56 92.9 72 78 72c-16.4 0-36.31 37.21-46.72 59.4a8 8 0 0 1-14.48-6.8C38.71 77.8 58.16 56 78 56c25.1 0 40.73 33.32 57.28 68.6C148.3 152.44 163.1 184 178 184c16.4 0 36.31-37.21 46.72-59.4a8 8 0 0 1 14.48 6.8Z"
                        ></path>
                    </svg>
                    <div>Sine</div>
                </button>
                <button className={toneOscillatorType == "square" ? "btn btn-lg flex flex-col justify-center items-center border border-gray-700" : "btn btn-lg flex flex-col justify-center items-center"} onClick={() =>
                    setToneOscillatorType("square")
                }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M2 2v10h2V4h7v18h11V12h-2v8h-7V2H2Z"
                        ></path>
                    </svg>{" "}
                    <div>Square</div>
                </button>
                <button className={toneOscillatorType == "triangle" ? "btn btn-lg flex flex-col justify-center items-center border border-gray-700" : "btn btn-lg flex flex-col justify-center items-center"} onClick={() =>
                    setToneOscillatorType("triangle")
                }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 256 256"
                    >
                        <path
                            fill="currentColor"
                            d="m238.48 132.68l-52 72a8 8 0 0 1-13 0L76 69.66l-45.51 63a8 8 0 1 1-13-9.36l52-72a8 8 0 0 1 13 0l97.51 135l45.51-63a8 8 0 1 1 13 9.36Z"
                        ></path>
                    </svg>
                    <div>Triangle</div>
                </button>
                <button className={toneOscillatorType == "sawtooth" ? "btn btn-lg flex flex-col justify-center items-center border border-gray-700" : "btn btn-lg flex flex-col justify-center items-center"} onClick={() =>
                    setToneOscillatorType("sawtooth")
                }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 256 256"
                    >
                        <path
                            fill="currentColor"
                            d="m236.19 134.81l-104 64A8 8 0 0 1 120 192V78.32l-91.81 56.49a8 8 0 0 1-8.38-13.62l104-64A8 8 0 0 1 136 64v113.68l91.81-56.49a8 8 0 0 1 8.38 13.62Z"
                        ></path>
                    </svg>
                    <div>Sawtooth</div>{" "}
                </button>
            </div>


        </div>
    );
}
