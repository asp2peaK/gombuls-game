import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Firebase конфигурация
const firebaseConfig = {
    apiKey: "AIzaSyBcYnnQ98fkM_lB8T0GqyHa-re2iT4yaoU",
    authDomain: "gombuls-game.firebaseapp.com",
    projectId: "gombuls-game",
    storageBucket: "gombuls-game.appspot.com",
    messagingSenderId: "310691283889",
    appId: "1:310691283889:web:4165ce19c145bf83c87390",
    measurementId: "G-QGQ2LJGSJF"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Получаем ID пользователя из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

// Функция загрузки очков пользователя из базы данных
function loadUserScore() {
    const userRef = ref(database, 'users/' + userId);

    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById('score').innerText = `Очки: ${userData.points || 0}`;
        } else {
            // Если пользователь не существует в базе данных, создаем запись с 0 очков
            set(userRef, { points: 0 });
            document.getElementById('score').innerText = `Очки: 0`;
        }
    }).catch((error) => {
        console.error("Ошибка загрузки очков:", error);
    });
}

// Функция добавления очков
function addPoints(points) {
    const scoreElement = document.getElementById('score');
    const currentScore = parseInt(scoreElement.innerText.split(' ')[1]);

    const newPoints = currentScore + points;

    // Обновляем очки в базе данных
    set(ref(database, 'users/' + userId), {
        points: newPoints
    }).then(() => {
        scoreElement.innerText = `Очки: ${newPoints}`;
    }).catch((error) => {
        console.error("Ошибка обновления очков:", error);
    });
}

// Привязываем событие клика к квадрату
document.getElementById('square').onclick = () => addPoints(1);

// Загружаем очки пользователя при загрузке страницы
loadUserScore();
