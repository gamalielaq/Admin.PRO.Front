import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/back/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})

export class SettingsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme')
 

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }
  
  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
  }

}
