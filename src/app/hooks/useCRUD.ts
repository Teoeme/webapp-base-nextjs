'use client'
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import useModal from './useModal';

const useCRUD = (endpoint: string) => {
  // const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const{data:listData,setData:setListData}=useModal(endpoint)
  const { data, mutate } = useSWR(endpoint, getAllDocuments)

  useEffect(() => {
    if(data){
      setListData(data.data)
    }
  }, [data]);

  async function getAllDocuments() {
    let res=fetch(`/api/${endpoint}`,{
      method:"GET"
    })
    .then(res=>{
      if(res.ok){
        return res.json()
      }
    })

    return res
  }

  async function addDocument(payload:any,validation:(payload:any)=>boolean,showtoast:boolean=false){
    if (!validation(payload)) {
      throw new Error('Estructura de documento inválida');
    }
    setLoading(true)
    let res=fetch(`api/${endpoint}`,{
      method:'POST',
      body:JSON.stringify(payload)
    })
    .then(res=>{
      if(res?.ok){
        mutate()
        return res.json()
      }else{
        return res.json().then(data=>{throw new Error(data?.message || `Error al agregar documento`)})
      }
    })
    .then(res=>{
      if(showtoast){enqueueSnackbar(res?.message||'Éxito',{variant:'success'})}
      return res
    })
    .catch(err=>{
      console.log(err,"Error al agregar el doc")
      if(showtoast){enqueueSnackbar(err.message,{variant:'warning'})}
      return {message:err.message,ok:false}
    })
    .finally(()=>setLoading(false))

    return res
  }
  
  async function updateDocument(payload:any,validation:(payload:any)=>boolean,showtoast:boolean=false){
    if (!validation(payload)) {
      throw new Error('Estructura de documento inválida');
    }
    setLoading(true)
    
    let res=fetch(`api/${endpoint}`,{
      method:'PUT',
      body:JSON.stringify(payload)
    })
    .then(res=>{
      if(res?.ok){
        mutate()
        return res.json()
      }else{
        return res.json().then(data=>{throw new Error(data?.message || `Error al editar documento`)})
      }
    })
    .then(res=>{
      if(showtoast){enqueueSnackbar(res?.message||'Éxito',{variant:'success'})}
      return res
    })
    .catch(err=>{
      console.log(err,"Error al editar el doc")
      if(showtoast){enqueueSnackbar(err.message,{variant:'warning'})}
      return {message:err.message,ok:false}
    })
    .finally(()=>setLoading(false))

    return res
  }
  
  async function deleteDocument(payload:any,validation:(payload:any)=>boolean,showtoast:boolean=false){
    if (!validation(payload)) {
      throw new Error('Estructura de documento inválida');
    }
    setLoading(true)
    
    let res=fetch(`api/${endpoint}`,{
      method:'DELETE',
      body:JSON.stringify(payload)
    })
    .then(res=>{
      if(res?.ok){
        mutate()
        return res.json()
      }else{
        return res.json().then(data=>{throw new Error(data?.message || `Error al eliminar documento`)})
      }
    })
    .then(res=>{
      if(showtoast){enqueueSnackbar(res?.message||'Éxito',{variant:'success'})}
      return res
    })
    .catch(err=>{
      console.log(err,"Error al eliminar el doc")
      if(showtoast){enqueueSnackbar(err.message,{variant:'warning'})}
      return {message:err.message,ok:false}
    })
    .finally(()=>setLoading(false))

    return res
  }



  return {
listData,
getAllDocuments,
mutate,
loading,
setLoading,
addDocument,
updateDocument,
deleteDocument
  }
}

export default useCRUD