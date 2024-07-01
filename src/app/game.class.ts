import { EventEmitter } from '@angular/core';
import { Map } from '../shared/abstracts/map.class';

export class Game {
  private _timer!: any; // interval

  public running: boolean = false;
  public time: Time = new Time();
  public map?: Map;
  public guessed: string[] = [];

  // events
  public change = new EventEmitter();

  public guess(country: string): boolean {
    let guess = country.toLocaleLowerCase();
    if (this.guessed.includes(guess)) return false;

    let guessed = this.map!.guess(guess);
    if (guessed) this.guessed.push(guess);
    if (this.allGuessed()) this.stop();
    return guessed;
  }

  public start(): void {
    this.startTimer();
    this.running = true;
    this.change.emit();
  }

  public stop(): void {
    this.stopTimer();
    this.running = false;
    this.change.emit();
  }

  public allGuessed(): boolean {
    return this.map!.countries.length === this.guessed.length;
  }

  private startTimer(): void {
    this._timer = setInterval(() => {
      this.time.seconds++;
      if (this.time.seconds > 59) {
        this.time.minutes++;
        this.time.seconds = 0;
      }
      if (this.time.minutes > 60) {
        this.stop();
      }
      this.change.emit();
    }, 1000);
  }

  private stopTimer(): void {
    clearInterval(this._timer);
  }

  private clearTimer(): void {
    this.time = new Time();
  }
}

export class Time {
  public minutes: number = 0;
  public seconds: number = 0;
}
