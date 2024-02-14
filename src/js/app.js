document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll'); // para que no haya un salto al aparecer la barra. buscar en globales;
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); // prevenimos el comportamiento de que nos lleve de golpe a la seccion al usar ids;
            const seccionScroll = e.target.attributes.href.value; // accedemos al valor del href de cada etiqueta;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: 'smooth'});
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="">
        `;

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}


function mostrarImagen(i) {
    const imagen = document.createElement('picture'); // creamos la etiqueta picture;
    imagen.innerHTML = `
    <source srcset="build/img/grande/${i}.avif" type="image/avif">
    <source srcset="build/img/grande/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${i}.jpg" alt="">
    `;

    // Creamos el overlay con la imagen:
    const overlay = document.createElement('DIV'); // creamos la etiqueta div;
    overlay.appendChild(imagen); // metemos la etiqueta picture dentro del div;
    overlay.classList.add('overlay'); // le agregamos la clase overlay al div;
    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    // Boton para cerrar el modal:
    const cerrarModal = document.createElement('P'); // creamos la etiqueta p;
    cerrarModal.textContent = 'X'; // le agregamos texto
    cerrarModal.classList.add('btn-cerrar'); // le agregamos la clase btn-cerrar;
    overlay.appendChild(cerrarModal); // agregamos la etiqueta p al overlay;
    cerrarModal.onclick = function() { // para que funcione el boton de cerrar;
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //Añadimos el overlay al HTML:
    const body = document.querySelector('body'); // seleccionamos el body del html;
    body.appendChild(overlay); // metemos el div dentro del body;
    body.classList.add('fijar-body');

}