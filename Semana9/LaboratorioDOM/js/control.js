"use strict";

/**
 * INFRAESTRUCTURA DEL LABORATORIO (NO ES CONTENIDO DE LA CLASE).
 * Únicamente conecta los botones del panel con los ejemplos y ejercicios.
 * Los conceptos de eventos y actualización de contenido ya se prepararon.
 * Durante la sesión debe trabajarse en ejemplos.js y ejercicios.js.
 */

const etapas = [
  {
    numero: 1, paginas: "4", titulo: "Seleccionar por identificador",
    ejemplo: "Obtener el encabezado principal por su id e inspeccionarlo en la consola.",
    ejercicio: "Obtener el subtítulo de la cartelera y mostrar el elemento y su texto.",
    criterio: "La consola debe mostrar el párrafo cuyo id es subtitulo y el contenido de ese párrafo."
  },
  {
    numero: 2, paginas: "5", titulo: "Seleccionar por clase CSS",
    ejemplo: "Recuperar los elementos con clase taller y consultar su cantidad y sus primeras posiciones.",
    ejercicio: "Obtener todas las tarjetas, contar cuántas hay y mostrar el último elemento de la colección.",
    criterio: "Inicialmente hay cuatro tarjetas. El último elemento corresponde al taller Git y GitHub."
  },
  {
    numero: 3, paginas: "6", titulo: "Seleccionar por name y etiqueta",
    ejemplo: "Localizar los controles name=modalidad y contar los artículos existentes.",
    ejercicio: "Obtener el segundo control de modalidad y contar todos los elementos h3 del documento.",
    criterio: "El segundo control tiene value='virtual'. Al iniciar, hay nueve h3: cuatro talleres, cuatro áreas de operaciones y el título de la actividad seleccionada."
  },
  {
    numero: 4, paginas: "7", titulo: "El primer elemento coincidente",
    ejemplo: "Usar querySelector() con un selector descendiente y comprobar el resultado de un selector inexistente.",
    ejercicio: "Seleccionar el h3 del taller JavaScript y consultar una clase que no existe.",
    criterio: "El título es 'JavaScript práctico'; el segundo selector devuelve null."
  },
  {
    numero: 5, paginas: "8", titulo: "Todos los elementos coincidentes",
    ejemplo: "Seleccionar talleres presenciales con un selector de atributo y observar el tipo devuelto.",
    ejercicio: "Seleccionar y recorrer todos los talleres cuyo nivel sea inicial.",
    criterio: "Al inicio deben obtenerse dos tarjetas: taller-html y taller-git. querySelectorAll() devuelve un NodeList, no un Array."
  },
  {
    numero: 6, paginas: "9–10", titulo: "Crear y clonar nodos",
    ejemplo: "Crear un article, crear un nodo de texto y clonar en profundidad una tarjeta existente.",
    ejercicio: "Crear un li, crear un nodo de texto y clonar el taller CSS. No insertar todavía los nodos.",
    criterio: "Los nodos deben aparecer en consola, pero la página debe conservar su estructura visual."
  },
  {
    numero: 7, paginas: "11", titulo: "Modificar propiedades HTML",
    ejemplo: "Modificar title, className y una propiedad style de una etiqueta existente.",
    ejercicio: "Actualizar el title y el color de texto del mensaje inferior del catálogo.",
    criterio: "El aviso debe adquirir color azul y su atributo title debe contener el valor indicado en el TODO."
  },
  {
    numero: 8, paginas: "12–13", titulo: "Consultar atributos",
    ejemplo: "Consultar existencia, nombres y valores de atributos del taller HTML.",
    ejercicio: "Consultar data-cupo, comprobar la presencia de title y listar los nombres de atributos del taller JavaScript.",
    criterio: "El taller JS comienza con 20 cupos y posee un atributo title."
  },
  {
    numero: 9, paginas: "14–15", titulo: "Modificar o eliminar atributos",
    ejemplo: "Aplicar setAttribute(), removeAttribute() y toggleAttribute() a elementos preexistentes.",
    ejercicio: "Actualizar data-estado, eliminar title y alternar hidden sobre el mensaje inferior.",
    criterio: "Los cambios deben ser visibles en el inspector de elementos; el mensaje se muestra u oculta al alternar hidden."
  },
  {
    numero: 10, paginas: "16", titulo: "Gestionar clases CSS",
    ejemplo: "Utilizar add(), remove(), toggle(), replace() y contains() con classList.",
    ejercicio: "Destacar la tarjeta Git, alternar su resaltado y eliminar la atenuación del bloque de estado.",
    criterio: "Git debe mostrar borde destacado; el bloque de estado debe recuperar un texto de contraste normal."
  },
  {
    numero: 11, paginas: "17–18", titulo: "Trabajar con dataset",
    ejemplo: "Leer el código de un taller, modificar su cupo y generar data-en-oferta mediante dataset.",
    ejercicio: "Leer datos del taller CSS, cambiar su cupo a 15 y crear data-inscripcion-abierta.",
    criterio: "El inspector debe mostrar data-cupo='15' y data-inscripcion-abierta='true'. Los valores de dataset son cadenas."
  },
  {
    numero: 12, paginas: "19–20", titulo: "Inserción y eliminación tradicional",
    ejemplo: "Aplicar appendChild(), insertBefore(), replaceChild() y removeChild() sobre la lista de demostración.",
    ejercicio: "Realizar las cuatro operaciones sobre la lista tradicional destinada a ejercicios.",
    criterio: "Deben quedar tres li: el insertado al inicio, el que reemplaza la referencia y el agregado al final."
  },
  {
    numero: 13, paginas: "21", titulo: "Métodos modernos de inserción",
    ejemplo: "Aplicar append(), prepend(), before(), after(), replaceWith() y remove() sobre una lista.",
    ejercicio: "Reproducir el flujo sobre la lista moderna destinada a ejercicios.",
    criterio: "La lista debe incorporar nodos al inicio, al final y alrededor del ancla; los nodos de sustitución y retiro desaparecen."
  },
  {
    numero: 14, paginas: "22–23", titulo: "Navegar por el árbol DOM",
    ejemplo: "Inspeccionar children, firstElementChild, lastElementChild y relaciones entre padre y hermanos.",
    ejercicio: "Partir del li cuyo id es navega-centro para localizar hermanos, padre y último hijo.",
    criterio: "Los resultados deben ser HTML, JavaScript, lista-navegacion y Git, respectivamente."
  }
];

let etapaActual = 1;

function mostrarEtapa(numero) {
  const etapa = etapas.find((item) => item.numero === numero);
  if (!etapa) return;
  etapaActual = numero;
  document.getElementById("etapa-paginas").textContent = `Diap. ${etapa.paginas}`;
  document.getElementById("etapa-contador").textContent = `Etapa ${numero} de ${etapas.length}`;
  document.getElementById("etapa-titulo").textContent = etapa.titulo;
  document.getElementById("etapa-ejemplo").textContent = etapa.ejemplo;
  document.getElementById("etapa-ejercicio").textContent = etapa.ejercicio;
  document.getElementById("etapa-criterio").textContent = etapa.criterio;
  document.getElementById("salida-consola").textContent = "Ejecute el ejemplo o el ejercicio de esta etapa.";
  document.querySelectorAll("[data-etapa]").forEach((boton) => {
    if (Number(boton.dataset.etapa) === numero) {
      boton.setAttribute("aria-current", "step");
    } else {
      boton.removeAttribute("aria-current");
    }
  });
}

function formatearArgumento(valor) {
  if (valor === null) return "null";
  if (valor === undefined) return "undefined";
  if (typeof valor === "string") return valor;
  if (typeof valor === "number" || typeof valor === "boolean") return String(valor);
  if (valor instanceof Element) {
    const id = valor.id ? `#${valor.id}` : "";
    const clases = [...valor.classList].map((c) => `.${c}`).join("");
    return `<${valor.tagName.toLowerCase()}${id}${clases}>`;
  }
  if (valor instanceof Text) return `#text "${valor.textContent}"`;
  if (Array.isArray(valor)) return JSON.stringify(valor);
  if (valor instanceof NodeList || valor instanceof HTMLCollection) {
    return `${valor.constructor.name} (${valor.length} elementos)`;
  }
  try { return JSON.stringify(valor); } catch { return String(valor); }
}

function ejecutar(tipo) {
  const catalogo = tipo === "ejemplo" ? window.ejemplos : window.ejercicios;
  const fn = catalogo?.[etapaActual];
  const salida = document.getElementById("salida-consola");
  if (typeof fn !== "function") {
    salida.textContent = "No se encontró la función solicitada.";
    return;
  }

  const registros = [];
  const consolaOriginal = console.log;
  console.log = (...args) => {
    consolaOriginal.apply(console, args);
    registros.push(args.map(formatearArgumento).join(" "));
  };
  try {
    fn();
    salida.textContent = registros.length
      ? registros.join("\n")
      : "Sin mensajes en consola. Si este ejercicio tiene TODO pendientes, complete su función en ejercicios.js.";
  } catch (error) {
    salida.textContent = `${error.name}: ${error.message}\nRevise la consola del navegador para más detalles.`;
    console.error(`Error en ${tipo} ${etapaActual}:`, error);
  } finally {
    console.log = consolaOriginal;
  }
}

// Este cableado de eventos está resuelto para no alterar la secuencia de la clase.
document.querySelectorAll("[data-etapa]").forEach((boton) => {
  boton.addEventListener("click", () => mostrarEtapa(Number(boton.dataset.etapa)));
});
document.getElementById("boton-ejemplo").addEventListener("click", () => ejecutar("ejemplo"));
document.getElementById("boton-ejercicio").addEventListener("click", () => ejecutar("ejercicio"));
document.getElementById("boton-reiniciar").addEventListener("click", () => window.location.reload());
mostrarEtapa(1);
