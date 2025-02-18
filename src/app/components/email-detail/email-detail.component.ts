import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon'

import { Emails } from '../../models/emails.interface';

import { EmailService } from '../../services/email.service';


@Component({
  selector: 'app-email-detail',
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './email-detail.component.html',
  styleUrl: './email-detail.component.css'
})
export class EmailDetailComponent implements OnInit {
  emails: Emails[] = [];
  email: Emails = {
    id: 0,
    from: '',
    to: '',
    subject: '',
    body: '',
    date: '',
    read: false,
    sent: false,
    favorited: false,
    deleted: false
  };
  currentIndex: number = -1;
  routeType!: string;
  fontName = this.email.favorited ? 'star' : 'star_border'

  constructor(
    private emailService: EmailService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeType = this.route.snapshot.url[0].path;
    this.route.paramMap.pipe(
    switchMap(params => {
      const emailId = Number(params.get('id'));
      return this.emailService.getEmails().pipe(
        map(emails => {
          if (this.routeType == 'email') {
            this.emails = emails.filter(email => email.deleted == false);
          }
          else if (this.routeType == 'sent') {
            this.emails = emails.filter(email => email.sent == true);
          }
          else if (this.routeType == 'starred') {
            this.emails = emails.filter(email => email.favorited == true);
          }
          else if (this.routeType == 'trash') {
            this.emails = emails.filter(email => email.deleted == true);
          }
          this.currentIndex = this.emails.findIndex(email => email.id == emailId);
          console.log("currentIndex:", this.currentIndex);
          return this.emails[this.currentIndex];
        })
      );
    })
  ).subscribe(email => {
    this.email = email;
    console.log(this.email);
  });

  }

  goBack() {
    this.router.navigate(['/']);
  }
  toggleFavorite(id: number) {
    if (this.email) {
      this.email.favorited = !this.email.favorited;
      this.emailService.updateEmail(id, this.email).subscribe(
        error => {
          console.error('Erro ao favoritar o email:', error)
        }
      );
    }
  }

  deleteEmail(id: number) {
    if (this.email) {
      this.email.deleted = true;
      console.log(this.email)
      this.emailService.updateEmail(id, this.email).subscribe(() => {
        const nextId = this.emails[this.currentIndex + 1].id;
        this.router.navigate(['/email', nextId]);
      },
        error => {
          console.error('Erro ao deltear o email:', error)
        }
      );
    }
  }

  previousEmail() {
    if (this.currentIndex > 0) {
      const previousId = this.emails[this.currentIndex - 1].id;
      this.router.navigate(['/email', previousId]);
    }
  }

  nextEmail() {
    if (this.currentIndex < this.emails.length - 1) {
      const nextId = this.emails[this.currentIndex + 1].id;
      this.router.navigate(['/email', nextId]);
    }
  }
}
