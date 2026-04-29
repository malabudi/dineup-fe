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

  private observer!: IntersectionObserver;
  private isScrollingProgrammatically = false;

  @ViewChildren('groupSection') groupSection!: QueryList<ElementRef>;

  constructor(
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuService.getMenuGroups().subscribe({
      next: (data) => {
        // Filter menu groups with no items
        this.menuGroups = data.filter(group => group.items.length > 0);
        
        if (this.menuGroups.length > 0) {
          this.activeGroupId = this.menuGroups[0].id; // Set first group as active by default
        }

        this.loading = false;

        // Wait for the DOM to render the sections before observing
        setTimeout(() => this.initScrollSpy(), 0);
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    })
  }

  private initScrollSpy(): void {
  this.observer = new IntersectionObserver(
    (entries) => {
      if (this.isScrollingProgrammatically) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-group-id'));
          this.activeGroupId = id;
        }
      });
    },
    {
      // Fires when section hits 20% into the viewport from the top
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }
  );

  this.groupSection.forEach((section, index) => {
    this.observer.observe(section.nativeElement);
  });
}

  scrollToGroup(groupId: number): void {
    this.activeGroupId = groupId;
    this.isScrollingProgrammatically = true;

    const sections = this.groupSection.toArray();
    const index = this.menuGroups.findIndex(group => group.id === groupId);

    if (sections[index]) {
      sections[index].nativeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }

    // Re-enable observer after scroll animation finishes
    setTimeout(() => {
      this.isScrollingProgrammatically = false;
    }, 800);
  }

  trackByGroupId(index: number, group: ResponseMenuGroupDto): number {
    return group.id;
  }

  trackByMenuItemId(index: number, item: any): number {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
