const TAREAS_INICIALES = [
  { id: "demo-1", titulo: "Estudiar eventos del DOM", prioridad: "alta", completada: false },
  { id: "demo-2", titulo: "Resolver ejercicios de arreglos", prioridad: "media", completada: true },
  { id: "demo-3", titulo: "Revisar apuntes de JSON", prioridad: "baja", completada: false }
];

const CLAVE_TAREAS = "dw1:tareas-academicas";

export function cargarTareas() {
  
  return TAREAS_INICIALES.map((tarea) => ({ ...tarea }));
}

export function guardarTareas(tareas) {
  
  localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
}

