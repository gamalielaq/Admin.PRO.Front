import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../back/services/settings.service';
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']
})
export class PagesComponent implements OnInit {

  constructor(
    private _settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
