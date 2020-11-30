import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ngx-ckeditor';

import { AppComponent } from './app.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SeguridadGuard } from './seguridad.guard';
import { DatosService } from './datos.service';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PaginasComponent } from './paginas/paginas.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { VentasComponent } from './ventas/ventas.component';
import { InventarioComponent } from './inventario/inventario.component';

const rutas: Route[] = [
  {path:'', component: ContenidoComponent},
  {path:'inicio', component: InicioComponent, canActivate: [SeguridadGuard]},
  {path:'registrar', component: RegistrarComponent, canActivate: [SeguridadGuard]},
  {path:'empleados', component: EmpleadosComponent, canActivate: [SeguridadGuard]},
  {path:'ventas', component: VentasComponent, canActivate: [SeguridadGuard]},
  {path:'inventario', component: InventarioComponent, canActivate: [SeguridadGuard]},
  {path:'*', component: ContenidoComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContenidoComponent,

    FooterComponent,
    HeaderComponent,
    InicioComponent,
    UsuariosComponent,
    PaginasComponent,
    RegistrarComponent,
    EmpleadosComponent,
    VentasComponent,
    InventarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CKEditorModule
  ],
  providers: [DatosService, SeguridadGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
