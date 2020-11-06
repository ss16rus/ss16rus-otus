/*
Homework #2
Цель: Написать алгоритм и функцию `getPath()`, находяющую уникальный css-селектор для элемента в 
документе. Уникальный селектор может быть использован `document.querySelector()` и 
возвращать исходный элемент. Так чтобы `document.querySelectorAll()`, 
вызванный с этим селектором, не должен находить никаких элементов, кроме исходного.

Алгоритм будет такой:
Исходим из того, что судя по всему, мы имеем консольв браузере.
Создаем пустую строку, которая будет содержать набор искомых селекторов

1. Ищем id элемента, добавляем в строку проверяем, на уникальность
2. Если уникально - возвращаем результат
3. Ищем класс элемента, добавляем в строку проверяем, на уникальность
4. Если уникально - то возвращаем результат
5. Ищем nth-child элемента и parentElement, добавляем в строку
6. Если уникально - то возвращаем результат
7. parentElement становится на место искомого элемента в п.1
*/

function getPath( element, path = "" ) {
    if ( element.id != "" ) {
        return element.tagName + "#" + element.id + path; 
    }
    if (element.className != "" && 
        typeof element.className != "object" &&
        document.querySelectorAll(element.tagName + "." + element.className).length == 1) {
            return element.tagName + "." + element.className + path;
    }
    
    const parentElement = element.parentElement;
    const arr = Array.from(parentElement.children);
    let subPath = " ";

    if ( arr.length == 1 ) {
        subPath += element.tagName;
    } else {
        const index = arr.indexOf(element) + 1;
        subPath += ":nth-child(" + index + ")";
    }

    const newPath = parentElement.tagName + subPath + path;
    if ( document.querySelectorAll( newPath ).length == 1 ) {
        return newPath;
    } else {
        return getPath( parentElement, subPath + path );
    }
}
