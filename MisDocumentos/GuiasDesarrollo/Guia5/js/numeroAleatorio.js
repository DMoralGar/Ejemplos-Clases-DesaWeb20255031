const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
const numeroIntentos = 3;
let intentos = 1;

function generarNumeroAleatorio() {
  let mensaje;
  const parrafo = document.querySelector("#idParrafo");

  if (intentos <= numeroIntentos) {
    let numero = Number(
      prompt("¿Que número se ha generado (Intento " + intentos + ")?")
    );

    if (numero == numeroAleatorio) {
      mensaje = `¡Es sorprente, pudiste adivinar el numero oculto (${numeroAleatorio}).
        Refresque la página para volver a jugar.`;
    } else if (intentos == numeroIntentos) {
      mensaje = `Su numero de intentos ha terminado.
        El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    } else {
      const pista = numeroAleatorio > numero ? "más alto" : "más bajo";
      mensaje = `Vuelve a intentar. El número que busca es ${pista} que ${numero}. Quedan ${
        numeroIntentos - intentos
      } intentos`;
    }

    intentos++;
  } else {
    mensaje = `Su numero de intentos ha terminado.
      El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
  }

  parrafo.innerHTML = mensaje;
}
