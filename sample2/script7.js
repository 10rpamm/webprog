/* =========================================================================
   1. НАЧАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ (строго по заданию)
   ========================================================================= */
// Массив из 5 целых чисел (10 и 30 оканчиваются на 0, 23 и 47 - простые)
let arr = [10, 15, 23, 30, 47];

// Массив из 5 элементов, последний - массив из 3 строк
let str = ["apple", "cherry", "date", "coconut", ["fig", "grape", "kiwi"]];

// Вспомогательная функция для вывода (демонстрирует оператор rest (...) и spread)
const log = (taskNum, text, ...data) => console.log(`[Задание ${taskNum}] ${text}`, ...data);


/* =========================================================================
   2. РЕШЕНИЕ ЗАДАЧ (без циклов for)
   ========================================================================= */

// 1. Новый массив: элемент + удвоенный индекс (используем map)
const arr_new1 = arr.map((val, idx) => val + idx * 2);
log(1, "arr_new1", arr_new1);

// 2. Количество элементов, оканчивающихся на 0 (используем filter)
const countZero = arr.filter(val => val % 10 === 0).length;
log(2, "Количество чисел, оканчивающихся на 0", countZero);

// 3. Новый массив: среднее значение соседних элементов (используем map)
const arr_new2 = arr.map((val, idx, array) => {
    if (idx === 0) return array[1]; // У первого только правый сосед
    if (idx === array.length - 1) return array[array.length - 2]; // У последнего только левый
    return (array[idx - 1] + array[idx + 1]) / 2; // Среднее двух соседей
});
log(3, "arr_new2 (среднее соседей)", arr_new2);

// 4. Стрелочная функция: число из k-го элемента arr с перевернутыми цифрами (без reverse)
// Используем spread (...) для разбивки строки и reduce для сбора в обратном порядке
const reverseNum = (k) => {
    const strNum = String(arr[k]);
    return Number([...strNum].reduce((acc, char) => char + acc, ""));
};
log(4, "Перевернутое число (k=2, было 23)", reverseNum(2));

// 5. Удалить простые числа из arr (используем filter)
// Проверка на простоту без for: генерируем массив делителей и проверяем через every
const isPrime = (n) => {
    if (n < 2) return false;
    const limit = Math.floor(Math.sqrt(n));
    const divisors = Array.from({ length: limit - 1 }, (_, i) => i + 2);
    return divisors.every(d => n % d !== 0);
};
arr = arr.filter(num => !isPrime(num)); // Перезаписываем arr, оставляя только НЕ простые
log(5, "arr после удаления простых чисел", arr);

// 6. Функция вывода k-го символа из n-го элемента массива str (шаблонная строка)
const getChar = (n, k) => console.log(`[Задание 6] Символ: ${str[n][k]}`);
getChar(1, 2); // 'r' из "cherry"

// 7. Массив из всех строчных элементов str, вставленный вторым элементом (индекс 1)
// Используем filter для отбора строк и spread (...) для вставки в новый массив
const strOnly = str.filter(item => typeof item === "string");
str = [str[0], strOnly, ...str.slice(1)];
log(7, "str после вставки массива строк на 2-ю позицию", str);

// 8. Стрелочная функция: количество символов k-го элемента из последнего элемента str
const getLenFromLast = (k) => console.log(`[Задание 8] Длина: ${str[str.length - 1][k].length}`);
getLenFromLast(1); // Длина "grape" = 5

// 9. Стрелочная функция: меняет местами k-й и n-й элементы массива str
// Используем деструктуризацию массива (из лекции) для обмена без временной переменной
const swap = (k, n) => {
    [str[k], str[n]] = [str[n], str[k]];
};
swap(1, 2);
log(9, "str после обмена элементов 1 и 2", str);

// 10. Общее количество вхождений «c» (без учета регистра) в нечетные строки массива str
// Используем reduce для накопления и spread + reduce для подсчета букв в строке
const countC = str.reduce((acc, item, idx) => {
    if (idx % 2 !== 0 && typeof item === "string") {
        const cCount = [...item.toLowerCase()].reduce((sum, char) => char === 'c' ? sum + 1 : sum, 0);
        return acc + cCount;
    }
    return acc;
}, 0);
log(10, "Количество букв 'c' в строках с нечетными индексами", countC);

// 11. Стрелочная функция: строка из первых букв каждого элемента str + вложенного массива
const getFirstLetters = () => {
    const base = str.reduce((acc, item) => typeof item === "string" ? acc + item[0] : acc, "");
    const last = str[str.length - 1];
    const nested = Array.isArray(last) ? last.reduce((acc, item) => acc + item[0], "") : "";
    console.log(`[Задание 11] Первые буквы: ${base}${nested}`);
};
getFirstLetters();

// 12. (*) Массив из элементов str, записанных в обратном порядке (без встроенных функций типа reverse)
// Рекурсивная функция с использованием map, reduce и spread
const reverseElement = (item) => {
    if (typeof item === "string") {
        return [...item].reduce((acc, char) => char + acc, "");
    }
    if (Array.isArray(item)) {
        return item.reduce((acc, val) => [reverseElement(val), ...acc], []);
    }
    return item;
};
const strReversed = str.map(item => reverseElement(item));
log(12, "Массив str с элементами в обратном порядке", strReversed);