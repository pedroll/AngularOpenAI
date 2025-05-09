import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent, UserMessageComponent } from '@components/index';

@Component({
  selector: 'app-orthography-page',
  imports: [ChatMessageComponent, UserMessageComponent],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {}
