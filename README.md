# API-REST
En esta practica realizamos una API REST, utilizando de base una tabla RESTFull

## Vamos a empezar

Si te gustaria tener los archivos necesarios de esta practica puedes entrar a la siguiente liga (https://github.com/Ericktati1234/API-REST.git) y descargar la totalidad del proyecto.

### Prerequisitos

Debemos de tener asegurado que tenemos instalados la siguiente herramienta

npm 

```
npm --version
---------------------
    -10.7.0 //Por ejemplo
```

Con los anteriores comandos podemos observar su version, en caso de no retornarnos algo similar y necesitemos instalar, podemos ejecutar el siguiente comando:

```
sudo apt install npm
```

### Creando nuestro espacio de trabajo

Vamos a postrarnos dentro de nuestra carpeta principal de nuestro proyecto, aseguremonos que vemos documentos como los siguientes:

```
API REST - Erick Nevarez/
├── bin/
├── controllers/     *Carpeta no necesaria para esta practica*
├── node_modules/
├── public/
├── routes/
├── views/
├── app.js
├── package.json
└── package-lock.json
```

Podemos tambien crear nosotros nuestro propio proyecto de esta API y solamente copiar o editar los archivos correspondientes. En el siguiente subtitulo muestro como realizar dicha configuracion

### (OPCIONAL) Creando nuestro propio proyecto

Entramos a la carpeta donde almacenaremos nuestro proyecto y nos aseguramos de tener la herramienta de express descargada, para ello, ejecutamos el siguiente comando:

```
npm install -g express-generator
```
Nos arrojará lo siguiente:

```
npm warn deprecated mkdirp@0.5.1: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)

added 10 packages in 2s

```
Seguido de esto ejecutaremos el siguiente comando, lo cual dará inicio a nuestro proyecto (Podemos cambiar el nombre de Proyecto1, por un nombre de nuestra preferencia para el proyecto):

```
express --view=pug Proyecto1
```
Nos mostrara los siguientes mensajes de creacion de nuestro espacio de trabajo:
```
   create : Proyecto1/
   create : Proyecto1/public/
   create : Proyecto1/public/javascripts/
   create : Proyecto1/public/images/
   create : Proyecto1/public/stylesheets/
   create : Proyecto1/public/stylesheets/style.css
   create : Proyecto1/routes/
   create : Proyecto1/routes/index.js
   create : Proyecto1/routes/users.js
   create : Proyecto1/views/
   create : Proyecto1/views/error.pug
   create : Proyecto1/views/index.pug
   create : Proyecto1/views/layout.pug
   create : Proyecto1/app.js
   create : Proyecto1/package.json
   create : Proyecto1/bin/
   create : Proyecto1/bin/www

```
Y por ultimo nos mostrará una serie de comandos utiles:
```
   change directory:
     $ cd Proyecto1
   install dependencies:
     $ npm install

   run the app:
     $ DEBUG=Proyecto1:* npm start

```
Dentro de nuestra ruta del proyecto no poseeremos de todos los archivos como lo posee este repositorio, esto es porque, ademas de añadir la carpeta de controllers, nos falta instalar las dependencias, para ello ejecutamos el siguiente comando:

```
   npm install
```
Dicho comando instala las dependencias de nuestro proyecto, lo cual añade la carpeta node_modules dentro de nuestro proyecto.

Hasta este momento, solamente deberemos modificar el siguiente archivo de la siguiente forma:

routes/index.js

```
const express = require('express');
const app = express();

// Middleware para manejar JSON o URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sumar n1 + n2
app.get('/results/:n1/:n2', (req, res) => {
  const n1 = parseFloat(req.params.n1);
  const n2 = parseFloat(req.params.n2);
  const result = n1 + n2;
  res.json({ result });
});

// Multiplicar n1 * n2
app.post('/results', (req, res) => {
  const { n1, n2 } = req.body;
  const result = n1 * n2;
  res.json({ result });
});

// Dividir n1 / n2
app.put('/results', (req, res) => {
  const { n1, n2 } = req.body;
  if (n2 === 0) {
    return res.json({ error: 'No se puede dividir por cero' });
  }
  const result = n1 / n2;
  res.json({ result });
});

// Potencia n1 ^ n2
app.patch('/results', (req, res) => {
  const { n1, n2 } = req.body;
  const result = Math.pow(n1, n2);
  res.json({ result });
});

// Restar n1 - n2
app.delete('/results/:n1/:n2', (req, res) => {
  const n1 = parseFloat(req.params.n1);
  const n2 = parseFloat(req.params.n2);
  const result = n1 - n2;
  res.json({ result });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

LISTO!!, Ahora podemos ir a probar nuestro proyecto.


### Pruebas de nuestro proyecto con postman

Iremos a la carpeta de nuestro proyecto y ejecutaremos el siguiente comando el cual activa nuestro servidor:

```
  npm start
```
Podemos confirmar que este esté funcionando escribiendo en cualquier navegador la ruta "localhost:3000", dicha ruta nos mostrará una pantalla de error en pantalla con el mensaje "Not Found 404"

Ya habiendo corrido nuestro servidor, ahora si vamos a ejecutar las instrucciones HTTP con ayuda de postman
Podemos probar las instrucciones de get (sumar) y Delete (restar), con solamente introducir la url de nuestro proyecto "localhost:3000/results/", seguido de los parametros a sumar o restar divididos por diagonales y habiendo especificado el get o delete, para sumar o restar respectivamente. Por ejemplo

* get (suma)
```
  localhost:3000/results/10/5/
```
retorna
```
  {
    result: 15
  }

Dicha respuesta esta en formato json
```

* delete (resta)
```
  localhost:3000/results/10/5/
```
retorna
```
  {
    result: 5
  }

Dicha respuesta esta en formato json
```
Por otro lado si deseamos ejecutar los comandos de post (multiplicar), put (dividir) y patch (potencia), debermeos de enviar los parametros en el body de nuestra solicitud, para ello nos vamos a la pestaña de "body", seleccionamos la opcion de x-www-form-urlencoded, lo cual nos mostrara una tabla con las columnas key y value, escribiremos de la siguiente forma los valores

key          Value
* n1        * 6
* n2        * 3

Ahora, ejecutaremos el comando que queramos post (multiplicar), put (dividir) y patch (potencia), y se nos retornará el resultado en formato json como en los otros ejemplos:

* post (Multiplicar)
```
  {
    result: 18
  }

```
* put (Dividir)
```
  {
    result: 2
  }

```
* patch (Potencia)
```
  {
    result: 216
  }

```

## Implementacion

Para mayor informacion sobre esta practica los invito a que revisen las ligas oficiales de cada dependencia
* [Express](https://expressjs.com/)
* [NPM](https://www.npmjs.com/)

## Hecho con

* [VsCode](https://code.visualstudio.com) - Como editor de nuestro codigo fuente
* [GitHub](https://github.com) - Como gestor de repositorios remotos

## Contribucion

Si desea contribuir y mejorar el siguiente documento, favor de contactarnos en el siguiente correo (ContactoBinBash@coolmail.com)

## Versionado

Para el versionado y consulta de documento hacemos el uso de [GitHub](https://github.com) con el cual se subieron los archivos necesarios para la practica

## Authors

* **Erick Nevarez** - *Totalidad del trabajo* - [Ericktati1234](https://github.com/Ericktati1234)

Por el momento a la fecha 18/09/2024 no existen colaboradores que hayan participado en el proyecto

## License

Este proyecto es usado solamente para usos didacticos, no nos hacemos responsables ninguno de los autores por el mal uso del codigo anexado
Todos los documentos y links son una via para obtener mayor conocimiento, no se obtiene ningun beneficio personal por el compartir los links

## Reconocimientos

No hay reconocimientos hasta el momento 


