// JavaScript untuk Healthcare of Technology Website

// Data untuk minuman sehat
const drinksData = [
    {
        id: 1,
        name: "Infused Water Lemon Mint",
        description: "Air mineral dengan potongan lemon dan daun mint yang menyegarkan.",
        sugarOriginal: 15,
        sugarReduced: 0,
        category: "minuman",
        image: "images/drinks/infused-water.png"
    },
    {
        id: 2,
        name: "Teh Hijau tanpa Gula",
        description: "Teh hijau alami tanpa tambahan gula, kaya antioksidan.",
        sugarOriginal: 20,
        sugarReduced: 0,
        category: "minuman",
        image: "images/drinks/herbal-tea.png"
    },
    {
        id: 3,
        name: "Smoothie Berry",
        description: "Smoothie campuran berry dengan yogurt rendah lemak tanpa gula tambahan.",
        sugarOriginal: 30,
        sugarReduced: 8,
        category: "minuman",
        image: "images/drinks/smoothie.png"
    },
    {
        id: 4,
        name: "Jus Apel Alami",
        description: "Jus apel murni tanpa gula tambahan dan pengawet.",
        sugarOriginal: 25,
        sugarReduced: 10,
        category: "minuman",
        image: "images/drinks/apple-juice.webp"
    }
];

// Data untuk makanan sehat
const foodsData = [
    {
        id: 1,
        name: "Oatmeal dengan Buah Segar",
        description: "Oatmeal dimasak dengan susu rendah lemak dan toping buah segar.",
        sugarOriginal: 25,
        sugarReduced: 5,
        category: "makanan",
        image: "images/food/low-sugar-breakfast.png"
    },
    {
        id: 2,
        name: "Salad Quinoa",
        description: "Quinoa dengan sayuran segar dan dressing rendah gula.",
        sugarOriginal: 18,
        sugarReduced: 3,
        category: "makanan",
        image: "images/food/healthy-snack.png"
    },
    {
        id: 3,
        name: "Puding Chia Seed",
        description: "Puding chia seed dengan susu almond dan kayu manis.",
        sugarOriginal: 28,
        sugarReduced: 6,
        category: "makanan",
        image: "images/food/sugar-free-dessert.png"
    },
    {
        id: 4,
        name: "Roti Gandum dengan Alpukat",
        description: "Roti gandum utuh dengan alpukat tumbuk dan taburan biji wijen.",
        sugarOriginal: 12,
        sugarReduced: 2,
        category: "makanan",
        image: "images/food/avocado-toast.png"
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua komponen
    initMobileMenu();
    initDrinksSection();
    initFoodsSection();
    initNutritionChart();
    initSugarCounter();
    initBackToTop();
    initActiveNav();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Render Drinks Section
function initDrinksSection() {
    const drinksGrid = document.querySelector('.drinks-grid');
    
    if (drinksGrid) {
        drinksGrid.innerHTML = '';
        
        drinksData.forEach(drink => {
            const drinkCard = createDrinkCard(drink);
            drinksGrid.appendChild(drinkCard);
        });
    }
}

// Create Drink Card Element
function createDrinkCard(drink) {
    const card = document.createElement('div');
    card.className = 'drink-card';
    
    // Hitung persentase pengurangan gula
    const reductionPercent = Math.round(((drink.sugarOriginal - drink.sugarReduced) / drink.sugarOriginal) * 100);
    
    card.innerHTML = `
        <div class="drink-img">
            <img src="${drink.image}" alt="${drink.name}">
        </div>
        <div class="drink-info">
            <h3>${drink.name}</h3>
            <p>${drink.description}</p>
            <div class="sugar-info">
                <div class="sugar-amount">
                    <span class="original">${drink.sugarOriginal}g gula</span>
                    <span class="reduced">${drink.sugarReduced}g gula</span>
                </div>
                <span class="badge">-${reductionPercent}% gula</span>
            </div>
        </div>
    `;
    
    return card;
}

// Render Foods Section
function initFoodsSection() {
    const foodsGrid = document.querySelector('.foods-grid');
    
    if (foodsGrid) {
        foodsGrid.innerHTML = '';
        
        foodsData.forEach(food => {
            const foodCard = createFoodCard(food);
            foodsGrid.appendChild(foodCard);
        });
    }
}

// Create Food Card Element
function createFoodCard(food) {
    const card = document.createElement('div');
    card.className = 'food-card';
    
    // Hitung persentase pengurangan gula
    const reductionPercent = Math.round(((food.sugarOriginal - food.sugarReduced) / food.sugarOriginal) * 100);
    
    card.innerHTML = `
        <div class="food-img">
            <img src="${food.image}" alt="${food.name}">
        </div>
        <div class="food-info">
            <h3>${food.name}</h3>
            <p>${food.description}</p>
            <div class="sugar-info">
                <div class="sugar-amount">
                    <span class="original">${food.sugarOriginal}g gula</span>
                    <span class="reduced">${food.sugarReduced}g gula</span>
                </div>
                <span class="badge">-${reductionPercent}% gula</span>
            </div>
        </div>
    `;
    
    return card;
}

// Initialize Nutrition Chart
function initNutritionChart() {
    const ctx = document.getElementById('nutritionChart');
    
    if (ctx) {
        const nutritionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Karbohidrat Kompleks', 'Protein', 'Lemak Sehat', 'Serat', 'Vitamin & Mineral'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        '#1B3C53',
                        '#234C6A',
                        '#456882',
                        '#FF6B6B',
                        '#FF9E9E'
                    ],
                    borderWidth: 0,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }
}

// Animated Sugar Counter
function initSugarCounter() {
    const sugarCount = document.getElementById('sugar-count');
    
    if (sugarCount) {
        // Hitung total gula yang dikurangi dari semua item
        let totalReduced = 0;
        
        drinksData.forEach(drink => {
            totalReduced += (drink.sugarOriginal - drink.sugarReduced);
        });
        
        foodsData.forEach(food => {
            totalReduced += (food.sugarOriginal - food.sugarReduced);
        });
        
        // Animasikan counter
        animateCounter(sugarCount, 0, totalReduced, 2000);
    }
}

// Animate Counter Function
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Active Navigation Based on Scroll Position
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add Smooth Scrolling to Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});