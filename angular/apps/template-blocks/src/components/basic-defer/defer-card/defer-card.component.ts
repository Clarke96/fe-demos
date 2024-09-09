import { CommonModule } from '@angular/common';
import { Component, OnInit, input, model } from '@angular/core';
import { Colour } from '../basic-defer.component';

@Component({
  selector: 'app-defer-card',
  standalone: true,
  imports: [CommonModule],
  template: `setter component for {{ initColour() }}`,
})
export class DeferCardComponent implements OnInit {
  initColour = input.required<Colour>();
  colourModel = model<Colour>();

  ngOnInit() {
    this.colourModel.set(this.initColour());
  }
}
