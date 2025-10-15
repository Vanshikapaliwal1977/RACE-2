import { Routes } from '@angular/router';
import { TlfEditorComponent } from './components/tlf-editor/tlf-editor.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tlf-text-editor', pathMatch: 'full' },
  { path: 'tlf-text-editor', component: TlfEditorComponent },
  { path: '**', redirectTo: '/tlf-text-editor' } // Wildcard route to handle invalid URLs
];
