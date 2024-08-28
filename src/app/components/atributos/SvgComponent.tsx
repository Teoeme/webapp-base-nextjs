'use client'
import React, { useEffect, useState } from 'react';

 const SvgComponent = ({ url, color,className }) => {
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.text())
      .then(svgData => {
        setSvg(svgData.replace(/fill=".*?"/g, `fill="${color}"`));  // Reemplaza el color de relleno
      });
  }, [url, color]);

  return (
    <div dangerouslySetInnerHTML={{ __html: svg }} className={className}  />
  );
};

export default SvgComponent