import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {

}
