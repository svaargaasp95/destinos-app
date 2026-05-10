import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DestinoForm } from '../../components/destino-form/destino-form';
import { DestinoList } from '../../components/destino-list/destino-list';
import { Destino } from '../../store/destinos.model';
import { agregarDestino } from '../../store/destinos.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DestinoForm, DestinoList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private store = inject(Store);

  onDestinoAgregado(destino: Destino) {
    this.store.dispatch(agregarDestino({ destino }));
  }
}
