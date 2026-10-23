const pedidos = [];
let precioMaximo = null;

const formulario = document.querySelector("#formPedido");
const inputProducto = document.querySelector("#idProducto");
const inputPrecio = document.querySelector("#idPrecio");
const inputCantidad = document.querySelector("#idCantidad");
const inputPrecioMaximo = document.querySelector("#idPrecioMaximo");
const cuerpoTabla = document.querySelector("#idCuerpoTabla");
const totalUnidades = document.querySelector("#idTotalUnidades");
const montoTotal = document.querySelector("#idMontoTotal");

const campos = [
  { input: inputProducto, error: document.querySelector("#errorProducto"), clave: "producto" },
  { input: inputPrecio, error: document.querySelector("#errorPrecio"), clave: "precio" },
  { input: inputCantidad, error: document.querySelector("#errorCantidad"), clave: "cantidad" },
];

function validarPedido({ producto, precio, cantidad }) {
  const errores = {};
  if (producto.trim() === "") {
    errores.producto = "El nombre del producto no puede estar vacío.";
  }
  if (!Number.isFinite(precio) || precio <= 0) {
    errores.precio = "El precio debe ser mayor que cero.";
  }
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    errores.cantidad = "La cantidad debe ser un número entero positivo.";
  }
  return errores;
}

function calcularSubtotal(pedido) {
  return pedido.precio * pedido.cantidad;
}

function filtrarPorPrecio(lista, maximo) {
  return lista.filter((pedido) => pedido.precio <= maximo);
}

function obtenerPedidosVisibles() {
  return precioMaximo === null ? pedidos : filtrarPorPrecio(pedidos, precioMaximo);
}

function calcularTotales(lista) {
  return lista.reduce(
    (acumulado, pedido) => ({
      unidades: acumulado.unidades + pedido.cantidad,
      monto: acumulado.monto + calcularSubtotal(pedido),
    }),
    { unidades: 0, monto: 0 }
  );
}

function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function crearFila(pedido) {
  return `<tr>
    <td>${escaparHTML(pedido.producto)}</td>
    <td class="text-end">$${pedido.precio.toFixed(2)}</td>
    <td class="text-end">${pedido.cantidad}</td>
    <td class="text-end">$${calcularSubtotal(pedido).toFixed(2)}</td>
  </tr>`;
}

function renderizarTabla(lista) {
  cuerpoTabla.innerHTML =
    lista.length === 0
      ? '<tr><td colspan="4" class="text-center text-muted">No hay pedidos para mostrar</td></tr>'
      : lista.map(crearFila).join("");
}

function renderizarTotales({ unidades, monto }) {
  totalUnidades.textContent = unidades;
  montoTotal.textContent = monto.toFixed(2);
}

function mostrarErrores(errores) {
  campos.forEach(({ input, error, clave }) => {
    input.classList.toggle("is-invalid", clave in errores);
    error.textContent = errores[clave] || "";
  });
}

function mostrarErrorFiltro(mensaje) {
  inputPrecioMaximo.classList.toggle("is-invalid", mensaje !== "");
  document.querySelector("#errorPrecioMaximo").textContent = mensaje;
}

function actualizarVista() {
  const visibles = obtenerPedidosVisibles();
  renderizarTabla(visibles);
  renderizarTotales(calcularTotales(visibles));
}

function agregarPedido(evento) {
  evento.preventDefault();

  const pedido = {
    producto: inputProducto.value.trim(),
    precio: parseFloat(inputPrecio.value),
    cantidad: Number(inputCantidad.value),
  };

  const errores = validarPedido(pedido);
  mostrarErrores(errores);
  if (Object.keys(errores).length > 0) return;

  pedidos.push(pedido);
  formulario.reset();
  actualizarVista();
}

function filtrarProductos() {
  const maximo = parseFloat(inputPrecioMaximo.value);
  if (!Number.isFinite(maximo) || maximo < 0) {
    mostrarErrorFiltro("Ingrese un precio máximo válido.");
    return;
  }
  mostrarErrorFiltro("");
  precioMaximo = maximo;
  actualizarVista();
}

function mostrarTodos() {
  precioMaximo = null;
  inputPrecioMaximo.value = "";
  mostrarErrorFiltro("");
  actualizarVista();
}

function limpiarPedidos() {
  pedidos.length = 0;
  mostrarTodos();
}

formulario.addEventListener("submit", agregarPedido);
document.querySelector("#idBtnFiltrar").addEventListener("click", filtrarProductos);
document.querySelector("#idBtnMostrarTodos").addEventListener("click", mostrarTodos);
document.querySelector("#idBtnLimpiar").addEventListener("click", limpiarPedidos);

actualizarVista();
