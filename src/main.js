// Importar vue
const { createApp } = Vue;

// Creación de la instancia de Vue
const app = createApp({
    
    data() {
        return {
            
            /*El objeto render contiene los componentes que se van a mostrar*/
            render: {
                administrator: false,
                assembler: false,
                login: true,
                secretary: false,
                seller: false,
            },
            
            // El pin es el código que ingresa el usuario para iniciar sesión
            pin: '',
            
            // Información de los usuario que se autentica
            user: {
                name: '',
                role: '',
            }
        }
    },
    
    methods:{
        
        // Login methods
        ...loginMethods,

    }
});

// Importar componentes
app.mount('#app');