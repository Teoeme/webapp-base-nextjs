'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Contador = ({ valorNumerico,className,lastTestClassName,fontSize=24 }) => {
    const FONT_SIZE = fontSize
    const FONT_RELACION_ASPECTO = 1.5
    const COLUMNAS_DE_NUMEROS = 4

    const [values, setValues] = useState({number:'0',first:null,last:null});

    const patt = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
    let result = [...patt.exec(valorNumerico)];

    result.shift();
    result = result.filter(res => res != null);

    useEffect(() => {
        const newValues = {number:'0',first:null,last:null}
        let isFirst = true
        result?.forEach((res:string, idx) => {
            if (isNaN(Number(res))) {
                if (isFirst) {
                    newValues['first'] = res
                    isFirst = false
                } else {
                    newValues['last'] = res
                }
            } else {
                isFirst = false
                newValues['number'] = res
            }
        })
        setValues(newValues)
    }, []);


    return (
        <div className={`w-full overflow-hidden flex items-center justify-center p-2  ${className}`}
        >
           
            <div className=' w-full max-w-[100vw] flex justify-center items-baseline  overflow-hidden'
            style={{
            height:FONT_SIZE * FONT_RELACION_ASPECTO

            }}
            >
                <p style={{fontSize:FONT_SIZE}}>
                {values?.first}
                </p>
                {values?.number?.split('')?.map((number, idx) => {

                    return (
                        <motion.div className='flex flex-col opacity-75 font-medium '
                            style={{
                                fontSize: FONT_SIZE,
                            }}
                            initial={{opacity:0.5}}

                            whileInView={{
                                y: (Number(number) + 1) * -FONT_SIZE * FONT_RELACION_ASPECTO + (3 * 10 * -FONT_SIZE * FONT_RELACION_ASPECTO),
                                opacity:1,
                                transition: {
                                    delay: (idx + 1) * 0.2,
                                    type: 'spring',
                                    stiffness: 25
                                }

                            }}
                        >
                            <span>-</span>

                            {Array.from({ length: COLUMNAS_DE_NUMEROS })?.map((col, num) => {

                                return (<>{Array.from({ length: 10 })?.map((digit, i) => {

                                    return (
                                        <p className='p-0 text-center'
                                        >{i}</p>
                                    )
                                })}
                                </>)

                            })}
                        </motion.div>
                    )

                })}
            </div>
                <p className={lastTestClassName}>
                {values?.last}
                </p>
        </div>
    )
}

export default Contador