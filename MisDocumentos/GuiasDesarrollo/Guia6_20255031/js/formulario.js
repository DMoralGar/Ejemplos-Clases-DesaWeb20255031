//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const tablaPacientes = document.getElementById("idTablaPacientes");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

/* ---------------------------------------------------------
   PERSISTENCIA CON LOCALSTORAGE (Ejercicio 2)
--------------------------------------------------------- */
const CLAVE_PACIENTES = "pacientes";
const CLAVE_PAISES = "paisesPersonalizados";

// Lee un arreglo desde localStorage (si no existe o esta dañado devuelve [])
const leerStorage = (clave) => {
  try {
    return JSON.parse(localStorage.getItem(clave)) || [];
  } catch (error) {
    return [];
  }
};

// Guarda un arreglo en localStorage (solo admite texto, por eso JSON.stringify)
const guardarStorage = (clave, datos) => {
  localStorage.setItem(clave, JSON.stringify(datos));
};

//Arreglo global de pacientes (se carga con lo que haya guardado)
let arrayPaciente = leerStorage(CLAVE_PACIENTES);

//Paises agregados por el usuario desde el modal
let paisesPersonalizados = leerStorage(CLAVE_PAISES);

// Posicion del paciente que se esta editando (-1 = ninguno, se esta creando uno nuevo)
let indiceEdicion = -1;

// Evita que el texto escrito por el usuario se interprete como HTML
const esc = (texto) =>
  String(texto).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const mostrarMensaje = (texto) => {
  mensaje.innerHTML = texto;
  toast.show();
};

/*
Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/
const limpiarForm = () => {
  inputNombre.value = "";
  inputApellido.value = "";
  inputFechaNacimiento.value = "";
  inputRdMasculino.checked = false;
  inputRdFemenino.checked = false;
  cmbPais.value = 0;
  inputDireccion.value = "";
  inputNombrePais.value = "";

  // Se sale del modo edicion
  indiceEdicion = -1;
  buttonAgregarPaciente.innerHTML =
    '<i class="bi bi-person-plus-fill"></i> Guardar Datos';

  inputNombre.focus();
};

/*
Funcion para validar el ingreso del paciente.
Sirve tanto para agregar como para actualizar (Ejercicio 1)
*/
const addPaciente = function () {
  let nombre = inputNombre.value.trim();
  let apellido = inputApellido.value.trim();
  let fechaNacimiento = inputFechaNacimiento.value;
  let sexo =
    inputRdMasculino.checked == true
      ? "Hombre"
      : inputRdFemenino.checked == true
      ? "Mujer"
      : "";
  let pais = cmbPais.value;
  let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
  let direccion = inputDireccion.value.trim();

  if (
    nombre != "" &&
    apellido != "" &&
    fechaNacimiento != "" &&
    sexo != "" &&
    pais != 0 &&
    direccion != ""
  ) {
    const datos = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];

    if (indiceEdicion >= 0) {
      // Modo edicion: reemplazamos el registro existente
      arrayPaciente[indiceEdicion] = datos;
      mostrarMensaje("Paciente actualizado correctamente");
    } else {
      // Modo nuevo: agregamos al final
      arrayPaciente.push(datos);
      mostrarMensaje("Se ha registrado un nuevo paciente");
    }

    guardarStorage(CLAVE_PACIENTES, arrayPaciente);

    //Limpiando formulario y refrescando la tabla
    limpiarForm();
    imprimirPacientes();
  } else {
    mostrarMensaje("Faltan campos por completar");
  }
};

/* ---------------------------------------------------------
   EDITAR Y ELIMINAR (Ejercicio 1)
--------------------------------------------------------- */
const editarPaciente = (indice) => {
  const p = arrayPaciente[indice];

  inputNombre.value = p[0];
  inputApellido.value = p[1];
  inputFechaNacimiento.value = p[2];
  inputRdMasculino.checked = p[3] === "Hombre";
  inputRdFemenino.checked = p[3] === "Mujer";

  // Buscamos en el select el option cuyo texto coincide con el pais guardado
  const posicion = Array.from(cmbPais.options).findIndex(
    (op) => op.text === p[4]
  );
  cmbPais.selectedIndex = posicion >= 0 ? posicion : 0;

  inputDireccion.value = p[5];

  // Activamos el modo edicion
  indiceEdicion = indice;
  buttonAgregarPaciente.innerHTML =
    '<i class="bi bi-arrow-repeat"></i> Actualizar Datos';

  window.scrollTo({ top: 0, behavior: "smooth" });
  inputNombre.focus();
  mostrarMensaje("Modifique los datos y presione «Actualizar Datos»");
};

const eliminarPaciente = (indice) => {
  const p = arrayPaciente[indice];
  if (!confirm(`¿Desea eliminar al paciente ${p[0]} ${p[1]}?`)) return;

  arrayPaciente.splice(indice, 1);
  guardarStorage(CLAVE_PACIENTES, arrayPaciente);

  // Ajustes si se estaba editando algun registro
  if (indiceEdicion === indice) {
    limpiarForm();
  } else if (indiceEdicion > indice) {
    indiceEdicion--;
  }

  imprimirPacientes();
  mostrarMensaje("Paciente eliminado correctamente");
};

// Los botones se crean dinamicamente, por eso se usa delegacion de eventos:
// un solo listener en el contenedor atiende los clicks de todos los botones.
tablaPacientes.addEventListener("click", (e) => {
  const boton = e.target.closest("button[data-accion]");
  if (!boton) return;

  const indice = Number(boton.dataset.indice);
  if (boton.dataset.accion === "editar") {
    editarPaciente(indice);
  } else if (boton.dataset.accion === "eliminar") {
    eliminarPaciente(indice);
  }
});

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
  if (arrayPaciente.length === 0) {
    return `<tr><td colspan="8" class="text-center text-muted">No hay pacientes registrados</td></tr>`;
  }

  let $fila = "";

  arrayPaciente.forEach((element, indice) => {
    $fila += `<tr>
              <td scope="row" class="text-center fw-bold">${indice + 1}</td>
              <td>${esc(element[0])}</td>
              <td>${esc(element[1])}</td>
              <td>${esc(element[2])}</td>
              <td>${esc(element[3])}</td>
              <td>${esc(element[4])}</td>
              <td>${esc(element[5])}</td>
              <td class="text-center">
                  <button type="button" class="btn btn-primary" title="Editar"
                      data-accion="editar" data-indice="${indice}">
                      <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn btn-danger" title="Eliminar"
                      data-accion="eliminar" data-indice="${indice}">
                      <i class="bi bi-trash3-fill"></i>
                  </button>
              </td>
          </tr>`;
  });
  return $fila;
}

const imprimirPacientes = () => {
  let $table = `<div class="table-responsive">
              <table class="table table-striped table-hover table-bordered">
                  <tr>
                      <th scope="col" class="text-center" style="width:5%">#</th>
                      <th scope="col" class="text-center" style="width:15%">Nombre</th>
                      <th scope="col" class="text-center" style="width:15%">Apellido</th>
                      <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                      <th scope="col" class="text-center" style="width:10%">Sexo</th>
                      <th scope="col" class="text-center" style="width:10%">Pais</th>
                      <th scope="col" class="text-center" style="width:25%">Dirección</th>
                      <th scope="col" class="text-center" style="width:10%">Opciones</th>
                  </tr>
                  ${imprimirFilas()}
              </table>
          </div>
          `;
  tablaPacientes.innerHTML = $table;
};

/* ---------------------------------------------------------
   PAISES
--------------------------------------------------------- */
// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;

// Crea el <option> y lo agrega al select
const agregarOptionPais = (nombre) => {
  let option = document.createElement("option");
  option.textContent = nombre;
  option.value = contadorGlobalOption;
  contadorGlobalOption++; // para que el siguiente pais tenga un value distinto
  cmbPais.appendChild(option);
};

const addPais = () => {
  let paisNew = inputNombrePais.value.trim();

  if (paisNew == "") {
    mostrarMensaje("Faltan campos por completar");
    return;
  }

  // Evitamos paises repetidos (sin distinguir mayusculas/minusculas)
  const existe = Array.from(cmbPais.options).some(
    (op) => op.text.toLowerCase() === paisNew.toLowerCase()
  );
  if (existe) {
    mostrarMensaje("Ese país ya existe en la lista");
    return;
  }

  agregarOptionPais(paisNew);

  // Persistimos el nuevo pais
  paisesPersonalizados.push(paisNew);
  guardarStorage(CLAVE_PAISES, paisesPersonalizados);

  mostrarMensaje("Pais agregado correctamente");
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
  limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
  addPaciente();
};

buttonMostrarPaciente.onclick = () => {
  imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
  addPais();
};

// Se agrega el focus en el campo nombre país del modal
idModal.addEventListener("shown.bs.modal", () => {
  inputNombrePais.value = "";
  inputNombrePais.focus();
});

/* ---------------------------------------------------------
   AL CARGAR LA PAGINA
--------------------------------------------------------- */
// Restauramos los paises guardados en el select
paisesPersonalizados.forEach((pais) => agregarOptionPais(pais));

// Si hay pacientes guardados, los mostramos de una vez
if (arrayPaciente.length > 0) {
  imprimirPacientes();
}

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();
