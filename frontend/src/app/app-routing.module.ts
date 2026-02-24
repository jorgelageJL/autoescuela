import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'add-alumno',
    loadChildren: () => import('./users/alumno/add-alumno/add-alumno.module').then( m => m.AddAlumnoPageModule)
  },
  {
    path: 'add-profesor',
    loadChildren: () => import('./users/profesor/add-profesor/add-profesor.module').then( m => m.AddProfesorPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthService]
  },
  {
    path: 'list-alumnos',
    loadChildren: () => import('./users/alumno/list-alumnos/list-alumnos.module').then( m => m.ListAlumnosPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'list-profesors',
    loadChildren: () => import('./users/profesor/list-profesors/list-profesors.module').then( m => m.ListProfesorPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'list-administradors',
    loadChildren: () => import('./users/administrador/list-administradors/list-administradors.module').then( m => m.ListAdministradorPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'add-administrador',
    loadChildren: () => import('./users/administrador/add-administrador/add-administrador.module').then( m => m.AddAdministradorPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'list-tests',
    loadChildren: () => import('./test/list-tests/list-tests.module').then( m => m.ListTestsPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'add-test',
    loadChildren: () => import('./test/add-test/add-test.module').then( m => m.AddTestPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'list-preguntas',
    loadChildren: () => import('./pregunta/list-preguntas/list-preguntas.module').then( m => m.ListPreguntasPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'add-pregunta',
    loadChildren: () => import('./pregunta/add-pregunta/add-pregunta.module').then( m => m.AddPreguntaPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'list-resultados',
    loadChildren: () => import('./resultado/list-resultados/list-resultados.module').then( m => m.ListResultadosPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'realizar-test',
    loadChildren: () => import('./resultado/realizar-test/test.module').then( m => m.TestPageModule)
  },
  //---------------------------------------------------------------------------------------
  {
    path: 'admin-users',
    loadChildren: () => import('./admin-users/admin-users.module').then( m => m.AdminUsersPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'admin-tests',
    loadChildren: () => import('./admin-tests/admin-tests.module').then( m => m.AdminTestsPageModule),
    canActivate: [AuthService]
  },
  {
    path: '',
    redirectTo: 'login',
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
