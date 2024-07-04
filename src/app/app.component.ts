import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EuropeComponent } from './europe/europe.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Game } from './game.class';
import { Map } from '../shared/abstracts/map.class';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'root',
  standalone: true,
  imports: [
    RouterOutlet,
    EuropeComponent,
    ReactiveFormsModule,
    DatePipe,
    TitleCasePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private _cdRef = inject(ChangeDetectorRef);
  private _title = inject(Title);

  public game = new Game();
  public guesser = new FormControl('', { nonNullable: true });

  public get guessed(): string[] {
    return this.game.guessed.slice().reverse();
  }

  public ngOnInit(): void {
    this.game.start();

    this.game.change.subscribe(() => {
      this._cdRef.markForCheck();
    });

    this.guesser.valueChanges.subscribe((guess) => {
      let guessed = this.game.guess(guess);
      if (guessed) this.guesser.setValue('');
    });
  }

  public onRouterOutletActivate(component: Map) {
    this.game.map = component;
    this._title.setTitle('MapGames | ' + this.game.map.name);
  }
}
