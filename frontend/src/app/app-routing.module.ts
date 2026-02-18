import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'list-alumnos',
    loadChildren: () => import('./users/alumno/list-alumnos/list-alumnos.module').then( m => m.ListAlumnosPageModule)
  },
  {
    path: 'add-alumno',
    loadChildren: () => import('./users/alumno/add-alumno/add-alumno.module').then( m => m.AddAlumnoPageModule)
  },
  {
    path: 'list-profesors',
    loadChildren: () => import('./users/profesor/list-profesor/list-profesor.module').then( m => m.ListProfesorPageModule)
  },
  {
    path: 'add-profesor',
    loadChildren: () => import('./users/profesor/add-profesor/add-profesor.module').then( m => m.AddProfesorPageModule)
  },
  {
    path: 'list-administradors',
    loadChildren: () => import('./users/administrador/list-administrador/list-administrador.module').then( m => m.ListAdministradorPageModule)
  },
  {
    path: 'add-administrador',
    loadChildren: () => import('./users/administrador/add-administrador/add-administrador.module').then( m => m.AddAdministradorPageModule)
  },
  {
    path: '',
    redirectTo: 'list-alumnos',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
