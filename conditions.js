// Исходные данные моего приложения (пары 19–20, V09)
// Считаем: стоимость выбранной техники × количество + доставка (один раз)
const itemName = "Микроволновая печь";
const unitValue = 5000;        // цена одной единицы, рублей
const extraValue = 500;        // доставка всего заказа, рублей, один раз
let quantityText = "2";        // текст количества — строка
const isTraining = true;       // признак учебных данных, в формулу не входит

console.log("Расчёт моего приложения");
console.log("Название:", itemName);
console.log("Количество (текст):", quantityText);
console.log("Цена за единицу:", unitValue);
console.log("Доставка:", extraValue);
console.log("Учебные данные:", isTraining);
console.log("Тип количества:", typeof quantityText);   // string
console.log("Тип цены:", typeof unitValue);            // number

function getResult(quantityText, unitAmount, extraAmount) {
  // 1) Пустой текст или только пробелы
  if (quantityText.trim() === "") {
    return "Ошибка: укажите количество";
  }

  // 2) Преобразование строки в число
  const quantity = Number(quantityText);

  // 3) Не конечное число (NaN, Infinity)
  if (!Number.isFinite(quantity)) {
    return "Ошибка: введите число";
  }

  // 4) Не положительное
  if (quantity <= 0) {
    return "Ошибка: нужно положительное целое количество";
  }

  // 5) Не целое
  if (!Number.isInteger(quantity)) {
    return "Ошибка: нужно положительное целое количество";
  }

  // 6) Расчёт: цена × количество + доставка один раз
  const totalAmount = unitAmount * quantity + extraAmount;
  return "Итого: " + totalAmount;
}

const resultMessage = getResult(quantityText, unitValue, extraValue);
console.log(resultMessage);

// --- Испытания (13 подписанных вызовов) ---

// Мой вариант: 5000 × 2 + 500 = 10500
console.log("Мой вариант:", getResult("2", unitValue, extraValue));

// Одна единица: 5000 × 1 + 500 = 5500
console.log("Одна единица:", getResult("1", unitValue, extraValue));

// Три единицы: 5000 × 3 + 500 = 15500
console.log("Три единицы:", getResult("3", unitValue, extraValue));

// Пустое поле
console.log("Пустое поле:", getResult("", unitValue, extraValue));

// Только пробелы
console.log("Только пробелы:", getResult("   ", unitValue, extraValue));

// Слово
console.log("Слово:", getResult("два", unitValue, extraValue));

// Бесконечность
console.log("Бесконечность:", getResult("Infinity", unitValue, extraValue));

// Ноль
console.log("Ноль:", getResult("0", unitValue, extraValue));

// Отрицательное
console.log("Отрицательное:", getResult("-1", unitValue, extraValue));

// Дробное
console.log("Дробное:", getResult("1.5", unitValue, extraValue));

// Пробелы вокруг числа
console.log("Пробелы вокруг числа:", getResult(" 2 ", unitValue, extraValue));

// Две проверки: изменение только unitValue на +10 → итог +20
console.log("Цена +10 (2 шт):", getResult("2", unitValue + 10, extraValue));

// Изменение только extraValue на +10 → итог +10
console.log("Доставка +10 (2 шт):", getResult("2", unitValue, extraValue + 10));