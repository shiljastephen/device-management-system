import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],   // ✅ IMPORTANT
  template: `<router-outlet></router-outlet>`  // ✅ IMPORTANT
})
export class App {}