import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Game } from '../../game.class';
import { EuropeComponent } from './maps/europe/europe.component';
import { Map } from '../../../shared/abstracts/map.class';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'countries',
  standalone: true,
  imports: [
    RouterOutlet,
    EuropeComponent,
    ReactiveFormsModule,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {
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
