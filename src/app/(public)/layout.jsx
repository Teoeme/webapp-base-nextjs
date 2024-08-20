import React from 'react'
import GeneralNavbar from '../components/Navbars/GeneralNavbar'


const layout = ({children}) => {
  return (
    <div>
      <GeneralNavbar />
      {children}</div>
  )
}

export default layout   