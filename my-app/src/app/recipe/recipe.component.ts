import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import asteroid from '../../common/asteroid';

  @Component({
    selector: 'recipe',
    templateUrl: 'recipe.component.html',
    styleUrls: ['recipe.component.css']
  })

  export class RecipeComponent implements OnInit {

    newRecipe: any;
    recipes: any;
    recipeObj: any;
    recipeID: any;
    constructor(private router: Router) {
      this.newRecipe = {
        title: '',
        description: ''
      };
      this.recipes = [];
      asteroid.call('getRecipes').then((data) => {
        this.recipes = data;
      });
      
      asteroid.ddp.on('added', ({ collection, id, fields }) => {
        console.log(collection);
        console.log(id);
        console.log(fields);
        if (collection === 'recipe') {
            this.recipes.push(fields);
        }
      });
    }

    ngOnInit() {
      this.newRecipe = {
        title: '',
        description: ''
      };
    }

    addRecipe(event) {
        this.recipeObj = {
          newRecipe: this.newRecipe,
        }
        this.newRecipe = {};
        asteroid.call('addRecipe', this.recipeObj);
        // event.preventDefault();
    }

    deleteRecipe(index) {
      var res = confirm('Are you sure ? ? ?')
      if(!!res) {
        var obj = {};
        obj = this.recipes.splice(index, 1)[0];
        asteroid.call('removeRecipe', obj);
      }
    }

    editRecipe(index) {
      console.log('clicked edit');
      console.log(this.recipes[index]);
      this.newRecipe = this.recipes[index].newRecipe;
      this.recipeID = this.recipes[index]._id;
    }

    updateRecipe() {
      var newObj = this.newRecipe;
      console.log(this.recipeID);
      console.log(this.newRecipe);
      asteroid.call('updateRecipe', this.recipeID, newObj);
    }

  }
