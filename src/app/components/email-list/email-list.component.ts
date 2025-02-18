import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Emails } from '../../models/emails.interface';

import { EmailService } from '../../services/email.service';


@Component({
  selector: 'app-email-list',
  imports: [
    CommonModule,
  ],
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
  emails: Emails[] = [];
  emailId: number | null = null;

  emails$!: Observable<Emails[]>;

  constructor(
    private emailService: EmailService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getEmails();
    // this.emails$ = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     this.emailId = Number(params.get('id'));
    //     return this.emailService.getEmails();
    //   })
    // )
  }

  getEmails(): void {
    this.emailService.getEmails().subscribe(data => {
      this.emails = data.filter(email => email.deleted == false);
    })
  }

  openEmail(emailId: number): void {
    this.router.navigate(['/email', emailId]);
   }
}
