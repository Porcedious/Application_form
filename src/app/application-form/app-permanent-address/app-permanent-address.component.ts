import { Component, Input,SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permanent-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-permanent-address.component.html'
})
export class AppPermanentAddressComponent {
  @Input() permanentGroup!: FormGroup;
  @Input() extracurricularGroup!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['permanentGroup']) {
      console.log('Permanent address updated:', this.permanentGroup.value);
    }
  }
}