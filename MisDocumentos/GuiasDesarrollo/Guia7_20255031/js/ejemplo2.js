// ===== REFERENCIAS =====
const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");
const tituloModal = document.getElementById("modalLabel");

// ===== UTILIDADES DOM (sin innerHTML) =====

// Elimina todos los hijos de un nodo
const limpiarNodo = function (nodo) {
  while (nodo.firstChild) {
    nodo.removeChild(nodo.firstChild);
  }
};

// Crea una fila <tr> con una celda de encabezado y una de valor
const crearFila = function (campo, valor) {
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.setAttribute("scope", "row");
  th.appendChild(document.createTextNode(campo));

  const td = document.createElement("td");
  td.appendChild(document.createTextNode(valor));

  tr.appendChild(th);
  tr.appendChild(td);
  return tr;
};

// Obtiene el texto del <label> asociado a un control (o su value si no hay)
const textoDe = function (control) {
  const label = document.querySelector(`label[for="${control.id}"]`);
  return label ? label.textContent.trim() : control.value;
};

// ===== LECTURA DE CONTROLES (por tipo) =====
const leerFormulario = function () {
  const textos = formulario.querySelectorAll('input[type="text"]');
  const passwords = formulario.querySelectorAll('input[type="password"]');
  const email = formulario.querySelector('input[type="email"]');
  const fecha = formulario.querySelector('input[type="date"]');
  const archivo = formulario.querySelector('input[type="file"]');
  const select = formulario.querySelector("select");
  const checks = formulario.querySelectorAll('input[type="checkbox"]:checked');
  const radio = formulario.querySelector('input[type="radio"]:checked');

  return { textos, passwords, email, fecha, archivo, select, checks, radio };
};

// ===== VALIDACIONES =====
const validarFormulario = function () {
  const errores = [];
  const c = leerFormulario();

  // a. Campos no vacíos
  const nombres = ["Nombres", "Apellidos"];
  c.textos.forEach((txt, i) => {
    if (txt.value.trim() === "") {
      errores.push(`El campo ${nombres[i] || "de texto " + (i + 1)} no puede estar vacío.`);
    }
  });

  // b. Fecha de nacimiento
  if (c.fecha.value === "") {
    errores.push("La fecha de nacimiento no puede estar vacía.");
  } else {
    const [anio, mes, dia] = c.fecha.value.split("-").map(Number);
    const fechaNac = new Date(anio, mes - 1, dia);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaNac > hoy) {
      errores.push("La fecha de nacimiento no puede ser mayor a la fecha actual.");
    }
  }

  // c. Correo con expresión regular
  const regexCorreo = /^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
  if (c.email.value.trim() === "") {
    errores.push("El correo electrónico no puede estar vacío.");
  } else if (!regexCorreo.test(c.email.value.trim())) {
    errores.push("El correo electrónico no tiene un formato válido.");
  }

  // d. Contraseñas
  const pass1 = c.passwords[0].value;
  const pass2 = c.passwords[1].value;
  if (pass1 === "" || pass2 === "") {
    errores.push("Debe completar la contraseña y repetir contraseña.");
  } else if (pass1 !== pass2) {
    errores.push("Las contraseñas no coinciden.");
  }

  // e. Al menos un interés
  if (c.checks.length === 0) {
    errores.push("Seleccione al menos un interés.");
  }

  // f. Carrera
  if (!c.radio) {
    errores.push("Seleccione una carrera.");
  }

  // g. País de origen
  // La primera opción ("Seleccione una opcion") no tiene value, por eso se usa selectedIndex
  if (c.select.selectedIndex === 0) {
    errores.push("Seleccione un país de origen.");
  }

  // Avatar (campo no vacío)
  if (c.archivo.files.length === 0) {
    errores.push("Seleccione la imagen de su avatar.");
  }

  return errores;
};

// ===== MOSTRAR ERRORES EN EL MODAL =====
const mostrarErrores = function (errores) {
  tituloModal.textContent = "Error de validación";
  limpiarNodo(bodyModal);

  const alerta = document.createElement("div");
  alerta.setAttribute("class", "alert alert-danger mb-0");

  const titulo = document.createElement("strong");
  titulo.textContent = "Corrija los siguientes errores:";
  alerta.appendChild(titulo);

  const ul = document.createElement("ul");
  ul.setAttribute("class", "mb-0 mt-2");
  errores.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    ul.appendChild(li);
  });
  alerta.appendChild(ul);

  bodyModal.appendChild(alerta);
  modal.show();
};

// ===== MOSTRAR TABLA CON LOS DATOS =====
const mostrarDatos = function () {
  const c = leerFormulario();
  tituloModal.textContent = "Datos del registro";
  limpiarNodo(bodyModal);

  const tabla = document.createElement("table");
  tabla.setAttribute("class", "table table-striped table-bordered mb-0");

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  ["Campo", "Valor"].forEach((texto) => {
    const th = document.createElement("th");
    th.textContent = texto;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.appendChild(crearFila("Nombres", c.textos[0].value.trim()));
  tbody.appendChild(crearFila("Apellidos", c.textos[1].value.trim()));
  tbody.appendChild(crearFila("Fecha de nacimiento", c.fecha.value));
  tbody.appendChild(crearFila("Correo electrónico", c.email.value.trim()));
  tbody.appendChild(crearFila("Contraseña", "*".repeat(c.passwords[0].value.length)));

  const intereses = Array.from(c.checks).map((chk) => textoDe(chk));
  tbody.appendChild(crearFila("Intereses", intereses.join(", ")));

  tbody.appendChild(crearFila("Carrera", textoDe(c.radio)));
  tbody.appendChild(
    crearFila("País de origen", c.select.options[c.select.selectedIndex].textContent)
  );
  tbody.appendChild(crearFila("Avatar", c.archivo.files[0].name));

  tabla.appendChild(tbody);

  // Contenedor responsive de Bootstrap
  const contenedor = document.createElement("div");
  contenedor.setAttribute("class", "table-responsive");
  contenedor.appendChild(tabla);

  bodyModal.appendChild(contenedor);
  modal.show();
};

// ===== EVENTO DEL BOTÓN =====
button.onclick = (event) => {
  event.preventDefault(); // evita que el formulario recargue la página

  const errores = validarFormulario();
  if (errores.length > 0) {
    mostrarErrores(errores);
  } else {
    mostrarDatos();
  }
};