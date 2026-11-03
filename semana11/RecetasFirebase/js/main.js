import { 
    createRecipe, 
    updateRecipe, 
    deleteRecipe, 
    getRecipeById,
    getAllRecipes
} from './service/recipeService.js';

import { 
    createRecipeCard, 
    showLoading, 
    hideLoading, 
    showEmptyState,
    filterRecipes,
    sortRecipes,
    showRecipeModal, 
    showRecipeDetailModal 
} from './Uiutils.js';

let allRecipes = [];
let currentSearchTerm = '';
let currentCategory = '';
let currentSortBy = 'newest';

function init() {
    setupEventListeners();
    loadRecipes();
}

function setupEventListeners() {
    const btnAddRecipe = document.getElementById('btnAddRecipe');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortBySelect = document.getElementById('sortBy');
    const recipesContainer = document.getElementById('recipesContainer');
    
    btnAddRecipe.addEventListener('click', handleAddRecipe);
    
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value;
        renderRecipes();
    });
    
    categoryFilter.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        renderRecipes();
    });
    
    sortBySelect.addEventListener('change', (e) => {
        currentSortBy = e.target.value;
        renderRecipes();
    });
    
    recipesContainer.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-view');
        const editBtn = e.target.closest('.btn-edit');
        const deleteBtn = e.target.closest('.btn-delete');
        
        if (viewBtn) {
            const recipeId = viewBtn.dataset.id;
            handleViewRecipe(recipeId);
        } else if (editBtn) {
            const recipeId = editBtn.dataset.id;
            handleEditRecipe(recipeId);
        } else if (deleteBtn) {
            const recipeId = deleteBtn.dataset.id;
            handleDeleteRecipe(recipeId);
        }
    });
}

async function loadRecipes() {
    showLoading();
    
    const response = await getAllRecipes();
    
    hideLoading();
    
    if (response.success) {
        allRecipes = response.data;
        renderRecipes();
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar las recetas: ' + response.error
        });
    }
}

function renderRecipes() {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';
    
    let filteredRecipes = filterRecipes(allRecipes, currentSearchTerm, currentCategory);
    filteredRecipes = sortRecipes(filteredRecipes, currentSortBy);
    
    if (filteredRecipes.length === 0) {
        showEmptyState(true);
        return;
    }
    
    showEmptyState(false);
    
    filteredRecipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        recipesContainer.appendChild(card);
    });
}

async function handleAddRecipe() {
    const result = await showRecipeModal();
    
    if (result.isConfirmed) {
        showLoading();
        
        const response = await createRecipe(result.value);
        
        hideLoading();
        
        if (response.success) {
            await Swal.fire({
                icon: 'success',
                title: 'Receta creada',
                text: 'La receta se ha guardado correctamente',
                timer: 2000,
                showConfirmButton: false
            });
            
            await loadRecipes();
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear la receta: ' + response.error
            });
        }
    }
}

async function handleViewRecipe(recipeId) {
    showLoading();
    
    const response = await getRecipeById(recipeId);
    
    hideLoading();
    
    if (response.success) {
        await showRecipeDetailModal(response.data);
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar la receta: ' + response.error
        });
    }
}

async function handleEditRecipe(recipeId) {
    showLoading();
    
    const response = await getRecipeById(recipeId);
    
    hideLoading();
    
    if (!response.success) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar la receta: ' + response.error
        });
        return;
    }
    
    const result = await showRecipeModal(response.data);
    
    if (result.isConfirmed) {
        showLoading();
        
        const updateResponse = await updateRecipe(recipeId, result.value);
        
        hideLoading();
        
        if (updateResponse.success) {
            await Swal.fire({
                icon: 'success',
                title: 'Receta actualizada',
                text: 'Los cambios se han guardado correctamente',
                timer: 2000,
                showConfirmButton: false
            });
            
            await loadRecipes();
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la receta: ' + updateResponse.error
            });
        }
    }
}

async function handleDeleteRecipe(recipeId) {
    const result = await Swal.fire({
        title: 'Eliminar receta',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        showLoading();
        
        const response = await deleteRecipe(recipeId);
        
        hideLoading();
        
        if (response.success) {
            await Swal.fire({
                icon: 'success',
                title: 'Receta eliminada',
                text: 'La receta se ha eliminado correctamente',
                timer: 2000,
                showConfirmButton: false
            });
            
            await loadRecipes();
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar la receta: ' + response.error
            });
        }
    }
}

init();
