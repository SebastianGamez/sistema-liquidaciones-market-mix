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
                liquidation: false,
                liquidationButtons: true
            },

            // Arreglo que contiene las liquidaciones de los empleados
            liquidations: [],
            
            // Input del pin que ingresa el usuario para iniciar sesión
            pin: '',

            // Input de las variables globales suministradas por el administrador
            globalVariables: {
                secretary: {
                    salary: 1800000
                },
                seller: {
                    salary: 1800000,
                    shoesPrice: 100000,
                    sneakersPrice: 120000,
                    shoesCommission: 4,
                    sneakersCommission: 3
                },
                assembler:{
                    salary: 2000000,
                    shoesAssemblerPrice: 30000,
                    sneakersAssemblerPrice: 50000,
                    maxShoesAssembledAmount: 1500,
                    maxSneakersAssembledAmount: 3000,
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

            // Input para el ensamblador
            assembler: {
                extraHours: '',
                shoesAssembled: '',
                sneakersAssembled: '',
                childrenNumber: ''
            },

            // Variables para los reportes
            reports: {
                secretary: {
                    extraHours: '',
                    total: ''
                },
                seller: {
                    commission: '',
                    bonus: '',
                    transportSubsidy: '140606',
                    total: ''
                },
                assembler: {
                    childrenSubsidy: '',
                    extraHours: '',
                    shoesBonus: '',
                    sneakersBonus: '',
                    transportSubsidy: '140606',
                    total: ''
                }
            }

        }
    },

    mounted() {
        // Se verifica si el usuario ya ha iniciado sesión
        if (localStorage.getItem('user') && localStorage.getItem('role')) {
            // Se obtiene el rol del usuario
            const user = JSON.parse(localStorage.getItem('role'));
            // Se muestra el componente correspondiente al rol del usuario y se oculta el componente de login
            this.render[user.role] = true;
            this.render.login = false;
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
        // Métodos del ensamblador
        ...assemblerMethods,

    },

});

// Importar componentes
app.mount('#app');