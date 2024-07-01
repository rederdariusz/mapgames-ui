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
import { Game } from './game.class';

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
  private _cdRef = inject(ChangeDetectorRef);

  public game = new Game();
  public guesser = new FormControl('', { nonNullable: true });

  public ngOnInit(): void {
    this.game.start();

    this.game.change.subscribe(() => {
      this._cdRef.markForCheck();
    })

    this.guesser.valueChanges.subscribe((guess) => {
      let guessed = this.game.guess(guess);
      if (guessed) this.guesser.setValue('');
    });
  }

  public onRouterOutletActivate(component: IGuessable) {
    this.game.map = component;
  }
}
