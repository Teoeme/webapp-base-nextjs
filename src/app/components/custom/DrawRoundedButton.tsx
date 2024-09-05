import React, { useEffect, useRef, useState } from 'react'

const DrawRoundedButton = ({
    children,
    ...rest
  }: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => {
    const buttonRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hover, setHover] = useState(false);
  
    useEffect(() => {
      if (buttonRef.current) {
        const { width, height } = buttonRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        console.log(width,height,height/2)
      }
    }, [children]); // Dependencia en children por si afecta el tamaño del botón
  
    // Calculando el radio basado en la altura del botón
    const radius = dimensions.height / 2;
    const PADDING_X=10
    const PADDING_Y=10
    return (
      <button
        ref={buttonRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative rounded-full overflow-hidden bg-slate-800 text-white font-medium flex items-center justify-center"
        style={{ width: 'auto', height: 'auto', padding:`${PADDING_Y}px ${PADDING_X}px`}}
      >
        {children}
        <svg
          className="absolute inset-0 w-full h-full "
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          <path
            d={`
              M ${radius},0
              h ${dimensions.width - 2 * radius}
              a ${radius},${radius} 0 0 1 0,${dimensions.height}
              h -${dimensions.width - 2 * radius}
              a ${radius},${radius} 0 0 1 0,-${dimensions.height}
            `}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-orange-600"
            strokeDasharray="1"
            strokeDashoffset={hover ? "0" : dimensions.width + 2 * Math.PI * radius}
            style={{ transition: 'stroke-dashoffset 0.5s ease-out', strokeDasharray: dimensions.width + 2 * Math.PI * radius }}
          />
          {/* <path
            d={`
              M ${PADDING_X},0
              h ${dimensions.width - 2 * PADDING_X }
              a ${PADDING_X},${radius} 0 1 1 0 ${dimensions.height}
              h -${dimensions.width - PADDING_X * 2 }
              a ${PADDING_X},${radius} 0 0 1 0,-${dimensions.height} 
              `}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-orange-600"
            strokeDasharray="1"
            strokeDashoffset='1'
            style={{ transition: 'stroke-dashoffset 0.5s ease-out', strokeDasharray: dimensions.width + 2 * PADDING_X + 2 * Math.PI * PADDING_X }}
          /> */}
        </svg>
      </button>)
  };
  

export default DrawRoundedButton