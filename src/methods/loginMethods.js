const loginMethods = {
    
    // Método para verificar si el usuario existe, asignarle su rol y determinar que componente mostrar al usuario enviar el login
    handleSubmit(){
        // Se valida si el pin ingresado por el usuario es un número de 4 dígitos
        if( isNaN(this.pin) || this.pin.length !== 4 ){
            // Si el pin no es un número de 4 dígitos, envía una alerta con swal
            swal('Error', 'El pin ingresado no es válido', 'error');
            // Se rompe la función
            return;
        }
        // Se obtienen las credenciales de los usuarios
        const credentials = { ...credentialsData};
        /*Se recorre el objeto credentials para verificar si el pin ingresado por el usuario,
        y asignarle su nombre y rol*/
        for ( role in credentials ){
            // Si el rol es administrador y el pin es correcto
            if( role === 'administrator' && this.pin === credentials.administrator ){
                // Se muestra el componente del administrador y se oculta el componente del login
                this.render.administrator = true;
                this.render.login = false;
                // Se asigna el nombre y el rol del administrador
                this.user.name = 'Admin';
                this.user.role = 'administrador';
                // Elimina el pin ingresado
                this.pin = '';
                // Enviar alerta con swal
                swal('Bienvenido', `Hola ${this.user.name}, has iniciado sesión como ${this.user.role}`, 'success');
                // Se rompe el ciclo
                break;
            }
            // Si el rol es ensamblador
            else if( role === 'assemblers'){
                // Se recorre el objeto assemblers
                for (assembler in credentials.assemblers){
                    // Si el pin corresponde a un ensamblador
                    if( this.pin === credentials.assemblers[assembler] ){
                        // Se muestra el componente del ensamblador y se oculta el componente del login
                        this.render.assembler = true;
                        this.render.login = false;
                        // Se asigna el nombre y el rol del ensamblador
                        this.user.name = assembler;
                        this.user.role = 'assembler';
                        // Elimina el pin ingresado
                        this.pin = '';
                        // Enviar alerta con swal
                        swal('Bienvenido', `Hola ${this.user.name}, has iniciado sesión como ${this.user.role}`, 'success');
                        // Se rompe el ciclo
                        break;
                    }
                }
            }
            // Si el rol es secretaria
            else if( role === 'secretaries'){
                // Se recorre el objeto secretaries
                for (secretary in credentials.secretaries){
                    // Si el pin corresponde a una secretaria
                    if( this.pin === credentials.secretaries[secretary] ){
                        // Se muestra el componente de la secretaria y se oculta el componente del login
                        this.render.secretary = true;
                        this.render.login = false;
                        // Se asigna el nombre y el rol de la secretaria
                        this.user.name = secretary;
                        this.user.role = 'secretary';
                        // Elimina el pin ingresado
                        this.pin = '';
                        // Enviar alerta con swal
                        swal('Bienvenido', `Hola ${this.user.name}, has iniciado sesión como ${this.user.role}`, 'success');
                        // Se rompe el ciclo
                        break;
                    }
                }
            }
            // Si el rol es vendedor
            else if( role === 'sellers'){
                // Se recorre el objeto sellers
                for (seller in credentials.sellers){
                    // Si el pin corresponde a un vendedor
                    if( this.pin === credentials.sellers[seller] ){
                        // Se muestra el componente del vendedor y se oculta el componente del login
                        this.render.seller = true;
                        this.render.login = false;
                        // Se asigna el nombre y el rol del vendedor
                        this.user.name = seller;
                        this.user.role = 'seller';
                        // Elimina el pin ingresado
                        this.pin = '';
                        // Enviar alerta con swal
                        swal('Bienvenido', `Hola ${this.user.name}, has iniciado sesión como ${this.user.role}`, 'success');
                        // Se rompe el ciclo
                        break;
                    }
                    
                }
            }
        }
        
        // Si el pin no corresponde a ningún usuario se se mantiene el pin incorrecto
        if(this.pin !== ''){
            // Si el pin no corresponde a ningún usuario, envía una alerta con swal
            swal('Error', 'El pin ingresado no corresponde a ningún usuario', 'error');
        }
    }
}