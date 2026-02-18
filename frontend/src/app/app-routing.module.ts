import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'list-tests',
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
    path: 'list-tests',
    loadChildren: () => import('./test/list-tests/list-tests.module').then( m => m.ListTestsPageModule)
  },
  {
    path: 'add-test',
    loadChildren: () => import('./test/add-test/add-test.module').then( m => m.AddTestPageModule)
  },
  {
    path: 'list-preguntas',
    loadChildren: () => import('./pregunta/list-preguntas/list-preguntas.module').then( m => m.ListPreguntasPageModule)
  },
  {
    path: 'add-pregunta',
    loadChildren: () => import('./pregunta/add-pregunta/add-pregunta.module').then( m => m.AddPreguntaPageModule)
  },
  {
    path: 'list-resultados',
    loadChildren: () => import('./resultado/list-resultados/list-resultados.module').then( m => m.ListResultadosPageModule)
  },
  {
    path: 'realizar-test',
    loadChildren: () => import('./resultado/realizar-test/test.module').then( m => m.TestPageModule)
  },
  {
    path: '',
    redirectTo: 'list-tests',
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
