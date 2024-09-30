// Инициализация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBcYnnQ98fkM_lB8T0GqyHa-re2iT4yaoU",
    authDomain: "gombuls-game.firebaseapp.com",
    projectId: "gombuls-game",
    storageBucket: "gombuls-game.appspot.com",
    messagingSenderId: "310691283889",
    appId: "1:310691283889:web:4165ce19c145bf83c87390",
    measurementId: "G-QGQ2LJGSJF"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Переменные
let score = 0;
const userId = "USER_ID"; // Заменить на ID текущего пользователя

// Функция для загрузки очков из Firebase при загрузке страницы
function loadScore() {
    db.collection("users").doc(userId).get().then((doc) => {
        if (doc.exists) {
            score = doc.data().balance; // Исправлено на balance
            document.getElementById('score').innerText = 'Очки: ' + score;
        } else {
            console.log("Пользователь не найден!");
        }
    }).catch((error) => {
        console.error("Ошибка загрузки данных:", error);
    });
}

// Функция для сохранения очков в Firebase
function saveScore() {
    db.collection("users").doc(userId).update({
        balance: score // Исправлено на balance
    }).then(() => {
        console.log("Очки успешно сохранены!");
    }).catch((error) => {
        console.error("Ошибка сохранения данных:", error);
    });
}

// Обработчик нажатия на картинку
document.getElementById('clickableImage').addEventListener('click', () => {
    score++;
    document.getElementById('score').innerText = 'Очки: ' + score;
    saveScore();
});

// Загрузка очков при загрузке страницы
window.onload = loadScore;
