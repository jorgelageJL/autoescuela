import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module')
      .then(m => m.LoginPageModule)
  },
  {
    path: 'tests',
    loadChildren: () => import('./tests/tests.module')
      .then(m => m.TestsPageModule)
  },
  {
  path: 'home',
  loadChildren: () => import('./home/home.module')
    .then(m => m.HomePageModule)
  },
  {
    path: 'hacer-test/:id',
    loadChildren: () => import('./hacer-test/hacer-test.module')
      .then(m => m.HacerTestPageModule)
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./admin-users/admin-users.module')
      .then(m => m.AdminUsersPageModule)
  },
  {
    path: 'admin-tests',
    loadChildren: () => import('./admin-tests/admin-tests.module')
      .then(m => m.AdminTestsPageModule)
  },
  {
    path: 'results',
    loadChildren: () => import('./pages/results/results.module')
      .then(m => m.ResultsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
