import React, { useState, useEffect, useMemo } from 'react';
import { db } from './firebase';
import { ref, push, onValue, update } from 'firebase/database';
import { 
  Coffee, 
  ShoppingBag, 
  UtensilsCrossed, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  Bell, 
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

const TABLES = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Takeaway Counter'];

export default function App() {
  const [activeView, setActiveView] = useState('customer');

  // Staff Security PIN State
  const [isCounterAuthenticated, setIsCounterAuthenticated] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Customer State (Defaults to Table 1, 5-table setup)
  const [tableNumber, setTableNumber] = useState('Table 1');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

  // Live Orders from Firebase Realtime Database
  const [orders, setOrders] = useState([]);
  const [counterFilter, setCounterFilter] = useState('ALL');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Subscribe to Firebase Realtime Database
  useEffect(() => {
    const ordersRef = ref(db, 'orders');
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const orderList = Object.keys(data).map((key) => ({
          firebaseKey: key,
          ...data[key]
        })).reverse();
        setOrders(orderList);
      } else {
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

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
    if (enteredPin === '2026') { // Change '1234' to your custom PIN anytime
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

    const newOrderData = {
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
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Push to Firebase Realtime Database
    push(ref(db, 'orders'), newOrderData)
      .then(() => {
        playAlertSound();
        setPlacedOrderInfo(newOrderData);
        setCart({});
        setIsCartOpen(false);
        setShowOrderModal(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit order. Please check your internet connection.");
      });
  };

  const updateOrderStatus = (order, newStatus) => {
    if (!order.firebaseKey) return;
    update(ref(db, `orders/${order.firebaseKey}`), { status: newStatus });
  };

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans flex flex-col antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-md border-b border-amber-950/40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white shadow-inner font-serif text-lg font-bold tracking-tight">
              C-1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg tracking-wide text-amber-100">
                  CHAPTER-1 CAFÉ & BAKERY
                </h1>
                <span className="text-[10px] uppercase font-semibold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 hidden sm:inline-block">
                  Jagatsinghpur
                </span>
              </div>
              <p className="text-xs text-stone-400">Pure Taste • Fresh Bakes • Free Venue Celebrations</p>
            </div>
          </div>

          <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700/80">
            <button
              onClick={() => setActiveView('customer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeView === 'customer'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Customer Menu</span>
            </button>
            <button
              onClick={handleSwitchToCounter}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all relative ${
                activeView === 'counter'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {isCounterAuthenticated ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
              <span>Counter Desk</span>
              {pendingOrdersCount > 0 && (
                <span className="bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full animate-pulse ml-0.5">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 pb-28">
        {activeView === 'customer' ? (
          <div>
            {/* Celebration & Table Hero Card */}
            <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-3xl p-5 md:p-7 text-white mb-6 relative overflow-hidden shadow-xl border border-amber-900/40">
              <div className="absolute right-[-15px] bottom-[-25px] opacity-10 pointer-events-none">
                <Coffee className="w-56 h-56 text-amber-200" />
              </div>
              
              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full mb-3 backdrop-blur-sm border border-amber-400/20">
                  <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
                  <span>Venue available free of cost for celebrations!</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-50 tracking-tight leading-tight">
                  Welcome to Chapter-1 Cafe
                </h2>
                <p className="text-stone-300 text-xs md:text-sm mt-1.5">
                  Select your table, choose your favorite treats, and your order will be delivered to you fresh.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center bg-stone-950/80 border border-amber-500/40 rounded-xl px-3 py-1.5 backdrop-blur-md">
                    <span className="text-xs text-amber-300 mr-2 font-medium">Ordering For:</span>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="bg-transparent text-white font-semibold text-xs md:text-sm outline-none cursor-pointer"
                    >
                      {TABLES.map((tbl) => (
                        <option key={tbl} value={tbl} className="bg-stone-900 text-white">
                          {tbl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-[11px] text-stone-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>7205184945 / 7008353510</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cake Offer Note Banner */}
            <div className="bg-amber-100/70 border border-amber-300/80 rounded-2xl p-3 mb-5 flex items-center gap-2.5 text-xs text-amber-950 shadow-sm">
              <Info className="w-4 h-4 text-amber-800 shrink-0" />
              <span>
                <strong>Celebration Special:</strong> All 500gm & 1kg cakes include complimentary candle + balloons + celebration cap!
              </span>
            </div>

            {/* Sticky Search & Category Filter */}
            <div className="sticky top-[61px] z-30 bg-[#FDFBF7]/95 backdrop-blur-md py-2.5 space-y-2.5 mb-5 border-b border-stone-200/80">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search coffee, pizza, momos, pastries, combos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-stone-200 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-stone-800 placeholder-stone-400 shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-900 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-stone-200/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const inCartQty = cart[item.id]?.quantity || 0;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 border-2 border-emerald-600 flex items-center justify-center p-[1px] shrink-0">
                            <span className="w-full h-full rounded-full bg-emerald-600" />
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600">
                            {item.category}
                          </span>
                        </div>

                        {item.tag && (
                          <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-stone-900 text-lg leading-snug tracking-tight">
                        {item.name}
                      </h3>

                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 mt-3 flex items-center justify-between">
                      <div className="font-serif font-bold text-stone-900 text-xl">
                        ₹{item.price}
                      </div>

                      {inCartQty > 0 ? (
                        <div className="flex items-center bg-amber-900 text-white rounded-xl px-2 py-1 gap-2 shadow-sm">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-amber-800 rounded-lg transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-xs w-4 text-center">{inCartQty}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="p-1 hover:bg-amber-800 rounded-lg transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="flex items-center gap-1 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-sm transition-transform active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 mt-4">
                <UtensilsCrossed className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <h4 className="font-bold text-stone-700 text-sm">No dishes match your search</h4>
                <p className="text-xs text-stone-400 mt-1">Try another search or reset category filter.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Items');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs font-semibold text-amber-800 underline"
                >
                  View full menu
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Staff Kitchen/Counter Desk View */
          <div className="space-y-5">
            <div className="bg-stone-900 text-white rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <h2 className="text-xl font-bold font-serif">Kitchen & Billing Counter</h2>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  Live orders syncing from Firebase Realtime Database.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-medium border ${
                    soundEnabled
                      ? 'bg-amber-600/20 text-amber-300 border-amber-500/40'
                      : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>{soundEnabled ? 'Chime ON' : 'Chime MUTED'}</span>
                </button>

                <button
                  onClick={handleLockCounter}
                  className="flex items-center gap-1.5 text-xs bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 px-3 py-1.5 rounded-xl font-semibold"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Counter</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'Pending', 'Preparing', 'Ready', 'Completed'].map((status) => {
                const count = status === 'ALL' ? orders.length : orders.filter(o => o.status === status).length;
                return (
                  <button
                    key={status}
                    onClick={() => setCounterFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      counterFilter === status
                        ? 'bg-amber-900 text-white shadow-sm'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>{status}</span>
                    <span className="bg-stone-200/70 text-stone-800 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders
                .filter((order) => counterFilter === 'ALL' || order.status === counterFilter)
                .map((order) => {
                  const getStatusBadge = () => {
                    switch (order.status) {
                      case 'Pending':
                        return 'bg-red-100 text-red-800 border-red-300';
                      case 'Preparing':
                        return 'bg-amber-100 text-amber-800 border-amber-300';
                      case 'Ready':
                        return 'bg-blue-100 text-blue-800 border-blue-300';
                      case 'Completed':
                        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
                      default:
                        return 'bg-stone-100 text-stone-800';
                    }
                  };

                  return (
                    <div
                      key={order.firebaseKey || order.id}
                      className={`bg-white rounded-2xl border-2 p-4 flex flex-col justify-between shadow-sm transition-all ${
                        order.status === 'Pending' ? 'border-red-400 ring-2 ring-red-100' : 'border-stone-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between pb-2.5 border-b border-stone-100">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs text-stone-900">
                                #{order.id}
                              </span>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getStatusBadge()}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="text-[11px] text-stone-400 mt-0.5 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{order.createdAt}</span>
                            </div>
                          </div>

                          <div className="bg-amber-900 text-amber-50 font-bold text-xs px-2.5 py-1 rounded-lg">
                            {order.table}
                          </div>
                        </div>

                        <div className="py-2 bg-stone-50 px-2.5 rounded-xl mt-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 font-medium text-stone-800">
                            <User className="w-3.5 h-3.5 text-stone-500" />
                            <span>{order.customerName}</span>
                          </div>
                          {order.phone !== 'N/A' && (
                            <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                              <Phone className="w-3 h-3" />
                              <span>{order.phone}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 space-y-1.5">
                          {order.items?.map((it, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span className="text-stone-700">
                                <span className="font-bold text-amber-900 mr-1.5">
                                  {it.quantity}x
                                </span>
                                {it.name}
                              </span>
                              <span className="text-stone-500 font-mono">₹{it.price * it.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-stone-100 mt-4">
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="text-xs text-stone-500">Total Bill:</span>
                          <span className="font-bold text-base text-stone-900">₹{order.total}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {order.status === 'Pending' && (
                            <button
                              onClick={() => updateOrderStatus(order, 'Preparing')}
                              className="col-span-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                            >
                              <ChefHat className="w-4 h-4" />
                              <span>Accept & Prepare</span>
                            </button>
                          )}

                          {order.status === 'Preparing' && (
                            <button
                              onClick={() => updateOrderStatus(order, 'Ready')}
                              className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Bell className="w-4 h-4" />
                              <span>Mark Food Ready</span>
                            </button>
                          )}

                          {order.status === 'Ready' && (
                            <button
                              onClick={() => updateOrderStatus(order, 'Completed')}
                              className="col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Mark Served / Settled</span>
                            </button>
                          )}

                          {order.status === 'Completed' && (
                            <div className="col-span-2 text-center text-xs font-semibold text-emerald-700 bg-emerald-50 py-1.5 rounded-xl border border-emerald-200 flex items-center justify-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              <span>Order Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {orders.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
                <ChefHat className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <h4 className="font-bold text-stone-700 text-sm">No Active Kitchen Orders</h4>
                <p className="text-xs text-stone-400 mt-1">Live orders placed by customers will appear here.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Cart Button */}
      {activeView === 'customer' && cartTotalCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto">
          <div className="bg-stone-900 text-white rounded-2xl p-3.5 shadow-2xl flex items-center justify-between border border-amber-600/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-stone-900">
                  {cartTotalCount}
                </span>
              </div>
              <div>
                <div className="text-[11px] text-stone-300">
                  {cartTotalCount} items • <span className="text-amber-400 font-bold">{tableNumber}</span>
                </div>
                <div className="text-sm font-bold text-white">₹{grandTotal}</div>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-4 py-2 rounded-xl transition-transform active:scale-95 flex items-center gap-1"
            >
              <span>View Cart</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif font-bold text-base">Your Cafe Order</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-amber-50 px-4 py-2 border-b border-amber-100 flex items-center justify-between text-xs text-amber-900">
                <span>Ordering for: <strong>{tableNumber}</strong></span>
                <span className="text-stone-500">Chapter-1 Cafe</span>
              </div>

              <div className="p-4 space-y-2.5 max-h-[45vh] overflow-y-auto">
                {cartItemsList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200/60"
                  >
                    <div className="flex-1 pr-2">
                      <div className="font-semibold text-xs text-stone-800 line-clamp-1">{item.name}</div>
                      <div className="text-[11px] text-stone-500">₹{item.price} each</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-white border border-stone-300 rounded-lg">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-stone-600 hover:text-stone-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 text-stone-600 hover:text-stone-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => clearItemFromCart(item.id)}
                        className="text-stone-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
              <form onSubmit={handlePlaceOrder} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">
                    Table Number <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    {TABLES.map((tbl) => (
                      <option key={tbl} value={tbl}>{tbl}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Basanta Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. 7205184945"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-black text-white font-bold py-2.5 rounded-xl shadow-lg transition-transform active:scale-[0.98] text-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Send Order to Counter Desk</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showOrderModal && placedOrderInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-center shadow-2xl border border-amber-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2.5">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Order Sent Successfully
            </span>

            <h3 className="font-serif font-bold text-lg text-stone-900 mt-2">
              Thank You, {placedOrderInfo.customerName}!
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Your order ticket has reached the Chapter-1 counter desk.
            </p>

            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 mt-3 text-left space-y-1.5 text-xs">
              <div className="flex justify-between pb-1.5 border-b border-stone-200">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-mono font-bold text-stone-800">#{placedOrderInfo.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Serving Table:</span>
                <span className="font-bold text-amber-800">{placedOrderInfo.table}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Time:</span>
                <span className="font-semibold text-stone-700">{placedOrderInfo.createdAt}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200 font-bold text-stone-900">
                <span>Total Amount:</span>
                <span>₹{placedOrderInfo.total}</span>
              </div>
            </div>

            <button
              onClick={() => setShowOrderModal(false)}
              className="mt-4 w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold py-2 rounded-xl text-xs transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {/* Staff PIN Code Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xs w-full p-6 text-center shadow-2xl border border-amber-200">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="font-serif font-bold text-lg text-stone-900">
              Staff Access Only
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Enter 4-digit staff PIN
            </p>

            <form onSubmit={handleVerifyPin} className="mt-4 space-y-3">
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="• • • •"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full text-center tracking-widest text-xl font-bold py-2 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
              />

              {pinError && (
                <p className="text-[11px] text-red-500 font-semibold">
                  Incorrect PIN. Please try again.
                </p>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-800 hover:bg-amber-900 text-white font-semibold py-2 rounded-xl text-xs"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
