# Autoescuela

_Una aplicación para realizar test de autoescuela que simula el proceso que pasan los estudiantes para superar el examen de conducción._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Instalación** para conocer como ejecutar el proyecto en local.


### Pre-requisitos 📋

_Ordenador con las instalaciones siguientes:_

```
node, MySQL, git
```

### Instalación 🔧

_Una serie de ejemplos paso a paso que te dicen lo que debes hacer para tener el proyecto en ejecución. Usamos git bash como terminal de comándos para desarrollarlo.
Lo primero es configurar tu perfil de GitHub para vincularlo con tu cuenta online:_

```
git config --global user.email "...@gmail.com"
git config --global user.name "tuNombreDeUsuario"
```

_Luego clonarte el repositorio de este proyecto:_

```
git clone git@github.com:jorgelageJL/autoescuela.git
```


**BACKEND**

_Ahora verás la carpeta del proyecto 'autoescuela' clonada y dentro dos subcarpetas principales(.git no cuenta al tratarse de la propia herramienta para el control de versiones del proyecto), una con el backend y otra con el frontend. Entras al backend primero con el comando:_

```
cd backend
```
_e instalas lo siguiente:_

```
npm init
npm install express, sequelize mysql2, dotenv, cors, multer, jsonwebtoken, bcryptjs
```

_Al principio tardará un poco ya que npm está creando la carpeta 'node_modules' que ocupa mucho espacio y son las configuraciones para ejecutar el proyecto con node. Obviamente dicha carpeta no puede almacenarse en el repositorio. De esta forma quedará configurado el backend y listo para ser ejecutado de la siguiente forma:_

```
node index.js
```

**FRONTEND**

_Ahora sales del 'backend' y entras al 'frontend' con el comando:_

```
cd ../frontend
```

_e instalas 'IONIC' como paquete de npm :_

```
npm install -g @ionic/cli
npm install @capacitor/core @capacitor/cli
npm install @capacitor/camera
npm install @ionic/storage-angular
```

_Finalmente ejecutas el servidor 'frontend' de IONIC con el comando:_

```
ionic serve
```

### Documentación de apoyo ⌨️

```
https://sequelize.org/docs/v6/core-concepts/assocs/
https://www.bezkoder.com/node-js-express-sequelize-mysql/
https://www.bezkoder.com/sequelize-associate-one-to-many/
https://github.com/tcrurav/Many2OneExpress
https://www.bezkoder.com/sequelize-associate-many-to-many/
```

_Conceptos de asociaciones con ejemplos prácticos_

## Despliegue en GitHub 📦

_Siempre situarse en la carpeta raíz del proyecto(o sea dentro de 'autoescuela' donde aparecen las carpetas frontend, backend y los archivos .gitignore y README.md) y escribir en la consola lo siguiente:_

```
git add .
git commit -m "algo ..."
git remote add origin https://github.com/jorgelageJL/autoescuela.git
git push
```

## Construido con 🛠️

_Visual Studio Code, Git bash, TypeScript, Express, Multer, JWT_

```
* [node](https://nodejs.org/es)
* [Sequelize](https://sequelize.org/docs/v6/getting-started/)
* [MySQL](https://dev.mysql.com/doc/)

framework web usado
* [Angular](https://angular.dev/overview)
```

## Autores ✒️

_Estamos muy comprometidos con la asignatura y les agradecemos por todo el apoyo recibido_

* **Jorge González Lage** - *Backend* - [jorgelageJL](https://github.com/jorgelageJL)
* **Daniel Padrón Reyes** - *Frontend* - [Danipr2425](https://github.com/Danipr2425)

## Licencia 📄

Este proyecto está bajo la Licencia MIT.

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* etc.



---
⌨️ con ❤️ por [jorgelageJL](https://github.com/jorgelageJL) 
y [Danipr2425](https://github.com/Danipr2425) 😊
