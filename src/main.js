// Descripción: Archivo principal de la aplicación
// Autor: Sebastián Gámez Ariza

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
            
            // Input del pin que ingresa el usuario para iniciar sesión
            pin: '',

            // Input de las variables globales suministradas por el administrador
            globalVariables: {
                secretary: {
                    salary: ''
                },
                seller: {
                    salary: '',
                    shoesPrice: '',
                    sneakersPrice: '',
                    commission: ''
                },
                assembler:{
                    salary: '',
                    maxAssembledAmount: ''
                }
            },

            // Input del las horas extras que indica el secretario
            secretary: {
                extraHours: ''
            },

            // Input del las zapatos y zapatillas que indica el vendedor
            seller: {
                shoes: '',
                sneakers: ''
            },

        }
    },
    
    methods:{
        
        // Login methods
        ...loginMethods,
        // Métodos del administrador
        ...administratorMethods,
        // Métodos de la secretaria
        ...secretaryMethods,
        // Métodos del vendedor
        ...sellerMethods,

    },

    // Se ejecuta antes de que se muestre el componente
    mounted() {
        // Si el usuario ya ha iniciado sesión, se muestra el componente correspondiente
        if(this.getName() && this.getRole()){
            this.render.login = false;
            this.render[this.getRole()] = true;
        }
    }

});

// Importar componentes
app.mount('#app');