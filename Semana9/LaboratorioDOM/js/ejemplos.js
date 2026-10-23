"use strict";

/**
 * DESARROLLO WEB I | DEMOSTRACIONES RESUELTAS
 * Cada función corresponde a una etapa de la clase.
 * El archivo control.js ejecuta las funciones al pulsar «Ejecutar ejemplo».
 * Abrir las herramientas del navegador (F12) para inspeccionar el resultado.
 */

window.ejemplos = {
  // ETAPA 01 | Diapositiva 4: getElementById()
  1() {
    const titulo = document.getElementById("titulo-principal");
    console.log("Elemento encontrado:", titulo);
    console.log("Texto del título:", titulo.textContent);
  },

  // ETAPA 02 | Diapositiva 5: getElementsByClassName()
  2() {
    const talleres = document.getElementsByClassName("taller");
    console.log("Cantidad de talleres:", talleres.length);
    console.log("Primer taller:", talleres[0]);
    console.log("Segundo taller:", talleres[1]);
  },

  // ETAPA 03 | Diapositiva 6: getElementsByName() y getElementsByTagName()
  3() {
    const modalidades = document.getElementsByName("modalidad");
    const articulos = document.getElementsByTagName("article");
    console.log("Controles con name='modalidad':", modalidades.length);
    console.log("Valor del primer control:", modalidades[0].value);
    console.log("Cantidad de etiquetas article:", articulos.length);
  },

  // ETAPA 04 | Diapositiva 7: querySelector()
  4() {
    const primerTaller = document.querySelector("#catalogo-talleres .taller");
    const titulo = document.querySelector("#taller-css h3");
    const inexistente = document.querySelector(".no-existe");
    console.log("Primer taller:", primerTaller.id);
    console.log("Título del taller CSS:", titulo.textContent);
    console.log("Selector sin coincidencias:", inexistente); // null
  },

  // ETAPA 05 | Diapositiva 8: querySelectorAll()
  5() {
    const presenciales = document.querySelectorAll('.taller[data-modalidad="presencial"]');
    console.log("Talleres presenciales:", presenciales.length);
    console.log("Primer presencial:", presenciales[0].id);
    console.log("¿Es un Array?:", Array.isArray(presenciales)); // false: NodeList
  },

  // ETAPA 06 | Diapositivas 9-10: creación, texto y clonación
  6() {
    const articuloNuevo = document.createElement("article");
    const textoNuevo = document.createTextNode("Taller de accesibilidad web");
    const tarjetaClonada = document.getElementById("taller-html").cloneNode(true);
    console.log("Elemento creado (todavía fuera del DOM):", articuloNuevo);
    console.log("Nodo de texto creado:", textoNuevo);
    console.log("Clon con contenido:", tarjetaClonada);
    console.log("¿El nuevo article está en el documento?:", articuloNuevo.isConnected);
  },

  // ETAPA 07 | Diapositiva 11: atributos mediante propiedades
  7() {
    const etiqueta = document.getElementById("etiqueta-atributos");
    etiqueta.title = "Identificador del catálogo de talleres";
    etiqueta.className = "etiqueta-sistema etiqueta-promocion";
    etiqueta.style.letterSpacing = "0.05em";
    console.log("Atributo title:", etiqueta.title);
    console.log("Clases asignadas:", etiqueta.className);
  },

  // ETAPA 08 | Diapositivas 12-13: consultar atributos
  8() {
    const taller = document.getElementById("taller-html");
    console.log("¿Tiene atributos?:", taller.hasAttributes());
    console.log("¿Tiene data-cupo?:", taller.hasAttribute("data-cupo"));
    console.log("Código:", taller.getAttribute("data-codigo"));
    console.log("Nombres de atributos:", taller.getAttributeNames());
    console.log("Atributo inexistente:", taller.getAttribute("data-inexistente")); // null
  },

  // ETAPA 09 | Diapositivas 14-15: modificar, alternar y eliminar atributos
  9() {
    const taller = document.getElementById("taller-css");
    const otroTaller = document.getElementById("taller-git");
    const nota = document.getElementById("nota-temporal");
    taller.setAttribute("data-estado", "revisado");
    otroTaller.removeAttribute("title");
    nota.toggleAttribute("hidden");
    console.log("Estado del taller CSS:", taller.getAttribute("data-estado"));
    console.log("¿El taller Git conserva title?:", otroTaller.hasAttribute("title"));
    console.log("¿La nota está oculta?:", nota.hasAttribute("hidden"));
  },

  // ETAPA 10 | Diapositiva 16: classList
  10() {
    const javascript = document.getElementById("taller-js");
    const css = document.getElementById("taller-css");
    const html = document.getElementById("taller-html");
    const estado = document.getElementById("bloque-estado");
    javascript.classList.add("destacado");
    css.classList.remove("atenuada");
    html.classList.toggle("resaltado");
    estado.classList.replace("compacta", "amplia");
    console.log("¿JavaScript está destacado?:", javascript.classList.contains("destacado"));
  },

  // ETAPA 11 | Diapositivas 17-18: atributos data-* y dataset
  11() {
    const taller = document.getElementById("taller-html");
    console.log("Código:", taller.dataset.codigo);
    console.log("Cupos antes:", taller.dataset.cupo);
    taller.dataset.cupo = "27";
    taller.dataset.enOferta = "true"; // data-en-oferta="true"
    console.log("Cupos después:", taller.dataset.cupo);
    console.log("Atributo creado:", taller.getAttribute("data-en-oferta"));
    console.log("Tipo de data-cupo:", typeof taller.dataset.cupo); // string
  },

  // ETAPA 12 | Diapositivas 19-20: métodos clásicos
  12() {
    const lista = document.getElementById("lista-tradicional-demo");
    const alFinal = document.createElement("li");
    alFinal.textContent = "Agregado con appendChild()";
    lista.appendChild(alFinal);

    const alInicio = document.createElement("li");
    alInicio.textContent = "Insertado con insertBefore()";
    lista.insertBefore(alInicio, lista.firstElementChild);

    const antiguo = document.getElementById("tradicional-reemplazar");
    if (antiguo) {
      const reemplazo = document.createElement("li");
      reemplazo.textContent = "Reemplazado con replaceChild()";
      lista.replaceChild(reemplazo, antiguo);
    }

    const paraEliminar = document.getElementById("tradicional-eliminar");
    if (paraEliminar) lista.removeChild(paraEliminar);
    console.log("Elementos actuales:", lista.children.length);
  },

  // ETAPA 13 | Diapositiva 21: métodos modernos
  13() {
    const lista = document.getElementById("lista-moderna-demo");
    const elemento1 = document.createElement("li");
    elemento1.textContent = "Primer elemento con append()";
    const elemento2 = document.createElement("li");
    elemento2.textContent = "Segundo elemento con append()";
    lista.append(elemento1, elemento2);

    const primero = document.createElement("li");
    primero.textContent = "Agregado con prepend()";
    lista.prepend(primero);

    const ancla = document.getElementById("moderna-ancla");
    const anterior = document.createElement("li");
    anterior.textContent = "Agregado con before()";
    ancla.before(anterior);
    const siguiente = document.createElement("li");
    siguiente.textContent = "Agregado con after()";
    ancla.after(siguiente);

    const sustituir = document.getElementById("moderna-reemplazar");
    if (sustituir) {
      const reemplazo = document.createElement("li");
      reemplazo.textContent = "Sustituido con replaceWith()";
      sustituir.replaceWith(reemplazo);
    }
    const eliminar = document.getElementById("moderna-eliminar");
    if (eliminar) eliminar.remove();
    console.log("Métodos modernos aplicados:", lista.children.length, "elementos");
  },

  // ETAPA 14 | Diapositivas 22-23: relaciones entre nodos
  14() {
    const lista = document.getElementById("lista-navegacion");
    const primero = lista.firstElementChild;
    const ultimo = lista.lastElementChild;
    const segundo = primero.nextElementSibling;
    console.log("Hijos:", lista.children.length);
    console.log("Primer hijo:", primero.textContent);
    console.log("Último hijo:", ultimo.textContent);
    console.log("Siguiente del primero:", segundo.textContent);
    console.log("Anterior del último:", ultimo.previousElementSibling.textContent);
    console.log("Padre del segundo:", segundo.parentElement.id);
  }
};
