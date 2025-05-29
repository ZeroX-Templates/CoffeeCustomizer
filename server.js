const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database initialization
async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS recipes (
                id SERIAL PRIMARY KEY,
                recipe_id VARCHAR(255) UNIQUE NOT NULL,
                coffee_type VARCHAR(100) NOT NULL,
                milk_type VARCHAR(100) NOT NULL,
                sugar_level INTEGER NOT NULL,
                toppings TEXT[] NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS nutrition_logs (
                id SERIAL PRIMARY KEY,
                recipe_id VARCHAR(255) REFERENCES recipes(recipe_id),
                calories INTEGER,
                sugar DECIMAL,
                caffeine INTEGER,
                protein DECIMAL,
                fat DECIMAL,
                carbs DECIMAL,
                fiber DECIMAL,
                sodium INTEGER,
                antioxidants INTEGER,
                health_score INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('Database tables initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

// API Routes

// Get all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, n.calories, n.sugar, n.caffeine, n.health_score
            FROM recipes r
            LEFT JOIN nutrition_logs n ON r.recipe_id = n.recipe_id
            ORDER BY r.created_at DESC
        `);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

// Get recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT r.*, n.*
            FROM recipes r
            LEFT JOIN nutrition_logs n ON r.recipe_id = n.recipe_id
            WHERE r.recipe_id = $1
        `, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ error: 'Failed to fetch recipe' });
    }
});

// Create new recipe
app.post('/api/recipes', async (req, res) => {
    try {
        const { id, coffeeType, milkType, sugarLevel, toppings, nutrition, advancedMetrics } = req.body;
        
        // Insert recipe
        const recipeResult = await pool.query(`
            INSERT INTO recipes (recipe_id, coffee_type, milk_type, sugar_level, toppings)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (recipe_id) 
            DO UPDATE SET 
                coffee_type = EXCLUDED.coffee_type,
                milk_type = EXCLUDED.milk_type,
                sugar_level = EXCLUDED.sugar_level,
                toppings = EXCLUDED.toppings,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `, [id, coffeeType, milkType, sugarLevel, toppings]);
        
        // Insert nutrition data if provided
        if (nutrition && advancedMetrics) {
            await pool.query(`
                INSERT INTO nutrition_logs (
                    recipe_id, calories, sugar, caffeine, protein, fat, carbs, 
                    fiber, sodium, antioxidants, health_score
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                ON CONFLICT (recipe_id)
                DO UPDATE SET
                    calories = EXCLUDED.calories,
                    sugar = EXCLUDED.sugar,
                    caffeine = EXCLUDED.caffeine,
                    protein = EXCLUDED.protein,
                    fat = EXCLUDED.fat,
                    carbs = EXCLUDED.carbs,
                    fiber = EXCLUDED.fiber,
                    sodium = EXCLUDED.sodium,
                    antioxidants = EXCLUDED.antioxidants,
                    health_score = EXCLUDED.health_score,
                    created_at = CURRENT_TIMESTAMP
            `, [
                id, nutrition.calories, nutrition.sugar, nutrition.caffeine,
                nutrition.protein, nutrition.fat, nutrition.carbs, nutrition.fiber,
                nutrition.sodium, nutrition.antioxidants, advancedMetrics.healthScore
            ]);
        }
        
        res.status(201).json(recipeResult.rows[0]);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Failed to create recipe' });
    }
});

// Update recipe
app.put('/api/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { coffeeType, milkType, sugarLevel, toppings, nutrition, advancedMetrics } = req.body;
        
        const result = await pool.query(`
            UPDATE recipes 
            SET coffee_type = $2, milk_type = $3, sugar_level = $4, toppings = $5, updated_at = CURRENT_TIMESTAMP
            WHERE recipe_id = $1
            RETURNING *
        `, [id, coffeeType, milkType, sugarLevel, toppings]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        
        // Update nutrition data if provided
        if (nutrition && advancedMetrics) {
            await pool.query(`
                UPDATE nutrition_logs 
                SET calories = $2, sugar = $3, caffeine = $4, protein = $5, fat = $6, 
                    carbs = $7, fiber = $8, sodium = $9, antioxidants = $10, health_score = $11,
                    created_at = CURRENT_TIMESTAMP
                WHERE recipe_id = $1
            `, [
                id, nutrition.calories, nutrition.sugar, nutrition.caffeine,
                nutrition.protein, nutrition.fat, nutrition.carbs, nutrition.fiber,
                nutrition.sodium, nutrition.antioxidants, advancedMetrics.healthScore
            ]);
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Failed to update recipe' });
    }
});

// Delete recipe
app.delete('/api/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete nutrition logs first (foreign key constraint)
        await pool.query('DELETE FROM nutrition_logs WHERE recipe_id = $1', [id]);
        
        const result = await pool.query('DELETE FROM recipes WHERE recipe_id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
});

// Get popular coffee types
app.get('/api/analytics/popular-coffees', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT coffee_type, COUNT(*) as count
            FROM recipes
            GROUP BY coffee_type
            ORDER BY count DESC
            LIMIT 10
        `);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching popular coffees:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

// Get nutrition averages
app.get('/api/analytics/nutrition-averages', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                AVG(calories) as avg_calories,
                AVG(sugar) as avg_sugar,
                AVG(caffeine) as avg_caffeine,
                AVG(health_score) as avg_health_score
            FROM nutrition_logs
        `);
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching nutrition averages:', error);
        res.status(500).json({ error: 'Failed to fetch nutrition analytics' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        database: pool.totalCount > 0 ? 'connected' : 'disconnected'
    });
});

// Serve the main HTML file for all routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await pool.end();
    process.exit(0);
});

// Start server
async function startServer() {
    try {
        await initializeDatabase();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Coffee Customizer server running on port ${PORT}`);
            console.log(`Visit http://localhost:${PORT} to use the application`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();