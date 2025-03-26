// 3. READ base de datos
import pokedex from '../pokedex/pokedex.json' with { type: "json" }

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)


/**
 * Evento que se lanza cuando el contenido de la página ha sido cargado en memoria
 * y se puede acceder a él.
 * 
 * @listens DOMContentLoaded
 * @description
 *  Asigna los eventos que se observan a partir de que cargue la página:
 *  - Al formulario, se le asigna el evento "submit" que llama a la función
 *    encontrarPokemon.
 *  - Al botón de buscar, se le asigna el evento "click" que imprime un mensaje en
 *    consola.
 *  Luego, llama a la función leerListaPokemons con el parámetro 12 para pintar
 *  los 12 primeros pokemons en la lista.
 * 
 * @returns {void}
 */
function onDOMContentLoaded() {
    let formulario = document.getElementById('formulario')
    //let botonBuscar = document.getElementById('botonbusqueda') //el boton es submit asi que no lo neceisto
    let campoTexto = document.getElementById('input-buscador')
     // Asigno los eventos que se observan a partir de que cargue la página
    formulario.addEventListener('submit', encontrarPokemon)
    campoTexto.addEventListener('keyup' , onInputKeyUp)
    // Leo la lista de pokemons y pinto el HTML
    leerListaPokemons(12)
    mostrarFavoritos()
    console.log('Se ha cargado la pagina')
}


/**
 * Lee la lista de pokemons y pinta el HTML
 * 
 * @description
 *  Lee la lista de pokemons y pinta el HTML, el cual se mostrará en el contenedor
 *  con el id "lista-pokemons".
 *  Crea un nuevo "li" por cada pokemon y a su vez dentro de cada "li" crea un "figure" y
 *  dentro de este crea una "img" y un "h5" que contienen la imagen y el nombre del pokemon
 *  respectivamente.
 *  Crea un "p" que contiene el número de pokedex del pokemon.
 *  Crea un "div" que contiene los tipos del pokemon y cada tipo se muestra en un "span"
 *  que se le da un estilo en base al tipo.
 *  El parámetro "numeroPokemonLeidos" indica el número de pokemons que se van a leer.
 *  Si no se indica el parámetro, por defecto se leen 10 pokemons.
 * 
 * @param {number} numeroPokemonLeidos - Número de pokemons a leer y pintar en el HTML.
 * @returns {void}
 */
function leerListaPokemons(numeroPokemonLeidos = 10) {
    let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]
    // Vacío la tabla antes de rellenar con los nuevos pokemons
    while (listaPokemons.firstChild) {
       // console.log('borrando')
        listaPokemons.removeChild(listaPokemons.firstChild) 
    }
    
    //Este bucle recorre la lista de pokemons y nos envia un valor para cada vuelta a la funcion de pintar
    for(let i = 0; i < numeroPokemonLeidos; i++) {
        addPokemonToList(pokedex[i])
    }
    
}

/**
 * Busca un pokemon en la lista de pokemons y lo pinta en la tabla de pokemons.
 * 
 * @description
 *  Se lanza cuando se envía el formulario de búsqueda.
 *  Busca el pokemon en la lista de pokemons según:
 *    - Si el valor del input es un número, busca por id.
 *    - Si el valor del input es un texto, busca por nombre.
 *  Si encuentra pokemons, los pinta en la tabla de pokemons.
 *  Si no encuentra ninguno, avisa al usuario y sale.
 * 
 * @param {Event} event - Evento submit del formulario.
 * @returns {void}
 */
function encontrarPokemon(event) {/*Le pasamos el evento submit que lo declaramos en cuanto carga la pagina*/
    //paramos evento submit
    event.preventDefault()
    // Definimos variables
    let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]
    let buscador = document.getElementById('input-buscador')
    let arrayBusqueda = []
    //Buscamos valor blanco reiniciamos la pokedex de pantalla
    if (buscador.value === '') {
        leerListaPokemons(12)
    }
    //Buscamos por numero
    if(Number.isInteger(Number(buscador.value))){//si el campo es un numero
        //Explicacion linea de abajo
        //En el arrayBusqueda que es un array vacio filtramos pokedex creando un array con el pokemon que buscamos a traves del id
        arrayBusqueda = pokedex.filter((pokemon) => pokemon.id === Number(buscador.value))
        console.log('Buscas por id ')
        console.log(arrayBusqueda) // aqui solo busca ese numero
    }else{//si no es numero es texto
        arrayBusqueda = pokedex.filter((pokemon) => pokemon.name.english.toLowerCase().includes(buscador.value.toLowerCase()))
        console.log('Buscas por nombre ')
        console.log(arrayBusqueda)
    }
    // Si no encontramos ninguno, avisamos al usuario y salimos    
    if (arrayBusqueda.length === 0) {
        errorBusqueda(listaPokemons)
        return
    }
    // Vacío la tabla antes de rellenar con los nuevos pokemons
    while (listaPokemons.firstChild) {
        listaPokemons.removeChild(listaPokemons.firstChild)
    }
    // Por cada pokemon encontrado
    for (let i = 0; i < arrayBusqueda.length; i++) {
        addPokemonToList(arrayBusqueda[i])
    }
}

/**
 * Añade un pokemon a la lista de pokemons.
 * 
 * @description
 *  Toma un pokemon como parámetro y lo pinta en la tabla de pokemons.
 *  El pokemon se pinta con su nombre, su número de pokedex y sus tipos.
 *  Si el pokemon tiene 2 tipos, se pintan los dos.
 *  Si no tiene 2 tipos, no se pinta el segundo.
 * @param {Object} numeroIndicePokemon - El pokemon a pintar.
 * @returns {void}
 */
function addPokemonToList(numeroIndicePokemon){ /*el valor que recibimos aqui es pokedex[i] del array  por vuelta del for de leeListaPokemon*/

    let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]
    let nuevoPokemon = document.createElement('li')

    nuevoPokemon.classList = 'caja-pokemon'	
    //console.log('Añadiendo pokemon :', numeroIndicePokemon.id + ' con nombre ' + numeroIndicePokemon.name.english)
    listaPokemons.appendChild(nuevoPokemon)

    let pokemon = document.createElement('figure')
    nuevoPokemon.appendChild(pokemon)


    //estas linea es a que pone el atributo a la imagen teniendo en cuenta el nombre de la foto depende del id
    //pero los nombres de las fotos en la carpeta empiezan por 00 por lo que usamos el metodo padStart
    let imagenPokemon = document.createElement('img')
    imagenPokemon.setAttribute('src', '../pokedex/images/' + String(numeroIndicePokemon.id).padStart(3, '0') + '.png')
    imagenPokemon.setAttribute('alt',  numeroIndicePokemon.name.english)
    imagenPokemon.setAttribute('title', numeroIndicePokemon.name.english)
    imagenPokemon.setAttribute('loading', 'lazy')
    imagenPokemon.setAttribute('class','imgPokemon')
    pokemon.appendChild(imagenPokemon)

    let nombrePokemon = document.createElement('h5')
    nombrePokemon.textContent = numeroIndicePokemon.name.english
    pokemon.appendChild(nombrePokemon)

    let numeroPokedex = document.createElement('p')
    numeroPokedex.innerText = `Nº ${String(numeroIndicePokemon.id).padStart(3, '0')}`
    pokemon.appendChild(numeroPokedex)

    let tipos = document.createElement('div')
    tipos.classList = 'tipos'
    pokemon.appendChild(tipos)

    let tipo1 = document.createElement('span')
    tipo1.textContent = numeroIndicePokemon.type[0]
    tipo1.classList ='tag ' + numeroIndicePokemon.type[0].toLowerCase() //este esta correcto porque 1 tipo siempre hay 
    tipos.appendChild(tipo1)

    //no podemos usar toLowerCase para 2º tipo
    // porque a veces no hay 2 tipos y nos entrega undefined
    //tenemos que crear un if que indica que cuando el 2º tipo sea undefined no escriba el span
    //console.log(pokedex[i].type[1])//consoe log para ver que nos dice cuando no tine 2 tipos (nos arroja undefined)

    if (numeroIndicePokemon.type[1] !== undefined) {
        let tipo2 = document.createElement('span')
        tipo2.textContent = numeroIndicePokemon.type[1]
        tipo2.classList ='tag ' + numeroIndicePokemon.type[1].toLowerCase()
        tipos.appendChild(tipo2)
    }

    let imagenFavorito = document.createElement('img')
    imagenFavorito.setAttribute('src', '/img/favoritosinmarcar.png')
    imagenFavorito.setAttribute('alt', 'añadirfavorito')
    imagenFavorito.setAttribute('class', 'guardar-favorito')
    imagenFavorito.dataset.id = numeroIndicePokemon.id	
    //Añadimos el evento del click
    imagenFavorito.addEventListener('click', makeFavorite)
    pokemon.appendChild(imagenFavorito)
    
    let listaFavoritos = []
    if (localStorage.getItem('idFavoritos')){
        listaFavoritos = JSON.parse(localStorage.getItem('idFavoritos'))
    }

    if(listaFavoritos.includes(String(numeroIndicePokemon.id))){
        pokemon.classList.add('favorite')
        imagenFavorito.setAttribute('src', '/img/favoritomarcado.png')
    }
    
}
/**
 * Evento que se lanza al subir el valor de un input.
 * 
 * @description
 *  Si el valor del input es vacio, se llama a leerListaPokemons con el parametro 12
 *  para que se muestren los 12 primeros pokemons en la lista.
 * @listens KeyUp
 * @returns {void}
 */
function onInputKeyUp(event){
    let buscador = document.getElementById('input-buscador')
    if(buscador.value === ''){
        leerListaPokemons(12)
    }
}
/**
 * Muestra un mensaje de error en la tabla de pokemons.
 * 
 * @description
 *  Limpia la tabla de pokemons y muestra un mensaje de error.
 *  El mensaje de error indica que no se ha encontrado pokemon con el nombre o id de pokedex
 *  que se ha buscado.
 * @param {HTMLElement} listaPokemons - El elemento que contiene la tabla de pokemons.
 * @returns {void}
 */
function errorBusqueda(listaPokemons){
    while (listaPokemons.firstChild) {
        listaPokemons.removeChild(listaPokemons.firstChild)
    }
    let mensajeError = document.createElement('p')
    mensajeError.innerText = `No hemos encontrado ningun pokemon con ese nombre o numero de pokedex, intentalo de nuevo
    Revisa tu busqueda y aplica cambios para encontrar otro pokemon`
    mensajeError.classList = 'error'
    listaPokemons.appendChild(mensajeError)
}
/**
 * Marca como favorito el pokemon que se le pasa como this.
 * 
 * @description
 *  Añade la clase "favorite" al elemento "li" que contiene el pokemon.
 *  El pokemon se pasa como this de la funcion.
 *  Se utiliza el evento "click" para lanzar la funcion.
 * @param {Event} event - El evento "click" que se lanza al pinchar en el pokemon.
 * @returns {void}
 */
function makeFavorite(event){
    let listaFavoritos = []

    if (localStorage.getItem('idFavoritos')) {
        listaFavoritos = JSON.parse(localStorage.getItem('idFavoritos'))
    }

    if(listaFavoritos.includes(this.dataset.id)){
        listaFavoritos = listaFavoritos.filter(id => id !== this.dataset.id)
        this.parentNode.classList.remove('favorite')
        this.removeAttribute('src')
        this.setAttribute('src', '/img/favoritosinmarcar.png')
        
    }else{
        listaFavoritos.push(this.dataset.id)
        this.parentNode.classList.add('favorite')
        this.removeAttribute('src')
        this.setAttribute('src', '/img/favoritomarcado.png')
        //console.log(this.dataset.id)
    }
    localStorage.setItem('idFavoritos', JSON.stringify(listaFavoritos))
    //console.log('id = ' + this.dataset.id)

    mostrarFavoritos();
    
 }
function mostrarFavoritos(){
    let listaFavoritos = document.getElementById('lista-favoritos')
    let listaFavoritosGeneraciones = document.getElementById('lista-favoritos-generaciones')
    let favoritos = JSON.parse(localStorage.getItem('idFavoritos'))
    while (listaFavoritos.firstChild) {
        //borramos mientras haya un hijo
        listaFavoritos.removeChild(listaFavoritos.firstChild)
    }
    
    if (favoritos?.length > 0) {
        //si favoritos no es undefined y es superior a 0
        //cogemos listaFavoritos y como su padre tiene  div-favoritos le añade la clase visible
        //le añadimos la clase visible
        listaFavoritos.closest('.div-favoritos').classList.add('visible')
        listaFavoritosGeneraciones.closest('.generaciones-favoritos').classList.add('visible')
        // Buscamos los datos del pokemon a partir de su id
        favoritos.forEach((id) => {
        // con sus datos, construimos la ficha o lo que necesitemos
        let pokemon = pokedex.find((pokemon) => String(pokemon.id) === id)
        let li = document.createElement('li')
        li.textContent = pokemon.name.english
        listaFavoritos.appendChild(li)
      })
    } else {
        listaFavoritos.closest('.div-favoritos').classList.remove('visible')
        listaFavoritosGeneraciones.closest('.generaciones-favoritos').classList.remove('visible')
    }
    
    
}








/*
    # Tarea: buscar un pokemon

    1. Escribo en el formulario el nombre o el número del pokemon
    2. Pincho en el botón de buscar
    3. Usando Javascript, busco en la base de datos un pokemon que coincida con la búsqueda
    4. Devuelvo los datos de ese pokemon a la página web
    5. Limpio la tabla de pokemons para dejarla preparada
    6. Añado un LI a la lista ordenada de pokemons con los datos del pokemon y la estructura HTML
    */

    // 4. FOR cada pokemon de la base de datos
    // 4.1. IF encuentro pokemon RETURN datos del pokemon
    // 4.2. ELSE devuelvo "pokemon no encontrado"
    // 5. SHOW tabla de datos (lista-pokemons) limpia
    // 6.1. IF hay pokemon, lo añado a la lista con DISPLAY
    // 6.1.1. IF hay más de un pokemon, con FOR por cada pokemon añado su ficha a la lista
    // 6.2. ELSE no hay pokemon, muestro "pokemon no encontrado" en lugar de la lista-pokemons

