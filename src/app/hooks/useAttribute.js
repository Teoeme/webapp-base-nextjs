import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react'
import useSWR from "swr"

export const useAttribute = (filterFunction = (e) => e) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [attributeList, setAttributeList] = useState([]);

  const getAllAttributes = async () => {
    const res = await fetch('/api/attribute', {
      method: 'GET',
    }).then(async res => {
      let data = await res.json()
      if (!res.ok) {
        const error = new Error(data.message)
        error.info = data
        error.status = res.status
        throw error
      } else {
        return data
      }
    })
    return res

  };



  const { data, error, isLoading, mutate } = useSWR('/api/attribute', getAllAttributes, {
    onErrorRetry: (error) => {
      if (error.status === 403) {
        return
      }
    }
  })

  useEffect(() => {
    let attributesData = data?.data?.filter(filterFunction) || []
    setAttributeList(attributesData)
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error)
    }
  }, [error]);

  const addAttribute = async (data) => {
    setLoading(true);
    const res = await fetch('/api/attribute', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(async res => {
      let data = await res.json()
      enqueueSnackbar(data?.message || '', { variant: res?.ok ? 'success' : 'error' })

      if (!res.ok) {
        return { message: data.message, error: true, ok: res?.ok }
      }
      await mutate()
      return data
    })
      .finally(() => {
        setLoading(false);
      })
    return res
  };

  const editAttribute = async (data) => {
    setLoading(true);
    const res = await fetch('/api/attribute', {
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(async res => {
      let data = await res?.json()
      enqueueSnackbar(data?.message || '', { variant: res?.ok ? 'success' : 'error' })
      if (!res.ok) {
        return { message: data.message, error: true }
      }
      await mutate()
      return data
    })
      .finally(() => {
        setLoading(false);
      })
    return res
  };

  const deleteAttribute = async (form) => {
    setLoading(true);
    const res = await fetch('/api/attribute', {
      method: 'DELETE',
      body: JSON.stringify(form)
    }).then(async res => {
      let data = await res?.json()
      if (!res.ok) {
        return { message: data.message, error: true }
      }
      return data
    })
      .finally(() => {
        setLoading(false);
        mutate()
      })
    return res
  };

  const handleSubmit = async (form) => {
    setLoading(true);
    const res = await fetch('/api/attribute', {
      method: form.Mode === 'Add' ? 'POST' : 'PUT',
      body: JSON.stringify(form)
    }).then(async res => {
      let data = await res.json()
      enqueueSnackbar(data?.message || '', { variant: res?.ok ? 'success' : 'error' })
      await mutate()

      return data
    })
      .finally(async () => {
        setLoading(false);
      })
    return res
  }

  const validateAttribute = (form) => {
    
  }


  return { errors, addAttribute, loading, attributeList, validateAttribute, isLoading, editAttribute, deleteAttribute, handleSubmit }
}
