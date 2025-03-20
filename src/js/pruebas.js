        //imagenPokemon.setAttribute('src', '../pokedex/images/00' + pokedex[i].id + '.png')
        //esa linea es a que pone el atributo a la imagen teniendo en cuenta el nombre de la foto depende del id
        //pero los nombres de las fotos en la carpeta empiezan por 00 por lo tanto si es menos de 10 ponemos dos 0 antes del id del pokemon
        //si es mayor 1 0 y si es mayor de 100 se pone el id ya que corresponde con el nombre de la foto

        let imagenPokemon = document.createElement('img')
        if (pokedex[i].id < 10) {
            imagenPokemon.setAttribute('src', '../pokedex/images/00' + pokedex[i].id + '.png')
        }
        if (pokedex[i].id >= 10 && pokedex[i].id < 100) {
            imagenPokemon.setAttribute('src', '../pokedex/images/0' + pokedex[i].id + '.png')
        }
        if (pokedex[i].id >= 100) {
            imagenPokemon.setAttribute('src', '../pokedex/images/' + pokedex[i].id + '.png')
        }
    ///////////////////////////////////////////////////////////////////////////////////////////// texto funcional
    // 3. READ base de datos
import pokedex from '../pokedex/pokedex.json' with { type: "json" }

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

/**
 * Evento que se lanza cuando el contenido de la página ha sido cargado en memoria
 * y se puede acceder a él.
 * @listens DOMContentLoaded
 */
function onDOMContentLoaded() {
    let botonBusqueda = document.getElementById('botonbusqueda')
    // Asigno los eventos que se observan a partir de que cargue la página
 
    // 2. CLICK en botón de submit
    botonBusqueda.addEventListener('click', encontrarPokemon)

    // Leo la lista de pokemons y pinto el HTML
    leerListaPokemons()
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
 * 
 * @returns {void}
 */
function leerListaPokemons() {
    let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]
    for(let i = 0; i < 12; i++) {
        let nuevoPokemon = document.createElement('li')
        let idPokemon = String (pokedex[i].id)// id del pokemon para esta vuelta del bucle
        //console.log(idPokemon)
        nuevoPokemon.classList = 'caja-pokemon'	
        //console.log('Añadiendo pokemon :', pokedex[i].name.english.toLowerCase())
        listaPokemons.appendChild(nuevoPokemon)

        let pokemon = document.createElement('figure')
        pokemon.setAttribute('id', 'pokemon')
        nuevoPokemon.appendChild(pokemon)

        //imagenPokemon.setAttribute('src', '../pokedex/images/00' + pokedex[i].id + '.png')
        //esa linea es a que pone el atributo a la imagen teniendo en cuenta el nombre de la foto depende del id
        //pero los nombres de las fotos en la carpeta empiezan por 00 por lo tanto si es menos de 10 ponemos dos 0 antes del id del pokemon
        //si es mayor 1 0 y si es mayor de 100 se pone el id ya que corresponde con el nombre de la foto

        let imagenPokemon = document.createElement('img')
        imagenPokemon.setAttribute('src', '../pokedex/images/' + idPokemon.padStart(3, '0') + '.png')
        imagenPokemon.setAttribute('alt',  pokedex[i].name.english)
        imagenPokemon.setAttribute('title', pokedex[i].name.english)
        imagenPokemon.setAttribute('loading', 'lazy')
        pokemon.appendChild(imagenPokemon)

        let nombrePokemon = document.createElement('h5')
        nombrePokemon.textContent = pokedex[i].name.english
        pokemon.appendChild(nombrePokemon)

        let numeroPokedex = document.createElement('p')
        numeroPokedex.innerText = `Nº ${idPokemon.padStart(3, '0')}`
        pokemon.appendChild(numeroPokedex)

        let tipos = document.createElement('div')
        tipos.classList = 'tipos'
        pokemon.appendChild(tipos)

        let tipo1 = document.createElement('span')
        tipo1.textContent = pokedex[i].type[0]
        tipo1.classList ='tag ' + pokedex[i].type[0].toLowerCase() //este esta correcto porque 1 tipo siempre hay 
        tipos.appendChild(tipo1)

        //no podemos usar toLowerCase para 2º tipo
        // porque a veces no hay 2 tipos y nos entrega undefined
        //tenemos que crear un if que indica que cuando el 2º tipo sea undefined no escriba el span
        //console.log(pokedex[i].type[1])//consoe log para ver que nos dice cuando no tine 2 tipos (nos arroja undefined)

        if (pokedex[i].type[1] !== undefined) {
            //console.log('hay 2 tipos')
            let tipo2 = document.createElement('span')
            tipo2.textContent = pokedex[i].type[1]
            tipo2.classList ='tag ' + pokedex[i].type[1].toLowerCase()
            tipos.appendChild(tipo2)
        }
        
        
        

        
        
    }
    
}

/**
 * Busca un pokemon en la pokedex y lo pinta en la interfaz
 * 
 * @description
 *  Busca un pokemon en la pokedex y lo pinta en la interfaz con todos sus detalles
 *  como la imagen, el nombre, el numero de pokedex y los tipos
 * @param {string} campoBusqueda - El nombre o id del pokemon que se busca
 * @param {HTMLElement} dondeNuevaLista - El elemento donde se va a pintar el pokemon
 */
function encontrarPokemon() {
    // Definimos variables
    let campoBusqueda = document.getElementById('input-buscador')
    let dondeNuevaLista = document.getElementsByClassName('main-pokedex')[0] //variable con el main que es donde vamos a pintar el pokemon

    for (let i = 0; i < pokedex.length; i++) {//preguntar el tema de ===
        if (pokedex[i].name.english.toLowerCase() === campoBusqueda.value || pokedex[i].id == campoBusqueda.value){//este if verifica si el nombre o el id esta dentro de la pokedex
            let idPokemon = String (pokedex[i].id)// id del pokemon para esta vuelta del bucle
            //consolelog para comprobar el parametro
            console.log('Buscas a ' + pokedex[i].name.english + ' con Nº de pokedex ' + pokedex[i].id)

            //definimos la variable con el elemento a borrar
            let listaPokemonsBorrar = document.getElementsByClassName('lista-pokemons')[0]
            //console.log(listaPokemonsBorrar)
            listaPokemonsBorrar.parentNode.removeChild(listaPokemonsBorrar)

            //empezamos a pintar de 0 el ol 
            let crearNuevaLista = document.createElement('ol')
            crearNuevaLista.setAttribute('class','lista-pokemons')
            dondeNuevaLista.appendChild(crearNuevaLista)
            
            let nuevoPokemon = document.createElement('li')
            nuevoPokemon.classList = 'caja-pokemon'	
            crearNuevaLista.appendChild(nuevoPokemon)

            let pokemon = document.createElement('figure')
            pokemon.setAttribute('id', 'pokemon')
            nuevoPokemon.appendChild(pokemon)

            //imagenPokemon.setAttribute('src', '../pokedex/images/00' + pokedex[i].id + '.png')
            //esa linea es a que pone el atributo a la imagen teniendo en cuenta el nombre de la foto depende del id
            //pero los nombres de las fotos en la carpeta empiezan por 00 por lo tanto si es menos de 10 ponemos dos 0 antes del id del pokemon
            //si es mayor 1 0 y si es mayor de 100 se pone el id ya que corresponde con el nombre de la foto

            let imagenPokemon = document.createElement('img')
            imagenPokemon.setAttribute('src', '../pokedex/images/' + idPokemon.padStart(3, '0') + '.png')
            imagenPokemon.setAttribute('alt',  pokedex[i].name.english)
            imagenPokemon.setAttribute('title', pokedex[i].name.english)
            imagenPokemon.setAttribute('loading', 'lazy')
            pokemon.appendChild(imagenPokemon)

            let nombrePokemon = document.createElement('h5')
            nombrePokemon.textContent = pokedex[i].name.english
            pokemon.appendChild(nombrePokemon)

            let numeroPokedex = document.createElement('p')
            numeroPokedex.innerText = `Nº ${idPokemon.padStart(3, '0')}`
            pokemon.appendChild(numeroPokedex)

            let tipos = document.createElement('div')
            tipos.classList = 'tipos'
            pokemon.appendChild(tipos)

            let tipo1 = document.createElement('span')
            tipo1.textContent = pokedex[i].type[0]
            tipo1.classList ='tag ' + pokedex[i].type[0].toLowerCase() //este esta correcto porque 1 tipo siempre hay 
            tipos.appendChild(tipo1)

            //no podemos usar toLowerCase para 2º tipo
            // porque a veces no hay 2 tipos y nos entrega undefined
            //tenemos que crear un if que indica que cuando el 2º tipo sea undefined no escriba el span
            //console.log(pokedex[i].type[1])//consoe log para ver que nos dice cuando no tine 2 tipos (nos arroja undefined)

            if (pokedex[i].type[1] !== undefined) {
                //console.log('hay 2 tipos')
                let tipo2 = document.createElement('span')
                tipo2.textContent = pokedex[i].type[1]
                tipo2.classList ='tag ' + pokedex[i].type[1].toLowerCase()
                tipos.appendChild(tipo2)
                }
        } 
    }





    //console.log('buscando pokemon... He encontrado ', pokedex)
    //comprobando el tipo de value que obtenemos
    //(es input type text asi que esta claro que va a ser string)
    //console.log('estoy buscando ', typeof(campoBusqueda.value)) 
}
//trabajao por hacer 
//restricciones de busqueda en buscarPokemon() y funcionalidades (como buscar pokemon con minusculas (listo) o que salgan varios pokemon)

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

