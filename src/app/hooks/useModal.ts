import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { closeModal, openModal, setData } from '../redux/features/modalsSlice'

const useModal = (modalName:string) => {
    const dispatch=useDispatch()
    const modalState=useSelector((state:RootState)=>state.modals[modalName]) || {isOpen:false}

    const open=(data:any)=>{
        dispatch(openModal({modalName,data}))
    }

    const close=(clean:boolean=false)=>{
        dispatch(closeModal({modalName,clean}))
    }

    const updateData=(updater:any)=>{
        dispatch(setData({modalName,updater}))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateData({
            ...modalState?.['data'],
            [name]: value,
          });
      };

    

    return {
        isOpen:modalState.isOpen,
        data:modalState.data,
        open,
        close,
        setData:updateData,
        handleChange
  }
}

export default useModal