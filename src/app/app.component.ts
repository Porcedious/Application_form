import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  providers:[CommonModule], // Don't import unused components
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }