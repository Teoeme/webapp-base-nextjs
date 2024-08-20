
import React from 'react'
import {GoogleTagManager} from '@next/third-parties/google'

const Google = () => {
    const GA_TRACKING_ID = process.env.NEXT_PUBLIC_ID_ANALYTICS
    return (
       <GoogleTagManager gtmId={GA_TRACKING_ID} />
    )


}

export default Google