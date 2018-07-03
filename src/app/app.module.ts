import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {IonicStorageModule} from "@ionic/storage";
import {ProfilePage} from "../pages/profile/profile";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {StoriesPage} from "../pages/stories/stories";
import {NewStoryPage} from "../pages/new-story/new-story";
import {EditStoryPage} from "../pages/edit-story/edit-story";
import {StoryPage} from "../pages/story/story";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        RegisterPage,
        ProfilePage,
        EditProfilePage,
        StoriesPage,
        NewStoryPage,
        EditStoryPage,
        StoryPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        RegisterPage,
        ProfilePage,
        EditProfilePage,
        StoriesPage,
        NewStoryPage,
        EditStoryPage,
        StoryPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
