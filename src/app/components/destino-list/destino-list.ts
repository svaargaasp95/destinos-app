import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Destino } from '../../store/destinos.model';
import { selectLista } from '../../store/destinos.selectors';
import { eliminarDestino, votarFavor, votarContra } from '../../store/destinos.actions';

@Component({
  selector: 'app-destino-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino-list.html',
  styleUrls: []
})
export class DestinoList {
  private store = inject(Store);
  destinos$: Observable<Destino[]> = this.store.select(selectLista);

  votar(id: number) {
    this.store.dispatch(votarFavor({ id }));
  }

  votarNegativo(id: number) {
    this.store.dispatch(votarContra({ id }));
  }

  eliminar(id: number) {
    this.store.dispatch(eliminarDestino({ id }));
  }
}