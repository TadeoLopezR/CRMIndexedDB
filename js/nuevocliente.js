(function () {
    
    //variables
    const formulario = document.querySelector('#formulario');
    let DB;


    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        formulario.addEventListener('submit', validarCliente);

    })

    function conectarDB() {

        const abrirDb = window.indexedDB.open('crm', 1)

        abrirDb.onerror = function () {
            console.log('Hubo un error')
        }

        abrirDb.onsuccess = function () {
            DB = abrirDb.result
            console.log('Conexión correcta')
        }
    }

    function validarCliente(e) {
        e.preventDefault();

        //leer los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }
        //crear un objeto con la información
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        CrearNuevoCliente(cliente)

        imprimirAlerta('El cliente se agregó correctamente');
    }

    function CrearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        transaction.onerror = function () {
            imprimirAlerta('Hubo un error', 'error');
        }
        transaction.oncomplete = function () {
            imprimirAlerta('El cliente se agregó correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
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

})();