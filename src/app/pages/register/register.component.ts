import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../models/auth.models';
import { InputComponent } from '../../components/ui/input/input.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../../core/constants/validation.constants';

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

    if (!NAME_REGEX.test(this.form.firstName) || !NAME_REGEX.test(this.form.lastName)) {
      this.errorMessage = 'First and last names should only contain letters.';
      return;
    }

    if (!EMAIL_REGEX.test(this.form.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (!PASSWORD_REGEX.test(this.form.password)) {
      this.errorMessage = 'Password must be at least 8 characters long and contain at least one letter and one number.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.form).subscribe({
      next: () => {
        // register() also stores JWT token via tap()
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.errorMessage ?? 'Registration failed, please try again.';
      },
      complete: () => {
        this.loading = false;
      }
    })
    
  }
}
