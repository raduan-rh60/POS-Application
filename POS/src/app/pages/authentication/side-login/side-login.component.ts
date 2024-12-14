import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/authentication/auth-service.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    // You would typically call an API to authenticate here.
    // If successful, save the token returned by the API in the AuthService.
    if (this.username === 'admin' && this.password === '1234') {
      const fakeToken = 'fake-jwt-token'; // This would be a JWT token from the server
      this.authService.login(fakeToken);
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}
