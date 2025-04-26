import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createNoise2D } from 'simplex-noise';

@Component({
  standalone: true,
  selector: 'app-flow-field',
  template: '<canvas #canvas></canvas>',
  styleUrls: ['./flow-field.component.scss'],
})
export class FlowFieldComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private points: { x: number; y: number }[] = [];
  private originalPositions: { x: number; y: number }[] = [];
  private density: number = 70;
  private noise = createNoise2D();
  private lastFrameTime: number = 0;
  private fpsInterval: number = 1000 / 15;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initCanvas();
      this.createPoints();
      requestAnimationFrame((timestamp) => this.animate(timestamp));
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    const scale = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    this.ctx.scale(scale, scale);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private createPoints(): void {
    const spacing =
      Math.min(window.innerWidth, window.innerHeight) / this.density;
    for (let x = 0; x <= window.innerWidth; x += spacing) {
      for (let y = 0; y <= window.innerHeight; y += spacing) {
        const point = { x: x, y: y };
        this.points.push(point);
        this.originalPositions.push({ ...point });
      }
    }
  }

  private animate(timestamp: number): void {
    if (timestamp - this.lastFrameTime < this.fpsInterval) {
      requestAnimationFrame((timestamp) => this.animate(timestamp));
      return;
    }
    this.lastFrameTime = timestamp;

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    const timeOffset = timestamp * 0.00019;

    for (let i = 0; i < this.points.length; i++) {
      const noiseX = this.noise(
        this.originalPositions[i].x * 0.008,
        this.originalPositions[i].y * 0.008 + timeOffset
      );
      const noiseY = this.noise(
        this.originalPositions[i].y * 0.008,
        this.originalPositions[i].x * 0.008 + timeOffset
      );

      this.points[i].x = this.originalPositions[i].x + noiseX * 20;
      this.points[i].y = this.originalPositions[i].y + noiseY * 20;

      const brightness = this.map(noiseX + noiseY, -1, 1, 150, 255);
      this.ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      this.ctx.fillRect(this.points[i].x, this.points[i].y, 0.5, 0.5);
    }

    requestAnimationFrame((timestamp) => this.animate(timestamp));
  }

  private map(
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ): number {
    return start2 + ((stop2 - start2) * (value - start1)) / (stop1 - start1);
  }

  private resizeTimeout: any;

  @HostListener('window:resize')
  onResize(): void {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.initCanvas();
      this.points = [];
      this.originalPositions = [];
      this.createPoints();
    }, 100);
  }
}
