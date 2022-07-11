export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(URL);
  const result = await response.json();
  return result;
}

export async function getProductsFromQuery(query) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(URL);
  const result = await response.json();
  return result;
}

export async function getProductsFromProductId(productId) {
  const URL = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(URL);
  const result = await response.json();
  return result;
}
