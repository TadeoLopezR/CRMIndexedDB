(function() {

    let DB;

    document.addEventListener('DOMContentLoaded', () => {
        crearDB()
    })

    //Crear la base de datos de IndexedDB
    function crearDB(){

        const crearDB = window.indexedDB.open('crm', 1)

        crearDB.onerror = function () {
            console.log('Hubo un error')
        }

        crearDB.onsuccess = function () {   

            DB= crearDB.result

            console.log('Base de datos creada')
        }

        //configurar DB
        crearDB.onupgradeneeded = function (e) {

            const db = e.target.result

            const ObjectStore = db.createObjectStore( 'crm' , { keyPath: 'id', autoincrement: true });

            ObjectStore.createIndex('nombre', 'nombre', { unique: false });
            ObjectStore.createIndex('email', 'email', { unique: true });
            ObjectStore.createIndex('telefono', 'telefono', { unique: false });
            ObjectStore.createIndex('empresa', 'empresa', { unique: false });
            ObjectStore.createIndex('id', 'id', { unique: true });

            console.log('DB lista y creada')

        }
    }
})();