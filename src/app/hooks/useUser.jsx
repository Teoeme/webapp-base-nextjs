'use client'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

const useUser = () => {
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data, mutate } = useSWR('/users', getUsers)

    useEffect(() => {
        if (data) {
            setUsersList(data.data)
        }
    }, [data]);

    async function newUser(form) {
        try {
            setLoading(true)
            let res = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify(form)
            }).then(async res => {
                return await res.json()
            })
            await mutate()
            setLoading(false)

            return res
        } catch (error) {
            console.log(error)
        }

    }
    async function updateUser(form) {
        try {
            setLoading(true)

            let res = await fetch('/api/user', {
                method: 'PUT',
                body: JSON.stringify(form)
            }).then(async res => {
                return await res.json()
            })
            await mutate()
            setLoading(false)

            return res
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async function getUsers() {
        try {
            let res = await fetch('/api/user', {
                method: 'GET',
            }).then(async res => {
                if (res.ok) {
                    let data = await res.json()
                    return data
                }

            })
            return res
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteUser(id) {
        try {
            setLoading(true)

            let res = await fetch(`/api/user`, {
                method: 'DELETE',
                body: JSON.stringify({ id })
            }).then(async res => {
                let data = await res.json()
                return data
            })
            await mutate()
            setLoading(false)

            return res
        } catch (error) {
            console.log(error)
        }

    }

    async function recoverPassword(email){
     try {
        setLoading(true)
        let res=await fetch('/api/user/recovery',{
            method:"POST",
            body:JSON.stringify({email})
        }).then(async res => {
            let data = await res.json()
            return data
        })
        return res
     } catch (error) {
        console.log(error,'Error al recuperar password')
     } finally{
        setLoading(false)
     }
    }



    return {
        newUser, getUsers, usersList, updateUser, deleteUser, loading,recoverPassword
    }
}

export default useUser