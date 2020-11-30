import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  constructor(private datos:DatosService, private router:Router, private msg:ToastrService) { }

  inventario:any;
  level:string;

  nuevoInventario = {id_producto:'', producto:'', cantidad:'', precio:''}
  tmpInventario = {id_producto:'', producto:'', cantidad:'', precio:''}

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.llenarInventario();
  }

  llenarInventario(){
    this.datos.getInventario().subscribe(resp => {
      this.inventario = resp;
      //console.log(resp);
    }, error => {
      console.log(error);
      if(error.status==408) this.router.navigate(['']);
    })
  }

  agregarInventario(){
    if(this.nuevoInventario.producto == '' && this.nuevoInventario.cantidad == ''
    && this.nuevoInventario.producto == ''){
      this.msg.error("Asegurate de llenar todos los campos");
      return;
    }
    this.datos.postInventario(this.nuevoInventario).subscribe(resp => {
      if(resp['result']=='ok'){
        let producto = JSON.parse(JSON.stringify(this.nuevoInventario))
        this.inventario.push(producto);
        this.nuevoInventario.producto = '';
        this.msg.success("El producto se guardo correctamente.");
      }else{
        this.msg.error("El producto no se ha podido guardar.");
      }
    }, error => {
      console.log(error);
    });
  }

  temporalInventario(producto){
    this.tmpInventario = JSON.parse(JSON.stringify(producto));
  }

  guardarCambios(){
    this.datos.putInventario(this.tmpInventario).subscribe(resp => {
      if(resp['result']=='ok'){
        this.llenarInventario();
        this.msg.success("El inventario se actualizo correctamente.");
      }else{
        this.msg.error("El inventario no se ha podido actualizar.");
      }
    }, error => {
      console.log(error);
    });
  }

  confirmarEliminar(){
    this.datos.deleteInventario(this.tmpInventario).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.inventario.indexOf( this.inventario.find( v => v.id_producto == this.tmpInventario.id_producto ));
        this.inventario.splice(i,1);
        this.msg.success("La venta se elimino correctamente.");
      }else{
        this.msg.error("La venta no se ha podido eliminar.");
      }
    }, error => {
      console.log(error);
    });
  }

}
