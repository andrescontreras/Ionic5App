# Ionic5App
Para iniciar el proyecto realizar los siguientes comandos
1. npm i
2. ionic serve

Instrucciones:
1. Registre un nuevo usuario
2. En el momento en que dé en crear cuenta será redirigido al listado de tareas pendientes
3. En el menú se encuentra la opción para la edición de la cuenta
4. Sobre este listado puede eliminar y crear nuevas tareas, abrir las tareas para editarlas y actualizarlas arrastrando hacia abajo
5. Sobre el listado también puede ordenar las tareas según los tres criterios dados.  
6. En el detalle de la tarea puede editar los campos de las tareas y guardar los cambios

# Notas:
1. Se utilizo el método toPromise en vez del subscribe ya que para estas últimas es necesario destruirlas de lo contrario quedan abiertas.
Lo causa que en aplicaciones grandes la estas se pongan lentas y hasta se puedan bloquear. Además, también es útil para no identar tanto 
el código, de modo que sea más fácil leerlo

2. Se crearon unos componentes genéricos con el fin de poder reutilizar las funcionalidades y disminuir la cantidad de código en los componentes "Page"
3. Se utilizo un HTTP_INTERCEPTOR cuya función es agregar el token a todas las peticiones y además funciona como un punto general para
controlar errores de peticiones genéricos como errores 401, 500, 0


# Que falto:
1. Agregar la función loguot
2. Crear el estilo de letras rojas para tareas vencidas
3. Funcionalidad para detectar la conexión a internet
4. Pruebas unitarias
