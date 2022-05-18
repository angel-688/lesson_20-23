// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
const buttonBlock = document.querySelector('.blocks__button-block');
document.addEventListener("click", function (e) {
   let target = e.target;
   const textareaValue = document.querySelector('.search-text__textarea').value;
   const wordLabel = document.querySelector('.search-text__label-word');
   const symbolLabel = document.querySelector('.search-text__label-symbol');
   const item = document.querySelectorAll('.blocks__item');
   const circleValue = document.querySelector('.circle__input').value;
   const resultCircle = document.querySelectorAll('.circle__result');
   // Список
   const listItems = document.querySelectorAll('.block-list__item');
   if (target.closest('.block-list__item')) {
      if (e.ctrlKey || e.metaKey) {
         setSeveralClass(target);
      } else {
         setSingleClass(listItems, '_active', target, e);
      }
   } else {
      removeClass(listItems, '_active');
   }
   //Работа с блоками
   if (target.closest('.blocks__close')) {
      const blockItem = document.querySelector('.blocks__item');
      blockItem.remove();
      if (item.length <= 5) {
         const limit = document.querySelector('.blocks__limit');
         limit.remove();
      }
   }
   if (target.closest('.blocks__button')) {
      const blockBody = document.querySelector('.blocks__body');
      blockBody.insertAdjacentHTML(
         'beforeend',
         `<div class="blocks__item">
         <div class="blocks__wrapper">
            <div class="blocks__close">X</div>
            <div class="blocks__title">Lorem ipsum dolor sit amet.</div>
            <p class="blocks__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
               expedita fuga distinctio ex molestiae nam! Sed consectetur assumenda laborum qui provident
               temporibus maiores voluptate nostrum, fuga, a corrupti totam quaerat.</p>
         </div>
      </div>`
      );
      if (item.length > 4) {
         item.forEach((element, index) => {
            if (index >= 4) {
               element.remove();
            }
         });
         createLimit('div', 'Думаю, 5 блоков хватит');
      }
   }
   // Делители
   if (target.closest('.dividers__button')) {
      const resultBlock = document.querySelector('.dividers__result');
      if (resultBlock) {
         resultBlock.remove();
      }
      calcDividers();
   }
   //Анализатор текста
   if (target.closest('.search-text__label-word')) {
      wordLabel.classList.toggle('_active');
   }
   if (target.closest('.search-text__label-symbol')) {
      symbolLabel.classList.toggle('_active');
   }
   if (target.closest('.search-text__button')) {
      const wordValue = document.querySelectorAll('.search-text__value');
      const numberWarning = document.querySelector('.search-text__num');
      if (numberWarning) {
         numberWarning.remove();
      }
      if (wordValue.length) {
         wordValue.forEach(item => {
            item.remove();
         });
      }
      if (wordLabel.classList.contains('_active')) {
         setWordCount(textareaValue);
      }
      if (symbolLabel.classList.contains('_active')) {
         setSymbolCount(textareaValue);
      }
   }
   //Площадь и окружность круга
   if (target.closest('.circle__button-area')) {
      if (resultCircle.length) {
         resultCircle.forEach(elem => {
            elem.remove();
         })
      }
      calcCircleArea(circleValue);
   }
   if (target.closest('.circle__button-ring')) {
      if (resultCircle.length) {
         resultCircle.forEach(elem => {
            elem.remove();
         })
      }
      calcRing(circleValue);
   }
   // Мяч
   if (target.closest('.football__field')) {
      moveBall(e);
   }
});

function createLimit(tag, text) {
   const limits = document.querySelectorAll('.blocks__limit');
   let limitMessage = document.createElement(tag);
   limitMessage.classList.add('blocks__limit');
   limitMessage.innerHTML = text;
   buttonBlock.append(limitMessage);
   limits.forEach((item, position) => {
      if (position === 0) {
         item.remove();
      }
   });
}

function setSingleClass(block, classAddName, elem, event) {
   block.forEach(item => {
      if (item.classList.contains(classAddName)) {
         item.classList.remove(classAddName);
      }
      elem.classList.add(classAddName);
      event.preventDefault()
   });
}

function setSeveralClass(elem) {
   elem.classList.toggle('_active');
}

function removeClass(block, classRemoveName) {
   block.forEach(listItem => {
      listItem.classList.remove(classRemoveName);
   });
}

function calcDividers() {
   const divInput = document.querySelector('.dividers__input').value;
   let result = [];
   for (let index = 1; index <= divInput; index++) {
      if (divInput % index === 0) {
         let sum = divInput / index;
         result.push(sum);
      }
   }
   if (divInput.length) {
      createResult('.dividers__body', 'dividers__result', `Число ${divInput} можно делить на:` + ' ' + result);
   }
}

function setWordCount(field) {
   const wordCount = field.match(/(\p{L}{2,})/gu);
   if (wordCount !== null) {
      createResult('.search-text__body', 'search-text__value', `Количество слов в данной строке: ${wordCount.length}`);
   } else {
      createResult('.search-text__body', 'search-text__num', 'Я считаю только слова и символы');
   }
}
function setSymbolCount(field) {
   const symbolCount = field.match(/\S/g);
   if (symbolCount !== null) {
      createResult('.search-text__body', 'search-text__value', `Количество символов в данной строке: ${symbolCount.length}`);
   }
}

function calcCircleArea(valueCirle) {
   const circle = document.querySelector('.circle__figure');
   let sumArea = Math.round((3.14 * Math.pow(+valueCirle, 2) + Number.EPSILON) * 10) / 10;
   circle.style.cssText = `
   width: ${+sumArea}px;
   height: ${+sumArea}px;
   transition: all 0.3s ease 0s;
   `;
   if (+sumArea > 200) {
      circle.style.cssText = `
   width: 200px;
   height: 200px;
   transition: all 0.3s ease 0s;
   `;
   } else if (+sumArea < 70)
      circle.style.cssText = `
   width: 100px;
   height: 100px;
   transition: all 0.3s ease 0s;
   `;
   createResult('.circle__body', 'circle__result', `Площадь круга равна: ${sumArea}см`);
}
function calcRing(valueCirle) {
   let sumRing = Math.round((2 * 3.14 * valueCirle + Number.EPSILON) * 10) / 10;
   createResult('.circle__body', 'circle__result', `Длинна окружности равна: ${sumRing}см`);
}
function createResult(bodyClass, createClass, createText) {
   const bodyBlock = document.querySelector(bodyClass);
   let resultMessage;
   resultMessage = document.createElement('div');
   resultMessage.classList.add(createClass);
   resultMessage.innerHTML = createText;
   bodyBlock.append(resultMessage);
}

function moveBall(event) {
   const field = document.querySelector('.football__field');
   const ball = document.querySelector('.football__ball');
   let sizeBall = {
      width: ball.clientWidth,
      height: ball.clientHeight,
   }
   let left = event.clientX - field.getBoundingClientRect().left - (sizeBall.width / 2) - field.clientLeft;
   let top = event.clientY - field.getBoundingClientRect().top - (sizeBall.height / 2) - field.clientTop;
   if (left > field.clientWidth - sizeBall.width) {
      left = field.clientWidth - sizeBall.width;
   }
   if (0 > left) {
      left = 0;
   }
   if (top > field.clientHeight - sizeBall.height) {
      top = field.clientHeight - sizeBall.height;
   }
   if (0 > top) {
      top = 0;
   }
   ball.style.left = left + 'px';
   ball.style.top = top + 'px';
}