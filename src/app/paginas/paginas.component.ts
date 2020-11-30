import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.css']
})
export class PaginasComponent implements OnInit {

  user="";
  level="";

  constructor(private datos:DatosService, private router:Router) { }

  ngOnInit(): void {
    this.user = this.datos.getCuenta().usuario;
    this.level = this.datos.getCuenta().level;
  }

  salir(){
    this.datos.setCuenta('','','');
    this.router.navigate(['']);
  }
  

}
