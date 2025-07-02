import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: './base-layout.html',
  styleUrls: ['./base-layout.css']
})
export class BaseLayout {}