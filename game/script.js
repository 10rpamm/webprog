let arr = []; // массив случайных чисел для генерации картинок
let firstBox = null; // первая открытая карточка (замена trabl для надежности)
let finish = 0; // подсчет найденных пар
let isGameActive = false; // игра активна только после нажатия кнопки

// Звуковые эффекты (убедитесь, что файлы лежат в папке sound)
let soundMatch = new Audio("sound/match.mp3");
let soundError = new Audio("sound/error.mp3");
let soundWin = new Audio("sound/win.mp3");

// кликаем на квадратик
function ClickBox(elem, i) {
    // Игру начинать только после нажатия на кнопку «Начать игру»
    if (!isGameActive) return;
    
    // Повторный клик по открытой или уже найденной картинке не должен ее скрывать/менять
    if (elem === firstBox || elem.classList.contains('matched')) {
        return;
    }

    let c = arr[i - 1] + 1;
    elem.style.backgroundImage = 'url("images/pic' + c + '.png")';

    if (firstBox == null) {
        firstBox = elem;
    } else {
        // Сравниваем значения из массива по индексу (это надежнее, чем сравнение строк стилей)
        let isFirstMatch = (arr[parseInt(firstBox.dataset.index) - 1] === arr[i - 1]);
        
        if (isFirstMatch) {
            // Найденная пара
            soundMatch.currentTime = 0;
            soundMatch.play().catch(e => {}); // catch предотвращает ошибки, если звук не загрузился
            setTimeout(DeleteBox, 300, elem, firstBox);
        } else {
            // Ошибка
            soundError.currentTime = 0;
            soundError.play().catch(e => {});
            setTimeout(CloseBox, 600, elem, firstBox);
        }
    }
}

// закрашиваем угаданные квадраты желтым цветом
function DeleteBox(box1, box2) {
    box1.style.background = 'yellow';
    box1.classList.add('matched'); // помечаем как найденную, чтобы запретить клик
    box2.style.background = 'yellow';
    box2.classList.add('matched');
    
    firstBox = null;
    finish++;
    
    // 8 пар для 16 квадратов
    if (finish == 8) {
        let span = document.getElementById("span"); 
        span.innerHTML = "Молодец!!!";
        soundWin.currentTime = 0;
        soundWin.play().catch(e => {});
        isGameActive = false; // Завершаем игру до следующего нажатия кнопки
    }
}

// закрываем квадраты
function CloseBox(box1, box2) {
    box1.style.backgroundImage = 'url("images/back.png")';
    box2.style.backgroundImage = 'url("images/back.png")';
    firstBox = null;
}

// возвращаем случайное число (оставлено из шаблона, хотя сейчас используется sort)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// заполняем массив arr случайными числами и запускаем игру
function Start(elem) {
    arr = [];
    firstBox = null;
    finish = 0;
    isGameActive = true; // Разрешаем кликать только сейчас
    document.getElementById("span").innerHTML = "";

    // Генерируем 8 пар чисел от 0 до 7 (всего 16 элементов)
    for (let i = 0; i < 8; i++) {
        arr.push(i);
        arr.push(i);
    }

    // Перемешиваем массив случайным образом
    arr.sort(() => Math.random() - 0.5);

    // Сбрасываем визуальное состояние всех квадратов и привязываем индекс
    let boxes = document.getElementsByClassName("div1");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].dataset.index = i + 1; // сохраняем номер (1-16) для сверки
        boxes[i].style.background = ''; // сброс желтого цвета от прошлой игры
        boxes[i].classList.remove('matched');
        boxes[i].style.backgroundImage = 'url("images/back.png")';
    }

    elem.innerHTML = "Начать заново";
}