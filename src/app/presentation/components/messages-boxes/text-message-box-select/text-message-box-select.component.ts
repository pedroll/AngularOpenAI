import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Option {
  label: string;
  value: string;
}

export interface TextMessageSelectEvent {
  selectedOption: string;
  prompt?: string | null;
}

@Component({
  selector: 'app-text-message-box-select',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-select.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {
  @Input() public placeHolder = '';
  @Input({ required: true }) public options!: Option[];

  @Output() public messageBox = new EventEmitter<TextMessageSelectEvent>();
  formGroup: FormGroup;
  public file: File | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      prompt: new FormControl<string | undefined>(undefined, Validators.required),
      selectedOption: new FormControl<string | undefined>('', Validators.required),
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

    const { prompt, selectedOption } = this.formGroup.value;

    this.messageBox.emit({ prompt, selectedOption: selectedOption });
    this.formGroup.reset();
  }
}
