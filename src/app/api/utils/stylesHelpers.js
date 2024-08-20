const { default: ConfiguracionModel } = require("@/app/models/configuracion");
const { connectToMainDB } = require("./database");

function generateColorTones(baseColor, colorName, numExposures, minExposure = -100, maxExposure = 100) {
    const colors = {};
    const hexToInt = (hex) => parseInt(hex, 16);
  
    // Convertir el color base a valores HSL
    const hslBase = rgbToHsl(
      hexToInt(baseColor.slice(1, 3)),
      hexToInt(baseColor.slice(3, 5)),
      hexToInt(baseColor.slice(5, 7))
    );
  
  
    for (let i = 1; i <= numExposures; i++) {
      const exposure = (i * (maxExposure - minExposure) / (numExposures - 1)) + minExposure;
      const lightness = hslBase[2] + exposure;
      const newColor = `hsl(${hslBase[0]}, ${hslBase[1]}%, ${lightness}%)`;
      colors[`${(numExposures * 100)-(i * 100)}`] = newColor;
    }
    colors[`0`] = baseColor;
  
    return colors;
  }
  
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  
  }
  
  // Obtener los colores desde la base de datos (esto puede ser asíncrono)
// const primaryColor = getColorsFromDatabase('primary');
// const secondaryColor = getColorsFromDatabase('secondary');
// const terciaryColor = getColorsFromDatabase('terciary');

async function getPaletteFromDb(){
  console.log('Obteniendo colores de BBDD')
  await connectToMainDB()
  const colorConfig=await ConfiguracionModel.findOne({name:"palette"})
  const palette=colorConfig?.value
  console.log(palette,'PALETTE')
return palette
}
  
const primaryColor = '#C97C29';
const secondaryColor = '#865642';
const terciaryColor = '#9d9a36';
const whiteColor = '#fff';

const primaryPalette =generateColorTones(primaryColor,'primary',8,-50,50)
const secondaryPalette =generateColorTones(secondaryColor,'secondary',8,-50,50)
const terciaryPalette =generateColorTones(terciaryColor,'terciary',8,-50,50)
const whitePalette =generateColorTones(whiteColor,'terciary',8,-50,50)

module.exports = {
  generateColorTones,
  primaryColor,
getPaletteFromDb
  };