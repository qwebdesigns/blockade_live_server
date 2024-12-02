function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://blockade3d.com/api_classic/servers/handler.php?NETWORK=1&CMD=4&time=1', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            handleResponse(xhr.responseText);
            startTimer(5); // Запускаем таймер на 5 секунд
        } else if (xhr.readyState === 4) {
            console.error('Error:', xhr.statusText);
        }
    };

    xhr.send();
}
const allmapstonotify = document.querySelector('.allmapstonotify');

function startTimer(seconds) {
    const timerElement = document.querySelector('.deley_timer');
    let countdown = seconds;

    const interval = setInterval(() => {
        timerElement.textContent = countdown;
        countdown--;

        if (countdown < 0) {
            clearInterval(interval);
            timerElement.textContent = 'Получение данных...';
            fetchData(); // Запускаем новый запрос данных
        }
    }, 1000);
}

function handleResponse(responseText) {
    // Разделяем текст по символу '^'
    const lines = responseText.split('^');
    // Удаляем лишние пробелы и фильтруем пустые строки
    const filteredLines = lines.map(line => line.trim()).filter(line => line.length > 0);

    // Преобразуем каждую строку в массив подстрок, разделенных символом '|'
    const multiDimensionalArray = filteredLines.map(line => line.split('|'));

    //console.log('Массив до удаления 2-го и 10-го элемента:', multiDimensionalArray);
    // Удаляем 2-й и 10-й элементы из каждого подмассива
    const modifiedArray = multiDimensionalArray.map(arr => {
        return arr.filter((_, index) => index !== 2 && index !== 10 && index !== 9 && index !== 8 && index !== 7);
    });



    // Создаем массив объектов с заданными ключами
    const keys = ["st1", "Режим", "st232", "кол-игроков", "Макс. игроков", "Айди или ник"];
    const jsonOutput = modifiedArray.map(arr => {
        const namedObject = {};
        arr.forEach((value, index) => {
            if (index < keys.length) { // Убедимся, что индекс не выходит за пределы массива ключей
                namedObject[keys[index]] = value; // Присваиваем значения по ключам
            }
        });
        return namedObject; // Возвращаем объект для каждой строки
    });
    //console.table(jsonOutput);
    const filteredOutput = jsonOutput.filter(obj => obj["кол-игроков"] !== "0");

    // Заменяем значения в графе "Режим"
    const modeMapping = {
        '2': "Стройка",
        '5': "Контра",
        '0': "Битва",
        '3': "Зомби",
        '14': "Гангейм",
        '6': "Резня",
        '7': "Выживание"
    };
    // Заменяем значения в графе "Айди или ник"
    const mapMapping = {
        '1':  "	Цитадель",
        '2':  "Вышка",
        '3':  "Форпост 2",
        '4':  "Осада",
        '5':  "Деревня 2",
        '6':  "Острова",
        '7':  "Собор 2",
        '8':  "Город",
        '9':  "Слизняк",
        '10':  "Форпост 3",
        '11':  "Припять",
        '12':  "Энергетик",
        '13':  "Клазмос",
        '14':  "Острова 2017",
        '15':  "Эпик",
        '16':  "Башни",
        '17':  "Пристань",
        '18':  "Зимний сад",
        '19':  "Общежитие",
        '20':  "Зимний замок",
        '21':  "Порт",
        '22':  "Крепость",
        '23':  "Вышка",
        '24':  "Япония",
        '25':  "Подземка",
        '26':  "Секретная база",
        '27':  "Канализация",
        '509':  "Меншен",
        '513':  "Минидаст",
        '514':  "Бассейн",
        '523':  "Лаборатория",
        '540':  "Руины",
        '512':  "Даст 2002",
        '506':  "Офис",
        '539':  "Ангар",
        '518':  "Станция",
        '603':  "Арена 35",
        '619':  "Вафельница",
        '601':  "Стайл",
        '633':  "Стилпоинт",
        '606':  "Напрямик",
        '614':  "Праздничная комната",
        '621':  "Меншен",
        '1406': "Хоринесс",
        '1413': "Дайр",
        '1402': "Скретч",
        '1405': "Перекрёсток 2",
        '1404': "Высотка",
        '1411': "Индастриал",
        '302':  "Дом",
        '301':  "Деревня-Z 2",
        '313':  "Бункер",
        '309':  "Кровавая долина",
        '710':  "Шапито",
        '701':  "Пляж"
    };

    filteredOutput.forEach(obj => {
        if (modeMapping[obj["Режим"]] !== undefined) {
            obj["Режим"] = modeMapping[obj["Режим"]];
        }
    });
    filteredOutput.forEach(obj => {
        if (mapMapping[obj["Айди или ник"]] !== undefined) {
            obj["Айди или ник"] = mapMapping[obj["Айди или ник"]];
        }
    });

    allmapstonotify.innerHTML = '';




    // Преобразуем массив объектов в формат JSON
    const finalJsonOutput = JSON.stringify(filteredOutput, null, 2); // Преобразуем в JSON с отступами для удобочитаемости

    //console.log(finalJsonOutput); // Выводим JSON-строку

    // Вставляем JSON в тело страницы
    const contentElement = document.querySelector('.content'); // Ищем элемент с классом content
    contentElement.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек

    // Проходим по каждому объекту в массиве jsonDataArray
    const jsonDataArray = JSON.parse(finalJsonOutput);
    jsonDataArray.forEach(jsonData => {
        // Получаем элемент с классом 'card'
        const originalCard = document.querySelector('.card');

        // Клонируем элемент (true - для глубокого клонирования, включая дочерние элементы)
        const clonedCard = originalCard.cloneNode(true);

        // Находим элемент h1 в клонированной карточке
        const pElement = clonedCard.querySelector('.p');
        const spanElement = clonedCard.querySelector('.span');
        const hElement = clonedCard.querySelector('.h1');

        // Устанавливаем значение из JSON в элемент h1
        hElement.textContent = jsonData["Айди или ник"];
        pElement.textContent = jsonData["Режим"];
        spanElement.textContent = jsonData["кол-игроков"] + " / " + jsonData["Макс. игроков"];

        // Вставляем клонированную карточку в элемент с классом 'content'
        contentElement.appendChild(clonedCard);
        allmapstonotify.textContent = allmapstonotify.textContent + jsonData["Айди или ник"] + "|";
    });
    const cards = document.querySelectorAll('.card');
    const pointer = document.getElementById('pointer');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pointer.style.width = '0px';
            pointer.style.height = '0px';
        });

        card.addEventListener('mouseleave', () => {
            pointer.style.width = '2vw'; // Вернуть к исходным размерам
            pointer.style.height = '2vw';
        });
    });
}

// Запускаем первый запрос данных при загрузке страницы
fetchData();