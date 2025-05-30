import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { MarkdownComponent } from 'ngx-markdown';

import { ImageInfo } from '@interfaces/index';

@Component({
  selector: 'app-chat-message-editable-image',
  imports: [MarkdownComponent],
  templateUrl: './chat-message-editable-image.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageEditableImageComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: ImageInfo;

  @Output() selectedImage = new EventEmitter<string>();

  handleSelectedImage() {
    this.selectedImage.emit(this.imageInfo.url);
  }
}
