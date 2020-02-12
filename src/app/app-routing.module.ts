import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'orders', component: OrdersComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
