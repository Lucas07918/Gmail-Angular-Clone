import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Emails } from '../../models/emails.interface';

import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-compose-email',
  imports: [
    FormsModule,
  ],
  templateUrl: './compose-email.component.html',
  styleUrl: './compose-email.component.css'
})
export class ComposeEmailComponent {
  to = '';
  subject = '';
  body = '';

  @Output() closeCompose = new EventEmitter<void>();

  constructor(private emailService: EmailService) { }

  sendEmail() {
    const newEmail: Emails = {
      id: Date.now(),
      from: 'Me',
      to: this.to,
      subject: this.subject,
      body: this.body,
      date: new Date().toISOString(),
      read: false,
      sent: true,
      favorited: false,
      deleted: false
    };

    this.emailService.sendEmail(newEmail).subscribe(() => {
      this.closeCompose.emit(); // Fecha o modal
    });
  }

  close() {
    this.closeCompose.emit(); // Fecha o modal
  }

}
