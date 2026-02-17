import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tests',
    loadChildren: () => import('./tests/tests.module').then( m => m.TestsPageModule)
  },
  {
    path: 'hacer-test/:id',
    loadChildren: () => import('./hacer-test/hacer-test.module').then( m => m.HacerTestPageModule)
  },  {
    path: 'admin-users',
    loadChildren: () => import('./admin-users/admin-users.module').then( m => m.AdminUsersPageModule)
  },
  {
    path: 'admin-tests',
    loadChildren: () => import('./admin-tests/admin-tests.module').then( m => m.AdminTestsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
