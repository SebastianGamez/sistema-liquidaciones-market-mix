// Description: Métodos para el cálculo de datos del secretario
// Autor: Sebastián Gámez Ariza

const secretaryMethods = {
    // Verificar si todos los campos están llenos y son números
    checkFieldsValuesSecretary() {
        // Se obtienen los inputs del formulario
        const secretaryValues = Object.values(this.secretary);
        // Se asume que todos los campos están llenos
        let allFieldsAreFilled = true;
        // Se recorren los valores de los inputs del formulario
        secretaryValues.map( value => {
            // Si el valor está vacío, se muestra un mensaje de error y se cambia el valor de allFieldsAreFilled a false
            if (value === '') {
                // Se muestra un mensaje de error
                swal('Error', 'Todos los campos deben estar llenos', 'error');
                // Se cambia el valor de allFieldsAreFilled a false
                allFieldsAreFilled = false;
            }
            else if (isNaN(value)) {
                // Se muestra un mensaje de error
                swal('Error', 'Todos los campos deben ser números', 'error');
                // Se cambia el valor de allFieldsAreFilled a false
                allFieldsAreFilled = false;
            }
        });
        // Se retorna el valor de allFieldsAreFilled
        return allFieldsAreFilled;
    },

    // Método para calcular el valor de la hora del secretario
    calculateSecretaryHourValue() {
        // Se obtienen los datos de las variables globales
        const { secretary } = globalsData;
        // Se obtiene el salario del secretario
        const { salary } = secretary;
        // Se calcula el valor de la hora del secretario
        const hourValue = salary / 240;
        // Se retorna el valor de la hora del secretario
        return hourValue;
    },
    // Método para calcular el valor de la hora extra del secretario
    calculateSecretaryExtraHourValue() {
        // Se obtiene el valor de la hora del secretario
        const hourValue = this.calculateSecretaryHourValue();
        // Se calcula el valor de la hora extra del secretario
        const extraHourValue = hourValue * 1.8;
        // Se retorna el valor de la hora extra del secretario
        return extraHourValue;
    },
    // Método para calcular la liquidación del secretario
    calculateSecretaryLiquidation () {
        // Se obtienen los datos de las variables globales
        const { secretary } = globalsData;
        // Se obtiene el salario del secretario
        const { salary } = secretary;
        // Se obtiene el número de horas extras del secretario
        const { extraHours } = this.secretary;
        // Se obtiene el valor de la hora extra del secretario
        const extraHourValue = this.calculateSecretaryExtraHourValue();
        // Se calcula la liquidación del secretario
        const secretarySalary = parseInt(salary) + (parseInt(extraHours) * extraHourValue);
        // Se retorna la liquidación del secretario
        return secretarySalary % 1 === 0 ? secretarySalary : secretarySalary.toFixed(2);
    },
    // Mostrar la liquidación del secretario
    getSecretaryLiquidation(){
        if(this.checkFieldsValuesSecretary()){
            // Se crea el objeto para almacenar los datos de la liquidación del secretario
            const secretaryLiquidation = {
                extraHours: ((this.calculateSecretaryExtraHourValue() * this.secretary.extraHours) % 1 === 0) ? this.calculateSecretaryExtraHourValue() * this.secretary.extraHours : (this.calculateSecretaryExtraHourValue() * this.secretary.extraHours).toFixed(2),
                total: this.calculateSecretaryLiquidation()
            }
            // Se obtiene la liquidación del secretario
            this.reports.secretary.total = secretaryLiquidation.total;
            this.reports.secretary.extraHours = secretaryLiquidation.extraHours;
            // se muestran las liquidaciones y se oculta el formulario
            this.render.liquidation = true;
            this.render.form = false;
            // Se almacena la liquidación del secretario si no existe
            const pin = localStorage.getItem("pin");
            if(!liquidationsData.some(liquidation => (liquidation.pin === pin && liquidation.liquidation === secretaryLiquidation.total))){
                // Se almacena la liquidación del secretario en los datos generales de las liquidaciones
                liquidationsData.push({
                    pin: pin,
                    name: localStorage.getItem("name"), 
                    role: localStorage.getItem("role"),
                    liquidation: this.reports.secretary.total
                });
                // Se almacena la liquidación del secretario en el arreglo de liquidaciones de los secretarios
                secretaryLiquidations.push({
                    pin: pin,
                    name: localStorage.getItem("name"),
                    ...secretaryLiquidation
                });
            }
            // Se alerta al usuario con mensaje de éxito
            swal("¡Éxito!", "Se ha calculado la liquidación del secretary", "success");
        }
    },
    // Método para obtener el reporte de liquidaciones de los secretarios
    getSecretaryLiquidations() {
        // Se obtienen las liquidaciones de los secretarios
        this.secretaryLiquidations = secretaryLiquidations;
        if(this.secretaryLiquidations.length > 0){
            // Se muestra un mensaje de éxito
            swal("¡Éxito!", "Se han obtenido las liquidaciones", "success");
            // Se muestra el reporte de liquidaciones de los secretarios
            this.render.liquidations = true;
            this.render.form = false;
        }
        else{
            // Se muestra un mensaje de error
            swal("Error", "No hay liquidaciones de secretarios", "error");
        }
    }


}