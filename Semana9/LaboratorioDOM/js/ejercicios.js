"use strict";

/**
 * DESARROLLO WEB I | EJERCICIOS PENDIENTES
 * Complete solamente los TODO. Mantenga los nombres de las funciones.
 * Guarde el archivo, actualice el navegador y pulse «Probar ejercicio».
 * Los ejercicios 1-11 afectan el catálogo o la consola; los 12-14
 * trabajan sobre áreas dedicadas para evitar interferencias.
 *
 * IMPORTANTE: NO ejecutar todas las etapas automáticamente; el panel
 * permite avanzar siguiendo el orden de las diapositivas.
 */

window.ejercicios = {
  // EJERCICIO 01 | Diapositiva 4: getElementById()
  1() {
    // TODO: Obtener el elemento cuyo id es "subtitulo".
    // TODO: Mostrar el elemento y su textContent en consola.
    const subtitulo = document.getElementById("subtitulo");
    console.log("Elemento encontrado:", subtitulo);
    console.log("Texto del subtitulo:", subtitulo.textContent);
  },

  // EJERCICIO 02 | Diapositiva 5: getElementsByClassName()
  2() {
    // TODO: Obtener todos los elementos con la clase "taller".
    const talleres = document.getElementsByClassName("taller");
    // TODO: Mostrar cuántos se encontraron.
    console.log("Cantidad de talleres:", talleres.length);
    // TODO: Mostrar el último elemento usando length e índices.
    console.log("Ultimo taller:", talleres.item((talleres.length)-1));
    console.log("Ultimo taller indice:", talleres[talleres.length-1]);
  },

  // EJERCICIO 03 | Diapositiva 6: getElementsByName() y getElementsByTagName()
  3() {
    // TODO: Seleccionar los inputs con name="modalidad"
    const modalidades = document.getElementsByName("modalidad");
    // TODO: Mostrar el value del segundo input.
    console.log("Valor del primer control:", modalidades[1].value);
    // TODO: Obtener todos los elementos <h3> y mostrar su cantidad.
    const articulos = document.getElementsByTagName("h3");
    console.log("Cantidad de etiquetas h3:", articulos.length);
  },

  // EJERCICIO 04 | Diapositiva 7: querySelector()
  4() {
    // TODO: Obtener el título h3 que está dentro del taller "taller-js".
    const titulo = document.querySelector("#taller-css h3");
    // TODO: Mostrar su texto en consola.
    console.log("Título del h3:", titulo.textContent);
    // TODO: Consultar ".taller-inexistente" y comprobar que el resultado es null.
    const inexistente = document.querySelector(".no-existe");
    console.log("Selector sin coincidencias:", inexistente); 
  },

  // EJERCICIO 05 | Diapositiva 8: querySelectorAll()
  5() {
    // TODO: Seleccionar todas las tarjetas .taller cuyo data-nivel sea "inicial".
    // TODO: Mostrar la cantidad de coincidencias.
    // TODO: Recorrer el NodeList y mostrar el id de cada tarjeta.
  },

  // EJERCICIO 06 | Diapositivas 9-10: crear y clonar (sin insertar aún)
  6() {
    // TODO: Crear un elemento <li> mediante document.createElement().
    // TODO: Crear un nodo de texto con "Nuevo taller pendiente".
    // TODO: Clonar con cloneNode(true) el taller "taller-css".
    // TODO: Mostrar en consola los tres nodos creados.
    // IMPORTANTE: no insertar elementos en el documento todavía.
  },

  // EJERCICIO 07 | Diapositiva 11: atributos mediante propiedades
  7() {
    // TODO: Seleccionar "mensaje-estatico".
    // TODO: Cambiar su propiedad title por "Aviso del laboratorio DOM".
    // TODO: Cambiar su propiedad style.color por "#123B7A".
    // TODO: Mostrar en consola el nuevo title.
  },

  // EJERCICIO 08 | Diapositivas 12-13: consultar atributos
  8() {
    // TODO: Seleccionar "taller-js".
    // TODO: Mostrar el valor de su atributo "data-cupo".
    // TODO: Comprobar si tiene atributo "title" usando hasAttribute().
    // TODO: Mostrar todos los nombres de atributos con getAttributeNames().
  },

  // EJERCICIO 09 | Diapositivas 14-15: modificar atributos
  9() {
    // TODO: Seleccionar "taller-js" y "mensaje-estatico".
    // TODO: Asignar data-estado="revisado" al taller JS usando setAttribute().
    // TODO: Eliminar el atributo title del taller JS usando removeAttribute().
    // TODO: Alternar el atributo hidden del mensaje usando toggleAttribute().
    // TODO: Mostrar en consola si el mensaje quedó oculto.
  },

  // EJERCICIO 10 | Diapositiva 16: classList
  10() {
    // TODO: Seleccionar "taller-git" y "bloque-estado".
    // TODO: Agregar "destacado" al taller Git.
    // TODO: Alternar la clase "resaltado" en el taller Git.
    // TODO: Eliminar la clase "atenuada" de "bloque-estado".
    // TODO: Usar contains() para comprobar si el taller Git tiene "destacado".
  },

  // EJERCICIO 11 | Diapositivas 17-18: dataset
  11() {
    // TODO: Seleccionar "taller-css".
    // TODO: Mostrar codigo y modalidad mediante dataset.
    // TODO: Modificar su propiedad dataset.cupo para que sea "15".
    // TODO: Crear dataset.inscripcionAbierta con el valor "true".
    // TODO: Comprobar con getAttribute() el atributo data-inscripcion-abierta.
  },

  // EJERCICIO 12 | Diapositivas 19-20: inserción tradicional
  12() {
    const lista = document.getElementById("lista-tradicional-ejercicio");
    // TODO: Crear un <li> con texto "Agregado al final" e insertarlo con appendChild().
    // TODO: Crear un <li> con texto "Agregado al inicio" e insertarlo
    //       antes del primer hijo usando insertBefore().
    // TODO: Crear un <li> con texto "Referencia reemplazada" y utilizar
    //       replaceChild() para sustituir el li con id="ejercicio-referencia".
    // TODO: Eliminar el li con id="ejercicio-eliminar" usando removeChild().
    // TODO: Mostrar lista.children.length en consola.
    void lista; // Puede retirarse después de completar el ejercicio.
  },

  // EJERCICIO 13 | Diapositiva 21: inserción moderna
  13() {
    const lista = document.getElementById("lista-moderna-ejercicio");
    // TODO: Crear dos <li> e insertarlos al final con una llamada a append().
    // TODO: Crear otro <li> e insertarlo al inicio con prepend().
    // TODO: Insertar un <li> antes del nodo "ejercicio-moderno-ancla" con before().
    // TODO: Insertar un <li> después del mismo nodo con after().
    // TODO: Reemplazar "ejercicio-moderno-reemplazar" con replaceWith().
    // TODO: Eliminar "ejercicio-moderno-eliminar" con remove().
    // TODO: Mostrar en consola cuántos elementos quedan en la lista.
    void lista;
  },

  // EJERCICIO 14 | Diapositivas 22-23: navegación entre nodos
  14() {
    const centro = document.getElementById("navega-centro");
    // TODO: Partiendo ÚNICAMENTE de centro, mostrar el texto
    //       de sus hermanos anterior y siguiente.
    // TODO: Mostrar el id de su padre.
    // TODO: Desde el padre, mostrar el texto del último hijo.
    // Pista: previousElementSibling, nextElementSibling, parentElement,
    //        lastElementChild.
    void centro;
  }
};
