import { group } from "console"

export const configurations = [
    {
        name: "wspNumber",
        value: '',
        description: "Numero de Whatsapp",
        type: 'string',
        protected: false,
        label: "Número de Whatsapp",
        group: 'Información',
        helperText:'Se utilizará este numero para aquellos enlaces y botones que deriven al usuario a una conversación de Whatsapp.'
    },
    {
        name: "bussinessName",
        value: '',
        description: "Nombre del negocio o tienda a mostrar.",
        type: 'string',
        protected: false,
        label: "Nombre del negocio",
        group: 'Información',
        helperText:''
    },
    {
        name: "instagram",
        value: '',
        description: "Cuenta de instagram del negocio.",
        type: 'string',
        protected: false,
        label: "Instagram",
        group: 'Información',
        helperText:'Puede dejarse en blanco en caso de no tener o no querer mostrar el perfil de Instagram.'
    },
    {
        name: "contactemail",
        value: 'contact@alteworkshop.com',
        description: "Email de contacto para el público",
        type: 'string',
        protected: false,
        label: "Email de contacto",
        group: 'Información',
        helperText:'Importante. Por normativa general es necesario tener una casilla de correo electónico activa como via de comunicación oficial con el sitio web.'
    },
    {
        name: "logoimage",
        value: {},
        description: "Logotipo del negocio version modo claro",
        type: 'image',
        protected: false,
        label: "Logo",
        group: 'Información',
        helperText:'En lo posible utilizar un archivo png sin fondo.'
    },
    { 
        name: "logoimagedark",
        value: {},
        description: "Logotipo del negocio version modo oscuro",
        type: 'image',
        protected: false,
        label: "Logo Dark",
        group: 'Información',
        helperText:'En lo posible utilizar un archivo png sin fondo.'
    },
    {
        name: "palette",
        value: {
            light: {
                foreground: "250 252 252",
                background: "238 241 242",
                border: "217 227 228",
                copy: "33 43 44",
                copyLight: "86 111 117",
                copyLighter: "124 151 157",
                primary: "26 146 174",
                primaryLight: "31 183 219",
                primaryDark: "21 109 129",
                primaryContent: "207 240 248",
                secondary: "174 52 25",
                secondaryLight: "219 67 31",
                secondaryDark: "129 40 18",
                secondaryContent: "247 214 206",
                success: "23 173 27",
                successContent: "206 248 206",
                warning: "175 174 25",
                warningContent: "0 0 0",
                error: "174 25 26",
                errorContent: "247 207 206"
            },
            dark: {
                foreground: "33 43 44",
                background: "21 28 29",
                border: "50 70 74",
                copy: "250 252 252",
                copyLight: "211 221 222",
                copyLighter: "26 146 174",
                primary: "26 146 174",
                primaryLight: "31 183 219",
                primaryDark: "21 109 129",
                primaryContent: "207 240 248",
                secondary: "174 52 25",
                secondaryLight: "219 67 31",
                secondaryDark: "129 40 18",
                secondaryContent: "247 214 206",
                success: "23 173 27",
                successContent: "206 248 206",
                warning: "175 174 25",
                warningContent: "0 0 0",
                error: "174 25 26",
                errorContent: "247 207 206"
            },
        },
        description: "Paleta de colores",
        protected: false,
        type: 'object'
    },
    

]

export const users = [
    {
        Name: "SuperAdmin",
        Email: "super@admin.com",
        Password: "$2b$10$tpif2RM4McM93Upyo9OpAOQJdTgcz.DlLsHHjT5o0OVPfAr2kfkOi",
        Role: "SUPERADMIN_ROLE"
    }
]