import { Routes } from '@angular/router';

import { EmailListComponent } from './components/email-list/email-list.component';
import { EmailDetailComponent } from './components/email-detail/email-detail.component';
import { StarredComponent } from './components/starred/starred.component';
import { TrashComponent } from './components/trash/trash.component';
import { SentEmailsComponent } from './components/sent-emails/sent-emails.component';

export const routes: Routes = [
  {
    title: 'Emails',
    path: '',
    component: EmailListComponent
  },
  {
    title: 'Email Detail',
    path: 'email/:id',
    component: EmailDetailComponent
  },
  {
    title: 'Favoritos',
    path: 'starred',
    component: StarredComponent
  },
  {
    title: 'Favorito',
    path: 'starred/:id',
    component: EmailDetailComponent
  },
  {
    title: 'Lixeira',
    path: 'trash',
    component: TrashComponent
  },
  {
    title: 'Lixo',
    path: 'trash/:id',
    component: EmailDetailComponent
  },
  { path: 'sent', component: SentEmailsComponent },
  { path: 'sent/:id', component: EmailDetailComponent }
];


