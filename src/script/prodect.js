import { Cart } from '/src/script/cart.js';
import { Fetching } from '/src/script/script.js';

let cart = new Cart();

// جلب ID من الرابط
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // id المنتج

// عرض تفاصيل المنتج
async function renderProduct() {
  let data = await new Fetching().cashing();

  let product = data.find((item) => item.id == id);

  if (product) {
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-img').src = product.image;
    document.getElementById('product-price').textContent = `${product.price}$`;
    document.getElementById('description').textContent = product.description;

    // زر إضافة للسلة
    const addBtn = document.getElementById('addBtn');
    addBtn.textContent = 'Add To Cart';

    addBtn.addEventListener('click', () => {
      cart.addToCart(product);
      cart.renderToCart();
      cart.getTotal();
    });

  } else {
    document.getElementById('product-title').textContent = 'المنتج غير موجود';
  }
}

renderProduct();
