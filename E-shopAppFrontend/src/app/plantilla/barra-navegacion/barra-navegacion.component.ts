import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css'],
})
export class BarraNavegacionComponent implements OnInit {
  seInicioSesion: boolean = false;
  nombrePersona: string = '';
  subs: Subscription = new Subscription();

  constructor(private seguridadServicio: SeguridadService) {}

  ngOnInit(): void {
    this.subs = this.seguridadServicio
      .ObtenerDatosUsuarioSesion()
      .subscribe((datos: ModeloIdentificar) => {
        this.seInicioSesion = datos.estaIdentificado;
      });
  }
}
