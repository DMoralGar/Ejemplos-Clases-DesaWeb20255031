"use strict";

(() => {
  const { Estudiante, Docente } = window.Biblioteca;
  const elemento = (id) => document.getElementById(id);
  let usuario = new Estudiante("Ana");

  function informar(texto, tipo = "success") {
    const aviso = elemento("mensaje");
    aviso.hidden = false;
    aviso.className = `alert alert-${tipo}`;
    aviso.textContent = texto;
  }

  function renderizar() {
    const libros = usuario.obtenerPrestamos();
    const cantidad = libros.length;
    const limite = usuario.limitePrestamos;

    elemento("resumen").textContent = usuario.descripcion();
    elemento("contador").textContent = `${cantidad} / ${limite}`;

    const porcentaje = Math.round((cantidad / limite) * 100);
    elemento("barra").style.width = `${porcentaje}%`;
    elemento("barra").parentElement.setAttribute("aria-valuenow", String(porcentaje));

    const tabla = elemento("tabla-prestamos");
    tabla.replaceChildren();
    elemento("sin-prestamos").hidden = libros.length > 0;

    for (const libro of libros) {
      const fila = document.createElement("tr");
      const titulo = document.createElement("td");
      const autor = document.createElement("td");
      const celdaAccion = document.createElement("td");
      const boton = document.createElement("button");

      titulo.textContent = libro.titulo;
      autor.textContent = libro.autor;
      celdaAccion.className = "text-end";
      boton.type = "button";
      boton.className = "btn btn-outline-secondary btn-sm";
      boton.textContent = "Devolver";
      boton.addEventListener("click", () => {
        usuario.devolverLibro(libro.titulo);
        informar(`Se devolvió «${libro.titulo}».`);
        renderizar();
      });

      celdaAccion.append(boton);
      fila.append(titulo, autor, celdaAccion);
      tabla.append(fila);
    }
  }

  elemento("form-usuario").addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
      const nombre = elemento("nombre").value;
      const tipo = elemento("tipo").value;
      usuario = tipo === "docente" ? new Docente(nombre) : new Estudiante(nombre);
      informar("Usuario creado.");
      renderizar();
    } catch (error) {
      informar(error.message, "danger");
    }
  });

  elemento("form-prestamo").addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
      usuario.prestarLibro({
        titulo: elemento("titulo").value,
        autor: elemento("autor").value
      });
      elemento("form-prestamo").reset();
      informar("Préstamo registrado.");
      renderizar();
    } catch (error) {
      informar(error.message, "danger");
    }
  });

  renderizar();
})();
