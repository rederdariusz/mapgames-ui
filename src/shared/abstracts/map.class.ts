import { IGuessable } from '../interfaces/guessable.interface';

export abstract class Map implements IGuessable {
  public name: string = '';
  public toguess: string[] = [];

  constructor(name: string, toguess: string[]) {
    this.name = name;
    this.toguess = toguess;
  }

  public guess(country: string): boolean {
    throw new Error('Method not implemented.');
  }
}
