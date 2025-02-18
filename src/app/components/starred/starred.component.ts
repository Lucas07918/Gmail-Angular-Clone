import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Emails } from '../../models/emails.interface';

import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-starred',
  imports: [
    CommonModule,
  ],
  templateUrl: './starred.component.html',
  styleUrl: './starred.component.css'
})
export class StarredComponent implements OnInit {
  starredEmails: Emails[] = [];

  constructor(
    private emailService: EmailService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getStarredEmails();
  }

  getStarredEmails(): void {
    this.emailService.getEmails().subscribe(emails => {
      this.starredEmails = emails.filter(email => email.favorited);
    });
  }

  openStarredEmail(emailId: number): void {
    this.router.navigate(['/starred', emailId]);
  }
}
