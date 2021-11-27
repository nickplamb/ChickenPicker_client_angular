import { Injectable } from '@angular/core';

// new type for class descriptions object
// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
type tClassDescription = {
  [key: string]: string
}

@Injectable({
  providedIn: 'root'
})


export class BreedDescriptionService {

  private classDescriptions: tClassDescription = {
    "American": "The American Class contains thirteen breeds which originated in Canada or the United States. All are heavy breeds, and most lay brown eggs; most are cold-hardy",
    "Asiatic": "These three breeds originate in China; they are large, feather legged, and lay brown eggs.",
    "Continental": "This group consists of eleven breeds from Belgium, France, Germany, and the Netherlands. They are mostly sprightly birds, the Faverolles being an exception.",
    "All Other Standard Breeds": "Other breeds are grouped in this class, which has three subclasses: Game, Oriental, and Miscellaneous. The Game subclass includes the non-oriental game birds, the Oriental subclass includes mainly birds from Asia; the Cubalaya, however, is from Cuba. The Miscellaneous subclass holds the remaining breeds.",
    "Mediterranean": "These breeds originating in Italy and Spain have white earlobes and tend to be productive layers of white eggs. In general they are flighty, and exceptional free-range birds, with both evasion and foraging skills.",
    "English": "This class consists of five breeds from the United Kingdom and one from Australia.",
    "Not Listed": "There are many breeds not listed in the American Poultry Association's Standards of Perfection."
  };

  constructor() { }

  // converts the purposes string to a array and returns "Dual-purpose" if meat and eggs are in the array
  // otherwise it returns the array of original purposes.
  public convertPurpose(purposes: string): string[]{
    const purposeArray: string[] = purposes.split(', ');
    const isDualPurpose =  (purposeArray: string[]) => {
      return (purposeArray.indexOf('meat') > -1 && purposeArray.indexOf('eggs') > -1 );
    }
    return isDualPurpose(purposeArray) ? ["Dual-purpose"] : purposeArray
  }

  // Returns the description of each APA class.
  public getApaClassDescription(apaClass: string): any {
    return this.classDescriptions[apaClass];
  }

  public addImageUrlToBreeds(breeds: any[]): any[] {
    breeds.forEach((breed: any) => {
      breed.imgUrl = `../../assets/breed_photos/${breed.breed.replace(/\s+/g, '').toLowerCase()}.jpg`;
    });
    return breeds;
  }

}
