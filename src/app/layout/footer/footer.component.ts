import { Component } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TooltipDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  sendEmail() {
    console.log('sending Email');
  }
}
