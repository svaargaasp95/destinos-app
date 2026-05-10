import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { APP_CONFIG, AppConfig } from '../tokens/app.tokens';
import { Destino } from '../store/destinos.model';
import { agregarDestino } from '../store/destinos.actions';
import { DestinosDbService } from './destinos-db.service';

@Injectable({
  providedIn: 'root'
})
export class DestinosApiService {
  private http = inject(HttpClient);
  private store = inject(Store);
  private db = inject(DestinosDbService);
  private config = inject<AppConfig>(APP_CONFIG);

  obtenerDestinos() {
    return this.http.get<Destino[]>(this.config.apiUrl + '/destinos');
  }

  agregarDestino(destino: Omit<Destino, 'id' | 'votos'>) {
    this.http.post<Destino>(this.config.apiUrl + '/destinos', destino)
      .subscribe({
        next: (nuevoDestino) => {
          this.store.dispatch(agregarDestino({ destino: nuevoDestino }));
          this.db.agregarDestino(nuevoDestino);
        },
        error: (err) => console.error('Error al agregar destino:', err)
      });
  }
}
