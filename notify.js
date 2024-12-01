Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log('Разрешение на уведомления получено.');
    } else {
        console.log('Не удалось получить разрешение на уведомления.');
    }
});

const notificationOptions = {
    body: "Это сообщение уведомления!",
    icon: ""
};

new Notification("Заголовок уведомления", notificationOptions);


setInterval(() => {
    new Notification("Напоминание!", {
        body: "Не забудьте проверить обновления!",
        icon: "./icon.png"
    });
}, 500); // Каждую минуту