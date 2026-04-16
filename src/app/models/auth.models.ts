export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    role: 'CUSTOMER' | 'ADMIN'; // Change to enum
    password: string;
}

export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface AuthenticationResponse {
  token: string;
}