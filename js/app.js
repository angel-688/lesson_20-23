(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const buttonBlock = document.querySelector(".blocks__button-block");
    document.addEventListener("click", (function(e) {
        let target = e.target;
        const textareaValue = document.querySelector(".search-text__textarea").value;
        const wordLabel = document.querySelector(".search-text__label-word");
        const symbolLabel = document.querySelector(".search-text__label-symbol");
        const item = document.querySelectorAll(".blocks__item");
        const circleValue = document.querySelector(".circle__input").value;
        const resultCircle = document.querySelectorAll(".circle__result");
        const listItems = document.querySelectorAll(".block-list__item");
        if (target.closest(".block-list__item")) if (e.ctrlKey || e.metaKey) setSeveralClass(target); else setSingleClass(listItems, "_active", target, e); else removeClass(listItems, "_active");
        if (target.closest(".blocks__close")) {
            const blockItem = document.querySelector(".blocks__item");
            blockItem.remove();
            if (item.length <= 5) {
                const limit = document.querySelector(".blocks__limit");
                limit.remove();
            }
        }
        if (target.closest(".blocks__button")) {
            const blockBody = document.querySelector(".blocks__body");
            blockBody.insertAdjacentHTML("beforeend", `<div class="blocks__item">\n         <div class="blocks__wrapper">\n            <div class="blocks__close">X</div>\n            <div class="blocks__title">Lorem ipsum dolor sit amet.</div>\n            <p class="blocks__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente\n               expedita fuga distinctio ex molestiae nam! Sed consectetur assumenda laborum qui provident\n               temporibus maiores voluptate nostrum, fuga, a corrupti totam quaerat.</p>\n         </div>\n      </div>`);
            if (item.length > 4) {
                item.forEach(((element, index) => {
                    if (index >= 4) element.remove();
                }));
                createLimit("div", "??????????, 5 ???????????? ????????????");
            }
        }
        if (target.closest(".dividers__button")) {
            const resultBlock = document.querySelector(".dividers__result");
            if (resultBlock) resultBlock.remove();
            calcDividers();
        }
        if (target.closest(".search-text__label-word")) wordLabel.classList.toggle("_active");
        if (target.closest(".search-text__label-symbol")) symbolLabel.classList.toggle("_active");
        if (target.closest(".search-text__button")) {
            const wordValue = document.querySelectorAll(".search-text__value");
            const numberWarning = document.querySelector(".search-text__num");
            if (numberWarning) numberWarning.remove();
            if (wordValue.length) wordValue.forEach((item => {
                item.remove();
            }));
            if (wordLabel.classList.contains("_active")) setWordCount(textareaValue);
            if (symbolLabel.classList.contains("_active")) setSymbolCount(textareaValue);
        }
        if (target.closest(".circle__button-area")) {
            if (resultCircle.length) resultCircle.forEach((elem => {
                elem.remove();
            }));
            calcCircleArea(circleValue);
        }
        if (target.closest(".circle__button-ring")) {
            if (resultCircle.length) resultCircle.forEach((elem => {
                elem.remove();
            }));
            calcRing(circleValue);
        }
        if (target.closest(".football__field")) moveBall(e);
    }));
    function createLimit(tag, text) {
        const limits = document.querySelectorAll(".blocks__limit");
        let limitMessage = document.createElement(tag);
        limitMessage.classList.add("blocks__limit");
        limitMessage.innerHTML = text;
        buttonBlock.append(limitMessage);
        limits.forEach(((item, position) => {
            if (0 === position) item.remove();
        }));
    }
    function setSingleClass(block, classAddName, elem, event) {
        block.forEach((item => {
            if (item.classList.contains(classAddName)) item.classList.remove(classAddName);
            elem.classList.add(classAddName);
            event.preventDefault();
        }));
    }
    function setSeveralClass(elem) {
        elem.classList.toggle("_active");
    }
    function removeClass(block, classRemoveName) {
        block.forEach((listItem => {
            listItem.classList.remove(classRemoveName);
        }));
    }
    function calcDividers() {
        const divInput = document.querySelector(".dividers__input").value;
        let result = [];
        for (let index = 1; index <= divInput; index++) if (divInput % index === 0) {
            let sum = divInput / index;
            result.push(sum);
        }
        if (divInput.length) createResult(".dividers__body", "dividers__result", `?????????? ${divInput} ?????????? ???????????? ????:` + " " + result);
    }
    function setWordCount(field) {
        const wordCount = field.match(/(\p{L}{2,})/gu);
        if (null !== wordCount) createResult(".search-text__body", "search-text__value", `???????????????????? ???????? ?? ???????????? ????????????: ${wordCount.length}`); else createResult(".search-text__body", "search-text__num", "?? ???????????? ???????????? ?????????? ?? ??????????????");
    }
    function setSymbolCount(field) {
        const symbolCount = field.match(/\S/g);
        if (null !== symbolCount) createResult(".search-text__body", "search-text__value", `???????????????????? ???????????????? ?? ???????????? ????????????: ${symbolCount.length}`);
    }
    function calcCircleArea(valueCirle) {
        const circle = document.querySelector(".circle__figure");
        let sumArea = Math.round(10 * (3.14 * Math.pow(+valueCirle, 2) + Number.EPSILON)) / 10;
        circle.style.cssText = `\n   width: ${+sumArea}px;\n   height: ${+sumArea}px;\n   transition: all 0.3s ease 0s;\n   `;
        if (+sumArea > 200) circle.style.cssText = `\n   width: 200px;\n   height: 200px;\n   transition: all 0.3s ease 0s;\n   `; else if (+sumArea < 70) circle.style.cssText = `\n   width: 100px;\n   height: 100px;\n   transition: all 0.3s ease 0s;\n   `;
        createResult(".circle__body", "circle__result", `?????????????? ?????????? ??????????: ${sumArea}????`);
    }
    function calcRing(valueCirle) {
        let sumRing = Math.round(10 * (2 * 3.14 * valueCirle + Number.EPSILON)) / 10;
        createResult(".circle__body", "circle__result", `???????????? ???????????????????? ??????????: ${sumRing}????`);
    }
    function createResult(bodyClass, createClass, createText) {
        const bodyBlock = document.querySelector(bodyClass);
        let resultMessage;
        resultMessage = document.createElement("div");
        resultMessage.classList.add(createClass);
        resultMessage.innerHTML = createText;
        bodyBlock.append(resultMessage);
    }
    function moveBall(event) {
        const field = document.querySelector(".football__field");
        const ball = document.querySelector(".football__ball");
        let sizeBall = {
            width: ball.clientWidth,
            height: ball.clientHeight
        };
        let left = event.clientX - field.getBoundingClientRect().left - sizeBall.width / 2 - field.clientLeft;
        let top = event.clientY - field.getBoundingClientRect().top - sizeBall.height / 2 - field.clientTop;
        if (left > field.clientWidth - sizeBall.width) left = field.clientWidth - sizeBall.width;
        if (0 > left) left = 0;
        if (top > field.clientHeight - sizeBall.height) top = field.clientHeight - sizeBall.height;
        if (0 > top) top = 0;
        ball.style.left = left + "px";
        ball.style.top = top + "px";
    }
    window["FLS"] = true;
    isWebp();
})();