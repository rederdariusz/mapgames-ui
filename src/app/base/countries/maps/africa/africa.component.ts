import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  viewChild,
} from '@angular/core';
import { Map } from '../../../../../shared/abstracts/map.class';

@Component({
  selector: 'africa',
  standalone: true,
  templateUrl: './africa.component.html',
  styleUrl: './africa.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AfricaComponent extends Map implements OnInit {
  private _svg = viewChild.required<ElementRef>('svg');

  constructor() {
    super('Africa', []);
  }

  public ngOnInit(): void {
    this.toguess = [
      ...this._svg().nativeElement.getElementsByTagName('path'),
    ].map((p) => p.getAttribute('data-name'));
  }

  public override guess(country: string): boolean {
    let path = this._svg().nativeElement.querySelector(
      `[data-name="${country}"]`
    );
    if (!path) return false;

    path.style.fill = '#06c258';
    return true;
  }
}
