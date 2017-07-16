import { Component, OnInit, Output, EventEmitter }    from '@angular/core';

import { Preference, Day }           from '../../models/preference'

import { PreferenceService, days, times }           from '../../services/preference.service'

const timeToHour = {
  morning: "8-12",
  noon: "12-3",
  afternoon: "3-6",
  evening: "6-9"
}
@Component({
  selector: 'app-preference-selector',
  templateUrl: './preference-selector.component.html',
  styleUrls: ['./preference-selector.component.css']
})
export class PreferenceSelectorComponent implements OnInit {
  @Output() markDirty = new EventEmitter<any>()
  days = days;
  times = times;
  preference : Preference = new Preference();
  timeToHour = timeToHour;

  constructor(
    public preferenceService : PreferenceService,
   ) { }

  ngOnInit() {
      this.preference = this.preferenceService.loadPreferences();
  }

  flip(day : string, time : string) : void {
      this.preferenceService.updateDay(this.preference, day, time);
      this.preferenceService.storePreferences(this.preference);
      this.markDirty.emit();
  }

  excludeRow(time: string) : void {
    this.preferenceService.excludeTime(this.preference, time);
    this.preferenceService.storePreferences(this.preference);
    this.markDirty.emit();
  }

  excludeCol(day: string) : void {
    this.preferenceService.excludeDay(this.preference, day);
    this.preferenceService.storePreferences(this.preference);
    this.markDirty.emit();
  }
}
