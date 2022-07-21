// clave de api
const API_KEY = "e8d8e36405e49666a199b1545524fbe5";
// link de api
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
//link de google maps
const MAPS_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Contenedores
const temp = document.querySelector(".container__cards");
const form = document.getElementById("search-form");
const searchBox = document.getElementById("searchbox");
const boxMap = document.querySelector(".right");

async function getWeather() {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${WEATHER_URL}?q=${searchBox.value}&lang=es&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function onSubmit(event) {
  event.preventDefault();
  let value = searchBox.value;
  console.log(value);
  time();
}

form.addEventListener("submit", onSubmit, true);

function printMap(r) {
  console.log("printMap");
  let lat = r.data.coord.lat;
  console.log(lat);
  let lon = r.data.coord.lon;
  console.log(lon);
  let ifrm = document.createElement("iframe");
  ifrm.setAttribute(
    "src",
    `https://www.google.com/maps/embed?pb=!1m14!1m12!1m4!1d3172.1368882059437!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1658421521167!5m2!1ses!2spe`
  );
  boxMap.innerHTML = "";
  boxMap.appendChild(ifrm);
}

// Imprimir la informacion del clima
function printCard(r) {
  temp.innerHTML = `
  <div class="card__item">
    <div class="card__img-container">
    <div><h2>${r.data.main.temp}° C</h2></div>
      <img class="card__logo" src="http://openweathermap.org/img/wn/${r.data.weather[0].icon}@2x.png" alt="Logo LarnU" />
    </div>
    <div class="card__text-container">
      <div><h2>${r.data.name} - ${r.data.sys.country}</h2></div>
      <div><h2>H ${r.data.main.humidity}</h2></div>
      <div><h2>Temperatura${r.data.weather[0].description}</h2></div>
    </div>
  </div>`;
  printMap(r);
}

let time = async () => {
  let r = await getWeather();
  printCard(r);
};
