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
    // Método para calcular el salario del secretario
    calculateSecretarySalary() {
        // Se obtienen los datos de las variables globales
        const { secretary } = globalsData;
        // Se obtiene el salario del secretario
        const { salary } = secretary;
        // Se obtiene el número de horas extras del secretario
        const { extraHours } = this.secretary;
        // Se obtiene el valor de la hora extra del secretario
        const extraHourValue = this.calculateSecretaryExtraHourValue();
        // Se calcula el salario del secretario
        const secretarySalary = parseInt(salary) + (parseInt(extraHours) * extraHourValue);
        // Se retorna el salario del secretario
        return secretarySalary;
    },


}