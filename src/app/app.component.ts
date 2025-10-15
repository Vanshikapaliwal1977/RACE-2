import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TlfEditorComponent } from './components/tlf-editor/tlf-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TlfEditorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tlf-text-editor';
}
