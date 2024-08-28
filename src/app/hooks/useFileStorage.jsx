'use client'
import React, { useState } from 'react'

const useFileStorage = () => {
const [loading, setLoading] = useState(false);
    /**
     *  Subir archivos al localstorage
     *
     * @param {Object} assets - Archivo a subir
     * @param {String} [assets.name] - Nombre del archivo
     * @param {File} [assets.file] - Nombre del archivo
     * @param {String} folder = Carpeta donde se subirá
     */
    const uploadAsset = async (assets, folder) => {
        const formData = new FormData()
        let assetsFiles = []
        let assetsNames = []
        for (let i = 0; i < assets.length; i++) {
            const asset = assets[i];
            assetsFiles.push(asset.file)
            formData.append('images', asset.file)
            formData.append(`cover`, asset?.cover === true);

            assetsNames.push(asset?.name)
        }

        formData.append('names', assetsNames)

        let res = await fetch(`/api/media/${folder}`, {
            method: "POST",
            body: formData
        }).then(async res => await res.json())
        return res
    }


    /**
  *  Subir archivos al localstorage
  *
  * @param {Object} assets - Archivos a eliminar
  * @param {String} [assets.asset_id] - Nombre del archivo
  * @param {String} [assets.extension] - Nombre del archivo
  * @param {String} folder = Carpeta donde se encuentran los archivos
  */
    const deleteAsset = async (assets, folder) => {
        let files = []
        for (let i = 0; i < assets.length; i++) {
            const asset = assets[i];
            files.push(`${asset?.asset_id}.${asset?.extension}`)
        }

        let res = await fetch(`/api/media/${folder}`, {
            method: "DELETE",
            body: JSON.stringify({ files })
        }).then(async res => await res.json())
        return res
    }

    async function updateImages(images, folder) {
        setLoading(true)
        if(!images?.length>0){
            setLoading(false)
            console.log('No hay imagenes')
            return 
            throw new Error("Debe enviar al menos 1 imágen")
        }
        if(!folder){
            setLoading(false)
            throw new Error("Debe especificar la carpeta donde actualizar las imágenes")
        }

        let imagesToAdd = []
        let imagesToDelete = []
        for (let idx = 0; idx < images.length; idx++) {
            const img = images[idx];
            if (img?.delete) {
                imagesToDelete.push(img)
            } else {
                if (img?.isNew) {
                    imagesToAdd.push({ file: img.file, name: img?.name,cover:img?.cover })
                }
            }
        }

        const deleteRes = await deleteAsset(imagesToDelete, folder)

        let originalImages = images?.filter(el => !el.delete && !el.isNew)
        const res = await uploadAsset(imagesToAdd, folder)
        const uploadedImages = res?.data
        
        const newImagesArray = originalImages.concat(uploadedImages?.length>0 ? uploadedImages : [])
        setLoading(false)
        return newImagesArray
    }


return { uploadAsset, deleteAsset,updateImages,loading }
}

export default useFileStorage