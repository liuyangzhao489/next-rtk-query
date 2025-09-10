export interface Student {
    id: number,
    name?: {
        firstname: string;
        lastname: string;
    },
    email: string,
    phone?: string,
    enrollNumber?: string;
    dateOfAdmission?: string;
    username?: string;
    password?: string;
}

export interface AuthResponse {
  user: Student;
  token: string;
}

export interface AuthState {
  token: string | null;
  user: Student | null;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}