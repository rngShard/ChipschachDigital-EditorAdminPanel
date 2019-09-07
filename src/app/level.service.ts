import { Injectable } from '@angular/core';
import { Level } from './admin/level';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  LEVELS_ENDPOINT: string = '/api/levels';

  constructor(private http: HttpClient) {}

  getLevels(): Observable<any> {
    return this.http.get(this.LEVELS_ENDPOINT);
  }

  updateLevel(id: string, query: string): Observable<any> {
    return this.http.get(`${this.LEVELS_ENDPOINT}/${id}/${query}`);
  }
}
