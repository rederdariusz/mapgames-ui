import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
