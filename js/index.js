"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-local");
const sectionTempoInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const local = input.value;
    if (local.length < 3) {
        alert("O local precisa ter, pelo menos, tres letras");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=9c0f34e9b9fe52d08f558c3792d27e67&lang=pt_br&units=metric`);
        const data = yield response.json();
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
    }
    catch (err) {
        console.log("Aconteceu um erro inesperado na API.", err);
    }
}));
