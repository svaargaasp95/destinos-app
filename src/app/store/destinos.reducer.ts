import { createReducer, on } from '@ngrx/store';
import { Destino } from './destinos.model';
import { agregarDestino, eliminarDestino, votarFavor, votarContra } from './destinos.actions';

export interface DestinosState {
  lista: Destino[];
}

export const initialState: DestinosState = {
  lista: [
    { id: 1, nombre: 'Cartagena', descripcion: 'Ciudad amurallada del Caribe colombiano.', votos: 0 },
    { id: 2, nombre: 'Medellín', descripcion: 'La ciudad de la eterna primavera.', votos: 0 },
    { id: 3, nombre: 'San Andrés', descripcion: 'Isla paradisíaca con mar de siete colores.', votos: 0 }
  ]
};

export const destinosReducer = createReducer(
  initialState,

  on(agregarDestino, (state, { destino }) => ({
    ...state,
    lista: [...state.lista, destino]
  })),

  on(eliminarDestino, (state, { id }) => ({
    ...state,
    lista: state.lista.filter(d => d.id !== id)
  })),

  on(votarFavor, (state, { id }) => ({
    ...state,
    lista: state.lista.map(d => d.id === id ? { ...d, votos: d.votos + 1 } : d)
  })),

  on(votarContra, (state, { id }) => ({
    ...state,
    lista: state.lista.map(d => d.id === id ? { ...d, votos: d.votos - 1 } : d)
  }))
);