const catalog = [
  { value: "microwave", name: "Микроволновая печь", unitValue: 5000 },
  { value: "washer", name: "Стиральная машина", unitValue: 6000 },
  { value: "vacuum", name: "Пылесос", unitValue: 4000 }
];

const extraValue = 500;

function getResult(quantityText, unitAmount, extraAmount) {
  if (quantityText.trim() === "") return "Ошибка: укажите количество";
  const quantity = Number(quantityText);
  if (!Number.isFinite(quantity)) return "Ошибка: введите число";
  if (quantity <= 0 || !Number.isInteger(quantity)) return "Ошибка: нужно положительное целое количество";
  return "Итого: " + (unitAmount * quantity + extraAmount);
}

const form = document.querySelector("form");
const result = document.querySelector("#result");

function showResult(text, isError) {
  result.textContent = text;
  result.style.color = isError ? "#B91C1C" : "#1E293B";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const select = document.querySelector("#item");
  const selectedValue = select.value;
  const quantityText = document.querySelector("#quantity").value;

  const item = catalog.find(entry => entry.value === selectedValue);

  if (!item) {
    showResult("Ошибка: выберите товар", true);
    return;
  }

  const message = getResult(quantityText, item.unitValue, extraValue);

  if (message.startsWith("Ошибка")) {
    showResult(item.name + ". " + message, true);
  } else {
    showResult(item.name + ". " + message, false);
  }
});