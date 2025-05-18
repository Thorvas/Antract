import { Component } from '@angular/core';
import { Instrument } from './instrument';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instruments',
  imports: [CommonModule, FormsModule],
  templateUrl: './instruments.component.html',
  styleUrl: './instruments.component.css'
})
export class InstrumentsComponent {

  instruments: Instrument[] = [
    {
      id: 1,
      name: 'Yamaha p-125',
      description: 'Pianino cyfrowe Yamaha P-125 to instrument, który zadowoli nawet najbardziej wymagających muzyków. Dzięki zastosowaniu technologii Pure CF Sound Engine, P-125 oferuje doskonałą jakość dźwięku, która pozwala na pełne wyrażenie emocji podczas grania.',
      category: 'Pianino',
      price: 230,
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/026/804/694/large_2x/of-a-piano-reflected-in-the-sun-s-rays-generative-ai-photo.jpg',
      offerLink: 'aaa'
    },
    {
      id: 1,
      name: 'Yamaha p-125',
      description: 'Pianino cyfrowe Yamaha P-125 to instrument, który zadowoli nawet najbardziej wymagających muzyków. Dzięki zastosowaniu technologii Pure CF Sound Engine, P-125 oferuje doskonałą jakość dźwięku, która pozwala na pełne wyrażenie emocji podczas grania.',
      category: 'Pianino',
      price: 230,
      imageUrl: 'aaa',
      offerLink: 'aaa'
    },
    {
      id: 1,
      name: 'Yamaha p-125',
      description: 'Pianino cyfrowe Yamaha P-125 to instrument, który zadowoli nawet najbardziej wymagających muzyków. Dzięki zastosowaniu technologii Pure CF Sound Engine, P-125 oferuje doskonałą jakość dźwięku, która pozwala na pełne wyrażenie emocji podczas grania.',
      category: 'Pianino',
      price: 230,
      imageUrl: 'aaa',
      offerLink: 'aaa'
    },
    {
      id: 1,
      name: 'Yamaha p-125',
      description: 'Pianino cyfrowe Yamaha P-125 to instrument, który zadowoli nawet najbardziej wymagających muzyków. Dzięki zastosowaniu technologii Pure CF Sound Engine, P-125 oferuje doskonałą jakość dźwięku, która pozwala na pełne wyrażenie emocji podczas grania.',
      category: 'Gitara',
      price: 230,
      imageUrl: 'aaa',
      offerLink: 'aaa'
    }
  ];

  categories =[...new Set(this.instruments.map(instrument => instrument.category))] as string[];
  currentCategory = 'Pianino';

  getInstrumentsByCategory(): Instrument[] {
    return this.instruments.filter(
      instrument => instrument.category === this.currentCategory
    );
  }

}
