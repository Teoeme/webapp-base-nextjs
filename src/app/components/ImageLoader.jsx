import  NextImage from 'next/image';
import React, { useState, useEffect } from 'react';

const ImageLoader = ({ srcBase, alt,width=900,height=900,quality=90,className }) => {
    const [src, setSrc] = useState('/uploads/assets');

    useEffect(() => {
        const extensions = ['jpg', 'png', 'webp'];
        let loaded = false;

        extensions.forEach(ext => {
            const img = new Image();
            img.onload = () => {
                if (!loaded) {
                    setSrc(`${srcBase}.${ext}`);
                    loaded = true;
                }
            };
            img.src = `${srcBase}.${ext}`;
        });
    }, [srcBase]);
    return (
        <NextImage src={src} alt={alt} width={width} height={height} quality={quality} className={className} />
    );
};

export default ImageLoader;
