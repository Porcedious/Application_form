import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-application-preview',
  imports: [CommonModule,FormsModule],
  templateUrl: './application-preview.component.html',
  styleUrls: ['./application-preview.component.css'],
})
export class ApplicationPreviewComponent implements OnInit, OnDestroy {
  applicationData: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('applicationData');
    if (data) {
      this.applicationData = JSON.parse(data);
    } else {
      this.router.navigate(['/']);
    }
  }

  saveData() {
    alert("Data successfully saved!");
    localStorage.removeItem('applicationForm');
    localStorage.removeItem('applicationData');
    this.applicationData = null;
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    console.log("Preview Component Destroyed");
  }

  getAddressString(address: any):string {
    return address ? `${address.address}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`: '';
  }
}