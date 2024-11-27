import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken'; // key to store the token in localStorage

  constructor(private router: Router) {}

  // Check if the user is logged in by checking the presence of a token
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token; // Return true if a token is found, else false
  }

  // Log in and store the token
  login(token: string): void {

    localStorage.setItem(this.TOKEN_KEY, token); // Save token in localStorage
    this.router.navigate(['/dashboard']); // Redirect to dashboard or any other route
  }

  // Log out and remove the token
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY); // Remove token from localStorage
    this.router.navigate(['/authentication/login']); // Redirect to login page
  }

  // Get the stored token (if needed)
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Optional: Check if token is expired (if your token has an expiration date)
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true; // No token means expired session
    const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode the JWT (assuming it's JWT token)
    const expiry = tokenData.exp * 1000; // Expiry in milliseconds
    return Date.now() > expiry; // Check if current time is greater than expiry
  }
}
