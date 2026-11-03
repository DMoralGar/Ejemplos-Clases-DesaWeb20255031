import { createRecipe, getAllRecipes } from "./service/recipeService.js";

const receta1={
    name:'Pupusas de Chicharron',
    category: "Cena",
    description: "Tortillas de arroz con quesillo y chicharron",
    ingredients:["harina de arroz","Quesillo","Aceite"],
    imageUrl:""
}
//Aqui estuvo Rodrigo Morales
//const resultados = await createRecipe(receta1);
//console.log(resultados);
const {data} = await getAllRecipes();
console.log(data);