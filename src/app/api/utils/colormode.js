const { cookies } = require("next/headers")


const getAutoColorMode = (clientTime) => {
    const hour = new Date(clientTime).getHours();
    return hour >= 9 && hour < 20 ? 'light' : 'dark';
  };




export function getColorMode(){
    const cookiesStore=cookies()
    const colorCookie=cookiesStore.get('color-mode')?.value
    const clientTime=cookiesStore.get('client-time')?.value
    const autoMode=cookiesStore.get('color-mode-auto')?.value
    return autoMode==='true' ? getAutoColorMode(clientTime) : colorCookie
}

