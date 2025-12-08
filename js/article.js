// Get article ID from URL
function getArticleId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load and display article
async function loadArticle() {
    const articleContent = document.getElementById('article-content');
    const articleId = getArticleId();
    
    if (!articleId) {
        articleContent.innerHTML = `
            <div class="empty-state">
                <h3>Article not found</h3>
                <p>The requested article could not be found.</p>
                <a href="/" class="btn btn-primary">Go back home</a>
            </div>
        `;
        return;
    }
    
    try {
        articleContent.innerHTML = '<div class="loading">Loading article...</div>';
        
        const response = await fetch('./data/articles.json');
        const data = await response.json();
        
        const article = data.articles.find(a => a.id === articleId);
        
        if (!article) {
            articleContent.innerHTML = `
                <div class="empty-state">
                    <h3>Article not found</h3>
                    <p>The requested article could not be found.</p>
                    <a href="/" class="btn btn-primary">Go back home</a>
                </div>
            `;
            return;
        }
        
        // If it's an external article, redirect
        if (article.type === 'external' && article.url) {
            window.location.href = article.url;
            return;
        }
        
        // Display internal article
        displayArticle(article);
        
    } catch (error) {
        console.error('Error loading article:', error);
        articleContent.innerHTML = `
            <div class="empty-state">
                <h3>Error loading article</h3>
                <p>Please try again later.</p>
                <a href="/" class="btn btn-primary">Go back home</a>
            </div>
        `;
    }
}

function displayArticle(article) {
    const articleContent = document.getElementById('article-content');
    const formattedDate = formatDate(article.date);
    
    const tags = article.tags.map(tag => 
        `<span class="article-tag">${tag}</span>`
    ).join('');
    
    // Update page title
    document.title = `${article.title} - Marco Somma`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', article.excerpt);
    }
    
    articleContent.innerHTML = `
        <article>
            <header class="article-header">
                <h1 class="article-title">${article.title}</h1>
                <div class="article-meta">
                    ${tags}
                    <span class="article-date">${formattedDate}</span>
                </div>
            </header>
            <div class="article-body">
                ${article.content}
            </div>
        </article>
    `;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Load article when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadArticle);
} else {
    loadArticle();
}
