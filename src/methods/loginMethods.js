const loginMethods = {
    // Método para validar si el usuario puede acceder a su interfaz acorde si el administrado ya definió las variables globales
    handleAccess(){
        // Se obtienen las variables globales
        const globals = { ...globalsData};
        if(globals.assembler.salary === undefined){
            // Si las variables globales no están definidas, envía una alerta con swal
            swal('Error', 'El administrador no ha habilitado la plataforma', 'error');
            // Se rompe la función
            return false;
        }
        // Si las variables globales están definidas, se puede acceder a la interfaz
        else return true;
    },
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
                // Se asigna el nombre y el rol del administrador en el localStorage
                localStorage.setItem('name', 'Admin');
                localStorage.setItem('role', 'administrator');
                // Elimina el pin ingresado
                this.pin = '';
                // Enviar alerta con swal
                swal('Bienvenido', `Hola Admin, has iniciado sesión como administrator`, 'success');
                // Se rompe el ciclo
                break;
            }
            // Si el rol es ensamblador
            else if( role === 'assemblers'){
                // Se recorre el objeto assemblers
                for (assembler in credentials.assemblers){
                    // Si el pin corresponde a un ensamblador
                    if( this.pin === credentials.assemblers[assembler] ){
                        if(!this.handleAccess()){
                            // Si el usuario no puede acceder a la plataforma, se rompe la función
                            swal('Error', 'El administrador no ha habilitado la plataforma', 'error');
                            this.pin = '';
                            break;
                        }
                        // Se muestra el componente del ensamblador y se oculta el componente del login
                        this.render.assembler = true;
                        this.render.login = false;
                        // Se asigna el nombre y el rol del ensamblador
                        localStorage.setItem('name', assembler);
                        localStorage.setItem('role', 'assembler');
                        // Elimina el pin ingresado
                        this.pin = '';
                        // Enviar alerta con swal
                        swal('Bienvenido', `Hola ${assembler}, has iniciado sesión como assembler`, 'success');
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
                        if(!this.handleAccess()){
                            // Si el usuario no puede acceder a la plataforma, se rompe la función
                            swal('Error', 'El administrador no ha habilitado la plataforma', 'error');
                            this.pin = '';
                            break;
                        }
                        // Se muestra el componente de la secretaria y se oculta el componente del login
                        this.render.secretary = true;
                        this.render.login = false;
                        // Se asigna el nombre y el rol de la secretaria
                        localStorage.setItem('name', secretary);
                        localStorage.setItem('role', 'secretary')
                        // Elimina el pin ingresado
                        this.pin = '';
                        // Enviar alerta con swal
                        swal('Bienvenido', `Hola ${secretary}, has iniciado sesión como secretary`, 'success');
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
                        if(!this.handleAccess()){
                            // Si el usuario no puede acceder a la plataforma, se rompe la función
                            swal('Error', 'El administrador no ha habilitado la plataforma', 'error');
                            this.pin = '';
                            break;
                        }
                        // Se muestra el componente del vendedor y se oculta el componente del login
                        this.render.seller = true;
                        this.render.login = false;
                        // Se asigna el nombre y el rol del vendedor
                        localStorage.setItem('name', seller);
                        localStorage.setItem('role', 'seller');
                        // Elimina el pin ingresado
                        this.pin = '';
                        // Enviar alerta con swal
                        swal('Bienvenido', `Hola ${seller}, has iniciado sesión como seller`, 'success');
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
    },
    // Método para cerrar sesión
    handleLogout(){
        // Se muestra el componente del login y se ocultan los demás componentes
        this.render.login = true;
        this.render.administrator = false;
        this.render.assembler = false;
        this.render.secretary = false;
        this.render.seller = false;
        // Se asigna el nombre y el rol del usuario en blanco
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        // Enviar alerta con swal
        swal('Adiós', 'Has cerrado sesión', 'success');
    }
}