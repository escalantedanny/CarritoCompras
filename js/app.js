// variables

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCursos = document.getElementById('vaciar-carrito');

// listenerd
cargarEventListenerd();

function cargarEventListenerd() {
    cursos.addEventListener('click', comprarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCursos.addEventListener('click', vaciarCarrito);

    // cargar contenido del localsatorage al DOM
    // similar al document Ready
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// funciones
function comprarCurso(evt) {

    evt.preventDefault();

    if (evt.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = evt.target.parentElement.parentElement;
        leerDatosCursoSeleccionado(cursoSeleccionado);
    }

}

function eliminarCurso(evt) {

    evt.preventDefault();

    if (evt.target.className === 'borrar-curso') {
        evt.target.parentElement.parentElement.remove();
    }

    eliminarCursoLocalStorage(evt.target.getAttribute('data-id'));

}

// leer datos del curso
function leerDatosCursoSeleccionado(cursoSeleccionado) {

    const datosCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        idCurso: cursoSeleccionado.querySelector('a').getAttribute('data-id') // como acceder cuando el atributo es personalizado
    }

    insertarCarrito(datosCurso);

}

//muestra el curso seleccionado en el carrito
function insertarCarrito(datosCurso) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
            <td><img src="${datosCurso.imagen}" width="100"></td>
            <td>${datosCurso.titulo}</td>
            <td>${datosCurso.precio}</td>
            <td><a href="#" class="borrar-curso" data-id="${datosCurso.idCurso}" >X</a></td>
        `;

    listaCursos.appendChild(fila);

    // agregar tweet local estorage
    agregarLocalStoare(datosCurso);

}

function vaciarCarrito() {

    //listaCursos.innerHTML = '';  // <-- la forma mas rapida y menos recomendada

    // la forma mas lenta pero segura
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild); // <-- la mas lenta pero la mejor recomendada
    }

    eliminandoCursosLocalStorage();
}

// almacena curso de carrito a localstorage
function agregarLocalStoare(curso) {

    let cursosLocalStorage;
    cursosLocalStorage = obtenerDataLocalStorage();

    // agregamos al final del arreglo con push en el JSON del local storage
    cursosLocalStorage.push(curso);

    //convertir  de string a arreglo de local storage
    localStorage.setItem('cursos', JSON.stringify(cursosLocalStorage));
}

function obtenerDataLocalStorage() {
    let cursosLS;
    //revisamos los valores de local storage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

// comprobar que halla elementos en localstorage returna arreglo
function obtenerTweetsLocalStorage() {
    let curso;
    //revisamos los valores de local storage
    if (localStorage.getItem('cursos') === null) {
        curso = [];
    } else {
        curso = JSON.parse(localStorage.getItem('curso'));
    }
    return curso;
}

// imprimie cursos de localStorage en el carrito
function localStorageListo() {
    let cursosLocalStorage;

    cursosLocalStorage = obtenerDataLocalStorage();

    cursosLocalStorage.forEach(function(data) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
                <td><img src="${data.imagen}" width="100"></td>
                <td>${data.titulo}</td>
                <td>${data.precio}</td>
                <td><a href="#" class="borrar-curso" data-id="${data.idCurso}" >X</a></td>
            `;

        listaCursos.appendChild(fila);

    });

}

// vaciamos el arreglo que se crea en localstorage con el boton vaciar carrito
function eliminandoCursosLocalStorage() {
    localStorage.clear();
}

//eliminar curso local storage uno en uno
function eliminarCursoLocalStorage(idCurso) {
    let cursos = obtenerDataLocalStorage();

    cursos.forEach(function(data, index) {
        if (data.idCurso == idCurso) {
            cursos.splice(index, 1);
        }
    });

    // si no se convierte de arreglo a string no se ejecuta la elliminacion en el localstorage
    localStorage.setItem('cursos', JSON.stringify(cursos));
}