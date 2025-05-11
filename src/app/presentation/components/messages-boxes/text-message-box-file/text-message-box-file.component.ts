import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export interface TextMessageEvent {
  file: File;
  prompt?: string | null;
}

@Component({
  selector: 'app-text-message-box-file',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
  @Input() public placeHolder = '';
  @Input() public disableCorrections = false;

  @Output() public messageBox = new EventEmitter<TextMessageEvent>();
  formGroup: FormGroup;
  public file: File | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      file: new FormControl<File | undefined>(undefined, Validators.required),
      prompt: new FormControl<string | undefined>(undefined),
    });
  }

  handleSelectedFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file);
    if (file) {
      this.formGroup.controls['file'].setValue(file);
    }
  }

  handleSubmit() {
    if (this.formGroup.invalid) return;

    const { prompt, file } = this.formGroup.value;

    this.messageBox.emit({ prompt, file: file! });
    this.formGroup.reset();
  }
}
