const API_KEY = 'f0130cc9ffe640af9428d4a13339a294'; // Replace with your NewsAPI key
const NEWS_URL = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&category=politics&pageSize=10&apiKey=${API_KEY}`;

const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    try {
        const response = await fetch(NEWS_URL);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

function displayNews(articles) {
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
        return;
    }
    newsContainer.innerHTML = articles
        .map(
            (article) => `
            <div class="news-card">
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read More</a>
            </div>
        `
        )
        .join('');
} // Removed the extra closing brace here

// Fetch news when the page loads
fetchNews();
