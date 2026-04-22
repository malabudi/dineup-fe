import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationRequest } from '../../models/auth.models';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { InputComponent } from "../../components/ui/input/input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: AuthenticationRequest = {
    email: '',
    password: ''
  };

  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.form.email || !this.form.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.form).subscribe({
      next: () => {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin/orders']);
        } else {
          this.router.navigate(['/menu']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.status == 401
        ? 'Invalid email or password' 
        : 'Something went wrong, please try again.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
