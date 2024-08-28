import React from 'react'
import SvgComponent from './SvgComponent'
import Image from 'next/image'

const AtributeIcon = ({icon,className}) => {
    const {extension,url}=icon
    console.log(extension)
    
    if(extension==='svg'){
        return <SvgComponent url={`/uploads/${url}`} className={`fill-copy size-12 ${className}`} />
    }else{
        return <Image width={40} height={40} className={className} url={`/uploads/${url}`} />
    }
}

export default AtributeIcon