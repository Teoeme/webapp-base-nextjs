import bcrypt from 'bcrypt';
import { authOptions } from './[...nextauth]/authOptions';

const { getServerSession } = require("next-auth");

async function checkSession(){
    const session = await getServerSession(authOptions)
    return (session)?true:false

}


async function getUser(){
    const session = await getServerSession(authOptions)
    if(!session) return false
    return session?.user
}

async function checkUserRole(rolesArray){
  const session = await getServerSession(authOptions)
  const userRole=session?.user?.Role
  return rolesArray.some(el=>el === userRole)
}

// Función para cifrar la contraseña antes de guardarla en la base de datos
async function hashPassword(password) {
  // 10 es el número de rondas de cifrado que bcrypt hará (puede ser un valor diferente)
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Función para comparar la contraseña proporcionada con la que está almacenada en la base de datos
async function comparePasswords(providedPassword, storedPasswordHash) {
  return bcrypt.compare(providedPassword, storedPasswordHash);
}

export{
    checkSession,
    getUser,
    hashPassword,
    comparePasswords,checkUserRole
}