import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deals.component.html',
})
export class DealsComponent {
  activeTab = 'all';

  tabs = [
    { id: 'all', label: 'All Deals' },
    { id: 'burgers', label: 'Burger Spots' },
    { id: 'traditional', label: 'Traditional' },
    { id: 'cafe', label: 'Cafes & Lounges' },
  ];

  deals = [
    {
      id: 1,
      type: 'burgers',
      title: 'Double Cheese Combo',
      restaurant: 'Shege Burgers',
      originalPrice: 350,
      discountedPrice: 280,
      discount: 20,
      image: 'assets/images/deals/shege-burger.jpg',
      timeLeft: '3:45:22',
      available: 15,
      location: 'Hawelti Square',
    },
    {
      id: 2,
      type: 'burgers',
      title: 'Special Burger Meal',
      restaurant: 'Joint Burgers',
      originalPrice: 320,
      discountedPrice: 250,
      discount: 22,
      image: 'assets/images/deals/joint-burger.jpg',
      timeLeft: '5:30:00',
      available: 10,
      location: 'Kebelle Area',
    },
    {
      id: 3,
      type: 'cafe',
      title: 'Premium Coffee & Cake',
      restaurant: 'Natna Spot',
      originalPrice: 200,
      discountedPrice: 150,
      discount: 25,
      image: 'assets/images/deals/natna-spot.jpg',
      timeLeft: '2:15:45',
      available: 20,
      location: 'Ayder',
    },
    {
      id: 4,
      type: 'traditional',
      title: 'Special Beyaynetu',
      restaurant: 'Geza Gerlase',
      originalPrice: 180,
      discountedPrice: 150,
      discount: 17,
      image: 'assets/images/deals/geza-gerlase.jpg',
      timeLeft: '4:20:00',
      available: 25,
      location: 'Geza Gerlase',
    },
  ];

  featuredDeals = [
    {
      id: 1,
      title: 'Weekend Special Platter',
      restaurant: 'Beefman Garden & Bar',
      description:
        'Experience our signature platter with premium beef cuts, special sauce, and complimentary drinks. Perfect for groups and weekend gatherings.',
      price: 450,
      image: 'assets/images/deals/beefman.jpg',
      rating: 4.9,
      reviews: 156,
      savings: 30,
      daysLeft: 2,
      available: 12,
      location: 'Romanat Square',
    },
    {
      id: 2,
      title: 'Traditional Feast',
      restaurant: 'Geza Gerlase Restaurant',
      description:
        'Authentic Tigrayan cuisine featuring special Beyaynetu, traditional coffee ceremony, and local specialties. A true taste of Tigray.',
      price: 280,
      image: 'assets/images/deals/geza-gerlase-special.jpg',
      rating: 4.8,
      reviews: 203,
      savings: 25,
      daysLeft: 3,
      available: 18,
      location: 'Geza Gerlase Area',
    },
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  get filteredDeals() {
    return this.activeTab === 'all'
      ? this.deals
      : this.deals.filter((deal) => deal.type === this.activeTab);
  }
}
