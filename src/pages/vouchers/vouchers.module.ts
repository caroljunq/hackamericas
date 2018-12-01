import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VouchersPage } from './vouchers';

@NgModule({
  declarations: [
    VouchersPage,
  ],
  imports: [
    IonicPageModule.forChild(VouchersPage),
  ],
})
export class VouchersPageModule {}
