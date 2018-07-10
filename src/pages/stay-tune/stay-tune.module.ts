import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StayTunePage } from './stay-tune';

@NgModule({
  declarations: [
    StayTunePage,
  ],
  imports: [
    IonicPageModule.forChild(StayTunePage),
  ],
})
export class StayTunePageModule {}
