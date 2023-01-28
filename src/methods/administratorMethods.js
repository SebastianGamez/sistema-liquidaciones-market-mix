// Description: Este archivo contiene los métodos del administrador
// Autor: Sebastián Gámez Ariza

const administratorMethods = {
    // Este método se encarga de validar que todos los campos estén llenos
    checkFieldsValues() {
        // Se obtienen los valores de las variables globales
        const globalVariablesValues = Object.values(this.globalVariables);
        // Se asume que todos los campos están llenos
        let allFieldsAreFilled = true;
        // Se recorren los valores de las variables globales
        globalVariablesValues.map( globalVariable => {
            // Se recorren los valores de cada variable global
            Object.values(globalVariable).map( value => {
                // Si el valor está vacío, se muestra un mensaje de error y se cambia el valor de allFieldsAreFilled a false
                if (value === '') {
                    // Se muestra un mensaje de error
                    swal('Error', 'Todos los campos deben estar llenos', 'error');
                    // Se cambia el valor de allFieldsAreFilled a false
                    allFieldsAreFilled = false;
                }
            });
        });
        // Se retorna el valor de allFieldsAreFilled
        return allFieldsAreFilled;
    },
    // Este método se encarga de borrar el formulario las variables globales
    clearFormAdministrator() {
        // Se formatea el formulario
        this.globalVariables = {
            secretary: {
                salary: ''
            },
            seller: {
                salary: '',
                shoesPrice: '',
                sneakersPrice: '',
                shoesCommission: '',
                sneakersCommission: ''
            },
            assembler:{
                salary: '',
                shoesAssemblerPrice: '',
                sneakersAssemblerPrice: '',
                maxShoesAssembledAmount: '',
                maxSneakersAssembledAmount: '',
            }
        }
    },
    // Este método se encarga de actualizar las variables globales
    handleSubmitAdministrator() {
        // Si todos los campos están llenos, se procede a actualizar las variables globales
        if (this.checkFieldsValues()) {
            // Se almacenan las variables globales
            globalsData = this.globalVariables;
            // Se muestra un mensaje de éxito
            swal('Éxito', 'Las variables globales se han actualizado correctamente', 'success');
            // Se borra el formulario
            this.clearFormAdministrator();

        }
        
    },
    getLiquidations(){
        // Se obtienen las liquidaciones
        this.liquidations = liquidationsData;
        if(liquidationsData.length > 0){
            // Se muestra un mensaje de éxito
            swal("¡Éxito!", "Se han obtenido las liquidaciones", "success");
            // se muestran las liquidaciones y se ocultan los botones
            this.render.liquidations = true;
            this.render.liquidationButtons = false;
        } else{
            // Se muestra un mensaje de error
            swal("¡Error!", "No hay liquidaciones", "error");
        }
    }
    

}