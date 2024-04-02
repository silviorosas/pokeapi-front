import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi-7tdz.onrender.com/api/pokemon';

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data/${name}`);
  }


  getPokemonPage(page: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url);
  }
}
