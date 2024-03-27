import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecipeformatterPipe } from '../../pipes/recipeformatter.pipe';



@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  imports: [FormsModule, RouterLink, RecipeformatterPipe ]
})
export class RecipesComponent {
  recipes?: Recipe[];

  searchterm = 'chicken';

  constructor(private recipeService: RecipeService) {}

  searchRecipe() {
    this.recipeService.getRecipes(this.searchterm).subscribe((result) => {
      console.log(result);
      let recipes: Recipe[];
      recipes = result.hits.map((item: { recipe: { label: any; image: any; ingredientLines: any; totalTime: any; }; _links: { self: { href: any; }; }; }) => {
        return {
          label: item.recipe.label,
          image: item.recipe.image,
          ingredientLines: item.recipe.ingredientLines,
          totalTime: item.recipe.totalTime,
          selfref: item._links.self.href,
        };
      });
      console.table(recipes);
      this.recipes = recipes;
    });
  }
}
