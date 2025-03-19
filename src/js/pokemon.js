// ## Tarea buscar y mostrar pokemon

// # Lenguaje comun
// 1.Escribo en el buscador el nombre o numero y pulso el boton
// 2.El JS busca en la base de datos el valor
// 3.Si el valor coincide mostramos pokemon o pokemones coincidentes
// 4.Si el valor no coincide con ningun dato de nuestra base de datos limpiamos 
// la tabla y mostramos el mensaje "No coincide con ningun pokemon"

// # Pseudocodigo
// 1. SET  busqueda = INPUT nombre o nº pokemon
// 2. IF busqueda = algun valor de la BBDD
// 2.1 PRINT Lista con valores coincidentes
// 2.2 ELSE PRINT "No se encuentra pokemon"

//Variables
let variable1 ="'texto variable 1' ";
let variable2 = 140 ;
let variableObjeto = 120 ;

//Constante
const MI_CONSTANTE = "Esto no cambia";

//arrays
let array =[
    "azul",
    "rojo",
    "amarillo",
    "verde"
];
//objeto
let miObjeto ={
    elemento1:  "elemento 1 del objeto",
    elemento2:  "elemento 2 del objeto",
    elemento3: "elemento 3 del objeto",
    elemento4: "elemento 4 del objeto",
};
let objeto={
    a: variableObjeto,
    b: variable1,
    color: array[1]
};
console.log("variable 1 es texto ",variable1,"variable 2 es un numero ",variable2);
console.log("Valor de la constante ",MI_CONSTANTE);
console.log("Este es el array ", array);
console.log("Este es el objeto", miObjeto);
console.log("Este es el elemento 1 del array: ",array[0]);
console.log(objeto);
console.log("El color del pokemon es: ",objeto["color"]);
