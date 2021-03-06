
const navigate = [
  {
    title: 'Каталог',
    path: '/',
    icon: 'fas fa-shopping-cart',
  },
  {
    title: "Свойства",
    path: '/options/types',
    icon: 'fas fa-sliders-h',
    navigate: [
      {
        title: 'Тип',
        path: '/options/types',
      },
      {
        title: 'Категория',
        path: '/options/categories',
      },
      {
        title: 'Производитель',
        path: '/options/brands',
      },
      {
        title: 'Аттрибуты',
        path: '/options/attributes',
      },
      {
        title: 'Единицы измерения',
        path: '/options/units',
      },
      {
        title: 'Валюта',
        path: '/options/currencies',
      },
    ],
  },
  {
    title: "Галлерея",
    path: '/gallery',
    icon: 'far fa-images',
  },
  {
    title: "Скидки",
    path: '/promotions',
    icon: 'fas fa-percentage',
  },
  {
    title: "Комментарии",
    path: '/comments',
    icon: 'far fa-comments',
  },
  {
    title: "Магазин",
    path: '/shop/payments',
    icon: 'fas fa-tag',
    navigate: [
      {
        title: 'Способы оплаты',
        path: '/shop/payments',
      },
      {
        title: 'Способы доставки',
        path: '/shop/delivery',
      },
      {
        title: 'Точки выдачи',
        path: '/shop/pick-up',
      },
    ],
  },
  {
    title: "Заказы",
    path: '/orders',
    icon: 'fas fa-search',
  },
  {
    title: "Клиенты",
    path: '/customers',
    icon: 'fas fa-users',
  },
];

export default navigate;
