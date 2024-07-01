import { IGuessable } from '../interfaces/guessable.interface';

export abstract class Map implements IGuessable {
  public name: string = '';
  public countries: string[] = [];

  constructor(name: string, countries: string[]) {
    this.name = name;
    this.countries = countries;
  }

  public guess(country: string): boolean {
    throw new Error('Method not implemented.');
  }
}
