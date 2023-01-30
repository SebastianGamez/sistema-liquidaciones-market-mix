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
                // Se obtiene la liquidación del secretario
                this.reports.assembler.total = this.calculateAssemblerLiquidation();
                this.reports.assembler.extraHours = ((this.calculateAssemblerHourValue() * this.assembler.extraHours) % 1 === 0) ? this.calculateAssemblerHourValue() * this.assembler.extraHours : (this.calculateAssemblerHourValue() * this.assembler.extraHours).toFixed(2);
                this.reports.assembler.shoesBonus = this.calculateAssemblerShoesBonus();
                this.reports.assembler.sneakersBonus = this.calculateAssemblerSneakersBonus();
                this.reports.assembler.childrenSubsidy = this.calculateAssemblerChildrenSubsidy();
                // se muestran las liquidaciones y se oculta el formulario
                this.render.liquidation = true;
                // Se almacena la liquidación del ensamblador si no existe
                const pin = localStorage.getItem("pin");
                if(!liquidationsData.some(liquidation => liquidation.pin === pin)){
                    liquidationsData.push({
                        pin: pin,
                        name: localStorage.getItem("name"), 
                        role: localStorage.getItem("role"),
                        liquidation: this.reports.assembler.total
                    });
                }
                // Se alerta al usuario con mensaje de éxito
                swal("¡Éxito!", "Se ha calculado la liquidación del ensamblador", "success");
            }
        }
    }


}