/*
Expresiones regulares (RegExp) en JavaScript
--------------------------------------------
Una expresion regular describe un patron de texto. Se escribe entre / /
- ^ y $   : inicio y fin de la cadena (el texto debe coincidir COMPLETO)
- \d      : un digito (0-9)        - [A-Za-z] : una letra
- {n}     : exactamente n veces    - {n,m}    : entre n y m veces
- +       : una o mas veces        - ( )      : agrupa una parte del patron
- .test(texto) devuelve true/false segun si el texto cumple el patron
*/

// Letras con tildes, ñ y ü para los nombres en español
const LETRAS = "A-Za-zÁÉÍÓÚÜÑáéíóúüñ";

// Valida que la fecha exista de verdad (evita 31/02/2000)
const fechaReal = (texto) => {
  const [dia, mes, anio] = texto.split("/").map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  return (
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia &&
    fecha <= new Date() // no puede nacer en el futuro
  );
};

// Cada campo: su id, su expresion regular y (opcional) una regla adicional
const campos = [
  {
    id: "idTxtCarnet",
    // Dos letras seguidas de tres numeros. Ej: AB001
    regex: /^[A-Za-z]{2}\d{3}$/,
  },
  {
    id: "idTxtNombreCompleto",
    // Al menos dos palabras formadas solo por letras, separadas por un espacio
    regex: new RegExp(`^[${LETRAS}]+(\\s[${LETRAS}]+)+$`),
  },
  {
    id: "idTxtDui",
    // 8 digitos, guion, 1 digito. Ej: 01234567-8
    regex: /^\d{8}-\d$/,
  },
  {
    id: "idTxtNit",
    // 4-6-3-1 digitos. Ej: 0614-010190-101-3
    regex: /^\d{4}-\d{6}-\d{3}-\d$/,
  },
  {
    id: "idTxtFecha",
    // dd/mm/aaaa (dia 01-31, mes 01-12) + comprobacion de fecha real
    regex: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    extra: fechaReal,
  },
  {
    id: "idTxtCorreo",
    // usuario@dominio.ext
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
  },
  {
    id: "idTxtEdad",
    // Solo numeros (1 a 3 digitos) y rango razonable
    regex: /^\d{1,3}$/,
    extra: (texto) => Number(texto) <= 120,
  },
];

const resultado = document.getElementById("idResultado");

// Valida un campo y marca visualmente (verde / rojo) con clases de Bootstrap
const validarCampo = (campo) => {
  const input = document.getElementById(campo.id);
  const valor = input.value.trim();

  let valido = campo.regex.test(valor);
  if (valido && campo.extra) valido = campo.extra(valor);

  input.classList.toggle("is-valid", valido);
  input.classList.toggle("is-invalid", !valido);
  return valido;
};

// Validacion en tiempo real mientras el usuario escribe (o al salir del campo)
campos.forEach((campo) => {
  const input = document.getElementById(campo.id);
  input.addEventListener("input", () => {
    // Solo mostramos errores en tiempo real una vez que el usuario ha escrito algo
    if (input.value.trim() === "") {
      input.classList.remove("is-valid", "is-invalid");
    } else {
      validarCampo(campo);
    }
  });
  input.addEventListener("blur", () => validarCampo(campo));
});

// Boton Validar: revisa todos los campos
document.getElementById("idBtnValidar").addEventListener("click", () => {
  // Se evalua todo con map (no con every) para marcar TODOS los campos, no solo hasta el primer error
  const resultados = campos.map(validarCampo);
  const todoValido = resultados.every(Boolean);

  resultado.innerHTML = todoValido
    ? `<div class="alert alert-success">Todos los datos son válidos. La ficha puede guardarse.</div>`
    : `<div class="alert alert-danger">Hay campos con errores. Revise los mensajes en rojo.</div>`;
});

// Boton Limpiar
document.getElementById("idBtnLimpiar").addEventListener("click", () => {
  campos.forEach((campo) => {
    const input = document.getElementById(campo.id);
    input.value = "";
    input.classList.remove("is-valid", "is-invalid");
  });
  resultado.innerHTML = "";
  document.getElementById(campos[0].id).focus();
});
