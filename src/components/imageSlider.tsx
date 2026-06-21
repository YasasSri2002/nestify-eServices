'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';



export default function ImageSlider({
    images, interval = 3000, }: { images: string[], interval?: number }) {

    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused || images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [isPaused, images.length, interval]);

    return (
        <div
            className="relative overflow-hidden rounded-3xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative min-w-full h-[400px]"
                    >
                        <Image
                            src={image}
                            alt={`slide-${index}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 w-2 rounded-full transition-all ${current === index
                            ? 'bg-white w-6'
                            : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}