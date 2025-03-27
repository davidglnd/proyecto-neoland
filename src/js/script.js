import {User} from '/js/classes/User.js'

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

const USER_DB = []

/**
 * Evento que se lanza cuando el contenido de la pagina ha sido cargado en memoria
 * y se puede acceder a el.
 * 
 * Asigna los eventos que se observan a partir de que cargue la pagina:
 * - Al formulario, se le asigna el evento "submit" que llama a la funcion
 *   tomarDatos.
 * Luego, llama a la funcion leerBD para leer la base de datos de usuarios
 * y guardarla en el array USER_DB.
 * 
 * @returns {void}
 */
function onDOMContentLoaded() {
    let formulario = document.getElementById('sigIn')
    formulario.addEventListener('submit', tomarDatos)
    leerBD()
}
/**
 * Takes the data from the form and creates a new User object with that data.
 * It then adds that User to the USER_DB array and calls the registrarUsuario function to save the USER_DB array to local storage.
 * @param {Event} event - the event that triggered this function.
 */
function tomarDatos(event) {
    event.preventDefault()

    let name = document.getElementById('usuario').value
    let email = document.getElementById('email').value

    crearClase(name,email)
    
}
/**
 * Creates a new User instance and adds it to the USER_DB array.
 * This function takes a user's name and email, constructs a User
 * object, and stores it in the user database. It then calls the
 * registrarUsuario function to save the updated database to local storage.
 * 
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 */

function crearClase(name,email){
    let user = new User(name, email)
    
    USER_DB.push(user)

    registrarUsuario()
}
/**
 * Stores the current state of the user database in the local storage.
 * This function serializes the USER_DB array to a JSON string and
 * saves it under the key 'USER_DB' in the local storage.
 */

function registrarUsuario(){
    localStorage.setItem('USER_DB', JSON.stringify(USER_DB))
}
function leerBD(){
    let listaUsuarios = []

    if(localStorage.getItem('USER_DB')){
        listaUsuarios = JSON.parse(localStorage.getItem('USER_DB'))
        
    }
    
    USER_DB.push(...listaUsuarios)
    
}
function datoslogIn(){
    
}