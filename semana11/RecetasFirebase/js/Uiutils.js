export function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 mb-4';
    card.dataset.recipeId = recipe.id;
    
    const ingredientsList = recipe.ingredients
        .map(ing => `<li>${ing}</li>`)
        .join('');
    
    card.innerHTML = `
        <div class="card recipe-card">
            <div class="position-relative">
                <img src="${recipe.imageUrl || 'img/comida.jpg'}" 
                     class="card-img-top recipe-image" 
                     alt="${recipe.name}">
                <span class="recipe-category">${recipe.category}</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${recipe.name}</h5>
                <p class="card-text text-muted">${truncateText(recipe.description, 100)}</p>
                
                <div class="mb-3">
                    <h6 class="mb-2">Ingredientes:</h6>
                    <ul class="ingredients-list small">
                        ${ingredientsList}
                    </ul>
                </div>
                
                <div class="recipe-actions">
                    <button class="btn btn-sm btn-primary btn-view" data-id="${recipe.id}">
                        <i class="bi bi-eye"></i> Ver
                    </button>
                    <button class="btn btn-sm btn-warning btn-edit" data-id="${recipe.id}">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-danger btn-delete" data-id="${recipe.id}">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

export function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingSpinner';
    loadingDiv.className = 'loading-spinner';
    loadingDiv.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

export function hideLoading() {
    const loadingDiv = document.getElementById('loadingSpinner');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

export function showEmptyState(show) {
    const emptyState = document.getElementById('emptyState');
    const container = document.getElementById('recipesContainer');
    
    if (show) {
        emptyState.style.display = 'block';
        container.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        container.style.display = 'flex';
    }
}

export function filterRecipes(recipes, searchTerm, category) {
    return recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !category || recipe.category === category;
        
        return matchesSearch && matchesCategory;
    });
}

export function sortRecipes(recipes, sortBy) {
    const recipesCopy = [...recipes];
    
    switch(sortBy) {
        case 'newest':
            return recipesCopy.sort((a, b) => {
                const timeA = a.createdAt?.seconds || 0;
                const timeB = b.createdAt?.seconds || 0;
                return timeB - timeA;
            });
        case 'oldest':
            return recipesCopy.sort((a, b) => {
                const timeA = a.createdAt?.seconds || 0;
                const timeB = b.createdAt?.seconds || 0;
                return timeA - timeB;
            });
        case 'name':
            return recipesCopy.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return recipesCopy;
    }
}

export async function showRecipeModal(recipe = null) {
    const isEdit = recipe !== null;
    const title = isEdit ? 'Editar Receta' : 'Nueva Receta';
    
    const ingredientsHtml = recipe?.ingredients 
        ? recipe.ingredients.map((ing, index) => createIngredientInput(ing, index)).join('')
        : createIngredientInput('', 0);
    
    const result = await Swal.fire({
        title: title,
        html: `
            <div class="text-start">
                <div class="mb-3">
                    <label for="recipeName" class="form-label">Nombre de la receta</label>
                    <input type="text" class="form-control" id="recipeName" 
                           value="${recipe?.name || ''}" required>
                </div>
                
                <div class="mb-3">
                    <label for="recipeCategory" class="form-label">Categoría</label>
                    <select class="form-select" id="recipeCategory">
                        <option value="desayuno" ${recipe?.category === 'desayuno' ? 'selected' : ''}>Desayuno</option>
                        <option value="almuerzo" ${recipe?.category === 'almuerzo' ? 'selected' : ''}>Almuerzo</option>
                        <option value="cena" ${recipe?.category === 'cena' ? 'selected' : ''}>Cena</option>
                        <option value="postre" ${recipe?.category === 'postre' ? 'selected' : ''}>Postre</option>
                        <option value="snack" ${recipe?.category === 'snack' ? 'selected' : ''}>Snack</option>
                    </select>
                </div>
                
                <div class="mb-3">
                    <label for="recipeDescription" class="form-label">Descripción</label>
                    <textarea class="form-control" id="recipeDescription" rows="3">${recipe?.description || ''}</textarea>
                </div>
                
                <div class="mb-3">
                    <label class="form-label">Ingredientes</label>
                    <div id="ingredientsContainer">
                        ${ingredientsHtml}
                    </div>
                    <button type="button" class="btn btn-sm btn-secondary mt-2" id="addIngredientBtn">
                        <i class="bi bi-plus"></i> Agregar ingrediente
                    </button>
                </div>
                
                <div class="mb-3">
                    <label for="recipeImageUrl" class="form-label">URL de la imagen (opcional)</label>
                    <input type="url" class="form-control" id="recipeImageUrl" 
                           value="${recipe?.imageUrl || ''}">
                </div>
            </div>
        `,
        width: '600px',
        showCancelButton: true,
        confirmButtonText: isEdit ? 'Actualizar' : 'Crear',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false,
        didOpen: () => {
            setupIngredientHandlers();
        },
        preConfirm: () => {
            const name = document.getElementById('recipeName').value.trim();
            const category = document.getElementById('recipeCategory').value;
            const description = document.getElementById('recipeDescription').value.trim();
            const imageUrl = document.getElementById('recipeImageUrl').value.trim();
            const ingredients = getIngredients();
            
            if (!name) {
                Swal.showValidationMessage('El nombre es obligatorio');
                return false;
            }
            
            if (ingredients.length === 0) {
                Swal.showValidationMessage('Debe agregar al menos un ingrediente');
                return false;
            }
            
            if (!description) {
                Swal.showValidationMessage('La descripción es obligatoria');
                return false;
            }
            
            return {
                name,
                category,
                description,
                imageUrl,
                ingredients
            };
        }
    });
    
    return result;
}

export async function showRecipeDetailModal(recipe) {
    const ingredientsList = recipe.ingredients
        .map(ing => `<li class="list-group-item">${ing}</li>`)
        .join('');
    
    await Swal.fire({
        title: recipe.name,
        html: `9+
            <div class="text-start">
                <img src="${recipe.imageUrl || 'img/comida.jpg'}" 
                     class="img-fluid rounded mb-3" 
                     alt="${recipe.name}">
                
                <div class="mb-3">
                    <span class="badge bg-secondary">${recipe.category}</span>
                </div>
                
                <h6>Descripción:</h6>
                <p>${recipe.description}</p>
                
                <h6>Ingredientes:</h6>
                <ul class="list-group mb-3">
                    ${ingredientsList}
                </ul>
            </div>
        `,
        width: '700px',
        confirmButtonText: 'Cerrar',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    });
}

function createIngredientInput(value = '', index = 0) {
    return `
        <div class="ingredient-item" data-index="${index}">
            <input type="text" class="form-control ingredient-input" 
                   placeholder="Ej: 2 tazas de harina" value="${value}">
            <button type="button" class="btn btn-sm btn-danger btn-remove-ingredient">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;
}

function setupIngredientHandlers() {
    const container = document.getElementById('ingredientsContainer');
    const addButton = document.getElementById('addIngredientBtn');
    
    addButton.addEventListener('click', () => {
        const newIndex = container.children.length;
        const newIngredient = document.createElement('div');
        newIngredient.innerHTML = createIngredientInput('', newIndex);
        container.appendChild(newIngredient.firstElementChild);
        updateRemoveButtons();
    });
    
    container.addEventListener('click', (e) => {
        if (e.target.closest('.btn-remove-ingredient')) {
            const item = e.target.closest('.ingredient-item');
            if (container.children.length > 1) {
                item.remove();
            } else {
                Swal.showValidationMessage('Debe haber al menos un ingrediente');
            }
            updateRemoveButtons();
        }
    });
    
    updateRemoveButtons();
}

function updateRemoveButtons() {
    const container = document.getElementById('ingredientsContainer');
    const items = container.querySelectorAll('.ingredient-item');
    
    items.forEach((item, index) => {
        const removeBtn = item.querySelector('.btn-remove-ingredient');
        removeBtn.disabled = items.length === 1;
    });
}

function getIngredients() {
    const inputs = document.querySelectorAll('.ingredient-input');
    const ingredients = [];
    
    inputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
            ingredients.push(value);
        }
    });
    
    return ingredients;
}