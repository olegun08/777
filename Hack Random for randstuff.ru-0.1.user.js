// ==UserScript==
// @name         Hack Random for randstuff.ru
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       mikhailsdv
// @match        https://randstuff.ru/number/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=randstuff.ru
// @grant        none
// ==/UserScript==

;(function () {
    "use strict"

    // Заданное первое число
    const firstNumber = 7

    // Функция для генерации массива из 4 уникальных случайных чисел (исключая первое число)
    function generateUniqueNumbers(count, max, exclude) {
        const numbers = new Set()
        while (numbers.size < count) {
            const randomNumber = Math.floor(Math.random() * max) + 1
            if (randomNumber !== exclude) {
                numbers.add(randomNumber)
            }
        }
        return Array.from(numbers)
    }

    $("#button.number").off()
    const el = document.querySelector("#number")

    $("#button.number").on("click", () => {
        // Генерация массива из 5 чисел: первое — заданное, остальные — случайные
        const currentNumbers = [firstNumber, ...generateUniqueNumbers(5, 65, firstNumber)]

        // Отображение всех 5 чисел
        const caption = $("#caption")
        const container = $("#number")

        caption.text(caption.data("txt"))
        container.attr("class", "single")

        let html = '<span class="new">'
        currentNumbers.forEach((number) => {
            html += `<span>${number}</span> `
        })
        html += "</span>"

        container.find(".new").attr("class", "cur")
        container.find(".cur").remove()
        container.append(html)

        let b = 1
        container.find(".new span").each(function () {
            $(this)
                .delay(parseInt(200 / currentNumbers.length) * b++)
                .animate({bottom: 0}, 200, "easeOutQuint")
        })
    })
})()