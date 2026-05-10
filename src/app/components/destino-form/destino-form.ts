import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DestinosApiService } from '../../services/destinos-api.service';

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

  @Output() destinoAgregado = new EventEmitter<void>();

  private apiService = inject(DestinosApiService);
  private fb = inject(FormBuilder);

  formulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, minLengthPersonalizado(3)]],
    descripcion: ['', [Validators.required]]
  });

  get nombre() { return this.formulario.get('nombre'); }
  get descripcion() { return this.formulario.get('descripcion'); }

  onSubmit() {
    if (this.formulario.valid) {
      this.apiService.agregarDestino({
        nombre: this.formulario.value.nombre,
        descripcion: this.formulario.value.descripcion
      });
      this.destinoAgregado.emit();
      this.formulario.reset();
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}
