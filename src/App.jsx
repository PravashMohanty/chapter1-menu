import React, { useState, useMemo } from 'react';
import { 
  Coffee, 
  ShoppingBag, 
  UtensilsCrossed, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  Bell, 
  Flame, 
  ChevronRight, 
  Plus, 
  Minus, 
  Trash2, 
  ChefHat, 
  X, 
  Phone, 
  User, 
  Search, 
  Volume2, 
  VolumeX, 
  Check, 
  PartyPopper,
  Info,
  Lock,
  Unlock
} from 'lucide-react';

// Real menu data from Chapter-1 Café & Bakery Jagatsinghpur
const MENU_ITEMS = [
  // Beverages (Cold)
  {
    id: 'bev-1',
    name: 'Cold Coffee',
    category: 'Beverages',
    price: 80,
    isVeg: true,
    tag: 'Classic',
    description: 'Classic chilled creamy blended cold coffee.'
  },
  {
    id: 'bev-2',
    name: 'Vanilla Cold Coffee',
    category: 'Beverages',
    price: 100,
    isVeg: true,
    tag: 'Popular',
    description: 'Chilled coffee infused with rich Madagascar vanilla syrup.'
  },
  {
    id: 'bev-3',
    name: 'Chocolate Cold Coffee',
    category: 'Beverages',
    price: 120,
    isVeg: true,
    tag: 'Bestseller',
    description: 'Decadent chocolate swirl blended with chilled espresso and milk.'
  },

  // Hot Beverages
  {
    id: 'hot-1',
    name: 'Elaichi / Adrak Tea',
    category: 'Hot Beverages',
    price: 15,
    isVeg: true,
    tag: 'Fresh Brew',
    description: 'Freshly brewed aromatic cardamom or fresh ginger milk tea.'
  },
  {
    id: 'hot-2',
    name: 'Masala Lemon Tea',
    category: 'Hot Beverages',
    price: 15,
    isVeg: true,
    tag: 'Zesty',
    description: 'Tangy lemon tea spiced with digestive Indian masala.'
  },
  {
    id: 'hot-3',
    name: 'Hot Coffee (Normal / Low Sugar)',
    category: 'Hot Beverages',
    price: 20,
    isVeg: true,
    tag: 'Comfort',
    description: 'Classic comforting hot milk coffee prepared to your sweetness preference.'
  },
  {
    id: 'hot-4',
    name: 'Cappuccino',
    category: 'Hot Beverages',
    price: 30,
    isVeg: true,
    tag: 'Barista Choice',
    description: 'Fresh espresso topped with a velvety, frothy hot milk foam.'
  },

  // Pizza
  {
    id: 'piz-1',
    name: 'Veggie Pizza',
    category: 'Pizza',
    price: 100,
    isVeg: true,
    tag: 'Fresh Baked',
    description: 'Crisp hand-stretched crust baked with garden vegetables and melted mozzarella.'
  },
  {
    id: 'piz-2',
    name: 'Paneer Pizza',
    category: 'Pizza',
    price: 130,
    isVeg: true,
    tag: 'Chef Special',
    description: 'Loaded with soft marinated paneer cubes, capsicum, onions, and rich cheese blend.'
  },

  // French Fries
  {
    id: 'ff-1',
    name: 'Half French Fries',
    category: 'French Fries',
    price: 60,
    isVeg: true,
    tag: 'Quick Snack',
    description: 'Golden crispy salted potato fries served piping hot.'
  },
  {
    id: 'ff-2',
    name: 'Full French Fries',
    category: 'French Fries',
    price: 110,
    isVeg: true,
    tag: 'Shareable',
    description: 'Generous full portion of golden crunchy salted french fries.'
  },
  {
    id: 'ff-3',
    name: 'Peri Peri Full Fries',
    category: 'French Fries',
    price: 120,
    isVeg: true,
    tag: 'Spicy',
    description: 'Full bowl of crispy french fries generously dusted with fiery peri peri seasoning.'
  },

  // Pastries
  {
    id: 'pas-1',
    name: 'Black Forest Pastry',
    category: 'Pastries',
    price: 50,
    isVeg: true,
    tag: 'Bakery Classic',
    description: 'Chocolate sponge layered with whipped vanilla cream and chocolate curls.'
  },
  {
    id: 'pas-2',
    name: 'White Forest Pastry',
    category: 'Pastries',
    price: 50,
    isVeg: true,
    tag: 'Bakery Special',
    description: 'Vanilla sponge layered with light white cream and sweet cherries.'
  },
  {
    id: 'pas-3',
    name: 'Butterscotch Pastry',
    category: 'Pastries',
    price: 50,
    isVeg: true,
    tag: 'Caramel Crunch',
    description: 'Moist golden sponge loaded with rich butterscotch cream and crunchy praline.'
  },
  {
    id: 'pas-4',
    name: 'Red Velvet Pastry',
    category: 'Pastries',
    price: 55,
    isVeg: true,
    tag: 'Popular',
    description: 'Velvety crimson sponge layered with smooth sweetened cream cheese frosting.'
  },
  {
    id: 'pas-5',
    name: 'Dark Chocolate Pastry',
    category: 'Pastries',
    price: 50,
    isVeg: true,
    tag: 'Rich Cocoa',
    description: 'Intense rich dark chocolate ganache layered between moist cocoa sponge.'
  },

  // Mojito
  {
    id: 'moj-1',
    name: 'Blue Ocean Mojito',
    category: 'Mojito',
    price: 70,
    isVeg: true,
    tag: 'Signature Cooler',
    description: 'Refreshing Curacao citrus cooler shaken with mint leaves, lemon slices, and soda.'
  },
  {
    id: 'moj-2',
    name: 'Caramel Mojito',
    category: 'Mojito',
    price: 70,
    isVeg: true,
    tag: 'Special Blend',
    description: 'Unique smooth caramel-infused refreshing mocktail with lime and fresh mint.'
  },
  {
    id: 'moj-3',
    name: 'Cucumber Mojito',
    category: 'Mojito',
    price: 70,
    isVeg: true,
    tag: 'Hydrating',
    description: 'Crisp cucumber extracts paired with mint, lime, and chilled sparkling soda.'
  },
  {
    id: 'moj-4',
    name: 'Masala Soda',
    category: 'Mojito',
    price: 50,
    isVeg: true,
    tag: 'Desi Fizz',
    description: 'Zesty desi fizzy drink with black salt, cumin spices, and fresh lemon squeeze.'
  },

  // Fried Momo
  {
    id: 'momo-1',
    name: 'Veg Fried Momo (6 pcs)',
    category: 'Fried Momo',
    price: 50,
    isVeg: true,
    tag: 'Hot & Crispy',
    description: 'Crispy fried dumplings stuffed with spiced vegetables, served with red chili dip.'
  },
  {
    id: 'momo-2',
    name: 'Paneer Fried Momo (5 pcs)',
    category: 'Fried Momo',
    price: 50,
    isVeg: true,
    tag: 'Bestseller',
    description: 'Golden crunchy fried momos packed with spiced paneer filling.'
  },

  // Patties
  {
    id: 'pat-1',
    name: 'Veggie Pattie',
    category: 'Patties',
    price: 40,
    isVeg: true,
    tag: 'Bakery Puff',
    description: 'Crisp golden flaky pastry puff stuffed with spiced mashed potato and green peas.'
  },
  {
    id: 'pat-2',
    name: 'Paneer Pattie',
    category: 'Patties',
    price: 45,
    isVeg: true,
    tag: 'Popular',
    description: 'Flaky baked pastry turnover packed with tasty marinated paneer bhurji.'
  },
  {
    id: 'pat-3',
    name: 'Mushroom Pattie',
    category: 'Patties',
    price: 45,
    isVeg: true,
    tag: 'Savory',
    description: 'Savory puff pastry pocket filled with sautéed spiced button mushrooms.'
  },

  // Boba Tea
  {
    id: 'boba-1',
    name: 'Brown Sugar Milk Tea',
    category: 'Boba Tea',
    price: 130,
    isVeg: true,
    tag: 'Authentic Boba',
    description: 'Taiwanese brown sugar tiger swirl with smooth milk tea and chewy pearls.'
  },
  {
    id: 'boba-2',
    name: 'Strawberry Boba Tea',
    category: 'Boba Tea',
    price: 140,
    isVeg: true,
    tag: 'Fruity Pop',
    description: 'Sweet berry infused milk tea served with refreshing popping boba pearls.'
  },
  {
    id: 'boba-3',
    name: 'Mango Boba Tea',
    category: 'Boba Tea',
    price: 140,
    isVeg: true,
    tag: 'Tropical',
    description: 'Tropical mango blended milk tea with chewy bursting tapioca pearls.'
  },
  {
    id: 'boba-4',
    name: 'Oreo Chocolate Boba',
    category: 'Boba Tea',
    price: 150,
    isVeg: true,
    tag: 'Indulgent',
    description: 'Thick creamy chocolate milk blended with crushed Oreos and signature boba.'
  },

  // Maggi
  {
    id: 'mag-1',
    name: 'Classic Maggi',
    category: 'Maggi',
    price: 50,
    isVeg: true,
    tag: 'Comfort Bowl',
    description: 'Steaming hot 2-minute comfort noodles cooked with aromatic cafe seasonings.'
  },

  // Shakes
  {
    id: 'shk-1',
    name: 'Oreo Shake',
    category: 'Shakes',
    price: 80,
    isVeg: true,
    tag: 'Thick & Creamy',
    description: 'Chilled rich milk blended with classic crunchy chocolate Oreo cookies.'
  },
  {
    id: 'shk-2',
    name: 'Chocolate Shake',
    category: 'Shakes',
    price: 80,
    isVeg: true,
    tag: 'Sweet Cocoa',
    description: 'Velvety sweet chocolate shake topped with dark chocolate drizzle.'
  },
  {
    id: 'shk-3',
    name: 'KitKat Shake',
    category: 'Shakes',
    price: 80,
    isVeg: true,
    tag: 'Crunchy Wafer',
    description: 'Crispy wafer KitKat chocolate bars blended into thick chilled ice cream shake.'
  },

  // Ramen
  {
    id: 'ram-1',
    name: 'Normal Ramen',
    category: 'Ramen',
    price: 99,
    isVeg: true,
    tag: 'Broth Bowl',
    description: 'Savory Asian noodle bowl simmered in hot aromatic broth with seasoned vegetables.'
  },
  {
    id: 'ram-2',
    name: 'Cheese Ramen',
    category: 'Ramen',
    price: 109,
    isVeg: true,
    tag: 'Cheesy Melt',
    description: 'Piping hot savory ramen bowl topped with an indulgent layer of molten melted cheese.'
  },

  // Snacks
  {
    id: 'snk-1',
    name: 'Smiley (Half)',
    category: 'Snacks',
    price: 50,
    isVeg: true,
    tag: 'Kids Favorite',
    description: 'Crispy cheerful golden potato smileys served warm with tomato ketchup.'
  },
  {
    id: 'snk-2',
    name: 'Veg Finger (Half)',
    category: 'Snacks',
    price: 70,
    isVeg: true,
    tag: 'Crisp Bite',
    description: 'Crisp breaded vegetable fingers made of sweet corn, carrots, and potatoes.'
  },
  {
    id: 'snk-3',
    name: 'Crispon (Half)',
    category: 'Snacks',
    price: 70,
    isVeg: true,
    tag: 'Crunchy',
    description: 'Crunchy golden-fried cafe snack bites paired with spicy mint mayo dip.'
  },

  // Special Combos
  {
    id: 'cmb-1',
    name: 'Combo 1: Cold Coffee (Normal) + Fries (Half)',
    category: 'Combos',
    price: 130,
    isVeg: true,
    tag: 'Value Combo',
    description: 'Chilled creamy cold coffee paired with crispy salted half french fries.'
  },
  {
    id: 'cmb-2',
    name: 'Combo 2: Mojito + Momo',
    category: 'Combos',
    price: 115,
    isVeg: true,
    tag: 'Snack Pair',
    description: 'Crisp fizzy mojito of choice combined with crispy fried hot momos.'
  },
  {
    id: 'cmb-3',
    name: 'Combo 3: Veggie Pizza + Chocolate Cold Coffee',
    category: 'Combos',
    price: 215,
    isVeg: true,
    tag: 'Meal Deal',
    description: 'Cheesy Veggie Pizza paired with indulgent chocolate cold coffee.'
  },
  {
    id: 'cmb-4',
    name: 'Combo 4: Paneer Pizza + Chocolate Cold Coffee',
    category: 'Combos',
    price: 240,
    isVeg: true,
    tag: 'Special Combo',
    description: 'Loaded Paneer Pizza served alongside thick Chocolate Cold Coffee.'
  },

  // Celebration Cakes
  {
    id: 'ck-1',
    name: 'Celebration Cake 500gm',
    category: 'Cakes',
    price: 349,
    isVeg: true,
    tag: 'Free Party Kit',
    description: 'Freshly baked 500g party cake. Includes complimentary candle + balloons + celebration cap!'
  },
  {
    id: 'ck-2',
    name: 'Celebration Cake 1kg',
    category: 'Cakes',
    price: 549,
    isVeg: true,
    tag: 'Free Party Kit',
    description: 'Freshly baked grand 1kg celebration cake. Includes complimentary candle + balloons + celebration cap!'
  }
];

const CATEGORIES = [
  'All Items',
  'Beverages',
  'Hot Beverages',
  'Pizza',
  'French Fries',
  'Pastries',
  'Mojito',
  'Fried Momo',
  'Patties',
  'Boba Tea',
  'Maggi',
  'Shakes',
  'Ramen',
  'Snacks',
  'Combos',
  'Cakes'
];

export default function App() {
  const [activeView, setActiveView] = useState('customer');

  // Staff Security PIN State
  const [isCounterAuthenticated, setIsCounterAuthenticated] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Customer State
  const [tableNumber, setTableNumber] = useState('Table 3');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

  // Counter Desk State
  const [orders, setOrders] = useState([
    {
      id: 'ORD-101',
      customerName: 'Aman Dash',
      phone: '7205184945',
      table: 'Table 2',
      items: [
        { name: 'Cold Coffee', quantity: 2, price: 80 },
        { name: 'Veg Fried Momo (6 pcs)', quantity: 1, price: 50 },
        { name: 'Dark Chocolate Pastry', quantity: 2, price: 50 }
      ],
      total: 310,
      status: 'Preparing',
      createdAt: '5 mins ago'
    },
    {
      id: 'ORD-102',
      customerName: 'Priya Nayak',
      phone: '7008353510',
      table: 'Table 4',
      items: [
        { name: 'Combo 3: Veggie Pizza + Chocolate Cold Coffee', quantity: 1, price: 215 },
        { name: 'Brown Sugar Milk Tea (Boba)', quantity: 1, price: 130 }
      ],
      total: 345,
      status: 'Pending',
      createdAt: 'Just now'
    }
  ]);
  const [counterFilter, setCounterFilter] = useState('ALL');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedQrTable, setSelectedQrTable] = useState('Table 1');

  // Handle Switch To Counter Desk with PIN Check
  const handleSwitchToCounter = () => {
    if (isCounterAuthenticated) {
      setActiveView('counter');
    } else {
      setEnteredPin('');
      setPinError(false);
      setShowPinModal(true);
    }
  };

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (enteredPin === '1234') {
      setIsCounterAuthenticated(true);
      setShowPinModal(false);
      setActiveView('counter');
    } else {
      setPinError(true);
    }
  };

  const handleLockCounter = () => {
    setIsCounterAuthenticated(false);
    setActiveView('customer');
  };

  // Audio Beep Effect
  const playAlertSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      console.log('Audio playback context not initialized yet.');
    }
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const currentQty = prev[item.id]?.quantity || 0;
      return {
        ...prev,
        [item.id]: {
          ...item,
          quantity: currentQty + 1
        }
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const currentQty = prev[itemId]?.quantity || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          quantity: currentQty - 1
        }
      };
    });
  };

  const clearItemFromCart = (itemId) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  const cartItemsList = useMemo(() => Object.values(cart), [cart]);
  const cartTotalCount = useMemo(() => cartItemsList.reduce((acc, curr) => acc + curr.quantity, 0), [cartItemsList]);
  const grandTotal = useMemo(() => cartItemsList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0), [cartItemsList]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All Items' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Please enter your name so counter staff can address your order.");
      return;
    }
    if (cartItemsList.length === 0) return;

const newOrder = {
  id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
  customerName: customerName.trim(),
  phone: customerPhone.trim() || 'N/A',
  table: tableNumber,
  items: cartItemsList.map(item => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price
  })),
  total: grandTotal,
  status: 'Pending',
  createdAt: 'Just now'
};
