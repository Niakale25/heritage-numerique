import { Component, signal, WritableSignal } from '@angular/core';
interface Proverb {
  text: string;
  origin: string;
  signification: string;
  backgroundImageUrl: string;
}

@Component({
  selector: 'app-proverb-details-component',
  imports: [],
  templateUrl: './proverb-details-component.html',
  styleUrl: './proverb-details-component.css'
})
export class ProverbDetailsComponent {
proverbData: WritableSignal<Proverb> = signal({
    text: 'Si tu veux aller vite, marche seul. Si tu veux aller loin, marchons ensemble.',
    origin: 'Proverbe africain',
    signification:
      "Ce proverbe souligne l'importance de la collaboration et de l'entraide. Bien que l'individualisme puisse apporter des résultats rapides, c'est l'union et la solidarité qui permettent d'accomplir de grandes choses durables.",
    backgroundImageUrl: 'assets/images/baobab.jpg',
  });

  goBack(): void {
    console.log('Retour à la page précédente');
  }
}