const catalog = [
  { position: 1, name: "Микроволновая печь", specs: "20 л · 700 Вт", description: "Для разогрева и приготовления блюд дома" },
  { position: 2, name: "Стиральная машина", specs: "6 кг · 1000 об/мин", description: "Для стирки повседневной одежды и постельного белья" },
  { position: 3, name: "Пылесос", specs: "1600 Вт · 2 л", description: "Для сухой уборки полов и ковров дома" }
];

function filterByText(items, query) {
  const normalized = query.trim().toLowerCase();
  if (normalized === "") return items;
  return items.filter(item => item.name.toLowerCase().includes(normalized));
}

const catalogList = document.querySelector("#catalog-list");
const statusText = document.querySelector("#status");
const searchInput = document.querySelector("#search");

const STORAGE_KEY = "catalog-search-v1";

function saveSearch(query) {
  if (typeof query !== "string") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ query: query }));
  } catch (error) {
    console.warn("Не удалось сохранить поиск:", error);
  }
}

function loadSearch() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return "";
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.warn("Сохранённый поиск испорчен, показываем полный каталог");
    localStorage.removeItem(STORAGE_KEY);
    return "";
  }
  if (typeof parsed !== "object" || parsed === null) return "";
  if (typeof parsed.query !== "string") return "";
  return parsed.query;
}

function renderCatalog(items) {
  catalogList.replaceChildren();
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "card";
    const title = document.createElement("h2");
    title.textContent = item.name;
    const specs = document.createElement("p");
    specs.textContent = item.specs;
    const description = document.createElement("p");
    description.textContent = item.description;
    card.append(title, specs, description);
    catalogList.append(card);
  }
  if (items.length === 0) {
    statusText.textContent = "Ничего не найдено";
  } else {
    statusText.textContent = "Показано: " + items.length + " из " + catalog.length;
  }
}

const savedQuery = loadSearch();
searchInput.value = savedQuery;
renderCatalog(filterByText(catalog, savedQuery));

searchInput.addEventListener("input", function () {
  const query = searchInput.value;
  saveSearch(query);
  renderCatalog(filterByText(catalog, query));
});