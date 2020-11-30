import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  inventario: any;
  level: string;

  constructor(private datos: DatosService, private router: Router, private msg: ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.llenarInventario();
  }

  llenarInventario() {
    this.datos.getInventario().subscribe(resp => {
      this.inventario = resp;
      //console.log(resp);
    }, error => {
      console.log(error);
      if (error.status == 408) this.router.navigate(['']);
    })
  }
}
