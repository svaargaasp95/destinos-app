import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DestinosState } from './destinos.reducer';

export const selectDestinosState = createFeatureSelector<DestinosState>('destinos');

export const selectLista = createSelector(
  selectDestinosState,
  (state) => state.lista
);