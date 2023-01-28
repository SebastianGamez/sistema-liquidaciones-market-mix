// Descripción: Archivo que contiene los métodos del vendedor
// Autor: Sebastián Gámez Ariza

const sellerMethods = {
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
        let bonus;
        // Se calcula el porcentaje de comisión
        if(totalSales > 5000000){
            bonus = 10;
        }
        else if(totalSales > 10000000){
            bonus = 20;
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
        const { commission } = seller;
        // Se calcula la comisión con base a los zapatos  y zapatillas vendidas
        const shoesCommission = (shoesPrice * (commission / 100)) * shoes;
        const sneakersCommission = (sneakersPrice * (commission / 100)) * sneakers;
        // Se retorna la comisión
        return shoesCommission + sneakersCommission;
    },
    // Calcular la liquidación del vendedor
    calculateSellerLiquidation(){
        // Se obtiene el salario base del vendedor
        const { seller } = globalsData;
        const { salary } = seller;
        // Se obtiene el porcentaje de comisión
        const bonus = this.calculateSellerBonus();
        // Se calcula la liquidación del vendedor con el subsidio de transporte
        const sellerSalary = salary + (salary * (bonus / 100)) + 140606;
        // Se retorna la liquidación del vendedor
        return sellerSalary;
    },
    // Mostrar la liquidación del vendedor
    getSellerLiquidation(){
        // Se obtiene la liquidación del vendedor y sus datos
        this.reports.seller.bonus = this.calculateSellerBonus();
        this.reports.seller.commission = this.calculateSellerCommission();
        this.reports.seller.total = this.calculateSellerLiquidation();
        // Se muestra el componente de liquidación y se ocultan los botones de liquidación
        this.render.liquidation = true;
        this.render.liquidationButtons = false;
        // Se almacena la liquidación del vendedor
        liquidationData.push({
            pin: localStorage.getItem("pin"),
            name: localStorage.getItem("name"), 
            liquidation: this.reports.seller.total
        });
        // Se alerta al usuario con mensaje de éxito
        swal("¡Éxito!", "Se ha calculado la liquidación del vendedor", "success");
    }
}