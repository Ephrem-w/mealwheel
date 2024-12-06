import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';

interface SpecialOffer {
  id: number;
  title: string;
  restaurant: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
  timeLeft: string;
  rating: number;
  category: string;
  features: string[];
  bgColor: string;
}

@Component({
  selector: 'app-special-offers',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './special-offers.component.html',
})
export class SpecialOffersComponent implements OnInit {
  showCart = false;
  currentSlide = 0;
  autoSlideInterval: any;

  specialOffers: SpecialOffer[] = [
    {
      id: 1,
      title: 'Weekend Special Burger',
      restaurant: 'Shege Burgers',
      description: 'Double cheese burger with special sauce and fries',
      originalPrice: 350,
      discountedPrice: 280,
      discount: 20,
      image: 'assets/images/vector.jpg',
      timeLeft: '02:30:00',
      rating: 4.8,
      category: 'featured',
      features: ['Free Delivery', 'Special Sauce', 'Extra Cheese'],
      bgColor: 'from-orange-500 to-orange-600',
    },
    {
      id: 2,
      title: 'Family Pizza Deal',
      restaurant: 'Pizza House',
      description: 'Large pizza with 4 toppings of your choice',
      originalPrice: 450,
      discountedPrice: 350,
      discount: 25,
      image: 'assets/images/vector.jpg',
      timeLeft: '05:45:00',
      rating: 4.7,
      category: 'featured',
      features: ['Family Size', '4 Toppings', 'Free Drink'],
      bgColor: 'from-red-500 to-red-600',
    },
    {
      id: 3,
      title: 'Traditional Feast',
      restaurant: 'Geza Gerlase',
      description: 'Special beyaynetu with extra items',
      originalPrice: 280,
      discountedPrice: 220,
      discount: 15,
      image: 'assets/images/vector.jpg',
      timeLeft: '03:15:00',
      rating: 4.9,
      category: 'featured',
      features: ['Fresh Ingredients', 'Extra Items', 'Traditional Coffee'],
      bgColor: 'from-green-500 to-green-600',
    },
  ];

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    this.startAutoSlide();
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0
        ? this.specialOffers.length - 1
        : this.currentSlide - 1;
    this.resetAutoSlide();
  }

  nextSlide() {
    this.currentSlide =
      this.currentSlide === this.specialOffers.length - 1
        ? 0
        : this.currentSlide + 1;
    this.resetAutoSlide();
  }

  setSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  addToCart(offer: SpecialOffer) {
    this.cartService.addToCart({
      id: offer.id,
      name: offer.title,
      price: offer.discountedPrice,
      quantity: 1,
      restaurant: offer.restaurant,
      image: offer.image,
    });
    this.showCart = true;
  }
}
