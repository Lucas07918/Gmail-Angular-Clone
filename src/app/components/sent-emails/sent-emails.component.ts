import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Emails } from './../../models/emails.interface';

import { EmailService } from '../../services/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sent-emails',
  imports: [
    CommonModule,
  ],
  templateUrl: './sent-emails.component.html',
  styleUrl: './sent-emails.component.css'
})
export class SentEmailsComponent implements OnInit {
  sentEmails: Emails[] = [];

  constructor(
    private emailsService: EmailService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.getSentEmails();
  }

  getSentEmails() {
    this.emailsService.getEmails().subscribe(emails => {
      this.sentEmails = emails.filter(email => email.sent == true);
    })
  }

  openSentEmail(emailId: number): void {
    this.router.navigate(['/sent', emailId]);
  }
}
