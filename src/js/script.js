import { User } from '/js/classes/User.js'
import { SingletonDB } from '/js/classes/SinglentonDB.js'

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

const USER_DB = new SingletonDB()

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
    let formularioRegistro = document.getElementById('sigIn')
    let formularioLogin = document.getElementById('logIn')
    formularioRegistro?.addEventListener('submit', datosSigIN)//La interrogacion vale para ver si existe el form 
    formularioLogin?.addEventListener('submit', datosLogIn)//si no no hace el eventListener
    leerBD()
}
/**
 * Takes the data from the form and creates a new User object with that data.
 * It then adds that User to the USER_DB array and calls the registrarUsuario function to save the USER_DB array to local storage.
 * @param {Event} event - the event that triggered this function.
 */
function datosSigIN(event) {
    event.preventDefault()

    let name = document.getElementById('usuario').value
    let email = document.getElementById('email').value

    crearUsuario(name,email)
    
}
/**
 * Takes the data from the form and uses it to log in the user.
 * It then calls the logIn function to log in the user.
 * @param {Event} event - the event that triggered this function.
 */
function datosLogIn(event){
    event.preventDefault()

    let usuario = document.getElementById('usuario-login').value
    let email = document.getElementById('email-login').value
    logIn(usuario,email)//ojo al orden en el qe enviamos los parametros 

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
function crearUsuario(name,email){
    let nuevoUsuario = new User(name, email)
    if(USER_DB.get().findIndex((user) => user.name === nuevoUsuario && user.nuevoUsuario === email) <= 0){
        console.log('Existe el usuario ' + nuevoUsuario.name)
        document.getElementById('error-registro').classList.toggle('hidden')//estilos
    }else{
        console.log('Vamos a registrar')
        document.getElementById('registrado').classList.toggle('hidden')//estilos
        
        USER_DB.push(nuevoUsuario)
    }
    
    registrarUsuario()
}
/**
 * Reads the user database from local storage and updates the USER_DB array.
 * 
 * This function checks if there is a 'USER_DB' entry in the local storage.
 * If present, it parses the JSON string into an array of users and appends
 * these users to the existing USER_DB array.
 * 
 * This ensures that the USER_DB array is populated with the latest data
 * from previous sessions on page load.
 */
function leerBD(){
    let listaUsuarios = []

    // comprobamos si hay algo en localstorage
    if(localStorage.getItem('USER_DB')){
        listaUsuarios = JSON.parse(localStorage.getItem('USER_DB'))
        .map((user) => new User(user.name, user.email))
    }
    if(USER_DB.get() === undefined){
        console.log('inicializo el singleton de la base de datos')
    }
    USER_DB.push(...listaUsuarios)
}
/**
 * Saves the current state of the USER_DB array to local storage.
 * 
 * This function serializes the USER_DB array into a JSON string
 * and stores it in local storage under the key 'USER_DB'.
 * This allows the user database to be persisted across sessions.
 */
function registrarUsuario(){
    localStorage.setItem('USER_DB', JSON.stringify(USER_DB.get()))
}
function logIn(usuario,email){
    console.log(USER_DB.get())
    if(USER_DB.get().findIndex((user) => user.name === usuario && user.email === email) >= 0){
        console.log('log in')
        document.getElementById('log-correcto').classList.toggle('hidden')//estilos 
    }else{
        console.log('no existe el usuario')
        document.getElementById('error-login').classList.toggle('hidden')//estilos
    }
    
    
}