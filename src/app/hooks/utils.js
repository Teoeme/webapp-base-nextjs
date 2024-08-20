/**
 * Obtiene el valor anidado de un objeto dado un camino de propiedades.
 * @param {Object} obj - El objeto del cual se obtiene el valor.
 * @param {String} path - El camino de propiedades, separado por puntos (ej: 'project.title').
 * @returns {Any} - El valor encontrado en el camino de propiedades, o undefined si no existe.
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((o, p) => o && o[p], obj);
  }
  
  /**
   * Valida los datos de un objeto basado en una lista de reglas de validación.
   * @param {Object} data - El objeto con los datos a validar.
   * @param {Array} validations - La lista de reglas de validación.
   * @returns {Object} - Un objeto con `ok` indicando si la validación fue exitosa, y `message` con el mensaje de error o éxito.
   */
  export function validateData(data, validations) {
    for (const validation of validations) {
      const { field, alias, type, maxLength, minLength, required } = validation;
      const value = getNestedValue(data, field);
  
      if (required && !value) {
        return { ok: false, message: `El campo ${alias || field} no puede estar vacío` };
      }
  
      if (type === 'text' && value && typeof value !== 'string') {
        return { ok: false, message: `El campo ${alias || field} debe ser del tipo ${type}` };
      }
      if (type === 'date' && value && isNaN(Date.parse(value))) {
        return { ok: false, message: `El campo ${alias || field} debe ser una fecha válida` };
      }
  
      if (minLength && value && value.length < minLength) {
        return { ok: false, message: `El campo ${alias || field} debe contener al menos ${minLength} caracteres` };
      }
  
      if (maxLength && value && value.length > maxLength) {
        return { ok: false, message: `El campo ${alias || field} no puede contener más de ${maxLength} caracteres` };
      }
    }
  
    return { ok: true, message: 'Validación exitosa' };
  }
  
  export const generateVideoThumbnail = (file) => { 
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.currentTime = 1; // Capturar la miniatura en el segundo 1

        video.onloadeddata = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg'));
        };

        video.onerror = () => {
            resolve(null);
        };
    });
};

export const generateVideoThumbnailFromUrl = (videoUrl) => {
  return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.crossOrigin = "anonymous"; // Esto es importante si el video está alojado en otro dominio
      video.currentTime = 1; // Capturar la miniatura en el segundo 1

      video.onloadeddata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg'));
      };

      video.onerror = () => {
          reject('Error generating thumbnail');
      };
  });
};

  // Crea un objeto para rastrear el estado de la carga
  export const paletteResource = {
    data: null,
    promise: null,
    read() {
      console.log('OBTENIENDO PALETA')
      if (this.data) return this.data;
      if (!this.promise) {
        this.promise = fetch('/api/configuracion/palette')
          .then(res => res.json())
          .then(res => {
            if (res.data?.value) {
              this.data = res.data.value;
              return this.data;
            }
            throw new Error('No palette data found');
          });
      }
      throw this.promise;
    }
  };