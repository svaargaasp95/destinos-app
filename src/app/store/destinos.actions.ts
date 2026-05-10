import { createAction, props } from '@ngrx/store';
import { Destino } from './destinos.model';

export const agregarDestino = createAction(
  '[Destinos] Agregar',
  props<{ destino: Destino }>()
);

export const eliminarDestino = createAction(
  '[Destinos] Eliminar',
  props<{ id: number }>()
);

export const votarFavor = createAction(
  '[Destinos] Votar Favor',
  props<{ id: number }>()
);

export const votarContra = createAction(
  '[Destinos] Votar Contra',
  props<{ id: number }>()
);