<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/franquirantv/phone-team">
    <img src="phong-team\src\assets\logoPhong.png" alt="Logo" width="83" height="83" style="background-color:white">
  </a>

  <h3 align="center">AutoFrame</h3>

  <p align="center">
    Necesitas un anuncio rápido? AutoFrame es tu solución!
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de contenido</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#herramientas">Herramientas</a></li>
      </ul>
    </li>
    <li>
      <a href="#configuracion-y-ejecucion">Configuración y ejecución</a>
      <ul>
        <li><a href="#requisitos-previos">Requisitos previos</a></li>
        <li><a href="#instalacion">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#futuras-mejoras">Futuras mejoras</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre el proyecto

[![Landing Screen Shot][landing-screenshot]](https://github.com/franquirantv/phong-team)

Esta aplicación es una plataforma para crear banners de anuncios de forma automática. 

El usuario puede subir su modelo 3D adjuntando una frase gancho de forma opcional, y la aplicación se encargará de generar distintas imágenes con las mejores vistas del modelo 3D y la frase gancho.

Además podrá previsualizar el prototipo en 3D y hacer una captura de la escena con el ángulo que desee y descargarla.

El objetivo de este proyecto pasa por facilitar la creación de banners de anuncios para los usuarios que no tengan conocimientos de diseño gráfico y/o necesiten un montaje rápido.

### Herramientas

La aplicación ha sido desarrollada con Angular + Bootstrap. 

* [![Angular][Angular.io]][Angular-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Three.js][Three.js]][Three-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]


<!-- GETTING STARTED -->
## Configuración y ejecución

Para obtener una copia del proyecto y poder ejecutarlo, debes seguir los siguientes pasos:

### Requisitos previos

Es importante para la ejecución del proyecto que tengas instalado Node y NPM en tu máquina. Para instalar ambas herramientas, sigue estos pasos:

#### Windows
* [Node](https://nodejs.org/en/download/) Download page

#### Linux
  ```sh
  sudo apt install nodejs npm
  ```

### Instalación

1. Clona el repositorio
   ```sh
   git clone https://github.com/franquirantv/prueba-tecnica.git
   ```

2. Config/Ejecutar Frontend
   - Ir al directorio "phong-team"
   ```sh
   cd phong-team
   ```
   - Instalar las dependencias necesarias
   ```sh
   npm install
   ```
   - Ejecutar el servicio
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">Volver arriba</a>)</p>

<!-- ROADMAP -->
## Futuras mejoras

- [:x:] Implementar un editor para el fondo y el texto de la imágenes.
- [:x:] Implementar una base de datos para almacenar las imágenes y/o modelos.
- [:x:] Crear la autentificación de usuarios.
- [:x:] Crear los Tests unitarios.

<!-- LICENSE -->
## Licencia

Distribuido bajo la Licencia MIT. Lee `LICENSE.txt` para más información.

<!-- Contribuciones -->
## Contribuciones

Si tienes alguna sugerencia que pueda mejorar la aplicación, puedes hacer un fork del repositorio y crear una pull request. También puedes abrir una incidencia con la etiqueta "enhancement". No olvides darle una estrella al proyecto. Gracias.

1. Fork del proyecto
2. Crea tu rama de características (git checkout -b feature/AmazingFeature)
3. Confirme sus cambios (git commit -m 'Add some AmazingFeature')
4. Haz un push de la rama (git push origin feature/AmazingFeature)
5. Abrir una Pull Request

<!-- CONTACT -->
## Contacto

Francisco Quirant Vicente - [Linkedin](https://linkedin.com/in/francisco-quirant-vicente) - francisco.quirant.v@gmail.com
Antonio Manuel Bañuls Ballester - [Linkedin](https://www.linkedin.com/in/antonio-manuel-ba%C3%B1uls-ballester-512b971b9/) - ambanulsb@gmail.com
Alberto Sánchez Lillo - [Linkedin](https://linkedin.com/in/alberto-sanchez-lillo) - slillo.alberto@gmail.com

Enlace del proyecto: [https://github.com/franquirantv/phong-team](https://github.com/franquirantv/phong-team)

<p align="right">(<a href="#readme-top">Volver arriba</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[landing-screenshot]: /phong-team/src/assets/imagenEjemplo.png

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/

[Typescript]: https://img.shields.io/badge/typescript-2d6ed6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com

[Three.js]: https://img.shields.io/badge/Three.js-ffffff?style=for-the-badge&logo=threedotjs&logoColor=black
[Three-url]: https://threejs.org