import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EuropeComponent } from './europe/europe.component';
import { IGuessable } from '../shared/interfaces/guessable.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterOutlet, EuropeComponent, ReactiveFormsModule, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private _country!: IGuessable;
  private _timer!: any;
  private _cdRef = inject(ChangeDetectorRef);

  public guesser = new FormControl('', { nonNullable: true });
  public time: { minutes: number; seconds: number } = {
    minutes: 0,
    seconds: 0,
  };

  public ngOnInit(): void {
    this._timer = setInterval(() => {
      this.time.seconds++;
      if (this.time.seconds > 59) {
        this.time.minutes++;
        this.time.seconds = 0;
      }
      this._cdRef.markForCheck();
    }, 1000);

    this.guesser.valueChanges.subscribe((guess) => {
      let guessed = this._country.guess(guess);
      if (guessed) this.guesser.setValue('');
    });
  }

  public onRouterOutletActivate(component: IGuessable) {
    this._country = component;
  }
}
