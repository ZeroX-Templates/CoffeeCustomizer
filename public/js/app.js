// Main Application Logic for Coffee Customizer

class CoffeeCustomizer {
    constructor() {
        this.currentRecipe = {
            coffeeType: 'espresso',
            milkType: 'whole',
            sugarLevel: 2,
            toppings: ['none']
        };
        
        this.isSaveOnCooldown = false;
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.populateOptions();
        this.updateRecipeDisplay();
        addAnimationStyles();
        setupScrollAnimations();
    }
    
    setupEventListeners() {
        // Sugar slider
        const sugarSlider = document.getElementById('sugarSlider');
        sugarSlider.addEventListener('input', debounce((e) => {
            this.currentRecipe.sugarLevel = parseInt(e.target.value);
            this.updateSugarDisplay();
            this.updateRecipeDisplay();
        }, 100));
        
        // Action buttons
        document.getElementById('saveBtn').addEventListener('click', () => this.saveFavorite());
        document.getElementById('loadBtn').addEventListener('click', () => this.loadFavorite());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportRecipe());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                hideModal('loadingModal');
            }
        });
    }
    
    populateOptions() {
        this.populateCoffeeOptions();
        this.populateMilkOptions();
        this.populateToppingOptions();
        this.updateSugarDisplay();
    }
    
    populateCoffeeOptions() {
        const container = document.getElementById('coffeeOptions');
        container.innerHTML = '';
        
        coffeeTypes.forEach(coffee => {
            const option = document.createElement('div');
            option.className = `coffee-option ${this.currentRecipe.coffeeType === coffee.id ? 'selected' : ''}`;
            option.innerHTML = `
                <div class="coffee-option-icon">
                    <i class="fas fa-coffee"></i>
                </div>
                <div class="coffee-option-name">${coffee.name}</div>
                <div class="coffee-option-desc">${coffee.description}</div>
            `;
            
            option.addEventListener('click', () => {
                this.currentRecipe.coffeeType = coffee.id;
                this.updateCoffeeSelection();
                this.updateRecipeDisplay();
            });
            
            container.appendChild(option);
        });
    }
    
    populateMilkOptions() {
        const container = document.getElementById('milkOptions');
        container.innerHTML = '';
        
        milkTypes.forEach(milk => {
            const option = document.createElement('div');
            option.className = `milk-option ${this.currentRecipe.milkType === milk.id ? 'selected' : ''}`;
            option.innerHTML = `
                <div class="milk-option-name">${milk.name}</div>
            `;
            
            option.addEventListener('click', () => {
                this.currentRecipe.milkType = milk.id;
                this.updateMilkSelection();
                this.updateRecipeDisplay();
            });
            
            container.appendChild(option);
        });
    }
    
    populateToppingOptions() {
        const container = document.getElementById('toppingOptions');
        container.innerHTML = '';
        
        toppingTypes.forEach(topping => {
            const option = document.createElement('div');
            option.className = `topping-option ${this.currentRecipe.toppings[0] === topping.id ? 'selected' : ''}`;
            option.innerHTML = `
                <div class="topping-option-icon">
                    <i class="${topping.icon}"></i>
                </div>
                <div class="topping-option-name">${topping.name}</div>
            `;
            
            option.addEventListener('click', () => {
                this.currentRecipe.toppings = [topping.id];
                this.updateToppingSelection();
                this.updateRecipeDisplay();
            });
            
            container.appendChild(option);
        });
    }
    
    updateCoffeeSelection() {
        document.querySelectorAll('.coffee-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedOption = Array.from(document.querySelectorAll('.coffee-option'))
            .find(option => {
                const name = option.querySelector('.coffee-option-name').textContent;
                const coffee = coffeeTypes.find(c => c.name === name);
                return coffee && coffee.id === this.currentRecipe.coffeeType;
            });
            
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
    }
    
    updateMilkSelection() {
        document.querySelectorAll('.milk-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedOption = Array.from(document.querySelectorAll('.milk-option'))
            .find(option => {
                const name = option.querySelector('.milk-option-name').textContent;
                const milk = milkTypes.find(m => m.name === name);
                return milk && milk.id === this.currentRecipe.milkType;
            });
            
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
    }
    
    updateToppingSelection() {
        document.querySelectorAll('.topping-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedOption = Array.from(document.querySelectorAll('.topping-option'))
            .find(option => {
                const name = option.querySelector('.topping-option-name').textContent;
                const topping = toppingTypes.find(t => t.name === name);
                return topping && topping.id === this.currentRecipe.toppings[0];
            });
            
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
    }
    
    updateSugarDisplay() {
        const sugarValue = document.getElementById('sugarValue');
        sugarValue.textContent = `${this.currentRecipe.sugarLevel} teaspoons`;
        
        const sugarSlider = document.getElementById('sugarSlider');
        sugarSlider.value = this.currentRecipe.sugarLevel;
    }
    
    getRecipeData() {
        const coffee = coffeeTypes.find(c => c.id === this.currentRecipe.coffeeType) || coffeeTypes[0];
        const milk = milkTypes.find(m => m.id === this.currentRecipe.milkType) || milkTypes[0];
        const topping = toppingTypes.find(t => t.id === this.currentRecipe.toppings[0]) || toppingTypes[toppingTypes.length - 1];
        
        const nutrition = calculateNutrition(coffee, milk, this.currentRecipe.sugarLevel, topping);
        const advancedMetrics = calculateAdvancedMetrics(coffee, milk, this.currentRecipe.sugarLevel, topping, nutrition);
        
        return { coffee, milk, topping, nutrition, advancedMetrics };
    }
    
    updateRecipeDisplay() {
        const recipeData = this.getRecipeData();
        
        this.updateCoffeePreview(recipeData);
        this.updateBrewingInstructions(recipeData);
        this.updateBrewDetails(recipeData);
        this.updateNutritionalInfo(recipeData);
        this.updateAdvancedMetrics(recipeData);
    }
    
    updateCoffeePreview(recipeData) {
        const { coffee, milk } = recipeData;
        
        const coffeeImage = document.getElementById('coffeeImage');
        const coffeeTitle = document.getElementById('coffeeTitle');
        
        coffeeImage.src = coffee.image;
        coffeeImage.alt = `${coffee.name} with ${milk.name}`;
        coffeeTitle.textContent = `${coffee.name} with ${milk.name}`;
    }
    
    updateBrewingInstructions(recipeData) {
        const { coffee } = recipeData;
        const container = document.getElementById('brewingInstructions');
        
        container.innerHTML = '';
        coffee.instructions.forEach((instruction, index) => {
            const step = document.createElement('div');
            step.className = 'instruction-step';
            step.innerHTML = `
                <span class="step-number">${index + 1}</span>
                <p class="step-text">${instruction}</p>
            `;
            container.appendChild(step);
        });
    }
    
    updateBrewDetails(recipeData) {
        const { coffee } = recipeData;
        
        document.getElementById('brewTime').textContent = coffee.brewTime;
        document.getElementById('brewTemp').textContent = coffee.temperature;
    }
    
    updateNutritionalInfo(recipeData) {
        const { nutrition } = recipeData;
        
        // Main nutrition facts
        const nutritionMain = document.getElementById('nutritionMain');
        nutritionMain.innerHTML = `
            <div class="nutrition-item">
                <div class="nutrition-value">${nutrition.calories}</div>
                <div class="nutrition-label">Calories</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${nutrition.sugar}g</div>
                <div class="nutrition-label">Sugar</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${nutrition.caffeine}mg</div>
                <div class="nutrition-label">Caffeine</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${nutrition.protein}g</div>
                <div class="nutrition-label">Protein</div>
            </div>
        `;
        
        // Detailed nutrition facts
        const nutritionDetailed = document.getElementById('nutritionDetailed');
        nutritionDetailed.innerHTML = `
            <div class="nutrition-item">
                <div class="nutrition-value">${nutrition.fat}g</div>
                <div class="nutrition-label">Fat</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${nutrition.carbs}g</div>
                <div class="nutrition-label">Carbs</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${nutrition.fiber}g</div>
                <div class="nutrition-label">Fiber</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${nutrition.sodium}mg</div>
                <div class="nutrition-label">Sodium</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${nutrition.antioxidants}</div>
                <div class="nutrition-label">Antioxidants</div>
            </div>
        `;
    }
    
    updateAdvancedMetrics(recipeData) {
        const { advancedMetrics } = recipeData;
        const container = document.getElementById('advancedMetrics');
        
        container.innerHTML = `
            <div class="metrics-column">
                <div class="metric-item">
                    <span class="metric-label">Health Score</span>
                    <div class="metric-value">
                        <div class="health-score-bar ${getHealthScoreClass(advancedMetrics.healthScore)}"></div>
                        ${advancedMetrics.healthScore}/100
                    </div>
                </div>
                
                <div class="metric-item">
                    <span class="metric-label">Sugar Intensity</span>
                    <span class="metric-badge ${getNutritionBadgeClass(advancedMetrics.sugarIntensity, 'sugar')}">
                        ${advancedMetrics.sugarIntensity}
                    </span>
                </div>
                
                <div class="metric-item">
                    <span class="metric-label">Energy Profile</span>
                    <span class="metric-value">${advancedMetrics.energyProfile}</span>
                </div>
                
                <div class="metric-item">
                    <span class="metric-label">Caffeine/oz</span>
                    <span class="metric-value">${advancedMetrics.caffeinePerOz}mg</span>
                </div>
            </div>
            
            <div class="metrics-column">
                <div class="metric-item">
                    <span class="metric-label">Protein Quality</span>
                    <span class="metric-badge ${getNutritionBadgeClass(advancedMetrics.proteinQuality, 'protein')}">
                        ${advancedMetrics.proteinQuality}
                    </span>
                </div>
                
                <div class="metric-item">
                    <span class="metric-label">Glycemic Impact</span>
                    <span class="metric-badge ${getNutritionBadgeClass(advancedMetrics.glycemicImpact, 'glycemic')}">
                        ${advancedMetrics.glycemicImpact}
                    </span>
                </div>
                
                <div class="metric-item">
                    <span class="metric-label">Calories from Fat</span>
                    <span class="metric-value">${advancedMetrics.caloriesFromFat}</span>
                </div>
                
                <div class="metric-item" style="text-align: center; font-size: 0.875rem; color: #825e3a;">
                    <div>Recommended serving: 12oz</div>
                    <div>Best within 15 minutes</div>
                </div>
            </div>
        `;
    }
    
    async saveFavorite() {
        if (this.isSaveOnCooldown) return;
        
        try {
            // Try to save to database first
            const recipeWithId = {
                ...this.currentRecipe,
                id: generateRecipeId(),
                createdAt: new Date().toISOString()
            };
            
            try {
                await saveRecipeToDatabase(recipeWithId);
                showToast("Recipe Saved!", "Your favorite recipe has been saved to the database.");
            } catch (dbError) {
                // Fallback to localStorage if database fails
                if (saveRecipeToLocalStorage(this.currentRecipe)) {
                    showToast("Recipe Saved!", "Your favorite recipe has been saved locally.");
                } else {
                    throw new Error("Failed to save recipe");
                }
            }
            
            this.isSaveOnCooldown = true;
            const saveBtn = document.getElementById('saveBtn');
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fas fa-heart"></i> Please wait...';
            
            // 5-second cooldown
            setTimeout(() => {
                this.isSaveOnCooldown = false;
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fas fa-heart"></i> Save My Favorite';
            }, 5000);
            
        } catch (error) {
            showToast("Save Failed", "Unable to save your recipe. Please try again.", "error");
        }
    }
    
    async loadFavorite() {
        this.isLoading = true;
        showModal('loadingModal');
        
        const loadBtn = document.getElementById('loadBtn');
        loadBtn.disabled = true;
        loadBtn.innerHTML = '<div class="loading-spinner"></div> Loading...';
        
        // Simulate loading time
        setTimeout(async () => {
            try {
                let savedRecipe = null;
                
                // Try to load from database first
                try {
                    const recipes = await loadRecipesFromDatabase();
                    if (recipes && recipes.length > 0) {
                        savedRecipe = recipes[recipes.length - 1]; // Get most recent
                    }
                } catch (dbError) {
                    // Fallback to localStorage
                    savedRecipe = loadRecipeFromLocalStorage();
                }
                
                if (savedRecipe && validateRecipe(savedRecipe)) {
                    this.currentRecipe = {
                        coffeeType: savedRecipe.coffeeType,
                        milkType: savedRecipe.milkType,
                        sugarLevel: savedRecipe.sugarLevel,
                        toppings: savedRecipe.toppings
                    };
                    
                    this.updateAllSelections();
                    this.updateRecipeDisplay();
                    
                    showToast("Recipe Loaded!", "Your favorite recipe has been loaded successfully.");
                } else {
                    showToast("No Favorite Found", "You haven't saved a favorite recipe yet. Create one and save it!", "error");
                }
            } catch (error) {
                showToast("Load Failed", "Unable to load your favorite recipe. Please try again.", "error");
            } finally {
                this.isLoading = false;
                hideModal('loadingModal');
                loadBtn.disabled = false;
                loadBtn.innerHTML = '<i class="fas fa-download"></i> Load Favorite';
            }
        }, 1500);
    }
    
    updateAllSelections() {
        this.updateCoffeeSelection();
        this.updateMilkSelection();
        this.updateToppingSelection();
        this.updateSugarDisplay();
    }
    
    exportRecipe() {
        const recipeData = this.getRecipeData();
        exportRecipe(recipeData, this.currentRecipe);
        showToast("Recipe Exported!", "Your recipe has been downloaded as a text file.");
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.coffeeCustomizer = new CoffeeCustomizer();
});