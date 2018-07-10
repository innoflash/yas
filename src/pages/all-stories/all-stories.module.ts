import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllStoriesPage } from './all-stories';

@NgModule({
  declarations: [
    AllStoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllStoriesPage),
  ],
})
export class AllStoriesPageModule {}
