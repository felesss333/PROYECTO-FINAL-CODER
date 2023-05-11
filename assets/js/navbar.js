// CLASES QUE TOMAMOS PARA ASIGNARLE UNA CLASE NUEVA A MEDIDA QUE EL USUARIO RECORRE LAS SECCIONES DE LA WEB //
const links = document.querySelectorAll('.links');

window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY;

    //ONTENIENDO LA POSICIÓN Y ALTURA DE LAS SECCIONES//
    const inicioPos = document.querySelector('#inicio').offsetTop;
    const inicioHeight = document.querySelector('#inicio').offsetHeight;
    const productosPos = document.querySelector('#productos').offsetTop;
    const productosHeight = document.querySelector('#productos').offsetHeight;
    const sobrenosotrosPos = document.querySelector('#sobrenosotros').offsetTop;
    const sobrenosotrosHeight = document.querySelector('#sobrenosotros').offsetHeight;

    // COMPARANDO POSICIÓN EN PANTALLA RESPECTO A LAS SECCIONES //
    if (scrollPos >= inicioPos && scrollPos < inicioPos + inicioHeight) {
        //SI EL USUARIO ESTA EN LA SECCION DE #INICIO, AGREGAMOS LA CLASE ACTIVE (PREVIAMENTE GENERADA EN EL CSS) //
        links.forEach(link => {
            if (link.getAttribute('href') === '#inicio') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    } else if (scrollPos >= productosPos && scrollPos < productosPos + productosHeight) {
        //SI EL USUARIO ESTA EN LA SECCION DE #PRODUCTOS, AGREGAMOS LA CLASE ACTIVE (PREVIAMENTE GENERADA EN EL CSS) //
        links.forEach(link => {
            if (link.getAttribute('href') === '#productos') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    } else if (scrollPos >= sobrenosotrosPos && scrollPos < sobrenosotrosPos + sobrenosotrosHeight) {
        //SI EL USUARIO ESTA EN LA SECCION DE #SOBRENOSOTROS, AGREGAMOS LA CLASE ACTIVE (PREVIAMENTE GENERADA EN EL CSS) //
        links.forEach(link => {
            if (link.getAttribute('href') === '#sobrenosotros') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});

//LISTENER SOLO PARA QUE CUANDO EL USUARIO HAGA CLICK EN EL NAVBAR GENERE UN SCROLL TO TOP DE LA PÁGINA//
const inicioLink = document.querySelector('.links[href="#inicio"]');
inicioLink.addEventListener('click', function (event) {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});