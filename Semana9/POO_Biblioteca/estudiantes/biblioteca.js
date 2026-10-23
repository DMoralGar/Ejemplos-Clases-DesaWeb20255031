"use strict";

const Biblioteca = (() => {
  // Diapositiva 5. Objeto literal
  const usuarioLiteral = {
    nombre: "Ana",
    prestamos: [],
    prestarLibro(libro) {
      // TODO 05: registrar el libro en prestamos.
    }
  };

  // Diapositiva 6. Función constructora
  function UsuarioConstructor(nombre) {
    this.nombre = nombre;
    this.prestamos = [];
    this.prestarLibro = function (libro) {
      // TODO 06: registrar el libro.
    };
  }

  // Diapositiva 7. Prototipos
  function UsuarioPrototipo(nombre) {
    this.nombre = nombre;
    this.prestamos = [];
  }

  UsuarioPrototipo.prototype.prestarLibro = function (libro) {
    // TODO 07: registrar el libro utilizando this.
  };

  // Diapositivas 8 a 15. Clases, acceso a propiedades y métodos
  class Usuario {
    constructor(nombre) {
      this.nombre = nombre;
      this.prestamos = [];
    }

    prestarLibro(libro) {
      // TODO 08: registrar el libro.
      // TODO 14: validar el libro mediante un método estático.
      // TODO 15: comprobar el límite mediante un método privado.
    }

    devolverLibro(titulo) {
      // TODO 15: eliminar un préstamo por título; devolver true o false.
      return false;
    }

    obtenerPrestamos() {
      return [...this.prestamos];
    }

    // TODO 09: definir get nombre() y set nombre(valor).
    //           El setter debe rechazar nombres vacíos y quitar espacios externos.
    // TODO 10: definir get cantidadPrestamos() y get librosPrestados().
    // TODO 13: convertir nombre y prestamos en propiedades privadas (#).
    //           Los getters deben devolver copias de los libros.
    // TODO 14: definir static esLibroValido(libro).
    // TODO 15: definir #tieneCupo() y get limitePrestamos() (valor: 3).
    // TODO 16: definir descripcion() con nombre y cantidad/límite.
  }

  // Diapositivas 16 y 17. Herencia y super
  class Estudiante extends Usuario {
    constructor(nombre) {
      super(nombre);
    }

    // TODO 16: sobrescribir limitePrestamos (valor: 2).
    // TODO 17: sobrescribir descripcion() y utilizar super.descripcion().
  }

  class Docente extends Usuario {
    constructor(nombre) {
      super(nombre);
    }

    // TODO 16: sobrescribir limitePrestamos (valor: 5).
    // TODO 17: sobrescribir descripcion() y utilizar super.descripcion().
  }

  return {
    usuarioLiteral,
    UsuarioConstructor,
    UsuarioPrototipo,
    Usuario,
    Estudiante,
    Docente
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Biblioteca;
}
if (typeof window !== "undefined") {
  window.Biblioteca = Biblioteca;
}
