import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YsTabsPage } from './ys-tabs';

@NgModule({
  declarations: [
    YsTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(YsTabsPage),
  ],
})
export class YsTabsPageModule {}
