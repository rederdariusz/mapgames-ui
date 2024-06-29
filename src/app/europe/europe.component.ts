import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { IGuessable } from '../../shared/interfaces/guessable.interface';

@Component({
  selector: 'europe',
  standalone: true,
  templateUrl: './europe.component.html',
  styleUrl: './europe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EuropeComponent implements IGuessable {
  private _svg = viewChild.required<ElementRef>('svg');

  public guess(country: string): boolean {
    let path = this._svg().nativeElement.querySelector(
      `[name="${country.toLocaleLowerCase()}"]`
    );

    if (!path) return false;

    path.style.fill = '#06c258';
    return true;
  }
}
