import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
    },
    {
      start: addDays(new Date(), 1),
      title: 'Another event',
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
    },
  ];

  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }
}
