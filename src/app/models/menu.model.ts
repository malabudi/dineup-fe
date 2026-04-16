export interface MenuItemSalesDto {
  menuItemId: number;
  menuItemName: string;
  totalQuantitySold: number;
}

export interface RequestMenuItemDto {
  menuGroupId: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface ResponseMenuGroupDto {
  id: number;
  name: string;
  items: ResponseMenuItemDto[];
}

export interface ResponseMenuItemDto {
  id: number;
  menuGroupId: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}