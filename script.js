// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBcYnnQ98fkM_lB8T0GqyHa-re2iT4yaoU",
    authDomain: "gombuls-game.firebaseapp.com",
    databaseURL: "https://gombuls-game-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "gombuls-game",
    storageBucket: "gombuls-game.appspot.com",
    messagingSenderId: "310691283889",
    appId: "1:310691283889:web:4165ce19c145bf83c87390",
    measurementId: "G-QGQ2LJGSJF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const gameArea = document.getElementById("gameArea");
let score = 0;

// Получение ID пользователя из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id'); // Ожидается, что ID пользователя будет передан в URL

gameArea.addEventListener("click", () => {
    score++;
    gameArea.textContent = score;

    // Сохранение очков в базе данных
    set(ref(database, `users/${userId}/points`), score)
        .then(() => {
            console.log("Score saved successfully.");
        })
        .catch((error) => {
            console.error("Error saving score:", error);
        });
});
