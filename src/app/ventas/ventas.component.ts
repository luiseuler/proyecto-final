import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas:any;
  level:string;

  //nuevaVenta = {producto:'', venta_total:'', fecha:''};
  tmpVenta = {id_venta:'', producto:'', cantidad:'', venta_total:'', fecha:''};

  constructor(private datos:DatosService, private router:Router, private msg:ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.llenarVentas();
  }

  temporalVenta(producto){
    this.tmpVenta = JSON.parse(JSON.stringify(producto));
  }

  llenarVentas(){
    this.datos.getVentas().subscribe(resp => {
      this.ventas = resp;
      //console.log(resp);
    }, error => {
      console.log(error);
      if(error.status==408) this.router.navigate(['']);
    })
  }

  confirmarEliminar(){
    this.datos.deleteVentas(this.tmpVenta).subscribe(resp => {
      if(resp['result']=='ok'){
        let i = this.ventas.indexOf( this.ventas.find( v => v.id_venta == this.tmpVenta.id_venta ));
        this.ventas.splice(i,1);
        this.msg.success("La venta se elimino correctamente.");
      }else{
        this.msg.error("La venta no se ha podido eliminar.");
      }
    }, error => {
      console.log(error);
    });
  }
  
}
