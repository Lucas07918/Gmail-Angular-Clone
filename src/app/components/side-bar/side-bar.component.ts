import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ComposeEmailComponent } from '../compose-email/compose-email.component';


@Component({
  selector: 'app-side-bar',
  imports: [
    RouterLink,
    CommonModule,
    ComposeEmailComponent,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  constructor() { }

  isComposing = false;

  openCompose() {
    this.isComposing = true;
    console.log('isComposing')
  }

}
