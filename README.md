# Marco Somma - Personal Blog

A modern, clean personal blog built for self-branding and sharing knowledge about software development and architecture.

## 🚀 Features

- **Modern Design**: Clean, professional interface with gradient hero section
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Easy to Maintain**: Simple JSON-based article management
- **Internal & External Articles**: Support for both self-written articles and external references
- **Fast Loading**: No heavy frameworks, just vanilla JavaScript
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📁 Project Structure

```
.
├── index.html              # Main homepage
├── article.html            # Article detail page
├── styles/
│   └── main.css           # All styles
├── js/
│   ├── main.js            # Homepage logic
│   └── article.js         # Article page logic
└── data/
    └── articles.json      # Articles database
```

## ✍️ Adding New Articles

### Internal Articles (Your Own Writing)

Edit `data/articles.json` and add a new entry:

```json
{
  "id": "unique-article-id",
  "title": "Your Article Title",
  "date": "2025-12-08",
  "excerpt": "Brief description of your article",
  "tags": ["tag1", "tag2"],
  "type": "internal",
  "content": "<p>Your HTML content here...</p>"
}
```

### External Articles (References)

For referencing articles from other websites:

```json
{
  "id": "unique-id",
  "title": "External Article Title",
  "date": "2025-12-08",
  "excerpt": "Brief description",
  "tags": ["tag1"],
  "type": "external",
  "url": "https://example.com/article",
  "source": "example.com"
}
```

## 🎨 Customization

### Colors
Edit the CSS variables in `styles/main.css`:

```css
:root {
    --primary-color: #2563eb;
    --text-primary: #1f2937;
    /* ... more variables */
}
```

### Hero Section
Edit the gradient in `styles/main.css`:

```css
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Content
Update your information in `index.html`:
- Hero title and subtitle
- About section text
- Footer links

## 🌐 Deployment

### GitHub Pages

1. Push your code to the repository
2. Go to Settings > Pages
3. Set Source to "Deploy from a branch"
4. Select `master` branch and `/ (root)` folder
5. Click Save

Your site will be live at `https://marcosomma.github.io`

### Custom Domain (Optional)

1. Create a `CNAME` file in the root with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## 🛠️ Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📝 Content Tips

### Writing Good Excerpts
- Keep it under 150 characters
- Make it engaging and clear
- Include the main value proposition

### Choosing Tags
- Use 2-4 tags per article
- Keep tags consistent across articles
- Use lowercase for consistency

### HTML Content for Internal Articles
You can use these HTML tags in your article content:
- `<h2>`, `<h3>` for headings
- `<p>` for paragraphs
- `<ul>`, `<ol>`, `<li>` for lists
- `<code>` for inline code
- `<pre><code>` for code blocks
- `<blockquote>` for quotes

## 📄 License

MIT License - Feel free to use this as a template for your own blog!

## 🤝 Connect

- **LinkedIn**: [linkedin.com/in/marcosomma](https://www.linkedin.com/in/marcosomma)
- **GitHub**: [github.com/marcosomma](https://github.com/marcosomma)

---

Built with ❤️ by Marco Somma
