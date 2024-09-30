import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Конфигурация Firebase
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

// Загружаем очки пользователя
get(ref(database, 'users/' + userId)).then((snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();
        document.getElementById('score').innerText = `Очки: ${userData.points || 0}`;
    } else {
        // Если данных нет, создаем нового пользователя с 0 очками
        set(ref(database, 'users/' + userId), {
            points: 0
        });
        document.getElementById('score').innerText = `Очки: 0`;
    }
});

// Функция добавления очков
function addPoints(points) {
    const currentScore = parseInt(document.getElementById('score').innerText.split(' ')[1]);
    const newPoints = currentScore + points;

    // Обновляем очки в базе данных
    set(ref(database, 'users/' + userId), {
        points: newPoints
    });

    document.getElementById('score').innerText = `Очки: ${newPoints}`;
}

// Привязываем функцию к квадрату
document.getElementById('square').onclick = () => addPoints(1);
