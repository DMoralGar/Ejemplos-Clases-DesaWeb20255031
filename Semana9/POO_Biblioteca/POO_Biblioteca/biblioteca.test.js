"use strict";

const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const {
  usuarioLiteral,
  UsuarioConstructor,
  UsuarioPrototipo,
  Usuario,
  Estudiante,
  Docente
} = require("./biblioteca.js");

const PRINCIPITO = { titulo: "El principito", autor: "Antoine de Saint-Exupéry" };
const libroNumerado = (n) => ({ titulo: `Libro ${n}`, autor: "Autor de prueba" });

// Activar los bloques siguientes cambiando describe.skip por describe.

describe("05 · Objetos literales", () => {
  test("registra un préstamo utilizando this", () => {
    assert.equal(usuarioLiteral.nombre, "Ana");
    usuarioLiteral.prestarLibro(PRINCIPITO);
    assert.deepEqual(usuarioLiteral.prestamos, [PRINCIPITO]);
  });
});

describe.skip("06 · Funciones constructoras", () => {
  test("las instancias mantienen préstamos independientes", () => {
    const ana = new UsuarioConstructor("Ana");
    const luis = new UsuarioConstructor("Luis");
    ana.prestarLibro(PRINCIPITO);
    assert.equal(ana.prestamos.length, 1);
    assert.equal(luis.prestamos.length, 0);
  });

  test("el método definido en el constructor es distinto en cada instancia", () => {
    const ana = new UsuarioConstructor("Ana");
    const luis = new UsuarioConstructor("Luis");
    assert.notEqual(ana.prestarLibro, luis.prestarLibro);
  });
});

describe.skip("07 · Prototipos", () => {
  test("el método del prototipo se comparte entre instancias", () => {
    const ana = new UsuarioPrototipo("Ana");
    const luis = new UsuarioPrototipo("Luis");
    assert.equal(ana.prestarLibro, luis.prestarLibro);
    assert.equal(Object.hasOwn(ana, "prestarLibro"), false);
    ana.prestarLibro(PRINCIPITO);
    assert.deepEqual(ana.prestamos, [PRINCIPITO]);
    assert.deepEqual(luis.prestamos, []);
  });
});

describe.skip("08 · Clases", () => {
  test("crea instancias con métodos compartidos y estado independiente", () => {
    const ana = new Usuario("Ana");
    const luis = new Usuario("Luis");
    ana.prestarLibro(PRINCIPITO);
    assert.deepEqual(ana.obtenerPrestamos(), [PRINCIPITO]);
    assert.deepEqual(luis.obtenerPrestamos(), []);
    assert.equal(ana.prestarLibro, luis.prestarLibro);
  });
});

describe.skip("09–10 · Getters y setters", () => {
  test("el setter valida el nombre y elimina espacios externos", () => {
    const ana = new Usuario("  Ana  ");
    assert.equal(ana.nombre, "Ana");
    ana.nombre = "  María ";
    assert.equal(ana.nombre, "María");
    assert.throws(() => { ana.nombre = "   "; }, TypeError);
    assert.equal(ana.nombre, "María");
  });

  test("los getters exponen los préstamos sin llamar métodos", () => {
    const ana = new Usuario("Ana");
    ana.prestarLibro(PRINCIPITO);
    assert.equal(ana.cantidadPrestamos, 1);
    assert.deepEqual(ana.librosPrestados, [PRINCIPITO]);
  });
});

describe.skip("11–13 · Propiedades públicas y privadas", () => {
  test("no permite modificar los préstamos desde una propiedad pública", () => {
    const ana = new Usuario("Ana");
    ana.prestarLibro(PRINCIPITO);
    assert.equal(ana.prestamos, undefined);
    assert.equal(Object.hasOwn(ana, "_nombre"), false);
  });

  test("la colección y sus objetos no se pueden alterar a través del getter", () => {
    const ana = new Usuario("Ana");
    ana.prestarLibro(PRINCIPITO);
    const copia = ana.librosPrestados;
    copia.push(libroNumerado(2));
    copia[0].titulo = "Título modificado";
    assert.equal(ana.cantidadPrestamos, 1);
    assert.deepEqual(ana.obtenerPrestamos(), [PRINCIPITO]);
  });
});

describe.skip("14 · Métodos estáticos", () => {
  test("valida un libro usando la clase, sin crear instancias", () => {
    assert.equal(Usuario.esLibroValido(PRINCIPITO), true);
    assert.equal(Usuario.esLibroValido({ titulo: "", autor: "Anónimo" }), false);
    assert.equal(Usuario.esLibroValido({ titulo: "Libro" }), false);
    assert.equal(Usuario.esLibroValido(null), false);
    assert.equal(new Usuario("Ana").esLibroValido, undefined);
  });

  test("el método de instancia rechaza préstamos inválidos", () => {
    const ana = new Usuario("Ana");
    assert.throws(() => ana.prestarLibro({ titulo: " ", autor: "Autor" }), TypeError);
    assert.equal(ana.cantidadPrestamos, 0);
  });
});

describe.skip("15 · Métodos privados", () => {
  test("impide exceder el límite de tres libros", () => {
    const ana = new Usuario("Ana");
    for (let i = 1; i <= 3; i++) ana.prestarLibro(libroNumerado(i));
    assert.equal(ana.cantidadPrestamos, 3);
    assert.throws(() => ana.prestarLibro(libroNumerado(4)), RangeError);
    assert.equal(ana.cantidadPrestamos, 3);
    assert.equal("#tieneCupo" in ana, false);
  });

  test("al devolver un libro, queda disponible un préstamo", () => {
    const ana = new Usuario("Ana");
    for (let i = 1; i <= 3; i++) ana.prestarLibro(libroNumerado(i));
    assert.equal(ana.devolverLibro("Libro 2"), true);
    assert.equal(ana.devolverLibro("Inexistente"), false);
    ana.prestarLibro(libroNumerado(4));
    assert.deepEqual(ana.librosPrestados.map((libro) => libro.titulo), [
      "Libro 1", "Libro 3", "Libro 4"
    ]);
  });
});

describe.skip("16–17 · Herencia, super y polimorfismo", () => {
  test("Estudiante y Docente heredan de Usuario", () => {
    assert.equal(new Estudiante("Ana") instanceof Usuario, true);
    assert.equal(new Docente("Luis") instanceof Usuario, true);
  });

  test("el mismo método respeta límites distintos", () => {
    const estudiante = new Estudiante("Ana");
    const docente = new Docente("Luis");
    assert.equal(estudiante.limitePrestamos, 2);
    assert.equal(docente.limitePrestamos, 5);
    for (let i = 1; i <= 2; i++) estudiante.prestarLibro(libroNumerado(i));
    assert.throws(() => estudiante.prestarLibro(libroNumerado(3)), RangeError);
    for (let i = 1; i <= 5; i++) docente.prestarLibro(libroNumerado(i));
    assert.throws(() => docente.prestarLibro(libroNumerado(6)), RangeError);
  });

  test("un método sobrescrito puede llamar a la implementación padre con super", () => {
    const estudiante = new Estudiante("Ana");
    const docente = new Docente("Luis");
    assert.equal(estudiante.descripcion(), "Estudiante · Ana: 0 de 2 préstamos");
    assert.equal(docente.descripcion(), "Docente · Luis: 0 de 5 préstamos");
  });
});
