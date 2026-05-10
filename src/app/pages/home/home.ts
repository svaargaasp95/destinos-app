import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DestinoForm } from '../../components/destino-form/destino-form';
import { DestinoList } from '../../components/destino-list/destino-list';
import { AuthService } from '../../services/auth.service';
import { DestinosApiService } from '../../services/destinos-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DestinoForm, DestinoList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private apiService = inject(DestinosApiService);

  ngOnInit() {
    this.apiService.obtenerDestinos().subscribe();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  onDestinoAgregado() {
    console.log('Destino agregado via API');
  }
}
