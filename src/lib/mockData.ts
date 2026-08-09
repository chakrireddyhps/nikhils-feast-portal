// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
export const T = {
  bg: '#0F0B0A',
  surface: '#1C1412',
  surfaceEl: '#251A17',
  surfaceHov: '#2C1F1B',
  border: 'rgba(255,255,255,0.07)',
  borderEl: 'rgba(255,255,255,0.11)',
  burgundy: '#9B2335',
  burgundyLight: '#C0272D',
  burgundyGlow: 'rgba(155,35,53,0.25)',
  gold: '#C9A84C',
  goldLight: '#E2C76B',
  goldGlow: 'rgba(201,168,76,0.2)',
  textPrimary: '#F5EFE6',
  textSecondary: '#B8A99E',
  textMuted: '#7A6A63',
  textSubtle: '#4A3E3A',
  green: '#4CAF7D',
  red: '#E05A5A',
  amber: '#F5A623',
  blue: '#5B9BD5',
}

// Alias for backward compatibility with pages that import T from mockData
export { T as DARK }

// ─── REVENUE TREND ────────────────────────────────────────────────────────────
export const REVENUE_TREND = [
  { day: 'Mon', revenue: 12400, orders: 58,  cogs: 4340,  profit: 8060  },
  { day: 'Tue', revenue: 15800, orders: 74,  cogs: 5530,  profit: 10270 },
  { day: 'Wed', revenue: 18200, orders: 86,  cogs: 6370,  profit: 11830 },
  { day: 'Thu', revenue: 14600, orders: 69,  cogs: 5110,  profit: 9490  },
  { day: 'Fri', revenue: 22400, orders: 105, cogs: 7840,  profit: 14560 },
  { day: 'Sat', revenue: 28600, orders: 134, cogs: 10010, profit: 18590 },
  { day: 'Sun', revenue: 18450, orders: 87,  cogs: 6458,  profit: 11993 },
]

// ─── CATEGORY SALES ───────────────────────────────────────────────────────────
export const CATEGORY_SALES = [
  { name: 'Chicken', value: 38400, color: '#C0272D' },
  { name: 'Burgers', value: 24600, color: '#C9A84C' },
  { name: 'Waffles', value: 16200, color: '#4CAF7D' },
  { name: 'Momos',   value: 12800, color: '#5B9BD5' },
  { name: 'Rolls',   value: 9400,  color: '#A855F7' },
  { name: 'Veg',     value: 7200,  color: '#F5A623' },
]

// ─── TOP ITEMS ────────────────────────────────────────────────────────────────
export const TOP_ITEMS = [
  { name: 'Crispy Chicken Burger',  sold: 142, revenue: 22518, margin: 62 },
  { name: 'Chicken Wings',          sold: 128, revenue: 15232, margin: 59 },
  { name: 'Chicken Lollipops',      sold: 116, revenue: 16124, margin: 61 },
  { name: 'Veg Big Burger',         sold: 98,  revenue: 7742,  margin: 68 },
  { name: 'Stick Waffle',           sold: 94,  revenue: 6486,  margin: 71 },
]

// ─── MENU CATEGORIES ──────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: 1,  name: 'Chicken',       icon: '🍗', items: 9,  active: true },
  { id: 2,  name: 'Prawns',        icon: '🦐', items: 1,  active: true },
  { id: 3,  name: 'Apollo Fish',   icon: '🐟', items: 1,  active: true },
  { id: 4,  name: 'Veg',           icon: '🥗', items: 4,  active: true },
  { id: 5,  name: 'Burgers',       icon: '🍔', items: 11, active: true },
  { id: 6,  name: 'Rolls',         icon: '🌯', items: 4,  active: true },
  { id: 7,  name: 'Waffles',       icon: '🧇', items: 10, active: true },
  { id: 8,  name: 'Fried Momos',   icon: '🥟', items: 3,  active: true },
  { id: 9,  name: 'Desserts',      icon: '🍫', items: 3,  active: true },
  { id: 10, name: 'Special Offers',icon: '⚡', items: 3,  active: true },
]

// ─── MENU ITEMS ───────────────────────────────────────────────────────────────
export const MENU_ITEMS = [
  { id:1,  name:'Chicken Wings',                  category:'Chicken',       price:119, cost:42, margin:64.7, available:true,  veg:false, featured:true,  spicy:true  },
  { id:2,  name:'Chicken Lollipops (4 pcs)',       category:'Chicken',       price:139, cost:52, margin:62.6, available:true,  veg:false, featured:true,  spicy:false },
  { id:3,  name:'Crispy Legs (2 pcs)',             category:'Chicken',       price:159, cost:60, margin:62.3, available:true,  veg:false, featured:false, spicy:false },
  { id:4,  name:'Crispy Chest (2 pcs)',            category:'Chicken',       price:159, cost:58, margin:63.5, available:true,  veg:false, featured:false, spicy:false },
  { id:5,  name:'Crispy Thighs (2 pcs)',           category:'Chicken',       price:159, cost:56, margin:64.8, available:true,  veg:false, featured:false, spicy:true  },
  { id:6,  name:'Chicken Strips (4 pcs)',          category:'Chicken',       price:119, cost:44, margin:63.0, available:true,  veg:false, featured:false, spicy:false },
  { id:7,  name:'Crispy Stick Chicken (4 pcs)',    category:'Chicken',       price:99,  cost:36, margin:63.6, available:true,  veg:false, featured:false, spicy:false },
  { id:8,  name:'Crispy Chicken Popcorn',          category:'Chicken',       price:129, cost:46, margin:64.3, available:true,  veg:false, featured:true,  spicy:true  },
  { id:9,  name:'Fries Chicken (8 bowl)',          category:'Chicken',       price:179, cost:68, margin:62.0, available:false, veg:false, featured:false, spicy:false },
  { id:10, name:'Crispy Prawns',                   category:'Prawns',        price:149, cost:72, margin:51.7, available:true,  veg:false, featured:true,  spicy:false },
  { id:11, name:'Crispy Apollo Fish',              category:'Apollo Fish',   price:149, cost:65, margin:56.4, available:true,  veg:false, featured:false, spicy:false },
  { id:12, name:'Crispy & Sticky Corn',            category:'Veg',           price:99,  cost:28, margin:71.7, available:true,  veg:true,  featured:false, spicy:false },
  { id:13, name:'Crispy Baby Corn',                category:'Veg',           price:129, cost:38, margin:70.5, available:true,  veg:true,  featured:false, spicy:false },
  { id:14, name:'Crispy Paneer',                   category:'Veg',           price:129, cost:44, margin:65.9, available:true,  veg:true,  featured:true,  spicy:false },
  { id:15, name:'Crispy Mushroom',                 category:'Veg',           price:129, cost:36, margin:72.1, available:true,  veg:true,  featured:false, spicy:false },
  { id:16, name:'Veg Big Burger',                  category:'Burgers',       price:79,  cost:22, margin:72.2, available:true,  veg:true,  featured:false, spicy:false },
  { id:17, name:'Cheesy Burger',                   category:'Burgers',       price:89,  cost:28, margin:68.5, available:true,  veg:true,  featured:false, spicy:false },
  { id:18, name:'Classic Chicken Burger',          category:'Burgers',       price:129, cost:44, margin:65.9, available:true,  veg:false, featured:false, spicy:false },
  { id:19, name:'Crispy Chicken Burger',           category:'Burgers',       price:159, cost:54, margin:66.0, available:true,  veg:false, featured:true,  spicy:true  },
  { id:20, name:'Crispy Chicken Keema Burger',     category:'Burgers',       price:169, cost:62, margin:63.3, available:true,  veg:false, featured:false, spicy:true  },
  { id:21, name:'Crispy Chicken Strips Burger',    category:'Burgers',       price:159, cost:54, margin:66.0, available:true,  veg:false, featured:false, spicy:false },
  { id:22, name:'Crispy Chicken Popcorn Burger',   category:'Burgers',       price:159, cost:52, margin:67.3, available:true,  veg:false, featured:false, spicy:true  },
  { id:23, name:'Crispy Prawns Burger',            category:'Burgers',       price:159, cost:76, margin:52.2, available:true,  veg:false, featured:false, spicy:false },
  { id:24, name:'Crispy Prawns Keema Burger',      category:'Burgers',       price:169, cost:82, margin:51.5, available:true,  veg:false, featured:false, spicy:false },
  { id:25, name:'Crispy Apollo Fish Burger',       category:'Burgers',       price:159, cost:68, margin:57.2, available:true,  veg:false, featured:false, spicy:false },
  { id:26, name:'Crispy Apollo Fish Keema Burger', category:'Burgers',       price:169, cost:74, margin:56.2, available:true,  veg:false, featured:false, spicy:false },
  { id:27, name:'Spring Rolls',                    category:'Rolls',         price:89,  cost:26, margin:70.8, available:true,  veg:true,  featured:false, spicy:false },
  { id:28, name:'Chicken Spring Rolls',            category:'Rolls',         price:99,  cost:34, margin:65.7, available:true,  veg:false, featured:false, spicy:false },
  { id:29, name:'Smiles',                          category:'Rolls',         price:79,  cost:20, margin:74.7, available:true,  veg:true,  featured:false, spicy:false },
  { id:30, name:'Potato Springs',                  category:'Rolls',         price:49,  cost:14, margin:71.4, available:true,  veg:true,  featured:false, spicy:false },
  { id:31, name:'Stick Waffle',                    category:'Waffles',       price:69,  cost:18, margin:73.9, available:true,  veg:true,  featured:false, spicy:false },
  { id:32, name:'Stick Chocolate Waffle',          category:'Waffles',       price:89,  cost:24, margin:73.0, available:true,  veg:true,  featured:false, spicy:false },
  { id:33, name:'Stick Double Chocolate',          category:'Waffles',       price:89,  cost:26, margin:70.8, available:true,  veg:true,  featured:false, spicy:false },
  { id:34, name:'Stick Kit Kat Waffle',            category:'Waffles',       price:99,  cost:32, margin:67.7, available:true,  veg:true,  featured:true,  spicy:false },
  { id:35, name:'Stick Oreo Waffle',               category:'Waffles',       price:99,  cost:30, margin:69.7, available:true,  veg:true,  featured:false, spicy:false },
  { id:36, name:'Plane Waffle',                    category:'Waffles',       price:59,  cost:14, margin:76.3, available:true,  veg:true,  featured:false, spicy:false },
  { id:37, name:'Chocolate Waffle',                category:'Waffles',       price:69,  cost:20, margin:71.0, available:true,  veg:true,  featured:false, spicy:false },
  { id:38, name:'Double Chocolate Waffle',         category:'Waffles',       price:79,  cost:24, margin:69.6, available:true,  veg:true,  featured:false, spicy:false },
  { id:39, name:'Kit Kat Waffle',                  category:'Waffles',       price:89,  cost:28, margin:68.5, available:true,  veg:true,  featured:false, spicy:false },
  { id:40, name:'Oreo Waffle',                     category:'Waffles',       price:89,  cost:28, margin:68.5, available:true,  veg:true,  featured:false, spicy:false },
  { id:41, name:'Veg Momos',                       category:'Fried Momos',   price:89,  cost:26, margin:70.8, available:true,  veg:true,  featured:false, spicy:false },
  { id:42, name:'Paneer Momos',                    category:'Fried Momos',   price:99,  cost:36, margin:63.6, available:true,  veg:true,  featured:false, spicy:false },
  { id:43, name:'Chicken Momos',                   category:'Fried Momos',   price:109, cost:40, margin:63.3, available:true,  veg:false, featured:true,  spicy:false },
  { id:44, name:'Chocolate Brownie',               category:'Desserts',      price:59,  cost:16, margin:72.9, available:true,  veg:true,  featured:false, spicy:false },
  { id:45, name:'RV Brownie',                      category:'Desserts',      price:59,  cost:16, margin:72.9, available:true,  veg:true,  featured:false, spicy:false },
  { id:46, name:'Choco Lava',                      category:'Desserts',      price:69,  cost:22, margin:68.1, available:true,  veg:true,  featured:true,  spicy:false },
  { id:47, name:'Crispy Legs Bucket (10 pcs)',     category:'Special Offers',price:699, cost:280,margin:59.9, available:true,  veg:false, featured:true,  spicy:false },
  { id:48, name:'Crispy Lollipop Bucket (10 pcs)', category:'Special Offers',price:299, cost:118,margin:60.5, available:true,  veg:false, featured:false, spicy:false },
  { id:49, name:'Popcorn & Sticky Corn Combo',     category:'Special Offers',price:199, cost:70, margin:64.8, available:true,  veg:false, featured:false, spicy:false },
]

// ─── INGREDIENTS ──────────────────────────────────────────────────────────────
export const INGREDIENTS = [
  { id:1,  name:'Chicken (Whole)',   unit:'KG',   current:24.5, min:10, reorder:15, avgCost:180, stockValue:4410, status:'healthy',  category:'Protein'   },
  { id:2,  name:'Chicken Breast',   unit:'KG',   current:8.2,  min:10, reorder:12, avgCost:240, stockValue:1968, status:'low',      category:'Protein'   },
  { id:3,  name:'Prawns (Frozen)',   unit:'KG',   current:3.1,  min:5,  reorder:6,  avgCost:420, stockValue:1302, status:'critical', category:'Protein'   },
  { id:4,  name:'Fish Fillet',       unit:'KG',   current:6.4,  min:5,  reorder:7,  avgCost:280, stockValue:1792, status:'healthy',  category:'Protein'   },
  { id:5,  name:'Paneer',            unit:'KG',   current:4.8,  min:3,  reorder:4,  avgCost:320, stockValue:1536, status:'healthy',  category:'Dairy'     },
  { id:6,  name:'All-Purpose Flour', unit:'KG',   current:28.5, min:15, reorder:20, avgCost:42,  stockValue:1197, status:'healthy',  category:'Dry Goods' },
  { id:7,  name:'Refined Oil',       unit:'L',    current:18.2, min:10, reorder:15, avgCost:140, stockValue:2548, status:'healthy',  category:'Oils'      },
  { id:8,  name:'Bread Buns',        unit:'PCS',  current:120,  min:50, reorder:80, avgCost:8,   stockValue:960,  status:'healthy',  category:'Bakery'    },
  { id:9,  name:'Waffle Mix',        unit:'KG',   current:9.6,  min:8,  reorder:10, avgCost:180, stockValue:1728, status:'healthy',  category:'Dry Goods' },
  { id:10, name:'Chocolate Sauce',   unit:'KG',   current:2.2,  min:3,  reorder:4,  avgCost:240, stockValue:528,  status:'critical', category:'Sauces'    },
  { id:11, name:'Baby Corn',         unit:'KG',   current:5.1,  min:3,  reorder:4,  avgCost:160, stockValue:816,  status:'healthy',  category:'Vegetables'},
  { id:12, name:'Mushroom',          unit:'KG',   current:3.8,  min:3,  reorder:4,  avgCost:200, stockValue:760,  status:'healthy',  category:'Vegetables'},
  { id:13, name:'Mixed Spices',      unit:'KG',   current:4.2,  min:2,  reorder:3,  avgCost:280, stockValue:1176, status:'healthy',  category:'Spices'    },
  { id:14, name:'Cheese Slices',     unit:'PCS',  current:85,   min:60, reorder:80, avgCost:12,  stockValue:1020, status:'healthy',  category:'Dairy'     },
  { id:15, name:'Oreo Biscuits',     unit:'PACK', current:22,   min:10, reorder:15, avgCost:45,  stockValue:990,  status:'healthy',  category:'Dry Goods' },
  { id:16, name:'Kit Kat',           unit:'PCS',  current:0,    min:20, reorder:25, avgCost:20,  stockValue:0,    status:'out',      category:'Dry Goods' },
  { id:17, name:'Brownie Mix',       unit:'KG',   current:6.5,  min:4,  reorder:5,  avgCost:220, stockValue:1430, status:'healthy',  category:'Dry Goods' },
  { id:18, name:'Chicken Keema',     unit:'KG',   current:7.2,  min:5,  reorder:7,  avgCost:200, stockValue:1440, status:'healthy',  category:'Protein'   },
]

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export const ORDERS = [
  { id:'ORD-2847', date:'2024-01-14 19:32', type:'DINE_IN',  payment:'UPI',  items:4, subtotal:497,  tax:24.85, total:521.85,  cogs:189.5, profit:332.35, status:'COMPLETED' },
  { id:'ORD-2846', date:'2024-01-14 19:15', type:'TAKEAWAY', payment:'CASH', items:2, subtotal:238,  tax:11.9,  total:249.9,   cogs:88.2,  profit:161.7,  status:'COMPLETED' },
  { id:'ORD-2845', date:'2024-01-14 18:58', type:'DELIVERY', payment:'CARD', items:6, subtotal:812,  tax:40.6,  total:852.6,   cogs:302.4, profit:550.2,  status:'COMPLETED' },
  { id:'ORD-2844', date:'2024-01-14 18:42', type:'DINE_IN',  payment:'CASH', items:3, subtotal:367,  tax:18.35, total:385.35,  cogs:136.2, profit:249.15, status:'COMPLETED' },
  { id:'ORD-2843', date:'2024-01-14 18:30', type:'TAKEAWAY', payment:'UPI',  items:1, subtotal:159,  tax:7.95,  total:166.95,  cogs:54,    profit:112.95, status:'PREPARING' },
  { id:'ORD-2842', date:'2024-01-14 18:12', type:'DINE_IN',  payment:'CARD', items:5, subtotal:629,  tax:31.45, total:660.45,  cogs:234.6, profit:425.85, status:'READY'     },
  { id:'ORD-2841', date:'2024-01-14 17:55', type:'DELIVERY', payment:'UPI',  items:3, subtotal:348,  tax:17.4,  total:365.4,   cogs:129.8, profit:235.6,  status:'COMPLETED' },
  { id:'ORD-2840', date:'2024-01-14 17:38', type:'TAKEAWAY', payment:'CASH', items:2, subtotal:228,  tax:11.4,  total:239.4,   cogs:84.6,  profit:154.8,  status:'CANCELLED' },
  { id:'ORD-2839', date:'2024-01-14 17:20', type:'DINE_IN',  payment:'UPI',  items:7, subtotal:978,  tax:48.9,  total:1026.9,  cogs:362.4, profit:664.5,  status:'COMPLETED' },
  { id:'ORD-2838', date:'2024-01-14 17:02', type:'DELIVERY', payment:'CARD', items:4, subtotal:538,  tax:26.9,  total:564.9,   cogs:200.1, profit:364.8,  status:'COMPLETED' },
]

// ─── WASTAGE ──────────────────────────────────────────────────────────────────
export const WASTAGE = [
  { id:1, date:'2024-01-14', ingredient:'Chicken Breast',  qty:1.2, unit:'KG',   cost:240, total:288, reason:'Expired',           by:'Ravi Kumar'  },
  { id:2, date:'2024-01-14', ingredient:'Chocolate Sauce', qty:0.5, unit:'KG',   cost:240, total:120, reason:'Spillage',           by:'Priya Singh' },
  { id:3, date:'2024-01-13', ingredient:'Chicken (Whole)', qty:2.0, unit:'KG',   cost:180, total:360, reason:'Overproduction',     by:'Rahul M'     },
  { id:4, date:'2024-01-13', ingredient:'Waffle Mix',      qty:0.8, unit:'KG',   cost:180, total:144, reason:'Burnt',              by:'Ravi Kumar'  },
  { id:5, date:'2024-01-12', ingredient:'Paneer',          qty:0.6, unit:'KG',   cost:320, total:192, reason:'Preparation Waste',  by:'Priya Singh' },
  { id:6, date:'2024-01-12', ingredient:'Fish Fillet',     qty:0.9, unit:'KG',   cost:280, total:252, reason:'Expired',            by:'Rahul M'     },
]

// ─── EXPENSES ─────────────────────────────────────────────────────────────────
export const EXPENSES = [
  { id:1, name:'Monthly Rent',               category:'Rent',        amount:25000, date:'2024-01-01', payment:'BANK_TRANSFER', recurring:true  },
  { id:2, name:'Electricity Bill',           category:'Electricity', amount:8400,  date:'2024-01-05', payment:'ONLINE',        recurring:true  },
  { id:3, name:'Staff Salaries',             category:'Salaries',    amount:45000, date:'2024-01-07', payment:'BANK_TRANSFER', recurring:true  },
  { id:4, name:'Gas Cylinder Refill',        category:'Gas',         amount:2200,  date:'2024-01-08', payment:'CASH',          recurring:false },
  { id:5, name:'Packaging Materials',        category:'Packaging',   amount:3400,  date:'2024-01-10', payment:'CASH',          recurring:false },
  { id:6, name:'Internet Bill',             category:'Internet',     amount:1200,  date:'2024-01-10', payment:'ONLINE',        recurring:true  },
  { id:7, name:'Marketing - Instagram Ads', category:'Marketing',    amount:5000,  date:'2024-01-12', payment:'CARD',          recurring:false },
  { id:8, name:'Equipment Repair',          category:'Maintenance',  amount:3200,  date:'2024-01-13', payment:'CASH',          recurring:false },
]

// ─── RECIPES ──────────────────────────────────────────────────────────────────
export const RECIPES = [
  {
    id:1, item:'Chicken Wings', sellingPrice:119, cost:42, yieldQty:1,
    ingredients:[
      { name:'Chicken (Whole)',   qty:250, unit:'g',  cost:45,   pct:107 },
      { name:'All-Purpose Flour', qty:80,  unit:'g',  cost:3.36, pct:100 },
      { name:'Refined Oil',       qty:50,  unit:'ml', cost:7,    pct:140 },
      { name:'Mixed Spices',      qty:10,  unit:'g',  cost:2.8,  pct:280 },
    ],
  },
  {
    id:2, item:'Crispy Chicken Burger', sellingPrice:159, cost:54, yieldQty:1,
    ingredients:[
      { name:'Chicken Breast',    qty:120, unit:'g',   cost:28.8, pct:240 },
      { name:'Bread Buns',        qty:1,   unit:'pcs', cost:8,    pct:800 },
      { name:'All-Purpose Flour', qty:60,  unit:'g',   cost:2.52, pct:100 },
      { name:'Refined Oil',       qty:30,  unit:'ml',  cost:4.2,  pct:140 },
      { name:'Cheese Slices',     qty:1,   unit:'pcs', cost:12,   pct:1200 },
    ],
  },
  {
    id:3, item:'Crispy Paneer', sellingPrice:129, cost:44, yieldQty:1,
    ingredients:[
      { name:'Paneer',            qty:120, unit:'g',  cost:38.4, pct:320 },
      { name:'All-Purpose Flour', qty:40,  unit:'g',  cost:1.68, pct:100 },
      { name:'Refined Oil',       qty:25,  unit:'ml', cost:3.5,  pct:140 },
      { name:'Mixed Spices',      qty:1,   unit:'g',  cost:0.28, pct:280 },
    ],
  },
  {
    id:4, item:'Stick Kit Kat Waffle', sellingPrice:99, cost:32, yieldQty:1,
    ingredients:[
      { name:'Waffle Mix',       qty:150, unit:'g',  cost:27,  pct:180 },
      { name:'Kit Kat',          qty:1,   unit:'pcs',cost:20,  pct:2000 },
      { name:'Chocolate Sauce',  qty:20,  unit:'g',  cost:4.8, pct:240 },
    ],
  },
  {
    id:5, item:'Chicken Momos', sellingPrice:109, cost:40, yieldQty:1,
    ingredients:[
      { name:'Chicken Keema',     qty:100, unit:'g',  cost:20,  pct:200 },
      { name:'All-Purpose Flour', qty:100, unit:'g',  cost:4.2, pct:100 },
      { name:'Mixed Spices',      qty:5,   unit:'g',  cost:1.4, pct:280 },
    ],
  },
]

// ─── PURCHASES ────────────────────────────────────────────────────────────────
export const PURCHASES = [
  { id:'PUR-001', date:'2024-01-14', supplier:'Ram Poultry Farms',  items:4, total:8600, status:'RECEIVED' },
  { id:'PUR-002', date:'2024-01-13', supplier:'Fresh Veggies Co.',  items:6, total:3200, status:'RECEIVED' },
  { id:'PUR-003', date:'2024-01-12', supplier:'Spices Direct',      items:3, total:1840, status:'RECEIVED' },
  { id:'PUR-004', date:'2024-01-10', supplier:'Ram Poultry Farms',  items:2, total:5400, status:'RECEIVED' },
  { id:'PUR-005', date:'2024-01-08', supplier:'Dairy Fresh Ltd',    items:5, total:4200, status:'RECEIVED' },
]

// ─── FORMATTERS ───────────────────────────────────────────────────────────────
export function fmtINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}k`
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}

export function fmtINRFull(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}
