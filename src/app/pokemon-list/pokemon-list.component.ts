import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonList: any[] = [];
  selectedPokemon: any;
  pokemonDetails: any;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getAllPokemons();
  
  }

  getAllPokemons(): void {
    this.pokemonService.getAllPokemon()
      .subscribe(
        data => {
          this.pokemonList = data;
          console.log("getallPokemons:",data)
        },
        error => {
          console.log(error);
        }
      );
  }


  getPokemonDetails(name: string): void {
    this.pokemonService.getPokemonDetails(name).subscribe(
      (data: any) => {
        this.selectedPokemon = data;
      },
      (error) => {
        console.error('Error al obtener los detalles del Pokémon:', error);
      }
    );
  }
  
  openModal(name: string): void {
    this.getPokemonDetails(name);
  }

  closeModal() {
    this.selectedPokemon = null;
  }







}
