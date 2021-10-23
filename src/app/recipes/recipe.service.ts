import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
 private recipes:Recipe[] = [
    {
      name: 'A Tasty Schnitzel',
      description: 'A Super Tast Schnitzel - just Awsome!',
      imagePath: 'https://www.thespruceeats.com/thmb/dFLHcwFFtDguBZGylUlDN8KaNaw=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg',
      ingredient:[{name:'Meat',amount:1},{name:'French Fries',amount: 20}]
    },
    {
      name: 'Big Fat Burger',
      description: 'What else you need to say',
      imagePath: 'https://www.thespruceeats.com/thmb/O4xB3FoR7B6ovTpcENFLtQyIuAU=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/indian-style-burger-1957599-hero-01-266103a4bb4e4ee7b5feb4da2d2e99da.jpg',
      ingredient:[{name:'Buns',amount:2},{name:'Meat', amount:1}]
    },
  ];
  constructor(private slService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index: number){
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredient: Ingredient[]){
    this.slService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
