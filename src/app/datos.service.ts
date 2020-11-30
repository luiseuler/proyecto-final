import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

const URL:string = "http://localhost/paleteria/";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private cuenta = {usuario:"", token:"", level:""}

  constructor(private http: HttpClient, private galleta:CookieService) { 
    
  }

  getCuenta(){
    this.cuenta.usuario = this.galleta.get('usuario');
    this.cuenta.token = this.galleta.get('token');
    this.cuenta.level = this.galleta.get('level');
    return this.cuenta;
  }
  
  setCuenta(usuario,token,nivel){
    this.cuenta.usuario = usuario;
    this.cuenta.token = token;
    this.cuenta.level = nivel;
    this.galleta.set('usuario',usuario);
    this.galleta.set('token',token);
    this.galleta.set('level',nivel);
  }
  
  getUsuario(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    return this.http.get(URL + "trabajadores.php", {headers:Headers});
  }
  postUsuarios(user){

    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('id', user.id);
    formData.append('usuario', user.usuario);
    formData.append('fecha_registro', user.fecha_registro);
    formData.append('tipo_sangre', user.tipo_sangre);
    formData.append('estado_civil', user.estado_civil);
    formData.append('telefono', user.telefono);
    formData.append('direccion', user.direccion);
    formData.append('email', user.email);
    formData.append('pass', user.pass);
    formData.append('tipo', user.tipo)
    console.log(user)
    return this.http.post(URL + "trabajadores.php", formData, {headers:Headers});
  }
  putUsuarios(user){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('id', user.id);
    Params = Params.append('usuario', user.usuario);
    Params = Params.append('fecha_registro', user.fecha_registro);
    Params = Params.append('tipo_sangre', user.tipo_sangre);
    Params = Params.append('estado_civil', user.estado_civil);
    Params = Params.append('telefono', user.telefono);
    Params = Params.append('direccion', user.direccion);
    Params = Params.append('email', user.email);
    Params = Params.append('pass', user.pass);
    Params = Params.append('tipo', user.tipo);

    return this.http.put(URL + "trabajadores.php", null, {headers: Headers, params: Params});
  }

  deleteUsuarios(usuario){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    Params = Params.append('usuario',usuario.usuario);

    return this.http.delete(URL + "trabajadores.php",{headers: Headers, params: Params});
  }

  deleteVentas(id_venta){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    Params = Params.append('id_venta',id_venta.id_venta);

    return this.http.delete(URL + "ventas.php",{headers: Headers, params: Params});
  }

  deleteInventario(inventario){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    Params = Params.append('id_producto', inventario.id_producto);

    return this.http.delete(URL + "inventario.php",{headers: Headers, params: Params});
  }
  
  login(u, p){
    let Params = new HttpParams();
    Params = Params.append('usuario', u);
    Params = Params.append('pass', p);

    return this.http.get(URL + "login.php",{params:Params});

  }

  getInventario(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    return this.http.get(URL + "inventario.php", {headers:Headers});
  }

  getVentas(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    return this.http.get(URL + "ventas.php", {headers:Headers});
  }


  postInventario(producto){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('id_producto', producto.id_producto);
    formData.append('producto', producto.producto);
    formData.append('cantidad', producto.cantidad);
    formData.append('precio', producto.precio);

    return this.http.post(URL + "inventario.php", formData, {headers:Headers});
  }

  putInventario(producto){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('id_producto', producto.id_producto);
    Params = Params.append('cantidad', producto.cantidad);
    Params = Params.append('precio', producto.precio);
  
  

    return this.http.put(URL + "inventario.php", null, {headers: Headers, params: Params});
  }

}
