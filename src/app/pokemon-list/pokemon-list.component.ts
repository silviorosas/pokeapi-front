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
  

  currentPage = 1;
  pageSize = 18; // Default page size
  totalPages=50;

//Variable para controlar si se muestra el mensaje de error
showErrorModal: boolean = false;

loading: boolean = true;


  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {   
    this.getPokemonPage(this.currentPage);  
  }

  errorMessage: string = '';
  
  getPokemonPage(page: number): void {
    this.pokemonService.getPokemonPage(page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.pokemonList = data;
          this.loading = false;        
          this.currentPage = page;
          this.showErrorModal = false;  
        },
        (error) => {
          console.error('Error al obtener los Pokémon:', error); 
                   
        
        }
      );
  }
  

  nextPage(): void {
  console.log('Siguiente página');
  const nextOffset = this.currentPage + 1;
  console.log("currentPage: ",this.currentPage, " pageSize: ", this.pageSize)
  console.log('Índice de la siguiente página:', nextOffset);
  this.getPokemonPage(nextOffset);
}

previousPage(): void {
  console.log('Página anterior');
  const previousOffset = this.currentPage - 1;
  console.log('Índice de la página anterior:', previousOffset);
  this.getPokemonPage(previousOffset);
}




  getPokemonDetails(name: string): void {
    this.pokemonService.getPokemonDetails(name).subscribe(
      (data: any) => {
        this.selectedPokemon = data;
        this.loading = false;
        console.log("pokemonDetail:",data)
        this.showErrorModal = false;
      },
      (error) => {
        console.error('Error al obtener los detalles del Pokémon:', error);
        this.loading = false;
        this.errorMessage = error.error; 
        this.showErrorModal = true;          
      }
    );
  }
  
  openModal(name: string): void {
    this.selectedPokemon = null;
    this.loading = true; // Establecer loading como verdadero antes de la carga
    this.showErrorModal = false;
  
    // Llamar a getPokemonDetails dentro de un setTimeout para simular la carga
    setTimeout(() => {
      this.getPokemonDetails(name);
    }, 1000); // Simulación de carga durante 1 segundo
  }
  

  closeModal() {
    this.selectedPokemon = null;
    
  }



}
