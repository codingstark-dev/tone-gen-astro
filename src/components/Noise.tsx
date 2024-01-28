import React from 'react';
import * as Tone from 'tone';

const Noise = () => {
    const [noise, setNoise] = React.useState<Tone.Noise | null>(null);
    const [noiseType, setNoiseType] = React.useState<'white' | 'pink' | 'brown' | "none">('none'); // ['white', 'pink', 'brown'

    const generateWhiteNoise = () => {
        if (noise) {
            noise.stop();
        }
        if (noiseType === 'white') {
            stopNoise()
        } else {
            const newNoise = new Tone.Noise('white').toDestination();
            newNoise.start();
            setNoiseType('white');
            setNoise(newNoise);
        }


    };

    const generatePinkNoise = () => {
        if (noise) {
            noise.stop();
        }

        if (noiseType === 'pink') {
            stopNoise()
        } else {
            const newNoise = new Tone.Noise('pink').toDestination();
            setNoiseType('pink');
            newNoise.start();
            setNoise(newNoise);
        }

    };

    const generateBrownNoise = () => {
        if (noise) {
            noise.stop();
        }
        if (noiseType === 'brown') {
            stopNoise()
        } else {
            const newNoise = new Tone.Noise('brown').toDestination();
            setNoiseType('brown');
            newNoise.start();
            setNoise(newNoise);
        }


    };

    const stopNoise = () => {
        if (noise) {
            noise.stop();
            setNoiseType('none');
            setNoise(null);
        }
    };

    return (
        <div className='grid grid-cols-1 gap-4 items-center justify-center text-center '>
            <div>
                <button className='btn-square btn btn-wide font-bold' onClick={generateWhiteNoise}>White Noise {
                    noiseType === 'white' ? <span className='text-green-500 font-extrabold'>ON</span> : <span className='text-red-500 font-extrabold'>OFF</span>
                }</button></div>
            <div>
                <button className='btn-square btn btn-wide bg-pink-400 text-white  font-bold' onClick={generatePinkNoise}>Pink Noise
                    {noiseType === 'pink' ? <span className='text-green-500 font-extrabold'>ON</span> : <span className='text-white font-extrabold'>OFF</span>}
                </button></div>
            <div><button className='btn-square btn btn-wide font-bold bg-red-950 text-white' onClick={generateBrownNoise}>Brown Noise
                {noiseType === 'brown' ? <span className='text-green-500 font-extrabold'>ON</span> : <span className='text-red-500 font-extrabold'>OFF</span>}
            </button></div>
            {/* <div> <button className='btn-square btn btn-wide font-bold bg-red-500 text-white' onClick={stopNoise}>Stop Noise</button></div> */}
        </div>
    );
};

export default Noise;
