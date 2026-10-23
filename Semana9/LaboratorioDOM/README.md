# Desarrollo Web I
## Laboratorio guiado: manipulación del DOM con JavaScript

**Escuela Superior de Economía y Negocios (ESEN)**  
**Caso de estudio:** Cartelera de talleres académicos  
**Material de referencia:** * Document Object Model*.

## 1. Objetivo

Aplicar progresivamente los principales métodos y propiedades de JavaScript para seleccionar, crear, consultar, modificar, insertar y recorrer elementos del Document Object Model (DOM).

El laboratorio consiste en una cartelera de talleres académicos con información ficticia. Cada actividad utiliza la misma página web, de modo que los resultados pueden observarse tanto en la interfaz como en las herramientas de desarrollo del navegador.

El proyecto emplea HTML, CSS y JavaScript. No utiliza bibliotecas externas, servicios web ni almacenamiento persistente.

## 2. Archivos del proyecto

| Archivo | Descripción |
| --- | --- |
| `index.html` | Estructura de la cartelera, tarjetas de talleres, zonas de práctica y panel de actividades. |
| `styles.css` | Estilos de la interfaz. No requiere modificaciones para resolver los ejercicios. |
| `ejemplos.js` | Demostraciones resueltas de los conceptos estudiados en cada etapa. |
| `ejercicios.js` | Funciones incompletas que contienen las actividades señaladas mediante comentarios `TODO`. **Este es el archivo principal de trabajo.** |
| `control.js` | Código que conecta el panel de actividades con los ejemplos y ejercicios. No requiere modificaciones. |

## 3. Preparación del entorno

1. Extraiga el archivo ZIP en una carpeta de trabajo y conserve todos los archivos en la misma ubicación.
2. Abra la carpeta del proyecto en Visual Studio Code u otro editor de código.
3. Abra `index.html` en un navegador moderno. No se requiere instalar dependencias ni iniciar un servidor local.
4. Abra las herramientas para desarrolladores del navegador mediante `F12` (o la opción correspondiente en el menú del navegador).
5. Localice las pestañas **Elementos** (*Elements*) y **Consola** (*Console*). Se utilizarán para inspeccionar la estructura del documento y los resultados de JavaScript.

## 4. Dinámica de trabajo

El panel **Ejemplos y ejercicios** presenta 14 etapas que siguen el orden de las diapositivas de clase. Para desarrollar cada una:

1. Seleccione la etapa correspondiente al tema estudiado.
2. Lea la descripción del ejemplo resuelto y pulse **Ejecutar ejemplo**.
3. Examine la salida del panel y, cuando corresponda, los cambios visibles en la página o en la pestaña **Elementos** del navegador.
4. Localice la función correspondiente en `ejemplos.js` y revise cómo se implementa el método estudiado.
5. Abra `ejercicios.js`, identifique la función con el mismo número y complete los comentarios `TODO`.
6. Guarde los cambios, actualice la página en el navegador y pulse **Probar ejercicio**.
7. Compare los resultados con el criterio descrito en el panel. Realice las correcciones necesarias antes de continuar.

**Importante:** El botón **Probar ejercicio** ejecuta la función escrita y muestra los mensajes enviados a `console.log()`, pero **no asigna una calificación ni comprueba automáticamente todos los requisitos**. La verificación también requiere revisar la página y los atributos o nodos modificados.

Cuando sea necesario restaurar la estructura original de la página, pulse **Reiniciar página**. Este botón recarga el documento y elimina los cambios efectuados en el DOM durante la ejecución, pero no borra el código guardado en `ejercicios.js`.

## 5. Secuencia de actividades

| Etapa | Diapositivas | Contenido |
| --- | --- | --- |
| Actividad inicial | 1–3 | Inspección de la estructura jerárquica del documento. |
| 1 | 4 | Selección por identificador: `getElementById()`. |
| 2 | 5 | Selección por clase: `getElementsByClassName()`. |
| 3 | 6 | Selección por atributo `name` y etiqueta: `getElementsByName()` y `getElementsByTagName()`. |
| 4 | 7 | Obtención del primer elemento coincidente: `querySelector()`. |
| 5 | 8 | Obtención de múltiples elementos: `querySelectorAll()`. |
| 6 | 9–10 | Creación de elementos y nodos de texto; clonación con `cloneNode()`. |
| 7 | 11 | Modificación de atributos mediante propiedades del elemento. |
| 8 | 12–13 | Consulta de atributos con `getAttribute()`, `hasAttribute()` y métodos relacionados. |
| 9 | 14–15 | Modificación y eliminación de atributos con `setAttribute()`, `removeAttribute()` y `toggleAttribute()`. |
| 10 | 16 | Administración de clases CSS mediante `classList`. |
| 11 | 17–18 | Lectura y modificación de atributos personalizados `data-*` mediante `dataset`. |
| 12 | 19–20 | Inserción, reemplazo y eliminación de nodos con métodos tradicionales. |
| 13 | 21 | Manipulación de nodos mediante los métodos modernos `append()`, `prepend()`, `before()`, `after()`, `replaceWith()` y `remove()`. |
| 14 | 22–23 | Navegación entre padres, hijos y hermanos del árbol DOM. |

### Actividad inicial: inspección del DOM

Antes de comenzar la etapa 1, abra la pestaña **Elementos** del navegador e identifique la relación entre `html`, `body`, `main`, `section` y los elementos `article` que representan los talleres. Observe cómo las etiquetas anidadas forman una estructura jerárquica.

## 6. Consideraciones durante la práctica

1. **Orden de trabajo.** Complete los ejercicios a medida que se desarrollen los contenidos de clase. No es necesario resolver las 14 etapas de una sola vez.
2. **Archivo de trabajo.** Modifique solamente las instrucciones necesarias dentro de las funciones de `ejercicios.js`. Conserve los números de las funciones y la estructura del objeto `window.ejercicios`.
3. **Resultados en consola.** Algunas actividades únicamente seleccionan o crean nodos. En esos casos, el resultado se observará en la consola y no necesariamente habrá cambios visuales.
4. **Creación e inserción.** En la etapa 6, los nodos deben crearse y examinarse **sin insertarlos todavía en la página**. Las operaciones de inserción se estudiarán en las etapas 12 y 13.
5. **Listas independientes.** Las etapas 12 y 13 utilizan áreas específicas de práctica para evitar alterar las tarjetas principales de la cartelera.
6. **Ejecución repetida.** Algunos métodos alternan clases o atributos, y otros insertan o eliminan nodos. Al ejecutar varias veces un ejercicio, el resultado puede variar porque la página ya fue modificada. Utilice **Reiniciar página** para recuperar el estado inicial.
7. **Verificación.** Además de observar la interfaz, revise los valores de los atributos y la estructura de los elementos en las herramientas del navegador.
8. **Depuración.** Si aparece un error, consulte la pestaña **Consola**, identifique la línea señalada y compruebe que el elemento seleccionado existe antes de acceder a sus propiedades o métodos.

## 7. Resultado esperado

Al finalizar, las 14 funciones de `ejercicios.js` deberán implementar las operaciones solicitadas. El resultado de cada una debe corresponder con el criterio indicado en el panel de actividades, ya sea mediante mensajes en consola, cambios de atributos y clases o modificaciones de la estructura del DOM.

El objetivo principal es comprender cómo JavaScript interactúa con una página HTML existente y cómo las operaciones sobre el DOM se reflejan en el navegador.
