import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipMessage: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipElement: HTMLElement | null = null;
  private tooltipArrow: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }

  private showTooltip() {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipMessage)
    );

    this.tooltipArrow = this.renderer.createElement('span');

    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background-color', '#ffffff');
    this.renderer.setStyle(this.tooltipElement, 'color', '#000000');
    this.renderer.setStyle(this.tooltipElement, 'padding', '2px 8px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '9999px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '14px');
    this.renderer.setStyle(this.tooltipElement, 'font-family', 'monospace');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
    this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');
    this.renderer.setStyle(
      this.tooltipElement,
      'box-shadow',
      '0px 4px 8px rgba(0, 0, 0, 0.2)'
    );
    this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.2s');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');

    // Estilos del triángulo con transición
    this.renderer.setStyle(this.tooltipArrow, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipArrow, 'width', '0');
    this.renderer.setStyle(this.tooltipArrow, 'height', '0');
    this.renderer.setStyle(this.tooltipArrow, 'border-style', 'solid');
    this.renderer.setStyle(this.tooltipArrow, 'transition', 'opacity 0.2s');
    this.renderer.setStyle(this.tooltipArrow, 'opacity', '0'); // Inicia invisible

    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.renderer.appendChild(this.el.nativeElement, this.tooltipArrow);

    this.positionTooltip();

    setTimeout(() => {
      this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
      this.renderer.setStyle(this.tooltipArrow, 'opacity', '1'); // Mostrar con la misma opacidad
    }, 10);
  }

  private positionTooltip() {
    if (!this.tooltipElement || !this.tooltipArrow) return;

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();
    let top, left, arrowTop, arrowLeft;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostPos.top - tooltipPos.height - 8;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        this.setArrowStyles(this.tooltipArrow, 'bottom', '#ffffff');
        arrowTop = hostPos.top - 8;
        arrowLeft = hostPos.left + (hostPos.width - 10) / 2;
        break;
      case 'bottom':
        top = hostPos.bottom + 6;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        this.setArrowStyles(this.tooltipArrow, 'top', '#ffffff');
        arrowTop = hostPos.bottom;
        arrowLeft = hostPos.left + (hostPos.width - 10) / 2;
        break;
      case 'left':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.left - tooltipPos.width - 8;
        this.setArrowStyles(this.tooltipArrow, 'right', '#ffffff');
        arrowTop = hostPos.top + (hostPos.height - 10) / 2;
        arrowLeft = hostPos.left - 8;
        break;
      case 'right':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.right + 8;
        this.setArrowStyles(this.tooltipArrow, 'left', '#ffffff');
        arrowTop = hostPos.top + (hostPos.height - 10) / 2;
        arrowLeft = hostPos.right;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipArrow, 'top', `${arrowTop}px`);
    this.renderer.setStyle(this.tooltipArrow, 'left', `${arrowLeft}px`);
  }

  private setArrowStyles(
    arrow: HTMLElement,
    position: 'top' | 'bottom' | 'left' | 'right',
    color: string
  ) {
    const size = '6px';

    switch (position) {
      case 'top':
        this.renderer.setStyle(
          arrow,
          'border-width',
          `0 ${size} ${size} ${size}`
        );
        this.renderer.setStyle(
          arrow,
          'border-color',
          `transparent transparent ${color} transparent`
        );
        break;
      case 'bottom':
        this.renderer.setStyle(
          arrow,
          'border-width',
          `${size} ${size} 0 ${size}`
        );
        this.renderer.setStyle(
          arrow,
          'border-color',
          `${color} transparent transparent transparent`
        );
        break;
      case 'left':
        this.renderer.setStyle(
          arrow,
          'border-width',
          `${size} ${size} ${size} 0`
        );
        this.renderer.setStyle(
          arrow,
          'border-color',
          `transparent ${color} transparent transparent`
        );
        break;
      case 'right':
        this.renderer.setStyle(
          arrow,
          'border-width',
          `${size} 0 ${size} ${size}`
        );
        this.renderer.setStyle(
          arrow,
          'border-color',
          `transparent transparent transparent ${color}`
        );
        break;
    }
  }

  private removeTooltip() {
    if (this.tooltipElement && this.tooltipArrow) {
      this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
      this.renderer.setStyle(this.tooltipArrow, 'opacity', '0'); // También oculta el triángulo
      setTimeout(() => {
        if (this.tooltipElement && this.tooltipArrow) {
          this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
          this.renderer.removeChild(this.el.nativeElement, this.tooltipArrow);
          this.tooltipElement = null;
          this.tooltipArrow = null;
        }
      }, 200);
    }
  }
}
