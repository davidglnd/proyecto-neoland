// 3. READ base de datos
import pokedex from '../pokedex/pokedex.json' with { type: "json" }

/*
# Tarea: buscar un pokemon

1. Escribo en el formulario el nombre o el número del pokemon
2. Pincho en el botón de buscar
3. Usando Javascript, busco en la base de datos un pokemon que coincida con la búsqueda
4. Devuelvo los datos de ese pokemon a la página web
5. Limpio la tabla de pokemons para dejarla preparada
6. Añado un LI a la lista ordenada de pokemons con los datos del pokemon y la estructura HTML
*/

window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

/**
 * Evento que se lanza cuando el contenido de la página ha sido cargado en memoria
 * y se puede acceder a él.
 * @listens DOMContentLoaded
 */
function onDOMContentLoaded() {
    let botonBuscar = document.getElementById('botonbusqueda')
    // Asigno los eventos que se observan a partir de que cargue la página
 
    // 2. CLICK en botón de submit
    botonBuscar.addEventListener('click', buscarPokemon)

    // Leo la lista de pokemons y pinto el HTML
    leerListaPokemons()



}

function leerListaPokemons() {
    let listaPokemons = document.getElementsByClassName('lista-pokemons')[0]
    for(let i = 0; i < 12; i++) {

        let nuevoPokemon = document.createElement('li')
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
        if (pokedex[i].id < 10) {
            imagenPokemon.setAttribute('src', '../pokedex/images/00' + pokedex[i].id + '.png')
        }
        if (pokedex[i].id >= 10 && pokedex[i].id < 100) {
            imagenPokemon.setAttribute('src', '../pokedex/images/0' + pokedex[i].id + '.png')
        }
        if (pokedex[i].id >= 100) {
            imagenPokemon.setAttribute('src', '../pokedex/images/' + pokedex[i].id + '.png')
        }
        imagenPokemon.setAttribute('alt',  pokedex[i].name.english)
        imagenPokemon.setAttribute('title', pokedex[i].name.english)
        imagenPokemon.setAttribute('loading', 'lazy')
        pokemon.appendChild(imagenPokemon)

        let nombrePokemon = document.createElement('h5')
        nombrePokemon.textContent = pokedex[i].name.english
        pokemon.appendChild(nombrePokemon)

        let numeroPokedex = document.createElement('p')
        numeroPokedex.textContent = 'Nº' + pokedex[i].id
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
            console.log('hay 2 tipos')
            let tipo2 = document.createElement('span')
            tipo2.textContent = pokedex[i].type[1]
            tipo2.classList ='tag ' + pokedex[i].type[1].toLowerCase()
            tipos.appendChild(tipo2)
        } else {
            console.log('no hay 2 tipos') 
        }
        
        
        

        
        
    }
    
}
/**
 * Busco un pokemon determinado usando el formulario de búsqueda
 */
function buscarPokemon() {
    // Definimos variables
    let campoBusqueda = document.getElementById('input-buscador')
    let dondeNuevaLista = document.getElementsByClassName('main-pokedex')[0] //variable con el main que es donde vamos a pintar el pokemon

    for (let i = 0; i < pokedex.length; i++) {
        if (pokedex[i].name.english == campoBusqueda.value){//este if verifica si el nombre esta dentro de la pokedex
            //consolelog para comprobar el parametro
            console.log('Buscas por nombre ' + pokedex[i].name.english + ' con id ' + pokedex[i].id)

            //definimos la variable con el elemento a borrar
            let listaPokemonsBorrar = document.getElementsByClassName('lista-pokemons')[0]
            console.log(listaPokemonsBorrar)
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
            if (pokedex[i].id < 10) {
                imagenPokemon.setAttribute('src', '../pokedex/images/00' + pokedex[i].id + '.png')
            }
            if (pokedex[i].id >= 10 && pokedex[i].id < 100) {
                imagenPokemon.setAttribute('src', '../pokedex/images/0' + pokedex[i].id + '.png')
            }
            if (pokedex[i].id >= 100) {
                imagenPokemon.setAttribute('src', '../pokedex/images/' + pokedex[i].id + '.png')
            }
            imagenPokemon.setAttribute('alt',  pokedex[i].name.english)
            imagenPokemon.setAttribute('title', pokedex[i].name.english)
            imagenPokemon.setAttribute('loading', 'lazy')
            pokemon.appendChild(imagenPokemon)

            let nombrePokemon = document.createElement('h5')
            nombrePokemon.textContent = pokedex[i].name.english
            pokemon.appendChild(nombrePokemon)

            let numeroPokedex = document.createElement('p')
            numeroPokedex.textContent = 'Nº' + pokedex[i].id
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
                console.log('hay 2 tipos')
                let tipo2 = document.createElement('span')
                tipo2.textContent = pokedex[i].type[1]
                tipo2.classList ='tag ' + pokedex[i].type[1].toLowerCase()
                tipos.appendChild(tipo2)
                } else {
                    console.log('no hay 2 tipos') 
                }
        } else {
            if(pokedex[i].id == campoBusqueda.value){//este if verifica si el esta numero dentro de la pokedex
                //consolelog para comprobar el parametro
                console.log('Buscas por id ' + pokedex[i].id + ' con nombre ' + pokedex[i].name.english)

                //definimos la variable con el elemento a borrar
                let listaPokemonsBorrar = document.getElementsByClassName('lista-pokemons')[0]
                console.log(listaPokemonsBorrar)
                listaPokemonsBorrar.parentNode.removeChild(listaPokemonsBorrar)

                //empezamos a pintar de 0 empezando por el nuevo ol
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
                if (pokedex[i].id < 10) {
                    imagenPokemon.setAttribute('src', '../pokedex/images/00' + pokedex[i].id + '.png')
                }
                if (pokedex[i].id >= 10 && pokedex[i].id < 100) {
                    imagenPokemon.setAttribute('src', '../pokedex/images/0' + pokedex[i].id + '.png')
                }
                if (pokedex[i].id >= 100) {
                    imagenPokemon.setAttribute('src', '../pokedex/images/' + pokedex[i].id + '.png')
                }
                imagenPokemon.setAttribute('alt',  pokedex[i].name.english)
                imagenPokemon.setAttribute('title', pokedex[i].name.english)
                imagenPokemon.setAttribute('loading', 'lazy')
                pokemon.appendChild(imagenPokemon)

                let nombrePokemon = document.createElement('h5')
                nombrePokemon.textContent = pokedex[i].name.english
                pokemon.appendChild(nombrePokemon)

                let numeroPokedex = document.createElement('p')
                numeroPokedex.textContent = 'Nº' + pokedex[i].id
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
                    console.log('hay 2 tipos')
                    let tipo2 = document.createElement('span')
                    tipo2.textContent = pokedex[i].type[1]
                    tipo2.classList ='tag ' + pokedex[i].type[1].toLowerCase()
                    tipos.appendChild(tipo2)
                } else {
                    console.log('no hay 2 tipos') 
                }


                //console.log(dondeNuevaLista)//console de control de como va la variable
            }
        }
    }





    //console.log('buscando pokemon... He encontrado ', pokedex)
    //comprobando el tipo de value que obtenemos
    //(es input type text asi que esta claro que va a ser string)
    //console.log('estoy buscando ', typeof(campoBusqueda.value)) 
}

//Pruebas

    // 4. FOR cada pokemon de la base de datos
    // 4.1. IF encuentro pokemon RETURN datos del pokemon
    // 4.2. ELSE devuelvo "pokemon no encontrado"
    // 5. SHOW tabla de datos (lista-pokemons) limpia
    // 6.1. IF hay pokemon, lo añado a la lista con DISPLAY
    // 6.1.1. IF hay más de un pokemon, con FOR por cada pokemon añado su ficha a la lista
    // 6.2. ELSE no hay pokemon, muestro "pokemon no encontrado" en lugar de la lista-pokemons