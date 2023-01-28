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
            }

        }
    },
    
    methods:{
        
        // Login methods
        ...loginMethods,
        // Métodos del administrador
        ...administratorMethods,

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