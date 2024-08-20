import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie'; // Importar js-cookie
import { useRouter } from 'next/navigation';

const useColorMode = () => {
  const [colorMode, setColorModeState] = useState('light');
  const router=useRouter()
  // Función para determinar el modo basado en la hora
  const getAutoColorMode = () => {
    const hour = new Date().getHours();
    return hour >= 9 && hour < 20 ? 'light' : 'dark';
  };

  // Función para obtener el modo desde cookies o establecerlo si es auto
  const getColorMode = useCallback(() => {
    const storedMode = Cookies.get('color-mode');
    const isAuto = Cookies.get('color-mode-auto')==='true';
    Cookies.set('client-time', new Date().toISOString(), { expires: 7 }); 

    if (storedMode) {
      return isAuto ? getAutoColorMode() : storedMode;
    } else {
      const autoMode = getAutoColorMode();
      Cookies.set('color-mode', autoMode, { expires: 7 }); // Establece la cookie con una caducidad de 7 días
      Cookies.set('color-mode-auto', true, { expires: 7 }); // Establece la cookie con una caducidad de 7 días
      return autoMode;
    }
  }, []);

  // Función para cambiar el modo de color
  const setColorMode = useCallback((mode) => {
    console.log(mode)
    if(mode==='auto'){
      Cookies.set('color-mode-auto', true, { expires: 7 }); 
    }else{
      Cookies.set('color-mode-auto', false, { expires: 7 }); 
      console.log('APAGANDO AUTO MODE')
    }

    const newMode=mode === 'auto' ? getAutoColorMode() : mode
    Cookies.set('client-time', new Date().toISOString(), { expires: 7 }); 
    Cookies.set('color-mode', newMode, { expires: 7 }); 
    setColorModeState(newMode);
    console.log('cambiando color mode a ',newMode)
    router.refresh()
  }, []);

  // Función para alternar entre los modos light y dark
  const toggleColorMode = useCallback(() => {
    console.log('toggle color mode')
    const newMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newMode);
  }, [colorMode, setColorMode]);

  // Inicializar el modo de color al montar el componente
  useEffect(() => {
    const initialMode = getColorMode();
    Cookies.set('color-mode', initialMode, { expires: 7 }); 

    setColorModeState(initialMode);
  }, [getColorMode]);

  return { colorMode, getColorMode, toggleColorMode, setColorMode };
};

export default useColorMode;
