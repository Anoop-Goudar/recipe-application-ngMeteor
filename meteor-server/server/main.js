import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {});


const Recipe = new Meteor.Collection('recipe');

Meteor.publish('recipeList', function() {
  var recipeDataList = Recipe.find();
  return recipeDataList;
});

Meteor.methods({
  getRecipe(id) {
    return Recipe.findOne(id);
  },
  getRecipes() {
    return Recipe.find().fetch();
  },
  addRecipe(obj) {
    return Recipe.insert(obj);
  },
  removeRecipe(obj) {
    return Recipe.remove(obj);
  },
  updateRecipe(id, obj) { 
    return Recipe.update({_id: id},{$set:{
        "newRecipe.title": obj.title,
        "newRecipe.description": obj.description
      }
    })
  }
})
