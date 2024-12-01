Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log('Разрешение на уведомления получено.');
    } else {
        console.log('Не удалось получить разрешение на уведомления.');
    }
});

const notificationOptions = {
    body: "Супер! Вы включили уведомления!\n Теперь вы всегда будете в курсе вашей карты!.",
    icon: ""
};

new Notification("Проверка доступа к уведомлениям", notificationOptions);


setInterval(() => {
    new Notification("Напоминание!", {
        body: "Не забудьте проверить обновления!",
        icon: "./icon.png"
    });
}, 500); // Каждую минуту