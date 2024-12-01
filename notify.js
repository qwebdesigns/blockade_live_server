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

Push.create("Hello world!", {
    body: "How's it hangin'?",
    icon: '/icon.png',
    timeout: 4000,
    onClick: function () {
        window.focus();
        this.close();
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Вкладка активна, можно отправить уведомление
        new Notification("Вы снова на странице!", {
            body: "Мы рады вас видеть!",
            icon: "./icon.png"
        });
    }
});

setInterval(() => {
    new Notification("Напоминание!", {
        body: "Не забудьте проверить обновления!",
        icon: "./icon.png"
    });
}, 10000); // Каждую минуту