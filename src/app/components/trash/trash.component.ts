import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Emails } from '../../models/emails.interface';

import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-trash',
  imports: [
    CommonModule,
  ],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css'
})
export class TrashComponent implements OnInit {
  constructor(
    private emailService: EmailService,
    private router: Router,
  ) { }

  trashEmails: Emails[] = [];

  ngOnInit(): void {
    this.getTrashEmails();
  }
  getTrashEmails() {
    this.emailService.getEmails().subscribe(emails => {
      this.trashEmails = emails.filter(email => email.deleted == true);
      console.log(this.trashEmails);
    })
  }

  openTrashEmail(emailId: number): void {
    this.router.navigate(['/trash', emailId]);
  }
}
