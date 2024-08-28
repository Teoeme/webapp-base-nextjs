export const formatDateAr = (value,correctTimeOut=false) => {
  const dateToFormat = new Date(value);
  const timezoneOffsetInMinutes = dateToFormat.getTimezoneOffset();
  const adjustedDate = correctTimeOut ? new Date(
    dateToFormat.getTime() + timezoneOffsetInMinutes * 60 * 1000
  ) : dateToFormat;
  const formattedDate = adjustedDate.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};



export const formatDateArLong = (value,correctTimeOut=false) => {
  const dateToFormat = new Date(value);
  const timezoneOffsetInMinutes = dateToFormat.getTimezoneOffset();
  const adjustedDate = correctTimeOut ? new Date(
    dateToFormat.getTime() + timezoneOffsetInMinutes * 60 * 1000
  ) : dateToFormat;
  const formattedDate = adjustedDate.toLocaleDateString("es-AR", {
    weekday:'short',
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour:'2-digit',
    minute:'2-digit'
  });
  return formattedDate;
};
export const formatDateArCasual = (value,correctTimeOut=false) => {
  const dateToFormat = new Date(value);
  const timezoneOffsetInMinutes = dateToFormat.getTimezoneOffset();
  const adjustedDate = correctTimeOut ? new Date(
    dateToFormat.getTime() + timezoneOffsetInMinutes * 60 * 1000
  ) : dateToFormat;
  const formattedDate = adjustedDate.toLocaleDateString("es-AR", {
    day: "2-digit",
    month:"long",
    year: "numeric",
  });
  return formattedDate;
};

export const formatPeso = (numero,decimales) =>{
  const precioFormateado = numero?.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
  return precioFormateado
}

export function abreviarNumero(numero, cerosMinimos) {
  const sufijos = ["", "k", "M", "G", "T", "P", "E"];
  let sufijoIndex = 0;

  while (numero >= 1000 && sufijoIndex < sufijos.length - 1) {
    numero /= 1000;
    sufijoIndex++;
  }

  if (sufijoIndex >= cerosMinimos || numero === 0) {
    return numero.toFixed(1) + sufijos[sufijoIndex];
  } else {
    return (numero * Math.pow(10, cerosMinimos)).toString();
  }
}
export function moverElementoEnArray(array, indice, cantidad) {
  if (indice < 0 || indice >= array.length) {
    return array; 
  }
  const elemento = array.splice(indice, 1)[0]; // Eliminar el elemento del array en el índice dado
  const newIndex = indice + cantidad; // Calcular la nueva posición del elemento

  // Asegurarse de que newIndex esté dentro de los límites del array
  const finalIndex = Math.max(0, Math.min(newIndex, array.length));

  // Insertar el elemento en la nueva posición
  array.splice(finalIndex, 0, elemento);

  return array;
}

export function getCurrentDayISO(){
return  new Date( new Date().getTime() - (new Date().getTimezoneOffset()*60*1000)).toISOString().slice(0,10)

}