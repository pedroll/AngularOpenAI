import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';

import { MarkdownComponent } from 'ngx-markdown';

import { ImageGeneratedInfo } from '@interfaces/index';

@Component({
  selector: 'app-chat-message-editable-image',
  imports: [MarkdownComponent],
  templateUrl: './chat-message-editable-image.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageEditableImageComponent implements AfterViewInit {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: ImageGeneratedInfo;

  @Output() selectedImage = new EventEmitter<string>();

  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  // eslint-disable-next-line unicorn/no-useless-undefined
  public originalImage = signal<HTMLImageElement | undefined>(undefined);
  public isDragging = signal(false);
  public coords = signal({ x: 0, y: 0 });

  ngAfterViewInit(): void {
    // after canvas creted
    if (!this.canvas.nativeElement) return;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = this.imageInfo.url;
    image.crossOrigin = 'Anonymous';

    this.originalImage.set(image);

    image.addEventListener('load', () => {
      context?.drawImage(image, 0, 0, canvas.width, canvas.height);
    });
  }

  onMouseDown(event: MouseEvent) {
    if (!this.canvas.nativeElement) return;

    this.isDragging.set(true);
    const startX = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
    const startY = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top;

    this.coords.set({ x: startX, y: startY });
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging()) return;
    if (!this.canvas.nativeElement) return;

    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    const currentX = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
    const currentY = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top;

    //calcula width and height
    const width = currentX - this.coords().x;
    const height = currentY - this.coords().y;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear the canvas
    context.clearRect(this.coords().x, this.coords().y, width, height);
  }

  onMouseUp() {
    this.isDragging.set(false);
    if (!this.canvas.nativeElement) return;
    const canvas = this.canvas.nativeElement;
    const url = canvas.toDataURL('image/png'); // b64
    this.selectedImage.emit(url);
  }

  handleSelectedImage() {
    this.selectedImage.emit(this.imageInfo.url);
  }
}
