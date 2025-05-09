import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-item',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="path"
      routerLinkActive="bg-gray-800"
      class="flex items-center justify-center px-4 py-2 rounded-md hover:bg-gray-800 p-2 transition-colors">
      <i class="{{ icon }} text-2xl mr-4 text-indigo-400"></i>
      <div class="flex flex-col grow">
        <span class="text-white text-lg font-semibold">{{ title }}</span>
        <span class="text-gray-400 text-sm">{{ description }}</span>
      </div>
    </a>
  `,
  styleUrl: './sidebar-menu-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) path!: string;
}
