import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Destino } from '../../store/destinos.model';

export function minLengthPersonalizado(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || control.value.trim().length < min) {
      return { minLengthPersonalizado: { requerido: min, actual: control.value?.trim().length || 0 } };
    }
    return null;
  };
}

@Component({
  selector: 'app-destino-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './destino-form.html',
  styleUrl: './destino-form.css'
})
export class DestinoForm {

  @Output() destinoAgregado = new EventEmitter<Destino>();

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: [
        '',
        [Validators.required, minLengthPersonalizado(3)]
      ],
      descripcion: [
        '',
        [Validators.required]
      ]
    });
  }

  get nombre() { return this.formulario.get('nombre'); }
  get descripcion() { return this.formulario.get('descripcion'); }

  onSubmit() {
    if (this.formulario.valid) {
      const nuevoDestino: Destino = {
        id: Date.now(),
        nombre: this.formulario.value.nombre,
        descripcion: this.formulario.value.descripcion,
        votos: 0
      };
      this.destinoAgregado.emit(nuevoDestino);
      this.formulario.reset();
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}