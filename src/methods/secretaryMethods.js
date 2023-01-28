// Description: Métodos para el cálculo de datos del secretario
// Autor: Sebastián Gámez Ariza

const secretaryMethods = {
    // Método para calcular el valor de la hora del secretario
    calculateSecretaryHourValue() {
        // Se obtienen los datos de las variables globales
        const { secretary } = globalsData;
        // Se obtiene el salario del secretario
        const { salary } = secretary;
        // Se calcula el valor de la hora del secretario
        const hourValue = parseInt(salary) / 240;
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
        return secretarySalary;
    },
    // Mostrar la liquidación del secretario
    getSecretaryLiquidation(){
        // Se obtiene la liquidación del secretario
        this.reports.secretary.total = this.calculateSecretaryLiquidation();
        this.reports.secretary.extraHours = this.calculateSecretaryExtraHourValue * this.secretary.extraHours;
        // Se muestra el componente de liquidación y se ocultan los botones de liquidación
        this.render.liquidation = true;
        this.render.liquidationButtons = false;
        // Se almacena la liquidación del secretario
        liquidationData.push({
            pin: localStorage.getItem("pin"),
            name: localStorage.getItem("name"), 
            liquidation: this.this.reports.secretary.total
        });
        // Se alerta al usuario con mensaje de éxito
        swal("¡Éxito!", "Se ha calculado la liquidación del secretary", "success");
    }


}