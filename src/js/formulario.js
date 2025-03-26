
window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function onDOMContentLoaded() {
    let formulario = document.getElementById('formulario-informacion')
    formulario.addEventListener('submit', encontrarPokemonEstadisticas)
}
function encontrarPokemonEstadisticas(event){
    let formulario = document.getElementById('input-buscador')
    let listaInformacion = document.getElementsByClassName('lista-informacion')[0]

    event.preventDefault()


    if(formulario === ''){
        let errorBusqueda = document.createElement('p')
        errorBusqueda.innerText = 'Introduce un pokemon por id o nombre'
        listaInformacion.appendChild(errorBusqueda)
        return 
    }
    
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${formulario.value}`)
        .then((respuesta) => { //respuesta es la informacion que nos devuelve la API
        // Vemos si la respuesta es correcta
        if (!respuesta.ok) {//Comprobamos si la respuesta es diferente de ok por lo que nos daria error
            throw new Error(`HTTP error! Status: ${respuesta.status}`);
        }
        // Devolvemos la información en forma de JSON
        return respuesta.json();
        })
        .then((informacionPokemonApi) => {

            //console.log(formulario.value)
            //console.log(informacionPokemonApi)
            while (listaInformacion.firstChild) {
                // console.log('borrando')
                listaInformacion.removeChild(listaInformacion.firstChild) 
             }
             pintarPokemonEstadisticas(informacionPokemonApi)
        })
        .catch((mensajeError) => {
            let error = document.createElement('p')
            error.innerText = 'UPS... Pokemon no encontrado'
            error.setAttribute('class', 'error')
            while (listaInformacion.firstChild) {
                listaInformacion.removeChild(listaInformacion.firstChild) 
             }
            listaInformacion.appendChild(error)
            listaInformacion.closest('.lista-informacion').classList.add('error')
            console.log(error)
        })
}

function pintarPokemonEstadisticas(pokemon){
    console.log(pokemon)
    let listaInformacion = document.getElementsByClassName('lista-informacion')[0]

    let informacionPokemon = document.createElement('li')
    informacionPokemon.setAttribute('class', 'caja-pokemon-informacion')
    
    let figureInformacion = document.createElement('figure')
    figureInformacion.setAttribute('class','figure-informacion')

    let nombrePokemon = document.createElement('p')
    nombrePokemon.setAttribute('class', 'nombre-pokemon')
    nombrePokemon.innerText = pokemon.name

    let generacionPokemon = document.createElement('p')
    generacionPokemon.innerText = 'Generacion : ' + pokemon.generation.name

    let legendary = document.createElement('p')
    if(pokemon.is_legendary === false){
        legendary.innerText = 'No es legendario'
    } else {
        legendary.innerText = 'Es legendario'
    }

    let grupoHuevos = document.createElement('p')
    grupoHuevos.innerText = 'Su famila de huevos es: ' + pokemon.egg_groups.map((eggGroup) => eggGroup.name).join(', ')
    
    let tasaCrecimiento = document.createElement('p')
    tasaCrecimiento.innerText = 'Tasa de crecimiento: ' + pokemon.growth_rate.name

    let imagenPokemon = document.createElement('img')
    imagenPokemon.setAttribute('src', '../pokedex-repo/images/' + String(pokemon.id).padStart(3, '0') + '.png')
    imagenPokemon.setAttribute('class','imgPokemon')

    listaInformacion.appendChild(informacionPokemon)
    informacionPokemon.appendChild(figureInformacion)
    figureInformacion.appendChild(imagenPokemon)
    figureInformacion.appendChild(nombrePokemon)
    figureInformacion.appendChild(generacionPokemon)
    figureInformacion.appendChild(legendary)
    figureInformacion.appendChild(grupoHuevos)
    figureInformacion.appendChild(tasaCrecimiento)





}