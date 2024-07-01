import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { IGuessable } from '../shared/interfaces/guessable.interface';

export class Game {
  private _timer!: any; // interval

  public running: boolean = false;
  public time: Time = new Time();
  public map!: IGuessable;
  public change = new EventEmitter();

  public guess(country: string): boolean {
    return this.map.guess(country.toLocaleLowerCase());
  }

  public start(): void {
    this.startTimer();
    this.running = true;
    this.change.emit();
  }

  private stop(): void {
    this.stopTimer();
    this.running = false;
    this.change.emit();
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
    this.time = new Time();
  }
}

export class Time {
  public minutes: number = 0;
  public seconds: number = 0;
}
