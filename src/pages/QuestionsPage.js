import React, { useState } from 'react';
import styled from 'styled-components';

function Questionspage() {
  const [next, setNext] = useState(0);
  const reposition = () =>
    setNext(next !== questions.length - 1 ? next + 1 : 0);

  return (
    <>
      <StyledApp onClick={reposition}>
        <Wrapper>
          <Question>
            {next}
            {'. '}
            {questions[next].content}
          </Question>
          <Answer>{questions[next].answer}</Answer>
        </Wrapper>
      </StyledApp>
    </>
  );
}

export { Questionspage };

export const StyledApp = styled.div`
  font-family: Arial !important;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Wrapper = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
`;
export const Question = styled.div`
  background-color: whitesmoke;
  height: 100px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    font-size: 20px;
  }
`;

export const Answer = styled.div`
  background-color: grey;
  height: 400px;
  font-size: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

let questions = [
  {
    content: 'Типы данных в JavaScript?',
    answer: 'строка, число, bigint, boolean, symbol, обьект, null, undefined',
  },
  {
    content: 'Разница между == и === ?',
    answer:
      'нестрогое равенство просто сравнивает значение, строгое дополнительно сравнивает их типы',
  },
  {
    content: 'Что такое Strict mode в JavaScript?',
    answer: 'позволяет использовать более строгий вариант js синтаксиса',
  },
  {
    content: 'Разница между function declaration и function expression?',
    answer:
      'function declaration - функция созданная интепретатором до выполнения кода. Можно вызвать до обьявления',
  },
  {
    content: 'Разница между null и undefined?',
    answer:
      'Оба значения обозначают отсутствующие данные Undefined - значение по умолч для неопр переменной Null- явное задание отсутствующего значения',
  },
  {
    content: 'Типы таймеров в JavaScript?',
    answer:
      'setTimeout- вызов переданной ф 1 раз по истечению опред времени и setInterval - позв вызывать ф постоянно через опред промеж времени',
  },
  {
    content: 'Что такое поднятие (Hoisting)?',
    answer:
      'код объявления функции function f(){} и объявления переменной var можно спокойно писать в конце документа, а обращаться в начале. let const не всплывают',
  },
  {
    content: 'Что такое область видимости (Scope)?',
    answer:
      'место откуда мы имеем доступ к переменным или функциям - глобальная функциональная блочная',
  },
  {
    content: 'Разница между var, let и const?',
    answer:
      'Переменные обьявленные через var всплывают. У let и const область видимости ограничена блоком. Снаружи блока они недоступны. Переменную обьявленную через const невозможно переопределить - при этом можно менять свойства обьекта обьявленного через const',
  },
  {
    content: 'Что такое замыкание (Closure)?',
    answer:
      'Когда одна функция находится внутри другой, то внутренняя функция имеет доступ к переменным внешней функции.',
  },
  {
    content: 'Что обозначает this в JavaScript?',
    answer: 'ссылка на объект в контексте которого выполняется функция',
  },
  {
    content: 'Что такое функции высшего порядка (Higher Order Functions)?',
    answer:
      'функция которая принимает в качестве аргумента другую функцию или возвращает функцию, т.е работает с другими функциями.',
  },
  {
    content:
      'Как превратить любой тип данных в булевый? Перечислите ложные значения в JS?',
    answer:
      'Для того чтобы осуществить преобразование любого типа данных в булево значение можно использовать Boolean(null)',
  },
  {
    content: 'Методы строк в JavaScript?',
    answer:
      'Перечислить все методы которые вы помните с небольшим описанием каждого toUpperCase помогает изменить регистр строки trim отсекает пробельные символы в начале и конце строки',
  },
  {
    content: 'Методы массивов в JavaScript?',
    answer:
      'Спокойно можно перечислять все методы которые вы знаете, давая небольшие пояснения для каждого. push pop shift unshift  ',
  },
  {
    content: 'Что такое чистая функция?',
    answer:
      'Это одна из концепций функционального программирования. Она должна удовлетворять 2 условиям. В ней не должно быть побочных эффектов. Каждый раз она возвращает один и тот же результат если вызвана с одним и тем же набором аргументов',
  },
  {
    content: 'Разница между .forEach() и .map()?',
    answer:
      'оба можно применять к массивам для того чтобы перебирать элементы и к каждому применять переданную функцию forEach перебирает массив и ничего не возвращает, map перебирая возвращает новый массив полученный при выполнении функции Оба не изменяют исходный массив',
  },
  {
    content: 'Разница между .call(), .apply() и bind()?',
    answer:
      'все 3 метода принимают первым аргументом контекст вызова. Разница между call и apply в том как передаются аргументы внутрь функции.call/apply вызываются в момент когда их применяют. Bind создает функцию-обертку, которую можно присвоить в переменную.Затем вызвать в любом месте приложения',
  },
  {
    content: 'Почему в JS функции называют объектами первого класса?',
    answer:
      'В js любые типы данных ведут себя как обьекты. Даже у строки и числа есть набор методов. Функции тоже - ее можно присвоить в переменную. Ф может быть свойством обьекта.Ф можно передать в другую ф как аргумент или вернуть из функции. Единственное отличие ф от других типов  - ее можно вызвать',
  },
  {
    content: 'Как определить наличие свойства в объекте?',
    answer: 'hasOwnProperty',
  },
  {
    content: 'Что такое IIFE?',
    answer:
      'Immediately Invoked Function Expression Этот паттерн часто использовался для того чтобы не допустить загрязнения глобального пространства имен Сейчас заменено поведением модуля ES6',
  },
  {
    content: 'Что такое псевдомассив arguments?',
    answer:
      'Коллекция аргументов которые передаются в функцию. обьект подобный массиву со свойством length. Можно получить доступ к любому из аргументов. В стрелочных функциях он недоступен',
  },
  {
    content: 'Разница между host-объектами и нативными объектами?',
    answer:
      'Host-обьекты - это обьекты, которые предоставляются средой выполнения (браузер/Node.js). В браузере к ним можно отнести window, document, location, history итд. В Node.js это может быть global, http Нативные обьекты - это обьекты которые являются частью языка Javascript (String, Object, RegExp)',
  },
  {
    content: 'Почему результат сравнения 2х объектов это false?',
    answer:
      'Примитивы сравниваются по значению, обьекты сравниваются по ссылке или адресу в памяти, поэтому сравнение 2 одинаковых обьектов это false',
  },
  {
    content:
      'Что такое прототипное наследование? Как создать объект без прототипа?',
    answer:
      'Когда мы хотим прочитать свойство из object, а оно отсутствует, JavaScript автоматически берёт его из прототипа.',
  },
  {
    content:
      'Почему расширение нативных JavaScript-объектов это плохая практика',
    answer:
      'Расширение -  добавление новых свойств его прототипу. При использовании сторонних библиотек у них может быть реализовано то же свойство',
  },
  {
    content: 'Что такое NaN? Как определить, что значение равно NaN?',
    answer:
      'Not a number. Значение, представляющее не число. Свойство глобального обьекта. Оно получается когда математическая функция сработала неверно.',
  },
  {
    content: 'Что такое объектная обертка (Wrapper Objects)?',
    answer:
      'У каждого примитива есть соответствующий wrapper class (String).Он предоставляет примитиву методы - toUpperCase',
  },
  {
    content: 'Как в JavaScript создать объект?',
    answer: 'обьектный литерал {}, функция-конструктор, Object.create',
  },
  {
    content: 'Для чего используется ключевое слово new?',
    answer: 'Вызов функции-конструктора',
  },
  {
    content: 'Операторы «И» и «ИЛИ» (&& и ||)?',
    answer:
      'В JavaScript есть 4 логических оператора: || (ИЛИ), && (И) и ! (НЕ), ?? a && b && c возвращает послед операнд, если все аргументы истинны, а иначе возвращает первое ложное значение. Как только в цепочке a||b||c появляется 1 истинное значение - оно возвращается',
  },
  {
    content: 'Для чего используется оператор двойного отрицания !!',
    answer: 'приведение любого типа данных к логическому типу !!100 // true',
  },
  {
    content: 'Для чего используется оператор остатка %',
    answer: '% возвращает остаток от деления 5 % 2 //1',
  },
  {
    content: 'Как проверить, является ли значение массивом?',
    answer: 'Для этого используется метод Array.isArray([2]) //true',
  },
  {
    content: 'Как работает boxing/unboxing в JavaScript?',
    answer: 'вызов метода у примитива преобразует примитив в обьект',
  },
  {
    content:
      'Что такое мемоизация? Реализуйте базовую логику функции для мемоизации?',
    answer: 'Создание функции запоминающей ранее вычисленное значение',
  },
  {
    content: 'Разница между оператором in и методом hasOwnProperty',
    answer:
      'оба для проверки наличия свойства в обьекте. in проверяет в обьекте и прототипах. hasOwnProperty проверяет наличие свойства только в обьекте',
  },
  {
    content:
      'Разница между глубокой (deep) и поверхностной (shallow) копиями объекта? Как сделать каждую из них?',
    answer:
      'Поверхностная копия скопирует только top-level свойства, но вложенные объекты будут использоваться между оригиналом, так и копией. Для глубокой копии можно использовать JSON.parse(JSON.stringify(obj))',
  },
  {
    content:
      'Что такое цепочка вызовов функций (chaining)? Как реализовать такой подход?',
    answer:
      'подход при котором методы обьекта вызываются один за другим. p.then().catch()',
  },
  {
    content: 'Что такое необъявленная переменная?',
    answer:
      'присвоение значения переменной которая не была обьвлена при помощи var let const',
  },
  {
    content: 'Как передаются параметры в функцию: по ссылке или по значению?',
    answer: 'всегда по значению',
  },
  {
    content: 'Что такое прототип объекта в JavaScript?',
    answer:
      'Объекты имеют специальное скрытое свойство [[Prototype]], которое ссылается на другой объект. Этот объект называется "прототип"',
  },
  {
    content: 'Как работает метод Object.create()?',
    answer:
      'создаём новый объект с прототипом animal let rabbit = Object.create(animal)',
  },
  {
    content: 'Разниц между Object.freeze() и Object.seal()?',
    answer: '',
  },
  {
    content: 'Разница между методами .slice() и .splice()?',
    answer: '',
  },
  {
    content: 'Как работают методы .find(), .findIndex() и .indexOf()?',
    answer: '',
  },
  {
    content: 'Плюсы и минусы использования use strict?',
    answer:
      'не позволяет случайно создавать глобальные переменные . Нельзя использовать некоторые особенности языка',
  },
  {
    content: 'Разница между методами .push(), .pop(), .shift() и .unshift()?',
    answer: '',
  },
  {
    content:
      'Плюсы и минусы иммутабельности? Как достичь иммутабельности в JS?',
    answer: 'прирост либо деградация скорости',
  },
  {
    content: 'Типы всплывающих окон в JavaScript?',
    answer: '',
  },
  { content: 'Типы объектов JavaScript?', answer: '' },
  {
    content: 'Парадигмы программирования в JavaScript?',
    answer: '',
  },
  { content: 'Типы ошибок в JavaScript?', answer: '' },
  {
    content: 'Разница между typeof и instanceof?',
    answer: '',
  },
  {
    content: 'JavaScript статически, или динамически типизированный язык?',
    answer: '',
  },
  {
    content: 'Что такое регулярное выражение (Regular Expression)?',
    answer: '',
  },
  { content: 'Что такое рекурсия?', answer: '' },
  {
    content: 'Что такое прототип (Prototype) объекта?',
    answer:
      'Объекты имеют специальное скрытое свойство [[Prototype]], которое ссылается на другой объект. Этот объект называется "прототип"',
  },
  {
    content: 'Какие методы используются в регулярных выражениях?',
    answer: '',
  },
  {
    content: 'Что такое полифил (polyfill)?',
    answer:
      'По сути это блок кода, который выполняет аналогичную логику метода, для которого и был написан. Полифиллы используются для обеспечения работы современного Javascript кода в старых браузерах. Это делается за счет реализации новых возможностей языка на старом синтаксисе. Сам процесс преобразования нового кода в старый называется транспиляцией. В большинстве своем полифиллы создаются для логики, которая может работать некорректно в разных браузерах, либо в старых версиях браузера. Полифиллом можно считать любую пользовательскую функцию, которая решает какие то проблемы кроссбраузерности.',
  },
  {
    content: 'Что такое switch/case? Правила использования switch/case?',
    answer: '',
  },
  {
    content: 'Типы функций по способности принимать другие функции?',
    answer: '',
  },
  {
    content:
      'Что такое выражения (expression) и инструкции (statement) в JavaScript?',
    answer: '',
  },
  {
    content: 'Разница между .some() и .every()?',
    answer:
      'Оба эти метода предназначены для перебора массива. Они проверяют каждый элемент массива на соответствие условию в переданной функции, после чего возвращают полученный результат. Соответствует ли 1 или все элементы массива логическому условию',
  },
  {
    content: 'Как сгенерировать случайное число в JavaScript?',
    answer: '',
  },
  {
    content: 'Как работает «сборщик мусора» в JavaScript?',
    answer:
      'Управление памятью в JavaScript выполняется автоматически.В движке JavaScript есть фоновый процесс, который называется сборщиком мусора. Он отслеживает все объекты и удаляет те, которые стали недоступными.',
  },
  {
    content: 'цикл событий',
    answer:
      'Идея цикла событий очень проста. Есть бесконечный цикл, в котором движок JavaScript ожидает задачи, исполняет их и снова ожидает появления новых.',
  },
  {
    content: 'каррирование',
    answer:
      'преобразование функций с множеством аргументов в набор вложенных функций с одним аргументом',
  },
  {
    content: '??',
    answer:
      'оператор нулевого слияния возвращает первый аргумент, если он не null/undefined, иначе второй',
  },
  {
    content: '?.',
    answer:
      'Опциональная цепочка - это безопасный способ доступа к свойству объекта var o ={x:1}; o.f?.() // undefined',
  },
  {
    content: 'Cookie',
    answer:
      'Cookie – это строка, которая хранится непосредственно в браузере.Строка document.cookie состоит из пар ключ=значение, разделённых ;',
  },
  {
    content: 'LocalStorage',
    answer:
      'LocalStorage нужен только для одного — хранить определенные данные между сессиями пользователя.',
  },
  {
    content: 'env',
    answer:
      'environment variable / переменные окружения это специальные переменные, которые определяются самой операционной системой.',
  },
  {
    content: 'HTTP',
    answer: 'протокол передачи данных между клиентом и сервером',
  },
  {
    content: 'WebSocket',
    answer: 'Протокол для обмена данными через постоянное соединение.',
  },
  {
    content: 'GraphQL',
    answer:
      'это язык запросов для API-интерфейсов и среда, в которой они выполняются. С помощью GraphQL можно получить данные из API и передать их в приложение (от сервера к клиенту)',
  },
];
