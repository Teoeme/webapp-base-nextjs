'use client'
import { createTheme, Experimental_CssVarsProvider, experimental_extendTheme, recomposeColor, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import useColorMode from '../hooks/useColorMode';


const Providers = ({children,palette,colorMode}) => {
let theme=createTheme()
const {}=useColorMode()

  if(palette){
theme=createTheme({
    palette:{
      mode:colorMode,
      primary:{
        main:recomposeColor({type:'rgb', values:palette[colorMode]?.['primary'].split(' ')}),
        light:recomposeColor({type:'rgb', values:palette[colorMode]?.['primaryLight'].split(' ')}),
        dark:recomposeColor({type:'rgb', values:palette[colorMode]?.['primaryDark'].split(' ')}),
        contrastText:recomposeColor({type:'rgb', values:palette[colorMode]?.['primaryContent'].split(' ')}),
      },
      secondary:{
        main:recomposeColor({type:'rgb', values:palette[colorMode]?.['secondary'].split(' ')}),
        light:recomposeColor({type:'rgb', values:palette[colorMode]?.['secondaryLight'].split(' ')}),
        dark:recomposeColor({type:'rgb', values:palette[colorMode]?.['secondaryDark'].split(' ')}),
        contrastText:recomposeColor({type:'rgb', values:palette[colorMode]?.['secondaryContent'].split(' ')}),
      },
      success:{
        main:recomposeColor({type:'rgb', values:palette[colorMode]?.['success'].split(' ')}),
        contrastText:recomposeColor({type:'rgb', values:palette[colorMode]?.['successContent'].split(' ')}),
      },
      warning:{
        main:recomposeColor({type:'rgb', values:palette[colorMode]?.['warning'].split(' ')}),
        contrastText:recomposeColor({type:'rgb', values:palette[colorMode]?.['warningContent'].split(' ')}),
      },
      error:{
        main:recomposeColor({type:'rgb', values:palette[colorMode]?.['error'].split(' ')}),
        contrastText:recomposeColor({type:'rgb', values:palette[colorMode]?.['errorContent'].split(' ')}),
      },
      background:{
        default:recomposeColor({type:'rgb', values:palette[colorMode]?.['background'].split(' ')}),
        paper:recomposeColor({type:'rgb', values:palette[colorMode]?.['background'].split(' ')}),
      },
    },
    typography:{
      fontFamily:[
        'var(--font-main)','var(--font-secondary)'
      ].join(','),
      fontSize:12
    }
    
  })
}

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
      <ConfirmProvider>
      <SnackbarProvider  anchorOrigin={{horizontal:'left',vertical:'top'}} autoHideDuration={3500}/>
        {children}
      </ConfirmProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers