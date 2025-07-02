import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  console.log('Token:', token); // Debugging line

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Request with Authorization header:', cloned); // Debugging line
    return next(cloned);
  }

  console.warn('No token found, sending request without Authorization header.'); // Debugging line
  return next(req);
};
