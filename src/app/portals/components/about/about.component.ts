import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styles: [
    `
      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
        100% {
          transform: translateY(0px);
        }
      }

      @keyframes rotate-y {
        from {
          transform: rotateY(12deg);
        }
        to {
          transform: rotateY(0deg);
        }
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      .animate-float-delay {
        animation: float 7s ease-in-out infinite;
        animation-delay: 1s;
      }

      .animate-float-slow {
        animation: float 8s ease-in-out infinite;
        animation-delay: 2s;
      }

      .perspective-1000 {
        perspective: 1000px;
      }

      .rotate-y-12 {
        transform: rotateY(12deg);
      }

      .rotate-y-0 {
        transform: rotateY(0deg);
      }

      .particles-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .particles-container::before,
      .particles-container::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        box-shadow: 0 0 100px 50px rgba(255, 255, 255, 0.1);
      }

      .particles-container::before {
        animation: particleLeft 15s infinite linear;
        left: -50%;
      }

      .particles-container::after {
        animation: particleRight 15s infinite linear;
        right: -50%;
      }

      @keyframes particleLeft {
        0% {
          transform: translateX(0) translateY(0) rotate(0deg);
        }
        100% {
          transform: translateX(100vw) translateY(100vh) rotate(360deg);
        }
      }

      @keyframes particleRight {
        0% {
          transform: translateX(0) translateY(100vh) rotate(0deg);
        }
        100% {
          transform: translateX(-100vw) translateY(0) rotate(-360deg);
        }
      }
    `,
  ],
})
export class AboutComponent {
  stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '500+', label: 'Restaurants' },
    { value: '50+', label: 'Cities' },
    { value: '1M+', label: 'Deliveries' },
  ];

  foodZones = [
    {
      name: 'Hawelti District',
      description:
        "The heart of Mekelle's dining scene with traditional and modern restaurants",
      image: 'assets/images/zones/hawelti.jpg',
      restaurants: '45+',
      rating: 4.8,
    },
    {
      name: 'Ayder Area',
      description: 'Popular student hub with diverse dining options and cafes',
      image: 'assets/images/zones/ayder.jpg',
      restaurants: '35+',
      rating: 4.6,
    },
    {
      name: 'Kebelle Area',
      description:
        'Famous for traditional Tigrayan cuisine and local specialties',
      image: 'assets/images/zones/kebelle.jpg',
      restaurants: '30+',
      rating: 4.7,
    },
  ];

  cuisines = [
    {
      name: 'Tigrayan',
      description: 'Traditional Injera and Tsebhi',
      icon: 'local_dining',
    },
    {
      name: 'Local Cafes',
      description: 'Coffee and Traditional Snacks',
      icon: 'local_cafe',
    },
    {
      name: 'Modern Dining',
      description: 'Contemporary Restaurants',
      icon: 'restaurant',
    },
    {
      name: 'Street Food',
      description: 'Local Quick Bites',
      icon: 'fastfood',
    },
  ];
}
