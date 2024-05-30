import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyServiceService {

  private baseUrl = 'http://your-api-url.com/parties';

  constructor(private http: HttpClient) {}

  getParties(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateParty(party: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${party.id}`, party);
  }
}
