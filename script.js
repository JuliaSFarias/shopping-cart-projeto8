const classOl = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')); // onde é possível ver a classe do botão: Adicionar ao carrinho

  return section;
}

function getSkuFromProductItem(item) { // recupera apenas o ID (no formato texto) do produto passado como parametro.
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove(); // remove o que está sendo clicado (item da linha 39), ou seja o próprio li.
  // requisito 4: 
  const recoverItemsLi = document.querySelector(classOl);
  saveCartItems(recoverItemsLi.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Iniciando requisitos 1 (cria todos os elementos/produtos): 
const sectionProducts = document.getElementsByClassName('items')[0];

async function createProduct(product) {
  const resultFetchProducts = await fetchProducts(product);
  const arrayResults = resultFetchProducts.results;
  arrayResults.forEach((item) => {
    const objectKeysResults = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(objectKeysResults); // cria o elemento de entrada da funçao createProductElement e passa como parametro
    sectionProducts.appendChild(productItem);
  });
}

// Requisito 2 (adiciona o produto ao carrinho de compras):
async function getIdProduct(idProduct) {
  const olProducts = document.querySelector(classOl);
  const resultGetIdProduct = await fetchItem(idProduct);
  const resultFetch = {
    sku: resultGetIdProduct.id,
    name: resultGetIdProduct.title,
    salePrice: resultGetIdProduct.price,
  };
  const paramcreateCartItemElement = createCartItemElement(resultFetch); // cria o elemento de entrada da funçao createCartItemElement e passa como parametro
  olProducts.appendChild(paramcreateCartItemElement);
  // tirar undefined de localStorage
  const actualCart = document.querySelector(classOl);
  saveCartItems(actualCart.innerHTML); // salva os itens da lista de produtos que são criados, de forma individual no localStorage (requisito 4)
}

function eventButton() {
  sectionProducts.addEventListener('click', (addButton) => {
    if (addButton.target.className === 'item__add') { // se o item clicado possui essa classe
      const recoverSectionProduct = addButton.target.parentNode; // recupera a seção onde ele está
      const idSelected = getSkuFromProductItem(recoverSectionProduct); // e na sequencia recupera seu ID.
      getIdProduct(idSelected); // passa o id recuperado como parametro para a função acima ser executada.
    }
  });
}

// Requisito 6:

function clearCart() {
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', () => {
    const recoverOl = document.querySelector(classOl);
    recoverOl.innerText = '';
    saveCartItems(recoverOl.innerHTML); // requisito 4.
  });
}

// Requisito 7:
function textLoading() {
  const recoverSectionContainer = document.querySelector('.container');
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  recoverSectionContainer.appendChild(loading);
}

function removeLoading() {
  const removePSectionContainer = document.querySelector('.loading');
  removePSectionContainer.remove();
}

// Requisito 4 (quando a pagina for recarregada/reiniciada retoma o que está salvo no localStorage):

function refreshPage() {
  const recoverOl = document.querySelector(classOl);
  recoverOl.innerHTML = localStorage.getItem('cartItems');
  const itemsOl = document.querySelectorAll('li'); // querySelector também pega tags
  itemsOl.forEach((itemLi) => {
    itemLi.addEventListener('click', cartItemClickListener);
  });
}

window.onload = async () => {
  textLoading();
  await createProduct('computador');
  eventButton();
  clearCart();
  removeLoading();
  if (localStorage.length > 0) {
    refreshPage();
  }
};
