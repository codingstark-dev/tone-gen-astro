
import { useEffect, useRef, useState } from "react";

export default function FixMySpeaker() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [context, setContext] = useState<AudioContext>();
    const source = context?.createBufferSource();
    const aduiRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        setContext(new AudioContext());
    }, [])
    const audioPlay = async (url: string) => {
        // const context = new AudioContext();

        if (source !== undefined && context) {
            const audioBuffer = await fetch(url)
                .then(res => res.arrayBuffer())
                .then(ArrayBuffer => context?.decodeAudioData(ArrayBuffer));

            source!.buffer = audioBuffer;
            const gainNode = context?.createGain();
            gainNode.gain.value = 1;
            source.connect(gainNode);
            source.loop = true;
            source.connect(context?.destination);
            source.start();
            setIsPlaying(true);
        }

    };
    const audioStop = async () => {
        // const context = new AudioContext();
        // const source = context?.createBufferSource();
        if (source && source.buffer) {

            source!.stop();
            setIsPlaying(false);
        }
    }
    return (
        <div className="max-w-2xl p-5 mx-auto text-center card rounded-lg bg-gray-50 m-4 dark:text-black">
            <div className="header"><h1>Fix My Speakers 🔊</h1><p>Eject 💦 water from your phone's speakers after getting it wet.</p></div>
            <div className="flex justify-center">
                <button className={isPlaying ? "btn btn-lg animate-pulse border border-gray-500" : "btn btn-lg border border-gray-500"} onClick={
                    () => {
                        if (isPlaying) {
                            if (aduiRef.current) {

                                aduiRef.current.volume = 0;
                                aduiRef.current?.pause();
                                setIsPlaying(false);
                            }
                        }
                        else {
                            if (aduiRef.current) {

                                aduiRef.current.volume = 1;
                                aduiRef.current?.play();
                                setIsPlaying(true);
                            }
                        }

                        // isPlaying ? audioStop() : audioPlay("/tone.mp3");
                    }
                }>
                    {
                        isPlaying ? "💨 💦" : "💨 💦"
                    }
                </button></div>
            <p>Click or tap the button above to activate blower</p>
            <audio src="/tone.mp3" ref={aduiRef} controls loop className="invisible "></audio>
        </div >
    );
}

