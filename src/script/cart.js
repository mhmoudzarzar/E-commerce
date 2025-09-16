let itemListContainer = document.getElementById('item-list-container');
export class Cart {
  constructor() {
    this.totalElement = document.getElementById('total');

    this.items = JSON.parse(localStorage.getItem('cart')) || [];
  }

  toggleVisibility(element) {
    element.classList.toggle('hidden');
  }

  renderToCart() {
    itemListContainer.innerHTML = '';
    let fragment = document.createDocumentFragment();
    this.items.forEach((product) => {
      let item = document.createElement('li');
      item.classList.add('item-cart');

      let itemImg = document.createElement('img');
      itemImg.src = product.product.image;
      itemImg.loading = 'lazy';

      let itemName = document.createElement('p');
      itemName.textContent = product.product.name;

      let itemPrice = document.createElement('p');
      itemPrice.textContent =
        (product.product.price * product.count).toFixed(2) + '$';

      let itemPlus = document.createElement('button');
      itemPlus.textContent = '+';
      itemPlus.addEventListener('click', () => {
        this.addToCart(product.product);
        this.getTotal(product.product);
      });

      let itemMinus = document.createElement('button');
      itemMinus.textContent = '-';
      itemMinus.addEventListener('click', () => {
        this.minusFromCart(product.product);
      });

      let itemCount = document.createElement('p');
      itemCount.textContent = product.count;

      item.appendChild(itemImg);
      item.appendChild(itemName);
      item.appendChild(itemPrice);
      item.appendChild(itemPlus);
      item.appendChild(itemCount);
      item.appendChild(itemMinus);

      fragment.appendChild(item);
    });
    itemListContainer.appendChild(fragment);
  }
  updateStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  addToCart(product, count = 1) {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.count += count;
      this.getTotal();
      this.updateStorage();

      this.renderToCart();
    } else {
      this.items.unshift({ product, count });
      this.cartNavection();
      this.getTotal();
      this.updateStorage();

      this.renderToCart();
    }
  }

  minusFromCart(product, count = 1) {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (!existing) return;

    existing.count -= count;
    this.updateStorage();

    if (existing.count <= 0) {
      this.items = this.items.filter((item) => item.product.id !== product.id);
    }
    this.getTotal();
    
    this.renderToCart();
  }

  getTotal() {
    const total = this.items.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );
    this.totalElement.textContent = `Total:${total.toFixed(2)}$`;
    return total;
  }

  cartNavection() {
    let massege = document.createElement('h2');
    massege.textContent = 'تمت اضافة المنتج للسلة';
    let border = document.createElement('div');
    border.className = 'border';
    let massegecontener = document.createElement('div');
    massegecontener.className = 'massegecontener';
    massegecontener.appendChild(massege);
    massegecontener.appendChild(border);
    document.body.appendChild(massegecontener);
    setTimeout(() => {
      border.classList.add('shrink');
    }, 50);

    setTimeout(() => {
      massegecontener.remove();
    }, 3000);
  }
}

