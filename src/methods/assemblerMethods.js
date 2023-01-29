// Description: Métodos para el ensamblador
// Autor: Sebastián Gámez Ariza

const assemblerMethods = {
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
        const assemblerExtraHourValue = assemblerHourValue * 1.8;
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
        let bonus;
        if(shoesAssembled > 1000){
            bonus = (shoesAssemblerPrice * 0.1) * shoesAssembled;
        }
        else if(shoesAssembled > 2000){
            bonus = (shoesAssemblerPrice * 0.2) * shoesAssembled;
        }
        // Se retorna el bonus por ensamblar zapatos
        return bonus;
    },
    // Método para calcular el bonus por ensamblar zapatillas
    calculateAssemblerSneakersBonus() {
        // Se obtiene el número de zapatillas ensambladas
        const sneakersAssembled = this.assembler.sneakersAssembled;
        // Se obtiene el precio de ensamblar una zapatilla
        const sneakersAssemblerPrice = globalsData.assembler.sneakersAssemblerPrice;
        // Se definer el bonus por ensamblar zapatillas
        let bonus;
        if(sneakersAssembled > 1700){
            bonus = (sneakersAssemblerPrice * 0.15) * sneakersAssembled;
        }
        else if(sneakersAssembled > 3000){
            bonus = (sneakersAssemblerPrice * 0.3) * sneakersAssembled;
        }
        // Se retorna el bonus por ensamblar zapatillas
        return bonus;
    },
    // Método para calcular el subsidio por tener hijos
    calculateAssemblerChildrenSubsidy() {
        // Se obtiene el número de hijos
        const childrenNumber = this.assembler.childrenNumber;
        // Se definer el subsidio por tener hijos
        let subsidy;
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
        return assemblerSalary + (extraHours * assemblerExtraHourValue) + assemblerShoesBonus + assemblerSneakersBonus + assemblerChildrenSubsidy + 140606;
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
        if(this.validateMaxAssemblers()) {
            // Se obtiene la liquidación del secretario
            this.reports.assembler.total = this.calculateAssemblerLiquidation();
            this.reports.assembler.extraHours = this.calculateAssemblerHourValue() * this.assembler.extraHours;
            this.reports.assembler.shoesBonus = this.calculateAssemblerShoesBonus();
            this.reports.assembler.sneakersBonus = this.calculateAssemblerSneakersBonus();
            this.reports.assembler.childrenSubsidy = this.calculateAssemblerChildrenSubsidy();
            // Se muestra el componente de liquidación y se ocultan los botones de liquidación
            this.render.liquidation = true;
            this.render.liquidationButtons = false;
            // Se almacena la liquidación del vendedor
            liquidationsData.push({
                pin: localStorage.getItem("pin"),
                name: localStorage.getItem("name"), 
                liquidation: this.reports.assembler.total
            });
            // Se alerta al usuario con mensaje de éxito
            swal("¡Éxito!", "Se ha calculado la liquidación del ensamblador", "success");
            console.log(liquidationsData)
        }
    }


}