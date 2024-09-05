'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import Image from 'next/image'

interface DataCard {
    coverUrl: string,
    title: string,
    description?: string,
    marca?: string,
    año?: string,
    combustible?: string,
    kilometros?: string,
    precio?: number,
    moneda?: string

}

interface MazoDeCartasProps {
    data: DataCard[]
}

const MazoDeCartas = ({ data }: MazoDeCartasProps) => {
    const [currentCard, setCurrentCard] = useState(0);
    // const [controlsArray, setControlsArray] = useState([]);
    const containerRef = useRef(null)

    const controlsArray = data?.map(() => useAnimation());
    // setControlsArray(controls)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('touchmove', preventScroll, { passive: false });
        }
    }, []);



    const preventScroll = (e) => {
        e.preventDefault();
    };

    return (
        <div className=' bg-transparent w-full overflow-hidden min-h-[70vh] relative' ref={containerRef}>

            {data?.map((el, idx) => {
                const cardIndex = Math.abs(currentCard - idx)

                const handleDragEnd = (e, info) => {

                    let newIndex = currentCard

                    if (idx === currentCard) {
                        if (currentCard < data?.length - 1) {
                            newIndex = currentCard + 1
                            setCurrentCard((pv) => pv + 1);
                        } else {
                            newIndex = 0
                            setCurrentCard(0)
                        }
                    }


                    controlsArray.forEach((controls, i) => {
                        const cardIndex = (i - newIndex + data?.length) % data?.length
                        controls.start({
                            x: `${-50 + 6 * (cardIndex - Math.round((data.length - 1) / 2))}%`,
                            left: '50%',
                            rotate: `${4 * (cardIndex - Math.round((data.length - 1) / 2))}deg`,
                            zIndex: data?.length - cardIndex,
                            transition: { type: "spring", stiffness: 500, damping: 30 },
                        });
                    })

                }

                return (
                    <motion.div className='  bg-copy/10 min-h-[60vh] absolute w-[65vw] flex flex-col items-center gap-6 p-4 pt-8 pb-10 backdrop-blur-md border border-white/10  shadow-[inset_4px_4px_17px_-10px_rgb(var(--color-copy))]'
                        drag='x'
                        onTouchMove={(e) => { e.preventDefault() }}
                        onDragEnd={handleDragEnd}
                        initial={{
                            top: '50%',
                            x: `${-50 + 6 * (idx - Math.round((data.length - 1) / 2))}%`,
                            y: '-50%',
                            left: '50%'
                        }}
                        animate={controlsArray[idx]}
                        dragElastic={0.7}
                        style={{
                            rotate: `${4 * (idx - Math.round((data.length - 1) / 2))}deg`,
                            left: '50%',
                            x: `${-50 + 6 * (idx - Math.round((data.length - 1) / 2))}%`,
                            zIndex: data?.length - cardIndex,
                        }}
                    >
                        <div className=' flex flex-col items-center gap-0 w-full'>
                            <p className=' text-copy text-2xl font-semibold uppercase'>
                                {el?.marca}
                            </p>
                            <p className=' text-copy text-lg uppercase'>
                                {el?.title}
                            </p>
                        </div>
                        {el?.coverUrl && <Image width={120} height={120} src={`/uploads/${el?.coverUrl}`} alt={`Imagen-${el.title}`} className=' rounded-full w-[60%] aspect-square opacity  object-cover' quality={80} />}
                        <div className=' flex gap-1 font-semibold text-copy uppercase'>
                            <p>{el.kilometros} km</p> | <p>{el.año}</p> | <p>{el.combustible}</p>
                        </div>
                        <p className=' text-xl font-semibold '>{el?.precio} {el?.moneda}</p>
                    </motion.div>
                )
            })}
        </div>

    )
}

export default MazoDeCartas