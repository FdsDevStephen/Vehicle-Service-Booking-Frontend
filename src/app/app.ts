import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [RouterOutlet],
  // template: `
    
  //   <router-outlet></router-outlet>
    
  // `,
  templateUrl: './app.html',
  // styles: [],
})
export class App {
  title = 'Vehicle Service Management';
}