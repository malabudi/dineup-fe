import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ResponseMenuGroupDto } from '../../models/menu.models';
import { MenuItemCardComponent } from '../../components/ui/menu-item-card/menu-item-card.component';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuItemCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  menuGroups: ResponseMenuGroupDto[] = [];
  loading = true;
  error = false;
  activeGroupId: number | null = null;

  @ViewChildren('groupsSection') groupsSections!: QueryList<ElementRef>;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenuGroups().subscribe({
      next: (data) => {
        // Filter menu groups with no items
        this.menuGroups = data.filter(group => group.items.length > 0);
        
        if (this.menuGroups.length > 0) {
          this.activeGroupId = this.menuGroups[0].id; // Set first group as active by default
        }

        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    })
  }

  scrollToGroup(groupId: number): void {
    this.activeGroupId = groupId;

    const sections = this.groupsSections.toArray();
    const index = this.menuGroups.findIndex(group => group.id === groupId);

    if (sections[index]) {
      sections[index].nativeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  trackByGroupId(index: number, group: ResponseMenuGroupDto): number {
    return group.id;
  }

  trackByMenuItemId(index: number, item: any): number {
    return item.id;
  }
}
