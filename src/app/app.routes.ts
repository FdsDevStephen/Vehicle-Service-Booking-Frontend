import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { authGuard } from './shared/services/auth.guard';
import { AddMechanic } from './pages/service-center/add-mechanic/add-mechanic'; 
import { BaseLayout } from './shared/layout/base-layout/base-layout';

export const routes: Routes = [
  { path: '', component: Landing },

  {
    path: 'login',
    loadComponent: () => import('./user/login/login').then((m) => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./user/registration/registration').then((m) => m.Registration)
  },

  {
    path: '',
    component: BaseLayout,
    children: [
      {
        path: 'user-dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/customer/dashboard/dashboard').then(m => m.UserDashboard)
      },
    
      {
        path: 'vehicles/register',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/customer/vehicle-registration/vehicle-registration').then(m => m.VehicleRegistration)
      },
    
      {
        path: 'book-service',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/customer/book-service/book-service').then(m => m.BookService)
      },
    
      {
        path: 'my-bookings',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/customer/my-bookings/my-bookings').then(m => m.MyBookings)
      },
    
      // ✅ Protected Service Center Dashboard
      {
        path: 'service-center-dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/service-center/dashboard/dashboard').then(m => m.Dashboard)
      },
      // New: Protected Service Center Sub-pages
      {
        path: 'service-center/appointments',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/service-center/appointments/appointments').then(m => m.AppointmentsComponent)
      },
    
      {
        path: 'invoices',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/customer/invoice-list/invoice-list').then(m => m.InvoiceListComponent)
      },
      {
        path: 'invoice/detail/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/customer/invoice-detail/invoice-detail').then(m => m.InvoiceDetailComponent)
      },
      {
        path: 'vehicles',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/customer/my-vehicles/my-vehicles').then(m => m.MyVehicles)
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/customer/profile/profile').then(m => m.Profile)
      },
      
      {
        path: 'service-center/mechanics',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/service-center/mechanic/mechanic').then(m => m.MechanicComponent)
      },
      
      {
        path: 'service-center/add-mechanic',
        canActivate: [authGuard],
        component: AddMechanic
      },
      {
        path: 'service-center/manage-services',
        loadComponent: () => import('./pages/service-center/servicetype/servicetype').then(m => m.ServiceTypeComponent)
      },
      {
        path: 'service-center/add-service',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/service-center/addservice/addservice').then(m => m.AddServiceComponent) 
      }
    ]
  }
];
