🚗 Autoescuela

Aplicación web para realizar test de autoescuela que simula el proceso real que siguen los estudiantes para superar el examen teórico de conducción.

El sistema permite gestión de:

👨‍🎓 Alumnos

👨‍🏫 Profesores

👑 Administrador

📝 Tests y resultados

🚀 Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para desarrollo y pruebas.

📋 Pre-requisitos

Tener instalado:

Node.js

MySQL

Git

Ionic CLI (npm install -g @ionic/cli)

🔧 Instalación

Usamos Git Bash o cualquier terminal compatible.

📦 Clonar repositorio
git config --global user.email "tuEmail@gmail.com"
git config --global user.name "tuUsuario"

git clone https://github.com/jorgelageJL/autoescuela.git
cd autoescuela

El proyecto tiene dos carpetas principales:

backend

frontend

🔙 BACKEND

Entrar en la carpeta:

cd backend

Instalar dependencias:

npm install

(Si no existe package.json)

npm init -y
npm install express sequelize mysql2 dotenv cors bcryptjs jsonwebtoken
⚙️ Configuración .env

Crear un archivo .env dentro de backend:

JWT_SECRET=AVeryStrongPassword
MYSQL_DATABASE=autoescuela_db
MYSQL_USER=root
MYSQL_PASSWORD=1234
MYSQL_ROOT_PASSWORD=1234
DB_HOST=localhost
NODE_ENV=development
🔐 Seguridad implementada

El sistema utiliza:

bcrypt para encriptar contraseñas (hash + salt automático)

JWT (JSON Web Tokens) para autenticación

Variables de entorno con dotenv

Middleware de protección de rutas

Las contraseñas no se almacenan en texto plano.

👑 Admin inicial automático

Al iniciar el servidor por primera vez, se crea automáticamente un usuario administrador inicial si no existe.

Esto permite acceder al sistema sin necesidad de registro manual del primer admin.

Ejemplo:

Rol: ADMIN

Email: admin@autoescuela.com

Password: admin123
(La contraseña está encriptada con bcrypt)

▶️ Ejecutar backend
node index.js

El servidor se ejecutará en:

http://localhost:3000
🎨 FRONTEND

Entrar en la carpeta:

cd frontend

Instalar dependencias:

npm install

Ejecutar:

ionic serve

Se abrirá en:

http://localhost:8100
🏗️ Arquitectura del proyecto
Backend

Express

Sequelize (ORM)

MySQL

JWT

bcrypt

Frontend

Angular

Ionic

TypeScript

🔄 Flujo de autenticación

Usuario inicia sesión

Backend valida contraseña con bcrypt.compare

Se genera un JWT

El frontend guarda el token

Las rutas protegidas validan el token

📦 Despliegue en GitHub

Situarse en la carpeta raíz (autoescuela):

git add .
git commit -m "Mensaje descriptivo"
git push origin dani-cambios
🛠 Construido con

Visual Studio Code

Git

Node.js

Express

Sequelize

MySQL

Angular

Ionic

JWT

bcrypt

✒️ Autores

Jorge González Lage – Backend – jorgelageJL
Daniel Padrón Reyes – Frontend – Danipr2425

📄 Licencia

Proyecto bajo Licencia MIT.

🎁 Agradecimientos

Proyecto desarrollado como parte de la asignatura.
Gracias por el apoyo y seguimiento durante el desarrollo.

⌨️ con ❤️ por jorgelageJL y Danipr2425 🚗
