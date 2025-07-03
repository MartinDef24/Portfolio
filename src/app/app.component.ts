import { Component, OnInit } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone:true,
    imports: [Header, Footer, RouterOutlet],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
  }
}
