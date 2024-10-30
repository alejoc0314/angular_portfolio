import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowFieldComponent } from '../../layout/flow-field/flow-field.component';
import { IntroComponent } from '../intro/intro.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { GlobalCardComponent } from '../../layout/global-card/global-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    FlowFieldComponent,
    IntroComponent,
    NavbarComponent,
    GlobalCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
