# Examen programador React


###  una aplicación en React que posea un conjunto reducido de
características propias de un Blog de Internet.

## Pasos para poder instalar y correr de manera local

Para poder correr localmente el proyecto se necesita previamente tener isntalado MYSQL -

se inicia el servicio de mysql 
`service mysql start`

Se entra a mysql con el siguiente comando 

`mysql -u root -pPASSWORD;` reemplazando PASSWORD con la contraseña

Se crea una nueva DB con el nombre "wooBlog" sin comillas
`CREATE DATABASE wooBlog;`

Se entra a la Base de Datos

`USE wooBlog;`

La primera vez se tiene que crear la tabla que usa la applicación llamada "entry"

`CREATE TABLE entry ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY , user VARCHAR(50) NOT NULL, title VARCHAR(100) NOT NULL, content TEXT NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP );`

Se pobla por primera vez la tabla con el siguiente [comando](mysql_poblate.txt)  : en la misma consola de mysql 

## Para descargar el proyecto :

Descargar el repositorio y en el directorio  instalar todas las dependencias con 
`npm install `

Correr `npm run dev `

El proyecto  se encuentra en : 
 [http://localhost:3000](http://localhost:3000) 

Muchas consideraciones aparte, me apegué exclusivamente a lo que delimitaba la descripción del proyecto aún que existan los endpoints para las demas acciónes restful  para actualizar eliminar y entradas individuales.

De la misma forma la funcionalidad extra quedó muy cercana pero por cuestión de tiempos en el fin de semana se quedó en una implementación para el futúro.

De la misma manera quedé a pocos pasos de poder completamente deployar una versión en vivo a Vercel pero la falta de tiempo me lo impidió.
