import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts'

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.less']
})
export class DonaComponent   {
  @Input() title = "Sin titulo";
  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];

  public doughnutChartType: ChartType = 'doughnut';
  public colors:Color[] = [
    { backgroundColor: ['#398bf7', '#ef5350', '#ffb414'] }
  ]
}
