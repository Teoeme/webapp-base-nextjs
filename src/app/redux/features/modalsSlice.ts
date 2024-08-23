import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ModalState {
    [modalName:string] : {
        isOpen:boolean,
        data:any
    }
}

const initialState={}

const modalsSlice= createSlice({
    name:'modals',
    initialState,
    reducers:{
        openModal: (state, action: PayloadAction<{ modalName: string; data?: any }>) => {
            const { modalName, data } = action.payload;
            state[modalName] = { isOpen: true, data };
          },
        closeModal: (state, action: PayloadAction<{modalName:string,clean:boolean}>) => {
            const {modalName,clean} = action.payload;
            if (state[modalName]) {
              state[modalName].isOpen = false;
              if(clean){
                  state[modalName].data = null;
                }
            }
          },
          setData: (state, action: PayloadAction<{ modalName: string; updater: any }>) => {
            const { modalName, updater } = action.payload;
            if (state[modalName]) {
              const currentData = state[modalName].data;
              state[modalName].data = typeof updater === 'function' ? updater(currentData) : updater;
            }
          },
      
    }
})

export const {openModal,closeModal,setData}=modalsSlice.actions
export default modalsSlice.reducer