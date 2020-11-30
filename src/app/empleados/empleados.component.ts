import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  users:any;
  level:string;
  nuevoUser = {id:'', usuario:'', fecha_registro:'', tipo_sangre:'', estado_civil:'', telefono:'', direccion:'',
  email:'', pass:'', tipo:''};
  tmpUser = {id:'', usuario:'', fecha_registro:'', tipo_sangre:'', estado_civil:'', telefono:'', direccion:'',
  email:'', pass:'', tipo:''};

  constructor(private datos:DatosService, private router:Router, private msg:ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.llenarUsuarios();
  }

  agregarUsuario(){
    if(this.nuevoUser.id == '' && this.nuevoUser.usuario == '' && this.nuevoUser.fecha_registro == '' 
    && this.nuevoUser.tipo_sangre == '' && this.nuevoUser.estado_civil == '' && this.nuevoUser.telefono == '' 
    && this.nuevoUser.direccion == ''  && this.nuevoUser.email == '' && this.nuevoUser.pass == '' 
    && this.nuevoUser.tipo == ''){
      this.msg.error("Asegurate de llenar todos los campos");
      return;
    }
    this.datos.postUsuarios(this.nuevoUser).subscribe(resp => {
      if(resp['result']=='ok'){
        let user = JSON.parse(JSON.stringify(this.nuevoUser))
        this.users.push(user);
        this.nuevoUser.id = '';
        this.nuevoUser.usuario = '';
        this.nuevoUser.fecha_registro = '';
        this.nuevoUser.tipo_sangre = '';
        this.nuevoUser.estado_civil = '';
        this.nuevoUser.telefono = '';
        this.nuevoUser.direccion = '';
        this.nuevoUser.email = '';
        this.nuevoUser.pass = '';
        this.nuevoUser.tipo = '';
        this.msg.success("El usuario se guardo correctamente.");
      }else{
        this.msg.error("El usuario no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }


  llenarUsuarios(){
    this.datos.getUsuario().subscribe(resp => {
      this.users = resp;
      //console.log(resp);
    }, error => {
      console.log(error);
      if(error.status==408) this.router.navigate(['']);
    })
  }

  temporalTema(usuario){
    this.tmpUser = JSON.parse(JSON.stringify(usuario));
  }

  confirmarEliminar(){
    this.datos.deleteUsuarios(this.tmpUser).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.users.indexOf( this.users.find( u => u.id == this.tmpUser.id ));
        this.users.splice(i,1);
        this.msg.success("El usuaio se elimino correctamente.");
      }else{
        this.msg.error("El usuario no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }

  guardarCambios(){
    this.datos.putUsuarios(this.tmpUser).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.users.indexOf( this.users.find( user => user.usuario == this.tmpUser.usuario ));
        this.users[i].usuario = this.tmpUser.usuario;
        this.msg.success("El usuario se guardo correctamente.");
      }else{
        this.msg.error("El usuario no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }
  
}
