import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  formulario: FormGroup = this.fb.group({
    usuario: ['', Validators.required],
    password: ['', Validators.required]
  });

  error = false;

  onSubmit() {
    if (this.formulario.valid) {
      const { usuario, password } = this.formulario.value;
      const ok = this.auth.login(usuario, password);
      if (ok) {
        this.router.navigate(['/home']);
      } else {
        this.error = true;
      }
    }
  }
}
