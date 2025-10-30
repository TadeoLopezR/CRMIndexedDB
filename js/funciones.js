 
let DB;
 function conectarDB() {

        let abrirDb = window.indexedDB.open('crm', 1)

        abrirDb.onerror = function () {
            console.log('abrirDbHubo un error')
        }

        abrirDb.onsuccess = function () {
            DB = abrirDb.result
            console.log('abrirDbConexión correcta')
            
        }
    }

 function imprimirAlerta(mensaje,tipo) {


        //evitando duplicados
        const alertaPrevia = document.querySelector('.alerta');
        if (alertaPrevia) {
            alertaPrevia.remove();
        }

        //crear alerta
        const alerta = document.createElement('DIV');
        alerta.classList.add('px-4', 'py-3', 'text-center', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'border', 'border-solid','alerta');
        alerta.textContent = mensaje;

        if (tipo === 'error') {
            alerta.classList.add('bg-red-100', 'border-red-400','text-red-700');

        }else{
            alerta.classList.add('bg-green-100', 'border-green-400','text-green-700');
        }
        
        //mostrar en el HTML
        formulario.appendChild(alerta);

        //quitar la alerta despues de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }