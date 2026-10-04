const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
    banner:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80'
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
    banner:
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=80'
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
    banner:
      'https://images.unsplash.com/photo-1548365328-9f547fb9587c?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1576106671073-9c6f75f0abd2?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1548365328-9f547fb9587c?auto=format&fit=crop&w=1200&q=80'
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
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80'
  }
];

const generateId = () => Math.floor(Date.now() + Math.random() * 1000);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Fast Food Delivery' });
});

app.get('/api/restaurants', (_req, res) => {
  res.json(restaurants);
});

app.get('/api/restaurants/:restaurantId/menu', (req, res) => {
  const restaurantId = Number(req.params.restaurantId);
  const items = menuItems.filter((item) => item.restaurantId === restaurantId);
  res.json(items);
});

app.post('/api/orders', (req, res) => {
  const { restaurantId, items, paymentMethod, deliveryMode, customer } = req.body || {};

  if (!restaurantId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Pedido inválido.' });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = deliveryMode === 'delivery' ? 7.9 : 0;
  const total = subtotal + shipping;

  const order = {
    id: generateId(),
    restaurantId,
    restaurant: restaurants.find((r) => r.id === Number(restaurantId))?.name || 'Fast Food',
    items,
    paymentMethod: paymentMethod || 'card',
    deliveryMode: deliveryMode || 'delivery',
    subtotal,
    shipping,
    total,
    customer: customer || {
      name: 'Maria Santos',
      address: 'Rua das Flores, 123'
    },
    status: 'Pedido recebido',
    createdAt: new Date().toISOString()
  };

  res.status(201).json(order);
});

app.get('/api/orders/:orderId', (req, res) => {
  const order = {
    id: Number(req.params.orderId),
    status: 'Preparando no restaurante',
    eta: '18 minutos',
    driver: 'João • moto 32',
    paymentMethod: 'card'
  };

  res.json(order);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Fast Food Delivery running on http://localhost:${PORT}`);
});
