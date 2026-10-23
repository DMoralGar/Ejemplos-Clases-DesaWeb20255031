# Actividades en clase

**Programación orientada a objetos en JavaScript**

Trabajar sobre `biblioteca.js` y ejecutar las pruebas con `node --test biblioteca.test.js`. Los bloques todavía no estudiados permanecerán deshabilitados con `describe.skip`.

## Objetos literales (diapositiva 5)

Completar `usuarioLiteral.prestarLibro`. El método debe registrar el libro recibido dentro del arreglo de préstamos. Habilitar únicamente la prueba 05, que ya aparece activa.

**Antes de ejecutar:** ¿qué valor tendría `this` si el método se invoca con `usuarioLiteral.prestarLibro(libro)`?

## Funciones constructoras (diapositiva 6)

Completar `UsuarioConstructor`. Crear dos instancias y registrar un préstamo únicamente en una. Habilitar la prueba 06.

**Antes de ejecutar:** ¿las dos instancias contienen el mismo arreglo? ¿Sus métodos `prestarLibro` son la misma función?

## Prototipos (diapositiva 7)

Completar `UsuarioPrototipo.prototype.prestarLibro`. Habilitar la prueba 07.

**Antes de ejecutar:** ¿qué resultado tendrá `ana.prestarLibro === luis.prestarLibro`? ¿Por qué es distinto al caso anterior?

## Clases (diapositiva 8)

Completar el constructor y el método `prestarLibro` de la clase `Usuario`. Conservar el método `obtenerPrestamos`, que permite consultar los préstamos de cada objeto. Habilitar la prueba 08.

**Antes de ejecutar:** ¿los métodos declarados en `class` se almacenan por separado en cada instancia?

## Getters y setters (diapositivas 9 y 10)

Agregar el getter y setter de `nombre`. El setter debe rechazar cadenas vacías y eliminar espacios al inicio y al final. Agregar el getter `cantidadPrestamos` y el getter `librosPrestados`. Habilitar las pruebas 09–10.

**Antes de ejecutar:** ¿por qué `usuario.nombre = "Ana"` invoca el setter aunque no se escriban paréntesis?

## Propiedades privadas (diapositivas 11 a 13)

Sustituir las propiedades públicas que almacenan el nombre y los préstamos por `#nombre` y `#prestamos`. Adaptar el constructor, los getters y los métodos existentes. `librosPrestados` debe devolver un nuevo arreglo con copias de los objetos libro. Habilitar las pruebas 11–13.

**Antes de ejecutar:** si el getter devuelve una copia del arreglo, pero conserva las mismas referencias a sus libros, ¿se protege completamente el estado interno?

## Métodos estáticos y privados (diapositivas 14 y 15)

Agregar `static esLibroValido(libro)` para verificar título y autor. Utilizarlo desde `prestarLibro` y lanzar `TypeError` cuando los datos no sean válidos. Crear el método privado `#tieneCupo()` y el getter `limitePrestamos`, inicialmente con valor 3. Impedir préstamos que superen el límite mediante `RangeError`. Completar `devolverLibro(titulo)`. Habilitar las pruebas 14 y 15.

**Antes de ejecutar:** ¿por qué `Usuario.esLibroValido(libro)` funciona, pero `usuario.esLibroValido(libro)` no?

## Herencia y super (diapositivas 16 y 17)

En las clases `Estudiante` y `Docente`, sobrescribir `limitePrestamos` con los valores 2 y 5. Agregar `descripcion()` en `Usuario` y sobrescribirla en las clases hijas utilizando `super.descripcion()`. Habilitar las pruebas 16–17.

**Antes de ejecutar:** el método `prestarLibro` no se sobrescribe. ¿Cómo puede aplicar un límite distinto en cada clase?

## Integración final

Con todas las pruebas aprobadas, abrir `index.html` y comprobar lo siguiente:

1. Crear un estudiante y registrar dos préstamos; intentar registrar un tercero.
2. Devolver uno de los libros y comprobar que vuelve a existir disponibilidad.
3. Crear un docente y registrar cinco préstamos; intentar registrar un sexto.
4. Registrar un nombre o un libro con espacios en blanco y observar las validaciones.
5. Localizar en `app.js` dónde se crean las instancias y dónde se llama a los métodos del modelo.
