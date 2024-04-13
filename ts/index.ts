const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-local");

const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const local = input.value;

  if (local.length < 3) {
    alert("O local precisa ter, pelo menos, tres letras");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${API_ID}&lang=pt_br&units=metric`
    );

    const data = await response.json();
    console.log(data);

    const infos = {
      temp: Math.round(data.main.temp),
      local: data.name,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    sectionTempoInfo.innerHTML = `
    <div class="tempo-data">
      <h2>${infos.local}</h2>
      <span>${infos.temp} ºC</span>
    </div>
    <img src="${infos.icon}" alt="" />
`;
  } catch (err) {
    console.log("Aconteceu um erro inesperado na API.", err);
  }
});
