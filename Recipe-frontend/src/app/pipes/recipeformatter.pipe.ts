import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeformatter',
  standalone: true
})
export class RecipeformatterPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value.replace("https://api.edamam.com/api/recipes/v2/","").split("?")[0];
  }

}





