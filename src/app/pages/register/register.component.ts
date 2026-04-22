import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../models/auth.models';
import { InputComponent } from '../../components/ui/input/input.component';
import { ButtonComponent } from '../../components/ui/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, InputComponent, ButtonComponent],
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
    if (!this.form.firstName || !this.form.lastName || !this.form.email || !this.form.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

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
