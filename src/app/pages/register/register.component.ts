import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'CUSTOMER'
  }

  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.form).subscribe({
      next: () => {
        // register() also stores JWT token via tap()
        this.router.navigate(['/menu']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Registration failed.';
      },
      complete: () => {
        this.loading = false;
      }
    })
    
  }
}
