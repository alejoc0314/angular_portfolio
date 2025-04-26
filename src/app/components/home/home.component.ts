import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowFieldComponent } from '../../layout/flow-field/flow-field.component';
import { IntroComponent } from '../intro/intro.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { GlobalCardComponent } from '../../layout/global-card/global-card.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { SkillsComponent } from "../skills/skills.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    FlowFieldComponent,
    IntroComponent,
    NavbarComponent,
    GlobalCardComponent,
    HeaderComponent,
    SkillsComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  setLanguage(language: string) {
    console.log('Idioma seleccionado:', language);
    this.showDropdown = false;
  }
}
