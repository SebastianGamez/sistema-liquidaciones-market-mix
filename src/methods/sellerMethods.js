// Descripción: Archivo que contiene los métodos del vendedor
// Autor: Sebastián Gámez Ariza

const sellerMethods = {
    // Verificar si todos los campos están llenos y son números
    checkFieldsValuesSeller() {
        // Se obtienen los valores de las variables globales
        const sellerValues = Object.values(this.seller);
        // Se asume que todos los campos están llenos
        let allFieldsAreFilled = true;
        // Se recorren los valores del vendedor
        sellerValues.map( sellerValue => {
            // Si el valor está vacío, se muestra un mensaje de error y se cambia el valor de allFieldsAreFilled a false
            if (sellerValue === '') {
                // Se muestra un mensaje de error
                swal('Error', 'Todos los campos deben estar llenos', 'error');
                // Se cambia el valor de allFieldsAreFilled a false
                allFieldsAreFilled = false;
            }
            else if (isNaN(sellerValue)) {
                // Se muestra un mensaje de error
                swal('Error', 'Todos los campos deben ser números', 'error');
                // Se cambia el valor de allFieldsAreFilled a false
                allFieldsAreFilled = false;
            }
        });
        // Se retorna el valor de allFieldsAreFilled
        return allFieldsAreFilled;
    },

    // Calcular bonificación con base a los zapatos vendidos
    calculateSellerBonus(){
        // Se obtiene el número de zapatos y zapatillas vendidas
        const { shoes } = this.seller;
        const { sneakers } = this.seller;
        // Se obtiene el precio de los zapatos y zapatillas
        const { seller } = globalsData;
        const { shoesPrice } = seller;
        const { sneakersPrice } = seller;
        // Se calcula el valor total de las ventas
        const totalSales = (shoes * shoesPrice) + (sneakers * sneakersPrice);
        // Se obtiene el porcentaje de comisión
        let bonus = 0;
        // Se calcula el porcentaje de comisión
        if(totalSales > 10000000){
            bonus = 20;
        }
        else if(totalSales > 5000000){
            bonus = 10;
        }
        // Se retorna el porcentaje de comisión
        return bonus;
    },
    //Calcular la comisión del vendedor
    calculateSellerCommission(){
        // Se obtiene el número de zapatos y zapatillas vendidas
        const { shoes } = this.seller;
        const { sneakers } = this.seller;
        // Se obtiene el precio de los zapatos y zapatillas
        const { seller } = globalsData;
        const { shoesPrice } = seller;
        const { sneakersPrice } = seller;
        // Se obtiene el porcentaje de comisión
        const { shoesCommission, sneakersCommission} = seller;
        // Se calcula la comisión con base a los zapatos  y zapatillas vendidas
        const shoesComm = (shoesPrice * (shoesCommission / 100)) * shoes;
        const sneakersComm = (sneakersPrice * (sneakersCommission / 100)) * sneakers;
        // Se retorna la comisión
        return (shoesComm + sneakersComm) % 1 === 0 ? (shoesComm + sneakersComm) : (shoesComm + sneakersComm).toFixed(2);
    },
    // Calcular la liquidación del vendedor
    calculateSellerLiquidation(){
        // Se obtiene el salario base del vendedor
        const { seller } = globalsData;
        const { salary } = seller;
        // Se obtiene el porcentaje de bonus
        const bonus = this.calculateSellerBonus();
        // Se obtiene la comisión del vendedor
        const commission = this.calculateSellerCommission();
        // Se calcula la liquidación del vendedor con el subsidio de transporte
        const sellerSalary = salary + (salary * (bonus / 100)) + commission + 140606;
        // Se retorna la liquidación del vendedor
        return sellerSalary % 1 === 0 ? sellerSalary : sellerSalary.toFixed(2);
    },
    // Mostrar la liquidación del vendedor
    getSellerLiquidation(){
        if(this.checkFieldsValuesSeller()){
            // Se obtiene la liquidación del vendedor y sus datos
            this.reports.seller.bonus = this.calculateSellerBonus();
            this.reports.seller.commission = this.calculateSellerCommission();
            this.reports.seller.total = this.calculateSellerLiquidation();
            // se muestran las liquidaciones y se oculta el formulario
            this.render.liquidation = true;
            // Se almacena la liquidación del vendedor si no existe
            const pin = localStorage.getItem("pin");
            if(!liquidationsData.some(liquidation => liquidation.pin === pin)){
                liquidationsData.push({
                    pin: pin,
                    name: localStorage.getItem("name"), 
                    role: localStorage.getItem("role"),
                    liquidation: this.reports.seller.total
                });
            }
            // Se alerta al usuario con mensaje de éxito
            swal("¡Éxito!", "Se ha calculado la liquidación del vendedor", "success");
        }
    }
}