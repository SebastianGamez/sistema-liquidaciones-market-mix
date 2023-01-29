# Sistema de Liquidaciones - MarketMix 💰

 Aplicación para calcular liquidaciones de los empleados de una empresa. Éste es un proyecto SPA (Single Page Application) desarrollado con VueJS que calcula los liquidaciones de empleados con distintos roles acorde a valores estipulados previamente por un administrador.

## ¿Cómo funciona? ⁉️

 **El proyecto consta de cinco interfaces:**
 ### - Login:
 
  En ésta interfaz el usuario ingresa un pin único de cuatro digitos que lo relaciona con un rol y su nombre. El pin se valida con la información almacenada en el objeto ./src/data/credentials.js, sí es correcto, se renderiza una interfaz para su rol (administrator, secretary, seller or assembler). 
  
  Aquí encontrará algunos pines para el acceso al login:
 
 ```javascript

{
    administrator: "1234",
    secretaries:{
        Paula: "2003",
        ...
    },
    sellers: {
        Pedro: "1000",
        ...
    },
    assemblers: {
        Ana: "1001",
        ...
    }
}

```
### - Administrator:

Tras ingresar el pin de acceso asignado para el admistridor, se renderizará la interfaz gráfica para que el administrados asigne las variables globales para el cálculo de la liquidaciones y visualize un reporte géneral las liquidaciones realizadas hasta el momento. 


Si el administrador no ha asignado las variables globales, **NO SE DARA ACCESO A LAS OTRAS INTERFACES AUNQUE EL LOGIN PUEDA SER CORRECTO**. Estás variables se almacenarán en el objeto ubicado en ./src/data/globalVariables.js.

Por otro lado, la información que visualizará el administrador se obtendŕa del arreglo en la ruta ./src/data/liquidationsData.js, donde posterior a cada liquidación realizada se almacenará ésta última.


### - Secretary, seller y assembler


En éstas interfaces el comportamiento es análogo entre sí. Se recibirán variables obligatorias para el cálculo de la liquidación en una vista minimalista ante el usuario. Inmediatamente se indique calcular la liquidación, se renderizará una pequeña tabla con información acerca de la liquidación.


## Rutas y archivos 📂
+ index.html (Estructura la página e indexa los estilos y lógica del programa).
* assets (Contiene contenido multimedia de la página).
    * logo.ico (Logo a visualizar en la parte superior de la pestaña).
* css (Contiene los estilos css).
    * style.css (Generalidades de los estilos).
* src (Contiene la lógica del programa).
    * main.js (Lógica del programa en VueJS).
    * methods (Métodos que interactuan con los eventos del cliente)
        * loginMethods.js (Métodos implementados para el login).
        * administratorMethods.js (Métodos implementados en la interfaz del administrador).
        * secretaryMethods.js (Métodos implementados en la interfaz del secretario).
        * sellerMethods.js (Métodos implementados en la interfaz del vendedor).
        * assemblerMethods.js (Métodos implementados en la interfaz del ensamblador).
    * data (Simula una base de datos)
        * credentialsData.js (Almacena los pines de los trabajadores)
        * globalVariables.js (Almacena los valores necesarios administrados por el administrador)
        * liquidationsData.js (Almacena datos generales de las liquidaciones calculadas hasta el momento)

## Desarrolladores
* Parte gráfica por **Andres Torregrosa Sanjuanelo**: https://github.com/Andres032

* Lógica por **Sebastián Gámez Ariza**.


> Escrito por **Sebastián Gámez Ariza**



## Contact Me

[![Gmail Badge](https://img.shields.io/badge/-juan.gamez1001@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:juan.gamez1001@gmail.com)](mailto:juan.gamez1001@gmail.com)
[![Linkedin Badge](https://img.shields.io/badge/-Sebastian-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/sebastian-gamez-ariza-0963b7228/)](https://www.linkedin.com/in/sebastian-gamez-ariza-0963b7228/)
[![Twitter Badge](https://img.shields.io/badge/-@culturaDmacondo-00acee?style=flat&logo=Twitter&logoColor=white)](https://twitter.com/CulturaDmacondo "Follow on Twitter")
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/SebastianGamez)](https://github.com/SebastianGamez)
  
  

