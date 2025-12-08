// Global state for articles
let allArticles = [];
let filteredArticles = [];
let currentTag = 'all';
let searchQuery = '';

// Set random header image
function setRandomHeader() {
    const totalHeaders = 36; // header_0.png to header_35.png + header.png
    const randomIndex = Math.floor(Math.random() * totalHeaders);
    const headerPath = `./images/headers/header_${randomIndex - 1}.png`;
    
    const heroImage = document.getElementById('hero-image');
    if (heroImage) {
        heroImage.src = headerPath;
    }
}

// Load and display articles
async function loadArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    
    try {
        articlesGrid.innerHTML = '<div class="loading">Loading articles...</div>';
        
        const response = await fetch('./data/articles.json');
        const data = await response.json();
        
        if (!data.articles || data.articles.length === 0) {
            articlesGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No articles yet</h3>
                    <p>Check back soon for new content!</p>
                </div>
            `;
            return;
        }
        
        // Sort articles by date (newest first)
        allArticles = data.articles.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        // Initialize filters
        initializeFilters();
        
        // Display all articles initially
        filteredArticles = [...allArticles];
        displayArticles();
    } catch (error) {
        console.error('Error loading articles:', error);
        articlesGrid.innerHTML = `
            <div class="empty-state">
                <h3>Error loading articles</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

function initializeFilters() {
    // Extract all unique tags
    const tagSet = new Set();
    allArticles.forEach(article => {
        article.tags.forEach(tag => tagSet.add(tag));
    });
    
    // Sort tags alphabetically
    const sortedTags = Array.from(tagSet).sort();
    
    // Create tag filter buttons
    const tagFiltersContainer = document.getElementById('tag-filters');
    tagFiltersContainer.innerHTML = sortedTags.map(tag => 
        `<button class="filter-btn" data-tag="${tag}">${tag}</button>`
    ).join('');
    
    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTag = this.dataset.tag;
            applyFilters();
        });
    });
    
    // Add search input listener
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value.toLowerCase();
        applyFilters();
    });
}

function applyFilters() {
    filteredArticles = allArticles.filter(article => {
        // Tag filter
        const tagMatch = currentTag === 'all' || article.tags.includes(currentTag);
        
        // Search filter
        const searchMatch = !searchQuery || 
            article.title.toLowerCase().includes(searchQuery) ||
            article.excerpt.toLowerCase().includes(searchQuery) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        
        return tagMatch && searchMatch;
    });
    
    displayArticles();
}

function displayArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    const articleCount = document.getElementById('article-count');
    
    // Update count
    articleCount.textContent = `${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''}`;
    
    // Display articles or empty state
    if (filteredArticles.length === 0) {
        articlesGrid.innerHTML = `
            <div class="empty-state">
                <h3>No articles found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
    } else {
        articlesGrid.innerHTML = filteredArticles.map(article => createArticleCard(article)).join('');
    }
}

function createArticleCard(article) {
    const formattedDate = formatDate(article.date);
    const isExternal = article.type === 'external';
    const link = isExternal ? article.url : `article.html?id=${article.id}`;
    const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
    
    const tags = article.tags.map(tag => 
        `<span class="article-tag">${tag}</span>`
    ).join('');
    
    const externalIndicator = isExternal ? 
        `<div class="external-indicator">🔗 External: ${article.source || 'External Link'}</div>` : '';
    
    // Check if article has image (local file: images/articles/{id}.jpg)
    const articleImagePath = `./images/articles/${article.id}.jpg`;
    const placeholderLetter = article.title.charAt(0).toUpperCase();
    
    return `
        <a href="${link}" class="article-card" ${target}>
            <div class="article-image">
                <img src="${articleImagePath}" alt="${article.title}" class="article-card-image" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="article-image-placeholder" style="display:none;">${placeholderLetter}</div>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    ${tags}
                    <span class="article-date">${formattedDate}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                ${externalIndicator}
                <span class="article-link">${isExternal ? 'Read more' : 'Read article'}</span>
            </div>
        </a>
    `;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load projects
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        projectsGrid.innerHTML = '<div class="loading">Loading projects...</div>';
        
        const response = await fetch('./data/projects.json');
        const data = await response.json();
        
        if (!data.projects || data.projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No projects yet</h3>
                    <p>Check back soon!</p>
                </div>
            `;
            return;
        }
        
        projectsGrid.innerHTML = data.projects.map(project => createProjectCard(project)).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `
            <div class="empty-state">
                <h3>Error loading projects</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

function createProjectCard(project) {
    const tags = project.tags.map(tag => 
        `<span class="project-tag">${tag}</span>`
    ).join('');
    
    const websiteLink = project.website ? 
        `<a href="${project.website}" class="project-link" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            Website
        </a>` : '';
    
    return `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-name">${project.name}</h3>
                <div class="project-stars">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>${project.stars || 0}</span>
                </div>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">${tags}</div>
            <div class="project-links">
                <a href="${project.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </a>
                ${websiteLink}
            </div>
        </div>
    `;
}

// Load articles and projects when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setRandomHeader();
        loadArticles();
        loadProjects();
    });
} else {
    setRandomHeader();
    loadArticles();
    loadProjects();
}

// About section toggle
const aboutToggle = document.getElementById('about-toggle');
const aboutMore = document.getElementById('about-more');

if (aboutToggle && aboutMore) {
    aboutToggle.addEventListener('click', function() {
        const isHidden = aboutMore.classList.contains('hidden');
        
        if (isHidden) {
            aboutMore.classList.remove('hidden');
            aboutToggle.textContent = 'Show less';
        } else {
            aboutMore.classList.add('hidden');
            aboutToggle.textContent = 'Read more';
        }
    });
}
