# FoodBooker Frontend

A modern food ordering application built with React and Vite. This application allows users to browse restaurants, view menus, add items to cart, and place orders.

## 🚀 Features

- **User Authentication**
  - Login/Register functionality
  - JWT token-based authentication
  - Protected routes

- **Restaurant Features**
  - Browse restaurants
  - View menu items
  - Search functionality
  - Restaurant details and ratings

- **Shopping Features**
  - Add items to cart
  - Manage cart items
  - Favorite items
  - Real-time price calculations

- **Order Management**
  - Place orders
  - View order history
  - Track order status
  - Razorpay integration for payments

## 🛠️ Tech Stack

- React 18
- Vite
- TailwindCSS
- Framer Motion
- Axios
- React Router Dom
- React Toastify
- Context API

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/foodbooker-frontend.git
cd foodbooker-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_APP_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── context/       # Context providers
├── hooks/         # Custom hooks
├── pages/         # Page components
├── services/      # API services
├── utils/         # Utility functions
└── App.jsx        # Root component
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_APP_BACKEND_URL | Backend API URL |
| VITE_RAZORPAY_KEY_ID | Razorpay API Key |

## 🌐 API Integration

The application communicates with a Node.js/Express backend. API endpoints include:

- Authentication: `/api/auth`
- Restaurants: `/api/restaurants`
- Menu Items: `/api/items`
- Cart: `/api/cart`
- Orders: `/api/orders`
- Favorites: `/api/favorites`

## ⚙️ Configuration

Key configuration files:

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - TailwindCSS configuration
- `jsconfig.json` - JavaScript configuration
- `.eslintrc.js` - ESLint rules

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
