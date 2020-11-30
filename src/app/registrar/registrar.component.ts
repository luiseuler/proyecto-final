import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  ngOnInit(): void {
  }

  users:any;
  level:string;

  nuevoUsuario = {usuario:'', fecha_registro:'', tipo_sangre:'', estado_civil:'', telefono:'', direccion:'', email:'', 
  pass:'', tipo:''};
  // tmpUser = {user:'', pass:'', tipo:'', nombre:''};

  
  constructor(private datos:DatosService, private router:Router,private msg:ToastrService) { }


}
