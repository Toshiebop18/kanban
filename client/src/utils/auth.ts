import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null; // Return decoded token
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Check if token exists and is not expired
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false; // If no expiration, assume valid
      return decoded.exp * 1000 < Date.now(); // Compare expiration time with current time
    } catch (error) {
      return true; // Invalid token is treated as expired
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem("token") || ''; // Retrieve token from localStorage
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem("token", idToken); // Store token in localStorage
    window.location.href = "/";
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem("token"); // Remove token
    window.location.href = "/login"; // Redirect to login page
  }
}

export default new AuthService();
