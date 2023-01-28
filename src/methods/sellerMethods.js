// Descripción: Archivo que contiene los métodos del vendedor
// Autor: Sebastián Gámez Ariza

const sellerMethods = {
    // Calcular comisión con base a los zapatos vendidos
    calculateShoesCommission(){
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
        let commission;
        // Se calcula el porcentaje de comisión
        if(totalSales > 5000000){
            commission = 10;
        }
        else if(totalSales > 10000000){
            commission = 20;
        }
        return commission;
    },
    // Calcular la liquidación del vendedor
    calculateSellerLiquidation(){
        // Se obtiene el salario base del vendedor
        const { seller } = globalsData;
        const { salary } = seller;
        // Se obtiene el porcentaje de comisión
        const commission = this.calculateShoesCommission();
        // Se calcula la liquidación del vendedor con el subsidio de transporte
        const sellerSalary = salary + (salary * (commission / 100)) + 140606;
        // Se retorna la liquidación del vendedor
        return sellerSalary;
    }
}