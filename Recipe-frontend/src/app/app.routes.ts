import { Routes } from '@angular/router';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage.component';


export const routes: Routes = [
    {path:'', component:RecipesComponent},
    {path:'recipe/:id', component:RecipeComponent},
    {path:'profile', component:ProfileComponent},
    {path:'login', component:LoginComponent},
    {path: 'register' , component:RegisterComponent},
    {path: 'home', component:HomepageComponent},

   
];