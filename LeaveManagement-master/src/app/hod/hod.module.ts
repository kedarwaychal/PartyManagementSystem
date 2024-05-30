import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ViewLeaveComponent } from './view-leave/view-leave.component';
import { RouterModule, Routes } from '@angular/router';
import { HoddashboardComponent } from './hoddashboard/hoddashboard.component';
import { AddstaffComponent } from './addstaff/addstaff.component';
import { Authguard } from '../auth/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { CreatepartyComponent } from './createparty/createparty.component';

const hodroutes : Routes = [
//   {path:'',component:HoddashboardComponent,
//   children : [
//     {path: 'viewleave',component: ViewLeaveComponent},
//   ]}
{ path: '', component: HoddashboardComponent },
{ path: 'viewleave', component: ViewLeaveComponent,canActivate : [Authguard] }, 
]

@NgModule({
  declarations: [
    HoddashboardComponent,
    ViewLeaveComponent,
    AddstaffComponent,
    CreatepartyComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(hodroutes)
  ],
  exports : [RouterModule]

})
export class HodModule { }
