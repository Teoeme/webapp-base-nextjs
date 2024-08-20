import {checkUserRole} from '../../../../api/auth/sessionUtils'
import { redirect } from 'next/navigation'
const layout = async ({children}) => {
    
    let authorized=await checkUserRole(['SUPERADMIN_ROLE'])
    if(!authorized){
        redirect('/login')
    }
    
  return (
        children
  )
}

export default layout