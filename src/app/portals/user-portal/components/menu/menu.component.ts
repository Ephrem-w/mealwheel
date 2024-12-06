import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';

interface MenuItem {
  id: number;
  name: string;
  restaurant: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  prepTime: string;
  isPopular: boolean;
  calories?: number;
  dietaryInfo?: string[];
  allergens?: string[];
  crustTypes?: string[];
  milkBases?: string[];
  tortillaTypes?: string[];
  customizationOptions?: {
    sizes?: { name: string; price: number }[];
    spiceLevels?: string[];
    extras?: { name: string; price: number }[];
    sauces?: string[];
    sides?: { name: string; price: number }[];
  };
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CartComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  selectedCategory: string = 'all';
  searchQuery: string = '';
  showCart: boolean = false;
  showCustomizeModal: boolean = false;
  selectedItem: MenuItem | null = null;
  customizeForm!: FormGroup;
  sortBy: string = 'recommended';
  filterOptions = {
    priceRange: 'all',
    dietary: 'all',
    rating: 'all',
  };

  categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'popular', name: 'Most Popular', icon: '⭐' },
    { id: 'burgers', name: 'Burgers', icon: '🍔' },
    { id: 'traditional', name: 'Traditional', icon: '🍲' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' },
  ];

  sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'time', label: 'Fastest Delivery' },
  ];

  dietaryOptions = [
    { value: 'all', label: 'All' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'halal', label: 'Halal' },
    { value: 'gluten-free', label: 'Gluten Free' },
  ];

  priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-100', label: 'Under 100 Birr' },
    { value: '100-200', label: '100-200 Birr' },
    { value: '200-300', label: '200-300 Birr' },
    { value: 'over-300', label: 'Over 300 Birr' },
  ];

  menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Classic Burger',
      restaurant: 'Shege Burgers',
      category: 'burgers',
      price: 280,
      description: 'Juicy beef patty with fresh vegetables',
      image: 'assets/images/menu/classic-burger.jpg',
      rating: 4.8,
      prepTime: '15-20',
      isPopular: true,
      calories: 650,
      dietaryInfo: ['Halal'],
      allergens: ['Gluten', 'Dairy'],
      customizationOptions: {
        sizes: [
          { name: 'Regular', price: 0 },
          { name: 'Large', price: 40 },
          { name: 'Extra Large', price: 70 },
        ],
        spiceLevels: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
        extras: [
          { name: 'Extra Cheese', price: 20 },
          { name: 'Extra Patty', price: 80 },
          { name: 'Bacon', price: 40 },
          { name: 'Fried Egg', price: 25 },
          { name: 'Avocado', price: 30 },
        ],
        sauces: [
          'Regular Mayo',
          'Spicy Mayo',
          'BBQ',
          'Garlic Sauce',
          'Special Sauce',
        ],
        sides: [
          { name: 'French Fries', price: 50 },
          { name: 'Onion Rings', price: 60 },
          { name: 'Coleslaw', price: 40 },
        ],
      },
    },
    // Add more menu items...
    {
      id: 2,
      name: 'Margherita Pizza',
      restaurant: 'Pasta House',
      category: 'pizza',
      price: 450,
      description:
        'Classic pizza with fresh mozzarella, tomato sauce, and basil',
      image: 'assets/images/menu/margherita-pizza.jpg',
      rating: 4.5,
      prepTime: '20-25',
      isPopular: true,
      calories: 700,
      dietaryInfo: ['Vegetarian'],
      allergens: ['Gluten', 'Dairy'],
      customizationOptions: {
        sizes: [
          { name: 'Small', price: 0 },
          { name: 'Medium', price: 60 },
          { name: 'Large', price: 120 },
        ],
        extras: [
          { name: 'Extra Cheese', price: 50 },
          { name: 'Mushrooms', price: 30 },
          { name: 'Olives', price: 20 },
          { name: 'Pepperoni', price: 40 },
          { name: 'Bell Peppers', price: 25 },
        ],
        sauces: [
          'Tomato Sauce',
          'Pesto Sauce',
          'Garlic Butter',
          'Spicy Tomato',
        ],
      },
    },
    {
      id: 3,
      name: 'Caesar Salad',
      restaurant: 'Healthy Greens',
      category: 'salads',
      price: 320,
      description:
        'Crispy romaine lettuce with Caesar dressing, croutons, and Parmesan cheese',
      image: 'assets/images/menu/caesar-salad.jpg',
      rating: 4.2,
      prepTime: '10-15',
      isPopular: false,
      calories: 250,
      dietaryInfo: ['Gluten-Free'],
      allergens: ['Dairy', 'Fish'],
      customizationOptions: {
        sizes: [
          { name: 'Regular', price: 0 },
          { name: 'Large', price: 40 },
        ],
        extras: [
          { name: 'Grilled Chicken', price: 70 },
          { name: 'Bacon Bits', price: 50 },
          { name: 'Avocado Slices', price: 40 },
          { name: 'Hard-Boiled Egg', price: 30 },
        ],
        sauces: ['Caesar Dressing', 'Ranch', 'Italian', 'Balsamic Vinaigrette'],
      },
    },
    {
      id: 4,
      name: 'Berry Smoothie',
      restaurant: 'Smoothie Haven',
      category: 'beverages',
      price: 180,
      description:
        'A refreshing blend of strawberries, blueberries, and bananas',
      image: 'assets/images/menu/berry-smoothie.jpg',
      rating: 4.9,
      prepTime: '5-10',
      isPopular: true,
      calories: 180,
      dietaryInfo: ['Vegan', 'Gluten-Free'],
      allergens: [],
      customizationOptions: {
        sizes: [
          { name: 'Small', price: 0 },
          { name: 'Medium', price: 20 },
          { name: 'Large', price: 40 },
        ],
        extras: [
          { name: 'Protein Powder', price: 30 },
          { name: 'Chia Seeds', price: 20 },
          { name: 'Flax Seeds', price: 15 },
          { name: 'Peanut Butter', price: 25 },
        ],
      },
    },
    {
      id: 5,
      name: 'Grilled Chicken Wrap',
      restaurant: 'Wrap It Up',
      category: 'wraps',
      price: 350,
      description:
        'Grilled chicken, lettuce, tomatoes, and ranch dressing wrapped in a tortilla',
      image: 'assets/images/menu/grilled-chicken-wrap.jpg',
      rating: 4.6,
      prepTime: '10-15',
      isPopular: false,
      calories: 450,
      dietaryInfo: ['Halal'],
      allergens: ['Gluten'],
      customizationOptions: {
        sizes: [
          { name: 'Regular', price: 0 },
          { name: 'Large', price: 40 },
        ],
        spiceLevels: ['Mild', 'Medium', 'Spicy'],
        extras: [
          { name: 'Cheese', price: 30 },
          { name: 'Avocado', price: 40 },
          { name: 'Bacon', price: 50 },
          { name: 'Jalapeños', price: 20 },
        ],
        sides: [
          { name: 'Potato Wedges', price: 60 },
          { name: 'Coleslaw', price: 40 },
          { name: 'Corn on the Cob', price: 50 },
        ],
      },
    },
  ];

  filteredItems: MenuItem[] = [];

  constructor(public cartService: CartService, private fb: FormBuilder) {
    this.initializeForm();
    this.filteredItems = this.menuItems;
  }

  ngOnInit() {}

  private initializeForm(): void {
    this.customizeForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      size: ['Regular'],
      spiceLevel: ['Medium'],
      extras: this.fb.group({}),
      sauces: this.fb.array([]),
      sides: this.fb.group({}),
      specialInstructions: [''],
      removeIngredients: this.fb.group({
        onions: [false],
        tomatoes: [false],
        lettuce: [false],
        pickles: [false],
      }),
    });
  }

  get filteredAndSortedItems(): MenuItem[] {
    let items = this.filteredItems;

    // Category filter
    if (this.selectedCategory !== 'all') {
      items = items.filter((item) => item.category === this.selectedCategory);
    }

    // Search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.restaurant.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Dietary filter
    if (this.filterOptions.dietary !== 'all') {
      items = items.filter((item) =>
        item.dietaryInfo?.includes(this.filterOptions.dietary)
      );
    }

    // Price range filter
    if (this.filterOptions.priceRange !== 'all') {
      items = items.filter((item) => {
        switch (this.filterOptions.priceRange) {
          case 'under-100':
            return item.price < 100;
          case '100-200':
            return item.price >= 100 && item.price <= 200;
          case '200-300':
            return item.price >= 200 && item.price <= 300;
          case 'over-300':
            return item.price > 300;
          default:
            return true;
        }
      });
    }

    // Rating filter
    if (this.filterOptions.rating !== 'all') {
      const minRating = parseFloat(this.filterOptions.rating);
      items = items.filter((item) => item.rating >= minRating);
    }

    // Sorting
    items = [...items].sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'time':
          return parseInt(a.prepTime) - parseInt(b.prepTime);
        default:
          return 0;
      }
    });

    return items;
  }

  openCustomizeModal(item: MenuItem): void {
    this.selectedItem = item;
    this.showCustomizeModal = true;
    this.initializeForm();

    // Add form controls for extras dynamically
    if (item.customizationOptions?.extras) {
      const extrasGroup = this.customizeForm.get('extras') as FormGroup;
      item.customizationOptions.extras.forEach((extra) => {
        extrasGroup.addControl(extra.name, this.fb.control(false));
      });
    }
  }

  closeCustomizeModal(): void {
    this.showCustomizeModal = false;
    this.selectedItem = null;
  }

  calculateTotalPrice(): number {
    if (!this.selectedItem) return 0;

    let total =
      this.selectedItem.price * this.customizeForm.get('quantity')?.value;

    // Add extras cost
    const extras = this.customizeForm.get('extras')?.value;
    if (extras && this.selectedItem.customizationOptions?.extras) {
      Object.keys(extras).forEach((extraName) => {
        if (extras[extraName]) {
          const extra = this.selectedItem!.customizationOptions!.extras!.find(
            (e) => e.name === extraName
          );
          if (extra) {
            total += extra.price;
          }
        }
      });
    }

    // Size adjustments
    const size = this.customizeForm.get('size')?.value;
    if (size === 'Large') total += 40;
    if (size === 'Extra Large') total += 70;

    return total;
  }

  addToCartWithCustomization(): void {
    if (this.selectedItem && this.customizeForm.valid) {
      const formValue = this.customizeForm.value;

      const selectedExtras = Object.entries(formValue.extras)
        .filter(([_, selected]) => selected)
        .map(([name]) => name);

      const removedIngredients = Object.entries(formValue.removeIngredients)
        .filter(([_, removed]) => removed)
        .map(([name]) => name);

      const customizedItem = {
        id: this.selectedItem.id,
        name: this.selectedItem.name,
        price: this.calculateTotalPrice(),
        quantity: formValue.quantity,
        restaurant: this.selectedItem.restaurant,
        image: this.selectedItem.image,
        customization: {
          size: formValue.size,
          spiceLevel: formValue.spiceLevel,
          extras: selectedExtras,
          removedIngredients,
          specialInstructions: formValue.specialInstructions,
        },
      };

      this.cartService.addToCart(customizedItem);
      this.closeCustomizeModal();
      this.showCart = true;
    }
  }

  addToCart(item: MenuItem): void {
    this.cartService.addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurant: item.restaurant,
      image: item.image,
    });
  }

  toggleCartView(): void {
    this.showCart = !this.showCart;
  }

  filterItems(category: string) {
    if (category === 'all') {
      this.filteredItems = this.menuItems;
    } else {
      this.filteredItems = this.menuItems.filter(
        (item) => item.category === category
      );
    }
  }
}
