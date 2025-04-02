import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationPreviewComponent } from './application-preview/application-preview.component';

const routes: Routes = [
  { path: '', component: ApplicationFormComponent },
  { path: 'preview', component: ApplicationPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}