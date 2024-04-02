import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';





@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {
  id: string;
  recipe: any;

  constructor(private route: ActivatedRoute, private recipeservice: RecipeService  ){ 
    this.id = "";
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = String(params.get('id'));
    })
  }

  ngOnInit(): void {
    this.getrecipe()

   
  }

  getrecipe(){
    this.recipeservice.getRecipe(this.id).subscribe(res => {
      this.recipe = res;
      

    })

  }

}
