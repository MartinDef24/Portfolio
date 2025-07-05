import { Component } from '@angular/core';
import { Contact } from "../contact/contact";

@Component({
  selector: 'app-home',
  imports: [Contact],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
