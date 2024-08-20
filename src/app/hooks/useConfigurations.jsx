import { useState } from "react";
import useFileStorage from "./useFileStorage";

const useConfigurations = () => {
    const [loading, setLoading] = useState(false);
    const { uploadAsset,deleteAsset } = useFileStorage()


    async function getConfigByName(configName) {
        let res = await fetch(`/api/configuracion/${configName}`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            },
        })
            .then(async res => await res.json())
            .catch(err => err)


        return res
    }
    /**
     *  Update configuration if exists.
    *
    * @param {Object} config - Config object
    * @param {String} [config.name] - The name property. Must be present if _id is not provided.
    * @param {String} [config._id] - The _id property. Must be present if name is not provided.
    * @param {*} [config.value] - The value of configuration. Required
    * @param {String} [condifg.label] - Configuration human-readable name. Optional
    *
    * @throws {Error} Throws an error if neither `value`,`name` nor `_id` are provided.
    * @return {*} 
    */

    async function updateConfig(config) {
        if (!config.name && !config._id) {
            throw new Error('The config object must have either a name or _id property.');
        }
        if (!config.value) {
            throw new Error("Debe establecer un valor para la configuración")
        }

        setLoading(true)
        let res = await fetch(`/api/configuracion`, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(config)
        })
            .then(async res => await res.json())
            .catch(err => err)
            .finally(setLoading(false))

        return res
    }


    /**
     * Obtener todas las configuraciones desde la base de datos, requiere estar autenticado.
     *
     * @return {Array<{name: string, value: any, label: string, description: string,protected:boolean,type:string,group:string}>} - Lista de configuraciones 
     */

    async function getAllConfigs() {
        let res = await fetch(`/api/configuracion`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then(async res => await res.json())
            .catch(err => err)

        return res
    }


    async function updateImagesConfig(config,folder='assets'){
        const {name,type,value}=config
        console.log('UPDATE IMAGES config',name,type)

        let imagesToAdd=[]
        let imagesToDelete=[]
        for (let idx = 0; idx < value.length; idx++) {
            const img = value[idx];
            if (img?.delete) {
                imagesToDelete.push(img)
            } else {
              if (img?.isNew) {
                imagesToAdd.push({ file: img.file, name: img?.name })
              }
            }
          }
          
          
          const deleteRes=await deleteAsset(imagesToDelete,folder)
          const deletedImages=deleteRes

          let newValueConfig=value?.filter(el=>!el.delete && !el.isNew) 
          
          const res=await uploadAsset(imagesToAdd,folder)
          const uploadedImages=res?.data
          
              if(type==='image'){
                  //Solo una imagen admitida
                  const imageData=newValueConfig.concat(uploadedImages.pop())
               const res2= await updateConfig({name,value:imageData})
               console.log(res2,'RES CONFIG')
               return res2
            }

    }


    return { getConfigByName, updateConfig, loading, setLoading, getAllConfigs,updateImagesConfig }
}

export default useConfigurations