import {db} from './firebase.js';
import { addDoc, collection,serverTimestamp ,
    query,orderBy, getDocs,
} from 'https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js';


const COLLECTION_NAME='recetas';

// Funcion para crear recetas
export async function createRecipe(recipeData){
        try{
        const docId=await addDoc(collection(db,COLLECTION_NAME),{
            ...recipeData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return {success:true, id:docId.id}
    }
    catch(erro){
        console.log('Error creando la receta');
        return{success:false, error:error.mesage}

    }
}

//Funcion para retornar todas las recetas

export async function getAllRecipes(){
    try{
        const q = query(
            collection(db,COLLECTION_NAME),
            orderBy('createdAt','desc')
        );

        const result= await getDocs(q);
        const recipes = [];
        result.forEach(doc => {
            recipes.push({
                id: doc.id,
                ... doc.data()
            });
        });
        return{success:true, data:recipes};

    }
    catch(error){
        console.log('Error recuperando las recetas');
        return { succes:false, error: error.message};
        

    }
}

export async function getRecipeById(recipeId){
    
}

export async function updateRecipe(recipeId, recipeData){
    
}

export async function deleteRecipe(recipeId){
    
}