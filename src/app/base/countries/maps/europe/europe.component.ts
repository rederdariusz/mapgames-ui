import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  viewChild,
} from '@angular/core';
import { Map } from '../../../../../shared/abstracts/map.class';

@Component({
  selector: 'europe',
  standalone: true,
  templateUrl: './europe.component.html',
  styleUrl: './europe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EuropeComponent extends Map implements OnInit {
  private _svg = viewChild.required<ElementRef>('svg');

  constructor() {
    super('Countries of Europe', []);
  }

  public ngOnInit(): void {
    this.toguess = [
      ...this._svg().nativeElement.getElementsByTagName('path'),
    ].map((p) => p.getAttribute('name'));
  }

  public override guess(country: string): boolean {
    let path = this._svg().nativeElement.querySelector(`[name="${country}"]`);
    if (!path) return false;

    path.style.fill = '#06c258';
    return true;
  }
}
