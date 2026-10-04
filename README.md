const restaurants = [
  {
    id: 1,
    name: 'Burger House',
    cuisine: 'Hambúrgueres • Fast food',
    eta: '18-28 min',
    rating: 4.9,
    deliveryFee: 6.9,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Sushi Zen',
    cuisine: 'Japonesa • Sushi',
    eta: '25-35 min',
    rating: 4.8,
    deliveryFee: 8.5,
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Pizza Napoli',
    cuisine: 'Pizza • Italiana',
    eta: '20-30 min',
    rating: 4.9,
    deliveryFee: 7.4,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  }
];

const menuItems = [
  {
    id: 101,
    restaurantId: 1,
    name: 'Burger Clássica',
    category: 'Burgers',
    calories: '540 kcal',
    price: 34.9,
    tag: 'Popular',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 102,
    restaurantId: 1,
    name: 'Batata Recheada',
    category: 'Acompanhamentos',
    calories: '420 kcal',
    price: 18.9,
    tag: 'Crunchy',
    image:
      'https://images.unsplash.com/photo-1576106671073-9c6f75f0abd2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 103,
    restaurantId: 1,
    name: 'Milkshake Oreo',
    category: 'Bebidas',
    calories: '360 kcal',
    price: 16.5,
    tag: 'Novo',
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 201,
    restaurantId: 2,
    name: 'Sushi Combo 20',
    category: 'Japonesa',
    calories: '680 kcal',
    price: 49.9,
    tag: 'Chef',
    image:
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 202,
    restaurantId: 2,
    name: 'Temaki Salmão',
    category: 'Rolls',
    calories: '320 kcal',
    price: 23.5,
    tag: 'Fresco',
    image:
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 203,
    restaurantId: 2,
    name: 'Bebida Matcha',
    category: 'Bebidas',
    calories: '150 kcal',
    price: 14.0,
    tag: 'Premium',
    image:
      'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 301,
    restaurantId: 3,
    name: 'Pizza Margherita',
    category: 'Pizza',
    calories: '610 kcal',
    price: 42.0,
    tag: 'Top',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 302,
    restaurantId: 3,
    name: 'Calabresa Crocante',
    category: 'Pizza',
    calories: '720 kcal',
    price: 46.5,
    tag: 'Popular',
    image:
      'https://images.unsplash.com/photo-1548365328-9f547fb9587c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 303,
    restaurantId: 3,
    name: 'Tiramisu',
    category: 'Sobremesa',
    calories: '260 kcal',
    price: 19.9,
    tag: 'Sweet',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
  }
];

const categories = ['Todos', 'Burgers', 'Pizza', 'Japonesa', 'Bebidas', 'Sobremesa'];

const state = {
  selectedRestaurantId: 1,
  activeCategory: 'Todos',
  cart: [],
  orderMode: 'delivery',
  paymentMethod: 'card',
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const getSelectedRestaurant = () =>
  restaurants.find((restaurant) => restaurant.id === state.selectedRestaurantId) || restaurants[0];

const getFilteredItems = () => {
  const items = menuItems.filter((item) => item.restaurantId === state.selectedRestaurantId);
  if (state.activeCategory === 'Todos') return items;
  return items.filter((item) => item.category === state.activeCategory);
};

const renderCategories = () => {
  const strip = document.getElementById('categoryStrip');
  strip.innerHTML = categories
    .map(
      (category) => `
        <button class="category-pill ${category === state.activeCategory ? 'active' : ''}" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join('');
};

const renderRestaurants = () => {
  const list = document.getElementById('restaurantList');
  list.innerHTML = restaurants
    .map(
      (restaurant) => `
        <button class="restaurant-card ${restaurant.id === state.selectedRestaurantId ? 'active' : ''}" data-restaurant-id="${restaurant.id}">
          <div class="restaurant-cover" style="background-image: url('${restaurant.image}')">
            <span class="rating">★ ${restaurant.rating}</span>
          </div>
          <div class="restaurant-card-body">
            <h4>${restaurant.name}</h4>
            <div class="restaurant-meta">
              <span>${restaurant.cuisine}</span>
              <span>${restaurant.eta}</span>
            </div>
          </div>
        </button>
      `
    )
    .join('');
};

const renderFood = () => {
  const grid = document.getElementById('foodGrid');
  const restaurant = getSelectedRestaurant();
  const items = getFilteredItems();
  const title = document.getElementById('catalogTitle');
  title.textContent = `${restaurant.name} • Menu`;

  if (!items.length) {
    grid.innerHTML = '<div class="empty-state">Nenhum item encontrado nesta categoria.</div>';
    return;
  }

  grid.innerHTML = items
    .map(
      (item) => `
        <article class="food-card">
          <div class="food-image" style="background-image: url('${item.image}')"></div>
          <div class="food-body">
            <div class="food-top">
              <h4>${item.name}</h4>
              <span class="tag">${item.tag}</span>
            </div>
            <div class="food-meta">
              <span>${item.category}</span>
              <span>${item.calories}</span>
            </div>
            <div class="food-footer">
              <span class="price">${formatCurrency(item.price)}</span>
              <button class="add-btn" data-food-id="${item.id}">Adicionar</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
};

const renderCart = () => {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');

  if (!state.cart.length) {
    cartItems.innerHTML = '<div class="empty-state">Seu carrinho está vazio. Escolha um prato para começar.</div>';
    cartCount.textContent = '0 itens';
    subtotalEl.textContent = formatCurrency(0);
    shippingEl.textContent = formatCurrency(0);
    totalEl.textContent = formatCurrency(0);
    return;
  }

  cartItems.innerHTML = state.cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-thumb" style="background-image: url('${item.image}')"></div>
          <div class="cart-item-info">
            <div class="cart-item-name">
              <span>${item.name}</span>
              <strong>${formatCurrency(item.price * item.quantity)}</strong>
            </div>
            <div class="item-controls">
              <div class="qty-box">
                <button data-action="decrement" data-food-id="${item.id}">−</button>
                <span>${item.quantity}</span>
                <button data-action="increment" data-food-id="${item.id}">+</button>
              </div>
              <strong>${formatCurrency(item.price)}</strong>
            </div>
          </div>
        </div>
      `
    )
    .join('');

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = state.orderMode === 'delivery' ? 7.9 : 0;
  const total = subtotal + shipping;

  cartCount.textContent = `${state.cart.reduce((sum, item) => sum + item.quantity, 0)} itens`;
  subtotalEl.textContent = formatCurrency(subtotal);
  shippingEl.textContent = formatCurrency(shipping);
  totalEl.textContent = formatCurrency(total);
};

const addToCart = (foodId) => {
  const item = menuItems.find((food) => food.id === Number(foodId));
  if (!item) return;

  const existing = state.cart.find((entry) => entry.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  renderCart();
  showToast(`${item.name} adicionado ao pedido!`);
};

const updateQty = (foodId, delta) => {
  const index = state.cart.findIndex((entry) => entry.id === Number(foodId));
  if (index === -1) return;

  state.cart[index].quantity += delta;

  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }

  renderCart();
};

const setMode = (mode) => {
  state.orderMode = mode;
  document.querySelectorAll('.mode-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
  renderCart();
};

const updatePaymentMethod = (value) => {
  state.paymentMethod = value;
};

const openCheckout = () => {
  if (!state.cart.length) {
    showToast('Adicione pelo menos um item antes de finalizar.');
    return;
  }

  document.getElementById('checkoutModal').classList.remove('hidden');
};

const closeCheckout = () => {
  document.getElementById('checkoutModal').classList.add('hidden');
};

const showToast = (message) => {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
};

const placeOrder = () => {
  if (!state.cart.length) {
    showToast('Carrinho vazio.');
    return;
  }

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: Math.floor(Math.random() * 9000 + 1000),
    restaurant: getSelectedRestaurant().name,
    total,
    items: [...state.cart],
    deliveryMode: state.orderMode,
    paymentMethod: state.paymentMethod,
    statusIndex: 0,
  };

  state.cart = [];
  renderCart();
  closeCheckout();
  showToast(`Pedido #${order.id} confirmado!`);
  startTracking(order);
};

const startTracking = (order) => {
  const orderSteps = [
    'Pedido recebido',
    'Preparando no restaurante',
    'Saindo para entrega',
    'Entregador a caminho',
    'Pedido entregue'
  ];

  const dashboard = document.querySelector('.stats-panel');
  dashboard.innerHTML = `
    <div class="stat-card">
      <span>Pedido</span>
      <strong>#${order.id}</strong>
    </div>
    <div class="stat-card">
      <span>Restaurante</span>
      <strong>${order.restaurant}</strong>
    </div>
    <div class="stat-card">
      <span>Modo</span>
      <strong>${order.deliveryMode === 'delivery' ? 'Entrega' : 'Retirada'}</strong>
    </div>
    <div class="stat-card">
      <span>Status</span>
      <strong>${orderSteps[0]}</strong>
    </div>
  `;

  let step = 0;
  const interval = setInterval(() => {
    step += 1;
    const currentStatus = orderSteps[Math.min(step, orderSteps.length - 1)];
    const statusCard = dashboard.querySelectorAll('.stat-card')[3];
    if (statusCard) statusCard.innerHTML = `<span>Status</span><strong>${currentStatus}</strong>`;

    if (step >= orderSteps.length - 1) {
      clearInterval(interval);
    }
  }, 3500);
};

const bindEvents = () => {
  document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query) || restaurant.cuisine.toLowerCase().includes(query)
    );

    const list = document.getElementById('restaurantList');
    list.innerHTML = filtered.length
      ? filtered
          .map(
            (restaurant) => `
              <button class="restaurant-card ${restaurant.id === state.selectedRestaurantId ? 'active' : ''}" data-restaurant-id="${restaurant.id}">
                <div class="restaurant-cover" style="background-image: url('${restaurant.image}')">
                  <span class="rating">★ ${restaurant.rating}</span>
                </div>
                <div class="restaurant-card-body">
                  <h4>${restaurant.name}</h4>
                  <div class="restaurant-meta">
                    <span>${restaurant.cuisine}</span>
                    <span>${restaurant.eta}</span>
                  </div>
                </div>
              </button>
            `
          )
          .join('')
      : '<div class="empty-state">Nenhum restaurante encontrado.</div>';
  });

  document.getElementById('categoryStrip').addEventListener('click', (event) => {
    const categoryButton = event.target.closest('[data-category]');
    if (!categoryButton) return;
    state.activeCategory = categoryButton.dataset.category;
    renderCategories();
    renderFood();
  });

  document.getElementById('restaurantList').addEventListener('click', (event) => {
    const card = event.target.closest('[data-restaurant-id]');
    if (!card) return;
    state.selectedRestaurantId = Number(card.dataset.restaurantId);
    renderRestaurants();
    renderFood();
  });

  document.getElementById('foodGrid').addEventListener('click', (event) => {
    const button = event.target.closest('[data-food-id]');
    if (!button) return;
    addToCart(button.dataset.foodId);
  });

  document.getElementById('cartItems').addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    const foodId = Number(button.dataset.foodId);

    if (action === 'increment') updateQty(foodId, 1);
    if (action === 'decrement') updateQty(foodId, -1);
  });

  document.querySelectorAll('.mode-btn').forEach((button) => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
  });

  document.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
    input.addEventListener('change', (event) => updatePaymentMethod(event.target.value));
  });

  document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
  document.getElementById('closeModal').addEventListener('click', closeCheckout);
  document.getElementById('checkoutModal').addEventListener('click', (event) => {
    if (event.target.id === 'checkoutModal') closeCheckout();
  });

  document.getElementById('checkoutForm').addEventListener('submit', (event) => {
    event.preventDefault();
    placeOrder();
  });
};

renderCategories();
renderRestaurants();
renderFood();
renderCart();
bindEvents();
