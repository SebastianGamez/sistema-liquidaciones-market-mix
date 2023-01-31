// Description: Métodos para el ensamblador
// Autor: Sebastián Gámez Ariza

const assemblerMethods = {
    // Verificar si todos los campos están llenos y son números
    checkFieldsValuesAssembler() {
        // Se obtienen los valores de las variables globales
        const assemblerValues = Object.values(this.assembler);
        // Se asume que todos los campos están llenos
        let allFieldsAreFilled = true;
        // Se recorren los valores del ensamblador
        assemblerValues.map( assemblerValue => {
            // Si el valor está vacío, se muestra un mensaje de error y se cambia el valor de allFieldsAreFilled a false
            if (assemblerValue === '') {
                // Se muestra un mensaje de error
                swal('Error', 'Todos los campos deben estar llenos', 'error');
                // Se cambia el valor de allFieldsAreFilled a false
                allFieldsAreFilled = false;
            }
            else if (isNaN(assemblerValue)) {
                // Se muestra un mensaje de error
                swal('Error', 'Todos los campos deben ser números', 'error');
                // Se cambia el valor de allFieldsAreFilled a false
                allFieldsAreFilled = false;
            }
        });
        // Se retorna el valor de allFieldsAreFilled
        return allFieldsAreFilled;
    },
    // Método para calcular el valor de la hora del ensamblador
    calculateAssemblerHourValue() {
        // Se obtiene el salario del ensamblador
        const assemblerSalary = globalsData.assembler.salary;
        // Se calcula el valor de la hora del ensamblador
        const assemblerHourValue = assemblerSalary / 240;
        // Se retorna el valor de la hora del ensamblador
        return assemblerHourValue;
    },
    // Método para calcular el valor de la hora extra del ensamblador
    calculateAssemblerExtraHourValue() {
        // Se obtiene el valor de la hora del ensamblador
        const assemblerHourValue = this.calculateAssemblerHourValue();
        // Se calcula el valor de la hora extra del ensamblador
        const assemblerExtraHourValue = (assemblerHourValue * 1.8);
        // Se retorna el valor de la hora extra del ensamblador
        return assemblerExtraHourValue;
    },
    // Método para calcular el bonus por ensamblar zapatos
    calculateAssemblerShoesBonus() {
        // Se obtiene el número de zapatos ensamblados
        const shoesAssembled = this.assembler.shoesAssembled;
        // Se obtiene el precio de ensamblar un zapato
        const shoesAssemblerPrice = globalsData.assembler.shoesAssemblerPrice;
        // se definer el bonus por ensamblar zapatos
        let bonus = 0;
        if(shoesAssembled > 1000){
            bonus = (shoesAssemblerPrice * 0.1) * shoesAssembled;
        }
        else if(shoesAssembled > 2000){
            bonus = (shoesAssemblerPrice * 0.2) * shoesAssembled;
        }
        // Se retorna el bonus por ensamblar zapatos
        return bonus % 1 === 0 ? bonus : bonus.toFixed(2);
    },
    // Método para calcular el bonus por ensamblar zapatillas
    calculateAssemblerSneakersBonus() {
        // Se obtiene el número de zapatillas ensambladas
        const sneakersAssembled = this.assembler.sneakersAssembled;
        // Se obtiene el precio de ensamblar una zapatilla
        const sneakersAssemblerPrice = globalsData.assembler.sneakersAssemblerPrice;
        // Se definer el bonus por ensamblar zapatillas
        let bonus = 0;
        if(sneakersAssembled > 1700){
            bonus = (sneakersAssemblerPrice * 0.15) * sneakersAssembled;
        }
        else if(sneakersAssembled > 3000){
            bonus = (sneakersAssemblerPrice * 0.3) * sneakersAssembled;
        }
        // Se retorna el bonus por ensamblar zapatillas
        return bonus % 1 === 0 ? bonus : bonus.toFixed(2);
    },
    // Método para calcular el subsidio por tener hijos
    calculateAssemblerChildrenSubsidy() {
        // Se obtiene el número de hijos
        const childrenNumber = this.assembler.childrenNumber;
        // Se definer el subsidio por tener hijos
        let subsidy = 0;
        if(childrenNumber === 1){
            subsidy = 80000;
        }
        else if(childrenNumber > 1){
            subsidy = childrenNumber * 60000;
        }
        // Se retorna el subsidio por tener hijos
        return subsidy;
    },
    // Método para calcular la liquidación del ensamblador
    calculateAssemblerLiquidation() {
        // Se obtiene el salario del ensamblador
        const assemblerSalary = globalsData.assembler.salary;
        // Se obtiene el número de horas extras
        const extraHours = this.assembler.extraHours;
        // Se obtiene el valor de la hora extra del ensamblador
        const assemblerExtraHourValue = this.calculateAssemblerExtraHourValue();
        // Se obtiene el bonus por ensamblar zapatos
        const assemblerShoesBonus = this.calculateAssemblerShoesBonus();
        // Se obtiene el bonus por ensamblar zapatillas
        const assemblerSneakersBonus = this.calculateAssemblerSneakersBonus();
        // Se obtiene el subsidio por tener hijos
        const assemblerChildrenSubsidy = this.calculateAssemblerChildrenSubsidy();
        // Se calcula la liquidación del ensamblador y se retorna
        const assemblerLiquidation = assemblerSalary + (extraHours * assemblerExtraHourValue) + assemblerShoesBonus + assemblerSneakersBonus + assemblerChildrenSubsidy + 140606;
        // Se retorna la liquidación del ensamblador
        return assemblerLiquidation % 1 === 0 ? assemblerLiquidation : assemblerLiquidation.toFixed(2);
    },
    // Método para validar el máximo de ensamblajes
    validateMaxAssemblers() {
        // Se obtiene el número máximo de ensambladores
        const { assembler } = globalsData;
        const { maxShoesAssembledAmount, maxSneakersAssembledAmount} = assembler;
        // Se obtiene el número de zapatos y zapatillas ensamblados
        const { shoesAssembled, sneakersAssembled } = this.assembler;
        // Se valida el número de zapatos y zapatillas ensamblados
        let isValid = true;
        if(shoesAssembled > maxShoesAssembledAmount || sneakersAssembled > maxSneakersAssembledAmount) {
            isValid = false;
            swal('Error', `El número de zapatos y zapatillas ensamblados no puede ser mayor a ${maxShoesAssembledAmount} y ${maxSneakersAssembledAmount} respectivamente`, 'error');
        }
        return isValid;

    },
    // Mostrar la liquidación del ensamblador
    getAssemblerLiquidation() {
        if(this.checkFieldsValuesAssembler()){
            if(this.validateMaxAssemblers()) {
                // Se crea el objeto con los datos de la liquidación del ensamblador
                const assemblerLiquidation = {
                    childrenSubsidy: this.calculateAssemblerChildrenSubsidy(),
                    extraHours: ((this.calculateAssemblerHourValue() * this.assembler.extraHours) % 1 === 0) ? this.calculateAssemblerHourValue() * this.assembler.extraHours : (this.calculateAssemblerHourValue() * this.assembler.extraHours).toFixed(2),
                    shoesBonus: this.calculateAssemblerShoesBonus(),
                    sneakersBonus: this.calculateAssemblerSneakersBonus(),
                    total: this.calculateAssemblerLiquidation()
                };
                // Se obtiene la liquidación del secretario
                this.reports.assembler.total = assemblerLiquidation.total;
                this.reports.assembler.extraHours = assemblerLiquidation.extraHours;
                this.reports.assembler.shoesBonus = assemblerLiquidation.shoesBonus;
                this.reports.assembler.sneakersBonus = assemblerLiquidation.sneakersBonus;
                this.reports.assembler.childrenSubsidy = assemblerLiquidation.childrenSubsidy;
                // se muestran las liquidaciones y se oculta el formulario
                this.render.liquidation = true;
                this.render.form = false;
                // Se almacena la liquidación del ensamblador si no existe
                const pin = localStorage.getItem("pin");
                if(!liquidationsData.some(liquidation => (liquidation.pin === pin && liquidation.liquidation === assemblerLiquidation.total))){
                    // Se almacena la liquidación del ensamblador en las liquidaciones generales
                    liquidationsData.push({
                        pin: pin,
                        name: localStorage.getItem("name"), 
                        role: localStorage.getItem("role"),
                        liquidation: this.reports.assembler.total
                    });
                    // Se almacena la liquidación del ensamblador en las liquidaciones del ensamblador
                    assemblerLiquidations.push({
                        pin: pin,
                        name: localStorage.getItem("name"),
                        ...assemblerLiquidation
                    });
                }
                // Se alerta al usuario con mensaje de éxito
                swal("¡Éxito!", "Se ha calculado la liquidación del ensamblador", "success");
            }
        }
    },
    // Método para obtener la liquidación de los ensambladores
    getAssemblerLiquidations() {
        // Se obtienen las liquidaciones de los ensambladores
        this.assemblerLiquidations = assemblerLiquidations;
        if(this.assemblerLiquidations.length > 0){
            // Se muestra la tabla de liquidaciones de los ensambladores
            this.render.liquidations = true;
            this.render.form = false;
            // Se alerta al usuario con mensaje de éxito
            swal("¡Éxito!", "Se han obtenido las liquidaciones", "success");
        }
        else {
            // Se alerta al usuario con mensaje de error
            swal("Error", "No hay liquidaciones para mostrar", "error");
        }
    }
}