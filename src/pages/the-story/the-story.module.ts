import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TheStoryPage } from './the-story';

@NgModule({
  declarations: [
    TheStoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TheStoryPage),
  ],
})
export class TheStoryPageModule {}
