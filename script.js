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

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Получаем ID пользователя из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

// Проверяем, запущено ли приложение внутри Telegram Web App
if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Инициализируем Web App
    tg.ready();

    // Загружаем текущие очки пользователя
    get(ref(database, 'users/' + userId)).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById('score').innerText = `Очки: ${userData.points || 0}`;
        } else {
            console.warn('Пользователь не найден. Создаем нового пользователя.');
            // Если пользователь не найден, создаем нового с 0 очками
            set(ref(database, 'users/' + userId), {
                points: 0
            }).then(() => {
                document.getElementById('score').innerText = `Очки: 0`;
            }).catch((error) => {
                console.error('Ошибка создания пользователя в Firebase:', error);
            });
        }
    }).catch((error) => {
        console.error('Ошибка загрузки данных из Firebase:', error);
    });

    // Функция для добавления очков
    function addPoints(points) {
        const currentScoreText = document.getElementById('score').innerText;
        const currentScore = parseInt(currentScoreText.split(' ')[1]);
        const newScore = currentScore + points;

        // Обновляем очки в базе данных
        set(ref(database, 'users/' + userId), {
            points: newScore
        }).then(() => {
            // Обновляем очки на странице
            document.getElementById('score').innerText = `Очки: ${newScore}`;
            console.log('Очки успешно обновлены:', newScore);
        }).catch((error) => {
            console.error('Ошибка обновления очков в Firebase:', error);
        });
    }

    // Добавляем обработчик клика на изображение
    document.getElementById('gmblsImage').addEventListener('click', function() {
        addPoints(1);
        console.log('Клик по изображению засчитан, очки прибавлены.');
    });

    // Убираем двойной клик
    document.getElementById('gmblsImage').addEventListener('dblclick', (e) => {
        e.preventDefault();
    });

    // Используем основную кнопку Telegram для отладки
    tg.MainButton.text = "Прибавить очки";
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
        addPoints(1);
    });

} else {
    console.log('Приложение запущено вне Telegram Web App.');
}
