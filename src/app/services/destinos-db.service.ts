import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Destino } from '../store/destinos.model';

@Injectable({
  providedIn: 'root'
})
export class DestinosDbService extends Dexie {
  destinos!: Table<Destino, number>;

  constructor() {
    super('DestinosDB');
    this.version(1).stores({
      destinos: '++id, nombre, descripcion, votos'
    });
  }

  async agregarDestino(destino: Destino): Promise<void> {
    await this.destinos.add(destino);
  }

  async obtenerTodos(): Promise<Destino[]> {
    return await this.destinos.toArray();
  }
}
