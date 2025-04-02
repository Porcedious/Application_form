import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-contact-info.component.html',
})
export class AppContactInfoComponent {
  @Input() group!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['group']) {
      console.log('Contact info changed:', this.group.value);
    }
  }
}