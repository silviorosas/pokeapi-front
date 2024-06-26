import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data/${name}`);
  }
}
