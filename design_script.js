/*
// Game data
const games = [
    { name: "Capture the Flag", mapMode: "Urban", players: 10 },
    { name: "Team Deathmatch", mapMode: "Desert", players: 16 },
    { name: "King of the Hill", mapMode: "Jungle", players: 8 },
    { name: "Domination", mapMode: "Arctic", players: 12 },
    { name: "Search and Destroy", mapMode: "Industrial", players: 6 },
    { name: "Free-for-All", mapMode: "Space Station", players: 8 }
];
// Function to create game cards
function createGameCards() {
    const gameCardsContainer = document.getElementById('gameCards');
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <h3>${game.name}</h3>
            <p>Map Mode: ${game.mapMode}</p>
            <p>Players: ${game.players}</p>
        `;
        gameCardsContainer.appendChild(card);
    });
}


*/
// Function to toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    sidebar.classList.toggle('open');
    toggleBtn.classList.toggle('open');
}
// Function to toggle settings panel
function toggleSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    const mainContent = document.getElementById('mainContent');
    settingsPanel.classList.toggle('open');
    mainContent.classList.toggle('settings-open');
}
// Function to update slider values
function updateSliderValue(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueSpan = document.getElementById(valueId);
    valueSpan.textContent = slider.value;
}
// Event listeners
document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);
document.getElementById('settingsBtn').addEventListener('click', toggleSettings);
document.getElementById('speedSlider').addEventListener('input', () => updateSliderValue('speedSlider', 'speedValue'));
document.getElementById('ballsSlider').addEventListener('input', () => updateSliderValue('ballsSlider', 'ballsValue'));
document.getElementById('mouseSize').addEventListener('input', () => updateSliderValue('mouseSize', 'mouseValue'));
// Create game cards when the page loads
// Close sidebar and settings panel when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const settingsPanel = document.getElementById('settingsPanel');
    const settingsBtn = document.getElementById('settingsBtn');
    const mainContent = document.getElementById('mainContent');
    if (!sidebar.contains(event.target) && event.target !== toggleBtn) {
        sidebar.classList.remove('open');
        toggleBtn.classList.remove('open');
    }
    if (!settingsPanel.contains(event.target) && event.target !== settingsBtn) {
        settingsPanel.classList.remove('open');
        mainContent.classList.remove('settings-open');
    }
});




async function fetchPreContent() {
    const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=uaAAImgJbr36iX5CtCNo3z6n5MF2fe1QxGeE3g8m85q3LkrtJHDzbr4FuGUk52U5dPAooSQvQhiF7YEevY3pWiF8oRD6tLWZm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEDDjWiPak4fnv3AaqjSQ0SOVddSocdoti8TZIQS5zFEt5kejmgkVaH9Z57TqIWAdx-Y65loH8AkyR6NoPsUIPkDlcCvMfHTZNz9Jw9Md8uu&lib=McGseq8RN5jMUh2WfQ6TAvokEILPJmStx';
    try {
        const response = await fetch(url);
                if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        const trimmedText = text.replace(/^"(.*)"$/, '$1');
        const googletableElement = document.getElementById('googletable');
        if (!googletableElement) {
            throw new Error('Элемент с ID "googletable" не найден.');
        }
        googletableElement.href = trimmedText;
        googletableElement.innerHTML = "Google Table";
    } catch (error) {
        console.error('Ошибка при получении содержимого:', error.message);
    }
}
fetchPreContent();