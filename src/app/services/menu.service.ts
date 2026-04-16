import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ResponseMenuGroupDto,
  ResponseMenuItemDto,
  RequestMenuItemDto,
  MenuItemSalesDto
} from '../models/menu.models';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private groupsUrl = `${environment.apiUrl}/menu-groups`;
  private itemsUrl  = `${environment.apiUrl}/menu-items`;

  constructor(private http: HttpClient) {}

  // ── Menu Groups ──────────────────────────────────────────
  getMenuGroups(): Observable<ResponseMenuGroupDto[]> {
    return this.http.get<ResponseMenuGroupDto[]>(this.groupsUrl);
  }

  getMenuGroupById(id: number): Observable<ResponseMenuGroupDto> {
    return this.http.get<ResponseMenuGroupDto>(`${this.groupsUrl}/${id}`);
  }

  createMenuGroup(name: string): Observable<ResponseMenuGroupDto> {
    return this.http.post<ResponseMenuGroupDto>(this.groupsUrl, { name });
  }

  updateMenuGroup(id: number, name: string): Observable<ResponseMenuGroupDto> {
    return this.http.patch<ResponseMenuGroupDto>(`${this.groupsUrl}/${id}`, { name });
  }

  deleteMenuGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.groupsUrl}/${id}`);
  }

  // ── Menu Items ───────────────────────────────────────────
  getMenuItems(): Observable<ResponseMenuItemDto[]> {
    return this.http.get<ResponseMenuItemDto[]>(this.itemsUrl);
  }

  getMenuItemById(id: number): Observable<ResponseMenuItemDto> {
    return this.http.get<ResponseMenuItemDto>(`${this.itemsUrl}/${id}`);
  }

  getBestSellingItems(): Observable<MenuItemSalesDto[]> {
    return this.http.get<MenuItemSalesDto[]>(`${this.itemsUrl}/best-selling`);
  }

  createMenuItem(dto: RequestMenuItemDto): Observable<ResponseMenuItemDto> {
    return this.http.post<ResponseMenuItemDto>(this.itemsUrl, dto);
  }

  updateMenuItem(id: number, dto: RequestMenuItemDto): Observable<ResponseMenuItemDto> {
    return this.http.put<ResponseMenuItemDto>(`${this.itemsUrl}/${id}`, dto);
  }

  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.itemsUrl}/${id}`);
  }
}