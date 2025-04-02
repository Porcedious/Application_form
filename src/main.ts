import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ApplicationFormComponent } from './app/application-form/application-form.component';
import { ApplicationPreviewComponent } from './app/application-preview/application-preview.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  { path: '', component: ApplicationFormComponent },
  { path: 'preview', component: ApplicationPreviewComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));