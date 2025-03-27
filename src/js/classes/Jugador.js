class Jugador {
    /**
     * Constructor de la clase Jugador
     * @param {string} name - El nombre del jugador
     * @param {string} apellido1 - El primer apellido del jugador
     * @param {string} apellido2 - El segundo apellido del jugador
     * @param {string} email - El email del jugador
     * @param {string} fnac - La fecha de nacimiento del jugador
     */
    constructor(name, apellido1, apellido2, email, fnac, numeroFav) {
      this.name = name
      this.apellido1 = apellido1
      this.apellido2 = apellido2
      this.email = email
      this.fnac = fnac
      this.numeroFav = numeroFav
    }
    /**
     * Presenta al usuario, mostrando su nombre, apellidos, fecha de nacimiento y email.
     */
    introduceSelf() {
        console.log(`Hola, me llamo ${this.name} ${this.apellido1} ${this.apellido2}.`);
        console.log(`Nací el ${this.fnac}.`);
        console.log(`Mi email es ${this.email}.`);
    }
}