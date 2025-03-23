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
    //botonBuscar.addEventListener('click', () => console.log('Boton buscar')) //el boton es submit asi que no lo neceisto
    campoTexto.addEventListener('keyup' , onInputKeyUp)
    // Leo la lista de pokemons y pinto el HTML
    leerListaPokemons(12)
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
        window.alert('Pokemon no encontrado')
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
    pokemon.setAttribute('id', 'pokemon')
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
//Aqui creamos una imagen que vamos a usar de boton para agregar a favoritos, quizas tengamos que añadir 
// un form para enviar el input oculto con el id del pokemon que estamos añadiendo
    let favorito = document.createElement('img')
    favorito.id = numeroIndicePokemon.id
    favorito.classList = 'enviar-favoritos'
    favorito.src = '/img/favoritosinmarcar.png'
    pokemon.appendChild(favorito)

    let favoritoOculto = document.createElement('input')
    favoritoOculto.id = 'oculto'
    favoritoOculto.setAttribute('type' , 'hidden')
    favoritoOculto.setAttribute('value' , numeroIndicePokemon.id)
    pokemon.appendChild(favoritoOculto)
    


}
function onInputKeyUp(event){
    let buscador = document.getElementById('input-buscador')
    if(buscador.value === ''){
        leerListaPokemons(12)
    }
}













//trabajao por hacer 
//restricciones de busqueda en buscarPokemon() (Listo no son restricciones son condiciones de busqeuda) y 
// funcionalidades (como buscar pokemon con minusculas (listo) o que salgan varios pokemon)

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

