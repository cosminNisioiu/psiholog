import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent {
  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.appointmentForm = this.fb.group({
      nume: ['', Validators.required],
      prenume: ['', Validators.required],
      telefon: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      serviciu: ['', Validators.required],
      data: ['', Validators.required]
    });
  }

  submit() {
    if (this.appointmentForm.invalid) {
      return;
    }

    this.http.post('https://your-backend-api/send-email', this.appointmentForm.value)
      .subscribe({
        next: () => alert('Email trimis cu succes'),
        error: () => alert('Eroare la trimitere email')
      });
  }
}
