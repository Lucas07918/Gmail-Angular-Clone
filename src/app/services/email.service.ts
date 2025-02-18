import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Emails } from '../models/emails.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:3000/emails';
  private searchTerm = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  getEmails(): Observable<Emails[]> {
    return this.http.get<Emails[]>(this.apiUrl);
  }

  getEmail(id: number): Observable<Emails> {
    return this.http.get<Emails>(`${this.apiUrl}/${id}`);
  }

  updateEmail(id: number, email: Emails): Observable<Emails> {
    return this.http.put<Emails>(`${this.apiUrl}/${id}`, email);
  }

  sendEmail(email: Emails): Observable<Emails> {
    return this.http.post<Emails>(this.apiUrl, email);
  }

  searchEmails(term: string): Observable<Emails[]> {
    this.searchTerm.next(term);
    if (!term.trim()) return this.getEmails(); // Retorna todos os emails se a pesquisa estiver vazia

    return this.http.get<Emails[]>(this.apiUrl).pipe(
      map(emails => emails.filter(email =>
        email.subject.toLowerCase().includes(term.toLowerCase()) ||
        email.body.toLowerCase().includes(term.toLowerCase())
      ))
    );
  }
}
