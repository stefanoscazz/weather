import './img/geo.png';
import './img/search.png';
import './style.css';

/** */
const input = document.querySelector('input');
const btn = document.querySelector('.btn');
const key = process.env.API_KEY;
const titoloCitta = document.querySelector('.titolo__citta > h1');
const temperatura = document.querySelector('.temperatura');
const imges = document.querySelector('.img');
const stato = document.querySelector('.stato');
const sezMeteo = document.querySelector('.sezione__meteo');
const geoBtn = document.querySelector('.geo');
const vento = document.querySelector('.vento');
const divVento = document.querySelector('.div_vento');
const divTemperatura = document.querySelector('.div_temperatura');
const divImmagine = document.querySelector('.div_immagine');

let dataO = new Date();
let days = dataO.getDay();
const divGiorno = document.querySelector('.giorno');
let giorni = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedi', 'Venerdì', 'Sabato'];
/*Rischiesta dati json tramite valore input(nome citta)*/
btn.addEventListener('click', () => {
    let cityName = input.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}&lang=it`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            popolaElementi(data);
        })
});
/** Al click si richiama funzione per ottenere coordinate*/
geoBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(geol);
})
/**ottieni coordinate */
function geol(position) {
    let lat = position.coords.latitude;
    console.log(lat);
    let lon = position.coords.longitude;
    console.log(lon);
    richiestaJson(lat, lon);
};
/**Richiesta dati Json tramite Url con coordinate */
function richiestaJson(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}&lang=it`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            popolaElementi(data);
        })
}
/** Popola elementi sia di geolocalizzazione che tramite input */
function popolaElementi(data) {
    if (data.cod === "400") {
        sezMeteo.style.display = 'none'
    } else {
        ScrollReveal().reveal(divImmagine, { delay: 800, duration: 1000, distance: '50px' });
        ScrollReveal().reveal(divVento, { delay: 1200, duration: 1000, distance: '50px' });
        ScrollReveal().reveal(divTemperatura, { delay: 400, duration: 1000, distance: '50px' });
        ScrollReveal().reveal(document.querySelector('.titolo__citta'), { delay: 100, duration: 1300, distance: '50px' });
        sezMeteo.style.display = 'flex'
        window.scroll({
            top: 1000,
            behavior: 'smooth'});
        let meteo = data;
        console.log(meteo);
        vento.textContent = meteo.wind.speed + 'Km/h';
        titoloCitta.textContent = meteo.name;
        temperatura.textContent = Math.floor(meteo.main.temp) + '°C';
        imges.src = `https://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`;
        stato.textContent = meteo.weather[0].description;
        divGiorno.textContent = giorni[days];
        input.value = '';
    }
}
