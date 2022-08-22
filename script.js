const apiKey = "5c6fce078b5796adc19e7059c9ff0491";
let cityName = document.getElementById("cityName");
const result = document.getElementById("resultado")
const btn = document.getElementById("btnEnter")

cityName.focus()

function search() {
  let cityNameValue = cityName.value;

  if (cityNameValue == "") {
    document.querySelector(".msgErro").innerText = "Digite o nome de uma cidade!";
    function error() {
      document.querySelector(".msgErro").innerText = ""
    };
    setTimeout(error, 3000);

    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&lang=pt_br&appid=${apiKey}&units=metric`)
    .then(res => {
      res.json().then(data => {
        if (res.status == 200) {
          result.removeAttribute("class", "hidden");
          result.setAttribute("class", "resultado");
          const { main, name, sys, weather } = data;
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;


          document.querySelector(".spanName").innerText = `${name}`;
          document.querySelector(".country").innerText = `${sys.country}`;
          document.querySelector(".city-temp").innerHTML = `${Math.round(main.temp)} <sup class="celsius">ºC</sup>`;
          document.querySelector("figure").innerHTML = `<img class="city-icon" src="${icon}" alt="${weather[0]["description"]
            }"> <figcaption>${weather[0]["description"]}</figcaption>`;
          cityName.value = ""
        } else if (res.status != 200) {
          cityName.value = ""
          document.querySelector(".msgErro").innerText = "Cidade não encontrada!";
          function error() {
            document.querySelector(".msgErro").innerText = " ";
          };
          setTimeout(error, 3000);
          return
        }
      })
    })
};
cityName.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    search()
  }
})
btn.addEventListener("click", search)