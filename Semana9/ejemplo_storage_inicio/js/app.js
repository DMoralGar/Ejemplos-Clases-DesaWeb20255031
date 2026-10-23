"use strict";

// Los datos iniciales permiten comprobar que el CRUD funciona
// aunque todavía no exista ningún mecanismo de persistencia.
const TAREAS_INICIALES = [
  { id: "demo-1", titulo: "Estudiar eventos del DOM", prioridad: "alta", completada: false },
  { id: "demo-2", titulo: "Resolver ejercicios de arreglos", prioridad: "media", completada: true },
  { id: "demo-3", titulo: "Revisar apuntes de JSON", prioridad: "baja", completada: false }
];

const CLAVE_TAREAS = "dw1:tareas-academicas";

// =============================================================
// ACTIVIDAD EN CLASE: IMPLEMENTAR LA PERSISTENCIA CON localStorage
// =============================================================
function cargarTareas() {
  // TODO 1: Recuperar la cadena JSON desde localStorage.
  // Si no hay datos guardados, utilizar las tareas iniciales.
  // Convertir el JSON recuperado a un arreglo de objetos.
  return TAREAS_INICIALES.map((tarea) => ({ ...tarea }));
}

function guardarTareas() {
  // TODO 2: Convertir el arreglo "tareas" a JSON y almacenarlo
  // en localStorage con la clave CLAVE_TAREAS.
}
// =============================================================

let tareas = cargarTareas();
let idEdicion = null;

const formulario = document.querySelector("#form-tarea");
const inputTitulo = document.querySelector("#titulo");
const selectPrioridad = document.querySelector("#prioridad");
const botonGuardar = document.querySelector("#boton-guardar");
const botonCancelar = document.querySelector("#boton-cancelar");
const listaTareas = document.querySelector("#lista-tareas");
const contador = document.querySelector("#contador");

function crearBoton(etiqueta, accion, id, clase = "") {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = `button button--small ${clase}`.trim();
  boton.textContent = etiqueta;
  boton.dataset.accion = accion;
  boton.dataset.id = id;
  return boton;
}

function renderizarTareas() {
  listaTareas.replaceChildren();

  for (const tarea of tareas) {
    const elemento = document.createElement("li");
    elemento.className = tarea.completada ? "task task--done" : "task";

    const contenido = document.createElement("div");
    contenido.className = "task__main";

    const titulo = document.createElement("h3");
    titulo.className = "task__title";
    titulo.textContent = tarea.titulo;

    const detalle = document.createElement("p");
    detalle.className = "task__meta";
    detalle.textContent = tarea.completada ? "Completada · " : "Pendiente · ";

    const prioridad = document.createElement("span");
    prioridad.className = `priority priority--${tarea.prioridad}`;
    prioridad.textContent = `Prioridad ${tarea.prioridad}`;

    const acciones = document.createElement("div");
    acciones.className = "task__actions";
    acciones.append(
      crearBoton(tarea.completada ? "Reabrir" : "Completar", "alternar", tarea.id),
      crearBoton("Editar", "editar", tarea.id),
      crearBoton("Eliminar", "eliminar", tarea.id, "button--danger")
    );

    detalle.append(prioridad);
    contenido.append(titulo, detalle);
    elemento.append(contenido, acciones);
    listaTareas.append(elemento);
  }

  if (tareas.length === 0) {
    const aviso = document.createElement("li");
    aviso.className = "empty";
    aviso.textContent = "No hay tareas registradas. Agregue una desde el formulario.";
    listaTareas.append(aviso);
  }

  const pendientes = tareas.filter((tarea) => !tarea.completada).length;
  contador.textContent = `${pendientes} pendientes de ${tareas.length}`;
}

function limpiarFormulario() {
  formulario.reset();
  idEdicion = null;
  botonGuardar.textContent = "Agregar tarea";
  botonCancelar.hidden = true;
}

function crearId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const titulo = inputTitulo.value.trim();
  if (!titulo) return;

  const prioridad = selectPrioridad.value;

  if (idEdicion !== null) {
    tareas = tareas.map((tarea) =>
      tarea.id === idEdicion ? { ...tarea, titulo, prioridad } : tarea
    );
  } else {
    const tarea = { id: crearId(), titulo, prioridad, completada: false };
    tareas = [...tareas, tarea];
  }

  guardarTareas(); // Punto único de guardado tras crear o editar.
  renderizarTareas();
  limpiarFormulario();
  inputTitulo.focus();
});

listaTareas.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton || !listaTareas.contains(boton)) return;

  const { accion, id } = boton.dataset;

  if (accion === "editar") {
    const tarea = tareas.find((item) => item.id === id);
    if (!tarea) return;
    idEdicion = id;
    inputTitulo.value = tarea.titulo;
    selectPrioridad.value = tarea.prioridad;
    botonGuardar.textContent = "Guardar cambios";
    botonCancelar.hidden = false;
    inputTitulo.focus();
    return;
  }

  if (accion === "alternar") {
    tareas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
  } else if (accion === "eliminar") {
    tareas = tareas.filter((tarea) => tarea.id !== id);
    if (idEdicion === id) limpiarFormulario();
  } else {
    return;
  }

  guardarTareas(); // Punto único de guardado tras completar o eliminar.
  renderizarTareas();
});

botonCancelar.addEventListener("click", () => {
  limpiarFormulario();
  inputTitulo.focus();
});

renderizarTareas();
