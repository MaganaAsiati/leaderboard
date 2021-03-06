import './style.css';

const form = document.querySelector('form');
const refreshButton = document.getElementById('refresh');
const table = document.getElementById('table');

const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const GAME_ID = 'CHyVgSSlCdeVKzppH4U1';

const getScores = async () => {
  const response = await fetch(`${BASE_URL}games/${GAME_ID}/scores/`);
  const data = await response.json();
  return data;
};

const refreshTable = () => {
  table.innerHTML = '';
  const users = [];
  getScores().then((games) => {
    Object.entries(games.result).forEach(([, value]) => {
      users.push(JSON.stringify(value));
      const trContainer = document.createElement('tr');
      trContainer.innerHTML = `
      <td>${value.user}</td>
      <td>${value.score}</td>`;
      table.appendChild(trContainer);
    });
  });
};

const addScore = async (newScore) => {
  const response = await fetch(`${BASE_URL}games/${GAME_ID}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });
  const data = await response.json();
  refreshTable();
  return data;
};

const createScore = () => {
  const newScore = {
    user: document.getElementById('name').value,
    score: document.getElementById('score').value,
  };
  document.getElementById('name').value = '';
  document.getElementById('score').value = '';
  addScore(newScore);
};

refreshTable();

refreshButton.addEventListener('click', () => {
  refreshTable();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  createScore();
});