import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';

// new type for class descriptions object
// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
type tClassDescription = {
  [key: string]: string
}

type tPurposeDescription = {
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

  private purposeDescriptions: tPurposeDescription = {
    "Eggs": "These breeds are used primarily for egg production. The egg layer is leaner and rangier in body type. It will lay more eggs, as a general rule.",
    "Meat": "These breeds are used primarily for meat production. Meat birds have a blockier body that fills out with muscle for meat. It will lay fewer eggs, as a general rule.",
    "Ornamental": "These breeds are primarily ornamental and do produce many eggs or much meat.",
    // "Show": "These breeds are often shown in poultry competitions.",
    "Exhibition": "These breeds are often shown in poultry competitions.",
    "Feathers": "These breeds are prized for their particularly beautiful feathers.",
    "Broody hens": "These breeds produce particularly good hens for brooding and raising chicks.",
    "Dual-purpose": "The dual purpose chicken is intended to grow a good body, adequate for putting meat on the table, and lay a nice quantity of eggs. The dual purpose chicken will not provide as large a carcass as a meat bird, nor lay as many eggs as an egg layer."
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

  public getBreedPurposeDescription(purpose: string): any {
    if (purpose === 'show') {
      return this.purposeDescriptions['Exhibition']
    }
    return this.purposeDescriptions[this.capitalizeFirstLetter(purpose)]
  }

  public addImageUrlToBreeds(breeds: any[]): any[] {
    breeds.forEach((breed: any) => {
      breed.imgUrl = `assets/breed_photos/${breed.breed.replace(/\s+/g, '').toLowerCase()}.jpg`;
    });
    return breeds;
  }

  private capitalizeFirstLetter(word: string): string {
    return word[0].toUpperCase() + word.slice(1);
  }

}
