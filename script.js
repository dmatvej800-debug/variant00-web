const itemName = "Микроволновая печь";
const unitPrice = 5000;
let quantityText = "2";
const deliveryPrice = 500;
const isTraining = true;

const quantity = Number(quantityText);
const totalPrice = unitPrice * quantity + deliveryPrice;

console.log("Название:", itemName);
console.log("Учебные данные:", isTraining);
console.log("Количество:", quantity);
console.log("Итого:", totalPrice);

console.log(typeof quantityText);
console.log(typeof unitPrice);
console.log(typeof isTraining);