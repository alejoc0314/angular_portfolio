import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FlowFieldComponent } from '../flow-field/flow-field.component';
import { IntroComponent } from '../../components/intro/intro.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-global-card',
  standalone: true,
  imports: [NavbarComponent, FlowFieldComponent, IntroComponent, FooterComponent],
  templateUrl: './global-card.component.html',
  styleUrl: './global-card.component.scss',
})
export class GlobalCardComponent {
  case: 'home' | 'skills' | 'projects' | 'contact' = 'home';
}
