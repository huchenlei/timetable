import { Component, OnInit }    from '@angular/core';

import { Preference, Day }           from '../../models/preference'

import { PreferenceService, days, times }           from '../../services/preference.service'

@Component({
  selector: 'app-preference-selector',
  templateUrl: './preference-selector.component.html',
  styleUrls: ['./preference-selector.component.css']
})
export class PreferenceSelectorComponent implements OnInit {
  days = days;
  times = times;
  preference : Preference = new Preference();

  constructor(
    private preferenceService : PreferenceService,
   ) { }

  ngOnInit() {
      this.preferenceService.loadPreferences;
  }

  flip(day : string, time : string) : void {
      this.preferenceService.updateDay(this.preference, day, time)
  }
}
