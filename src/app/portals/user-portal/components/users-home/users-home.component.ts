import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { SpecialOffersComponent } from '../special-offers/special-offers.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-users-home',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
    SpecialOffersComponent,
    FooterComponent,
  ],
  templateUrl: './users-home.component.html',
  styleUrl: './users-home.component.css',
})
export class UsersHomeComponent {}
