const fs = require('fs').promises;
const mime=require('mime-types')
const path = require('path');

export default class LocalStorageMediaRepository {
  constructor(basePath) {
    this.basePath = basePath;
  }

  async addFileToFolder(relativeFilePath, fileContent) {
    const fullPath = path.join(this.basePath, relativeFilePath);
    const folderPath = path.dirname(fullPath);

    try {
      // Crea la carpeta si no existe
      await fs.mkdir(folderPath, { recursive: true });

      // Escribe el archivo en la carpeta
      await fs.writeFile(fullPath, fileContent);
      return true  
    } catch (error) {
      console.error('Error al crear la carpeta o escribir el archivo:', error);
    }
  }

  async getFilesFromFolder(relativeFilePath){
    const fullPath = path.join(this.basePath, relativeFilePath);
    try {
      // Crea la carpeta si no existe
     let response=[]
     const files =await fs.readdir(fullPath);
     for (let i = 0; i < files.length; i++) {
       const file = files[i];
       const filePath = path.join(fullPath, file);
        // const data=await fs.readlink(path.join(fullPath,file))
        const stats = await fs.stat(filePath);
        const mimeType = mime.lookup(filePath)
        const resource_type=mimeType.split('/')[0]
        const extension=mimeType.split('/')[1]

        response.push({
          name: file,
          size: stats.size,
          sizeHuman: this.humanFileSize(stats.size),
          mimeType: mimeType,
          path: filePath,
          resource_type,
          extension
        });
      }

      return response  
    } catch (error) {
      console.error('Error al leer archivos en la carpeta:', error);
    }
  }

  humanFileSize(size) {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    return `${(size / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  }

  async deleteFileFromFolder(relativeFilePath){
    const fullPath = path.join(this.basePath, relativeFilePath);

    try {
      await fs.unlink(fullPath);
      return true  
    } catch (error) {
      // console.error('Error al eliminar el archivo:', error);
      throw new Error(error.message,{cause:error})
    }
  }
  
}
