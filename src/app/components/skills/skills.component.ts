import { Component } from '@angular/core';
import { GlobalCardComponent } from "../../layout/global-card/global-card.component";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [GlobalCardComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

}
