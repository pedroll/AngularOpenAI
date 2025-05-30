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

  handleSelectedImage() {
    this.selectedImage.emit(this.imageInfo.url);
  }
}
