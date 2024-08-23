'use client'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const useCRUD = (endpoint: string,validation:(doc:any)=>boolean) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data, mutate } = useSWR(endpoint, getAllDocuments)

  useEffect(() => {
    if(data){
      setListData(data)
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

  async function addDocument(payload:any,validation:(payload:any)=>boolean){
    if (!validation(payload)) {
      throw new Error('Estructura de documento inválida');
    }
    
    let res=fetch(`api/${endpoint}`,{
      method:'POST',
      body:JSON.stringify(payload)
    })
    .then(res=>{
      if(res?.ok){
        return res.json()
      }
    })
    return res
  }
  


  return {
listData,
getAllDocuments,
mutate,
loading,
setLoading,
addDocument
  }
}

export default useCRUD