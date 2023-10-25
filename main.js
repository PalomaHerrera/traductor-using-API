// Elementos del DOM

const selectFrom = document.getElementById("traslateFrom");
const selectTo = document.getElementById("traslateTo");


// CONSEGUIR LA LISTA DE LENGUAJES DESDE EL SERVIDOR POR MEDIO DEL METODO GET

const URl_GET = 'https://text-translator2.p.rapidapi.com/getLanguages';
const options_get = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '97bb0872eemsh85f62a57848dce5p147518jsn624aa0ff1d59',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

let selectFromCode;
let selectToCode;

fetch(URl_GET, options_get)
.then(res => res.json())
.then(objetoIdioma => {
    // Codigo para cargar los idiomas en los selects
    let idiomas =  objetoIdioma.data.languages;
    //recorremos con un foreach cada idioma del objeto
    idiomas.forEach(idioma => {
        // agregamos al select con un innerHTML la etiqueta Option pasandole el code y name del idioma
        selectFrom.innerHTML += `<option value="${idioma.code}">${idioma.name}</option>`;
        selectTo.innerHTML += `<option value="${idioma.code}">${idioma.name}</option>`;

    });


    selectFrom.addEventListener('click', () => {
        console.log(selectFrom.value);
        selectFromCode = selectFrom.value;
    });

    selectTo.addEventListener('click', () => {
        console.log(selectTo.value);
        selectToCode = selectTo.value;

    });


}).catch(err => console.log(err))


// CONSEGUIR LOS DATOS DEL INPUT PARA PODER TRADUCIRLOS

const traslate = document.getElementById("traducir");


// PODER HACER LA TRADUCCION POR MEDIO DEL SERVIDOR USANDO EL METODO POST

const URL_POST = 'https://text-translator2.p.rapidapi.com/translate';

// evento para hacer click en el button
traslate.addEventListener('click', () => {

    let inputTranslate =  document.getElementById("inputTranslate").value;
    let outputTranslate =  document.getElementById("outputTranslate");

    // URLSearchParams es un objeto de js. Este objeto sirve para enviar los parametros de busqueda
    const encodedParams = new URLSearchParams();

    //le vamos a ir agregando los parametros que vamos a estar necesitando
    encodedParams.append("source_language", selectFromCode);
    encodedParams.append("target_language", selectToCode);
    encodedParams.append("text",inputTranslate);


    const options_post = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '97bb0872eemsh85f62a57848dce5p147518jsn624aa0ff1d59',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };


    fetch(URL_POST, options_post)
    .then(respuesta => respuesta.json())
    .then(respuesta => outputTranslate.innerText = respuesta.data.translatedText)
    .catch(err => console.log(err))

});

