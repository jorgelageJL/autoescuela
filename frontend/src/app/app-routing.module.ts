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
    loadChildren: () => import('./users/profesor/list-profesors/list-profesors.module').then( m => m.ListProfesorPageModule)
  },
  {
    path: 'add-profesor',
    loadChildren: () => import('./users/profesor/add-profesor/add-profesor.module').then( m => m.AddProfesorPageModule)
  },
  {
    path: 'list-administradors',
    loadChildren: () => import('./users/administrador/list-administradors/list-administradors.module').then( m => m.ListAdministradorPageModule)
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
  {
    path: 'list-tests',
    loadChildren: () => import('./test/list-tests/list-tests.module').then( m => m.ListTestsPageModule)
  },
  {
    path: 'add-test',
    loadChildren: () => import('./test/add-test/add-test.module').then( m => m.AddTestPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
