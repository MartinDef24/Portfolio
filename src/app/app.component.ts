import { Component, OnInit } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [Header, Footer],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
  }
}
