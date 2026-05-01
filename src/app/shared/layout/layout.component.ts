import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Observable } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';
import { LoadingSpinnerComponent } from '../../components/ui/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { CartDrawerComponent } from '../cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    CommonModule, 
    LoadingSpinnerComponent, 
    CartDrawerComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  loading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
  }
}