function guardarGeneraciones(id){
    let listaGeneraciones = [] 
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((respuesta) => { //respuesta es la informacion que nos devuelve la API
        // Vemos si la respuesta es correcta
        if (!respuesta.ok) {//Comprobamos si la respuesta es diferente de ok por lo que nos daria error
            throw new Error(`HTTP error! Status: ${respuesta.status}`);
        }
        // Devolvemos la información en forma de JSON
        return respuesta.json();
        })
        .then((informacionPokemonApi) => {
            if (localStorage.getItem('Generaciones')) {
                listaGeneraciones = JSON.parse(localStorage.getItem('Generaciones'))
            }
            
            if(listaGeneraciones.includes(informacionPokemonApi.generation.name + id)){
                listaGeneraciones = listaGeneraciones.filter(generacionid => generacionid !== informacionPokemonApi.generation.name + id)
            }else{
                listaGeneraciones.push(informacionPokemonApi.generation.name + id)
            }
            localStorage.setItem('Generaciones', JSON.stringify(listaGeneraciones))
        })
        
}
function makeFavorite(event){
    let listaFavoritos = []
        if (localStorage.getItem('ID Favoritos')) {
            listaFavoritos = JSON.parse(localStorage.getItem('ID Favoritos'))
        }
    
        if(listaFavoritos.includes(this.dataset.id)){

            listaFavoritos = listaFavoritos.filter(id => id !== this.dataset.id)
            this.parentNode.classList.remove('favorite')
            this.removeAttribute('src')
            this.setAttribute('src', '/img/favoritosinmarcar.png')
            guardarGeneraciones(this.dataset.id);
            
        }else{
            listaFavoritos.push(this.dataset.id)
            this.parentNode.classList.add('favorite')
            this.removeAttribute('src')
            this.setAttribute('src', '/img/favoritomarcado.png')
            guardarGeneraciones(this.dataset.id);
            //console.log(this.dataset.id)
        }
        
        localStorage.setItem('ID Favoritos', JSON.stringify(listaFavoritos))
        mostrarFavoritos(); 
 }