'use client'
'use client'
import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';

interface BandaAutomaticaProps{
    children:ReactNode,
    direction?:'left' | 'right',
    speed?:number,
    className?:string,
    padding?:number
}

const BandaAutomatica = ({ children, direction = 'left', speed = 100,className,padding=8 }:BandaAutomaticaProps) => {
    const containerRef = useRef(null);
    const [itemWidth, setItemWidth] = useState(0);
    const [repeatCount, setRepeatCount] = useState(1);

    useEffect(() => {
        let totalChildrensWidth = 0

        if (containerRef?.current && containerRef?.current?.children?.length > 0) {
            const child = containerRef?.current?.children?.[0]?.children?.length

            Array.from({ length: child })?.forEach((e, idx) => {
                const ch = containerRef?.current?.children?.[0]?.children?.[idx]
                console.log(ch?.clientWidth)
                totalChildrensWidth += ch?.clientWidth
            })
            console.log(totalChildrensWidth + (padding * (child - 1)),'items width')
            setItemWidth(totalChildrensWidth + (padding * (child -1)))
        }
        console.log(totalChildrensWidth, containerRef?.current?.clientWidth / totalChildrensWidth,'veces en el total',containerRef?.current?.clientWidth)
        const repeats = Math.ceil(containerRef?.current?.clientWidth / totalChildrensWidth)
        setRepeatCount(repeats)



    }, []);


    const xTranslation = useMotionValue(0)
    const totalWidth = repeatCount * itemWidth * 2 + 8
    console.log(totalWidth,repeatCount,itemWidth,8 * (repeatCount * 2 + 1))

    useEffect(() => {

        let controls = animate(xTranslation, direction==='left' ?[8 * (repeatCount * 2 + 1), -totalWidth / 2 - 8 ] : [-totalWidth/2 - repeatCount * padding + 5,0], {
            ease: 'linear',
            duration: totalWidth / speed,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0
        })

        return controls.stop
    }, [xTranslation, totalWidth]);

    return (
        <div 
         ref={containerRef}
        className={`flex gap-2 overflow-hidden w-full  flex-nowrap  bg-foreground py-2 border-y-4 border-border relative ${className}`}>

            <motion.div
                className=' w-max  flex gap-2 flex-nowrap '
               
                style={{
                    x: xTranslation
                }}
            >
                {Array.from({ length: repeatCount }).map((_, index) => {
                    return <div className='flex gap-2 w-max' key={`b1-element-${index}`}>{children}</div>
                })}
            </motion.div>

            <motion.div
                style={{
                    x: xTranslation
                }}
                className=' w-max flex gap-2 flex-nowrap '
            >
                {Array.from({ length: repeatCount }).map((_, index) => {
                    return <div className='flex gap-2' key={`b2-element-${index}`}>{children}</div>
                })}
            </motion.div>
        </div>

    )

};

export default BandaAutomatica;

