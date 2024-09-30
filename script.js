import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBcYnnQ98fkM_lB8T0GqyHa-re2iT4yaoU",
    authDomain: "gombuls-game.firebaseapp.com",
    projectId: "gombuls-game",
    storageBucket: "gombuls-game.appspot.com",
    messagingSenderId: "310691283889",
    appId: "1:310691283889:web:4165ce19c145bf83c87390",
    measurementId: "G-QGQ2LJGSJF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Получаем ID пользователя из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

if (userId) {
    // Загружаем очки пользователя
    get(ref(database, 'users/' + userId)).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById('score').innerText = `Очки: ${userData.points || 0}`;
        } else {
            console.log("No data available for this user.");
        }
    }).catch((error) => {
        console.error("Error loading user data: ", error);
    });

    // Функция добавления очков
    function addPoints(points) {
        const currentScore = parseInt(document.getElementById('score').innerText.split(' ')[1]) || 0;
        const newPoints = currentScore + points;

        // Обновляем очки в базе данных
        set(ref(database, 'users/' + userId), {
            points: newPoints
        }).then(() => {
            document.getElementById('score').innerText = `Очки: ${newPoints}`;
        }).catch((error) => {
            console.error("Error updating score: ", error);
        });
    }

    // Обработка клика по кнопке
    document.getElementById('add-points-btn').addEventListener('click', () => addPoints(1));
} else {
    console.error("User ID not found in URL");
}
