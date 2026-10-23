# Biblioteca: ejercicios de POO en JavaScript

## Archivos

`estudiantes/biblioteca.js` contiene los ejercicios; `estudiantes/biblioteca.test.js`, las pruebas; `estudiantes/index.html` y `estudiantes/app.js`, la interfaz de Bootstrap. Las instrucciones se encuentran en `estudiantes/INDICACIONES.md`.

## Ejecución de las pruebas

Con Node.js 18 o posterior:

```bash
cd estudiantes
node --test biblioteca.test.js
```

La primera prueba fallará hasta completar el ejercicio 05. Cada bloque posterior se activa sustituyendo `describe.skip` por `describe` en el archivo de pruebas. Los bloques anteriores deben seguir aprobándose.

## Interfaz

Al finalizar los ejercicios, abrir `estudiantes/index.html` en el navegador. Bootstrap se obtiene desde una CDN, por lo que requiere conexión a Internet para mostrar los estilos. No se necesita instalar paquetes adicionales.
