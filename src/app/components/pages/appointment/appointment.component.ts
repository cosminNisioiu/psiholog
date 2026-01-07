import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  now: Date = new Date();
  selectedDate: Date = this.now;

  constructor() { }

  ngOnInit(): void {
  }

}
