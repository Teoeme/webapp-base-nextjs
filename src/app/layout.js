import { Inter,Urbanist } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import { Suspense } from "react";
import { getColorMode} from "../app/api/utils/colormode";
import Google from './components/Google/Google'
const inter = Inter({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"],variable:'--font-main' });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  async function loadPalette() {
    const palette = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/configuracion/palette`, { next: { tags: ['palette'] } }).then(res=>res.json()).then(res=>res.data)
    .catch(err=>{
      console.log(err)
      return {value:{}}
    })
    return(palette.value)
}

const palette=await loadPalette()
const colorMode=getColorMode()

  return (
    <html lang="en">
      <body className={`${inter.className} ${urbanist.variable} bg-foreground font-main text-copy`}>
       <style>{`
       :root {
        ${ Object.keys(palette?.[colorMode]).map(colorName => {
         return `--color-${colorName}:${palette?.[colorMode][colorName]}`
        }).join(';')}
      }
        `}</style>
      <Suspense fallback={<div>Loading...</div>}>
      <Google />
        <Providers palette={palette} colorMode={colorMode} >
        {children}
        </Providers>
      </Suspense>
        </body>
    </html>
  );
}
