import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Emails } from '../../models/emails.interface';

@Component({
  selector: 'app-navbar',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  searchTerm = '';
  filteredEmails: Emails[] = [];
  showResults = false;
  private searchSubject = new BehaviorSubject<string>('');

  constructor(private emailService: EmailService, private router: Router) { }

  ngOnInit() {
    // Atualiza os resultados de pesquisa sempre que o usuário digita
    this.searchSubject.pipe(
      debounceTime(300), // Aguarda 300ms após a última digitação para evitar chamadas desnecessárias
      distinctUntilChanged(), // Evita buscas repetidas para o mesmo termo
      switchMap(term => this.emailService.searchEmails(term)) // Busca os emails filtrados
    ).subscribe(results => this.filteredEmails = results);
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }

  openEmail(email: Emails) {
    this.showResults = false;
    this.searchTerm = ''; // Limpa a pesquisa
    console.log(email.id);
    this.router.navigate(['/email', email.id]); // Navega para o email selecionado
  }

  hideResults() {
    setTimeout(() => this.showResults = false, 0); // Esconde os resultados depois de um pequeno delay
  }
}
