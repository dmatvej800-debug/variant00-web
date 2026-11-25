function getResult(quantityText, unitAmount, extraAmount) {
  if (quantityText.trim() === "") {
    return "Ошибка: укажите количество";
  }
  const quantity = Number(quantityText);
  if (!Number.isFinite(quantity)) {
    return "Ошибка: введите число";
  }
  if (quantity <= 0 || !Number.isInteger(quantity)) {
    return "Ошибка: нужно положительное целое количество";
  }
  const totalAmount = unitAmount * quantity + extraAmount;
  return "Итого: " + totalAmount;
}

const catalog = [
  { position: 1, name: "Микроволновая печь", specs: "20 л · 700 Вт", description: "Для разогрева и приготовления блюд дома" },
  { position: 2, name: "Стиральная машина", specs: "6 кг · 1000 об/мин", description: "Для стирки повседневной одежды и постельного белья" },
  { position: 3, name: "Пылесос", specs: "1600 Вт · 2 л", description: "Для сухой уборки полов и ковров дома" }
];

const selectedName = "Микроволновая печь";
const quantityText = "2";
const unitValue = 5000;
const extraValue = 500;
let foundCount = 0;

console.log("Записей:", catalog.length);

for (const item of catalog) {
  console.log(item.position + ". " + item.name);
  console.log("Характеристика:", item.specs);
  console.log("Описание:", item.description);

  if (item.name === selectedName) {
    foundCount = foundCount + 1;
    console.log("Выбрано для расчёта:", item.name);
    const message = getResult(quantityText, unitValue, extraValue);
    console.log(message);
    console.log("Единица расчёта: руб.");
  }
}

console.log("Найдено записей:", foundCount);

if (foundCount === 0) {
  console.log("Запись не найдена:", selectedName);
}

if (foundCount > 1) {
  console.log("Проверьте повторяющиеся названия");
}

console.table(catalog);

const names = catalog.map(item => item.name);
console.log("Названия:", names);
console.log("Всего названий:", names.length);

function filterByText(items, query) {
  const normalized = query.trim().toLowerCase();
  if (normalized === "") return items;
  return items.filter(item => item.name.toLowerCase().includes(normalized));
}

console.log("Пустой запрос:", filterByText(catalog, "").length);
console.log("Часть названия:", filterByText(catalog, "печь").map(i => i.name));
console.log("Нет совпадений:", filterByText(catalog, "холодильник").length);

const status = document.querySelector("#status");
const first = catalog[0].name;
status.textContent = first + " — " + catalog.length + " записей";

const namesList = document.querySelector("#names");

function renderNames() {
  namesList.replaceChildren();
  for (const item of catalog) {
    const line = document.createElement("li");
    line.textContent = item.name;
    namesList.append(line);
  }
}

const showButton = document.querySelector("#show-names");
showButton.addEventListener("click", renderNames);

window.addEventListener("error", function (event) {
  console.error("Ошибка на странице:", event.message, "в", event.filename, "строка", event.lineno);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("Service worker зарегистрирован"))
      .catch(err => console.error("Ошибка регистрации SW:", err));
  });
}