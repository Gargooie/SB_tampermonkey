// ==UserScript==
// @name SkillBoxPumpItLMS_mod
// @description make LMS better
// @author Gargooie
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require https://gist.github// ==UserScript==
// @description make LMS better
// @author Gargooie
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version 26.01.2022
// @include https://go.skillbox.ru/*
// @grant    GM_addStyle
// ==/UserScript==

// wrap the script in a closure (opera, ie)
// do not spoil the global scope

//случайная фраза из списка для сообщения

//Одобрение среднего блока
let greeting_middle_arr_1=["Замечательно! Все задачи решены правильно!<br/>",
                         "Работа на высший балл! Всё верно!<br/>",
                         "Все решения верны, отлично! ",
                         "Великолепно! Задачи решены правильно!<br/>",
                         "Супер, всё решено верно!<br/>",
                         "Отлично! Всё верно! Так держать!<br/>",
                         "Всё верно! Вы молодец! Так держать!<br/>",
                         "Замечательно! Всё решено верно!<br/>",
                         "Все решено правильно, продолжайте в том же духе! ",
                         "Все задачи решены, отличная работа. ",
                         "Ошибок нет, решения правильные! ",
                         "Домашняя работа выполнена, отлично! ",
                         "Вы молодец, снова всё выполнено правильно! ",
                         "Работа выполнена без ошибок, отлично! ",
                          ];

//Приглашение среднего блока
let greeting_middle_arr_2=["Приступайте к следующему модулю.",
                         "Можете приступать к следующему модулю.",
                         "Приступайте к следующему уроку.",
                         "Можете приступить к следующему модулю.",
                         "Приступим к следующему модулю.",
                         "Открываю следующий модуль",
                         "Принимаю вашу работу",
                         "Работу принимаю",
                         "Принимаю работу",
                         "Принимаю модуль",
                         "Зачет",
                         ];



let greeting_footer_arr=["Хорошего дня!<br/>С уважением, Евгений  🖖",
                         "Хорошего настроения!<br/>С уважением, Евгений  🖖",
                         "Всего наилучшего!<br/>С уважением, Евгений  🖖",
                         "Всего хорошего!<br/>С уважением, Евгений  🖖",
                         ]

//рандомизация среднего блока
let greeting_middle_result;
//рандомизация нижнего блока
let rand_greeting_footer_arr;
//добавление здравствуйте в привествие с коэффициентом
let rand_current_time_arr;
//приветствие в зависимости от времени суток
let current_time;
let current_hour;


//случайное число для сообщения привествия
function randomizer(number) {
  return Math.round(Math.random()*number);
}

function greeting_message_constructor(){
    greeting_middle_result= greeting_middle_arr_1[randomizer(greeting_middle_arr_1.length-1)]
        + greeting_middle_arr_2[randomizer(greeting_middle_arr_2.length-1)];
    rand_greeting_footer_arr = randomizer(greeting_footer_arr.length-1);
    //коррекция рандомизации нижнего блока
    rand_greeting_footer_arr==greeting_footer_arr.length ? rand_greeting_footer_arr=greeting_footer_arr.length-1:"pass";
    rand_current_time_arr = Math.floor(Math.random() * 1.3);

    if (rand_current_time_arr ==1) { current_time = "Здравствуйте"
                           }else{

                               if (current_hour === 0 || current_hour <= 4) {
                                   current_time = "Доброй ночи";
                               } else if (4 < current_hour && current_hour <= 11) {
                                   current_time = "Доброе утро";
                               } else if (18 < current_hour && current_hour < 24) {
                                   current_time = "Добрый вечер";
                               } else {
                              //     current_time = "<span class=\"time-of-the-day\">Добрый день</span>";
                                   current_time = "Добрый день";
                               }
                           }

    GREETING_TITLE_WITHOUT_NAME = current_time + "!";
    GREETING_TITLE_WITH_NAME = current_time + ", ";
    GREETING_MIDDLE = greeting_middle_result;
    GREETING_FOOTER = greeting_footer_arr[rand_greeting_footer_arr];
    current_hour = new Date().getHours();
};

let GREETING_TITLE_WITHOUT_NAME;
let GREETING_TITLE_WITH_NAME;
let GREETING_MIDDLE;
let GREETING_FOOTER;
let x;

const GREETING_MIDDLE_SECOND = "Добро пожаловать на курс. Информацию обо мне вы можете посмотреть в профиле.<br/>\
Будет здорово, если и вы расскажете о себе, чтобы мы могли более четко определить цели на курс.<br/><br/>По вашей работе:<br/>\
Задачи решены верно. Разбор последней в следующем видео.<br/>Можете приступать к следующему модулю."



greeting_message_constructor();


const INSERT_CYRILLYC_NAME_IN_GREETING = true; 	// если установлено true, то к GREETING_TITLE добавится имя и !
const COMPACT_HEADER = false; 										// если true - заголовок работы будет компактен
const HIDE_EMPTY_COURSES = false;
const HIDE_REPORT_ROW = true; 								// если true - строка для отчета не будет показываться
const SHOW_TASK_LINK = true;

const button_css = {
    'color': '#fff', 'margin': '0 10px',
    'display': 'inline-block', 'min-width': '20px', 'border': '1px solid',
    'cursor': 'pointer', 'padding': '8px 20px'
};

const button_settings = {
    'background-color': 'cadetblue',
    'font-size': '1rem'
};

// css for unsticky user panel
const user_panel_remove_sticky_and_paddings = {
    'display': 'flex',
    'flex-direction': 'row-reverse',
    'justify-content': 'flex-end'
};

const sendel_row = {'margin': '10px 30px'};

var APPEND_ROWREPORT_ELEMENT = 'app-comment-form';

const SELECTOR_APPROVE_BUTTON = '.comments-teacher__button.ui-sb-button--small.ui-sb-button--default.ui-sb-button--view-1.success'; // принять
const SELECTOR_REJECT_BUTTON = '.comments-teacher__button.ui-sb-button--small.ui-sb-button--default.ui-sb-button--view-1.danger'; // отклонить

const HOMEWORK_PANELS_LIST = '.homeworks-panel-accordion'; // панельки курса на проверку
const HOMEWORK_TITLE_LIST_CLASS = '.homeworks__header';
const HIDE_EMPTY_HW_CHECKBOX_CLASS = 'hide_empty_hw_checkbox';
//const SIMPLE_HOOKER = 'app-comment-form';

(function (window, undefined) {
    // normalized window
    var w = unsafeWindow != "undefined" ? unsafeWindow : window;

    // do not run in frames
    if (w.self != w.top) {
        return;
    }

    // additional url check.
    // Google Chrome do not treat @match as intended sometimes.
    if (/https:\/\/go.skillbox.ru\/homeworks/.test(w.location.href)) {
        $(document).ready(function () {
            waitForKeyElements(HOMEWORK_TITLE_LIST_CLASS, appendSettingsButton);
            waitForKeyElements(SELECTOR_APPROVE_BUTTON, pumpIt);
            //waitForKeyElements(SELECTOR_APPROVE_BUTTON, addString);
            // waitForKeyElements(SIMPLE_HOOKER, simple_function);

            if (HIDE_EMPTY_COURSES) {
                waitForKeyElements(HOMEWORK_PANELS_LIST, hideCoursesWithZeroHomeworks);
            }

            addGlobalStyle(".over {   background-color: black;\
  animation-name: greenblink;\
  animation-duration: 0.5s;\
  border: 0px;}\
  @keyframes greenblink {\
   0%  {background-color: black;}\
  25%  {background-color: #7CFC00;}\
  50%  {background-color: black;}}");
        });
    }
//function simple_function(){
//    console.log("check");
//    var flag = $(".homework-subheader__theme-title")[0].innerText;
//    console.log(flag);
//}


    function pumpIt() {
        if (!HIDE_REPORT_ROW) {

            generateReportRow();


        }

        addGreeting();
        compactHomeworkTitle();
        bakeHeader();
    }

    // function addString() {
    //     if (SHOW_TASK_LINK) {
    //
    //         generateReportRow();
    //         showMyString();
    //
    //     }
    //
    //     addGreeting();
    //     compactHomeworkTitle();
    //     bakeHeader();
    // }


    function hideCoursesWithZeroHomeworks(item) {
        let statusToCheck = $(item).find('.description__wait').text();

        if (statusToCheck == 'На проверку: 0') {
            $(item).hide();
        }
    }

    // function hideCoursesWithZeroHomeworks(item) {
    //     let statusToCheck = $(item).find('.item__all ng-star-inserted').text();
    //     console.log(statusToCheck);
    //     if (statusToCheck == '2 работы') {
    //         $(item).hide();
    //     }
    // }

    function appendSettingsButton(item) {

        x =randomizer(100);
        console.log(x);
        greeting_message_constructor();
        console.log(GREETING_MIDDLE);

        let settingsButton = $('<input>', {
            class: 'sendel_input',
            type: 'checkbox',
            id: HIDE_EMPTY_HW_CHECKBOX_CLASS,
        })
            .css(button_css)
            .css(button_settings)
            .click(toggleShowEmptyCourses);

        $('<div>', {id: 'lms_settings'})
            .append(settingsButton)
            .append($('<label>', {for: HIDE_EMPTY_HW_CHECKBOX_CLASS, text: 'Показаны курсы без домашних работ'}))
            .insertAfter(item);

        item.hide();
    }

    function toggleShowEmptyCourses() {
        const checkboxShowEmptyCourses = $('#' + HIDE_EMPTY_HW_CHECKBOX_CLASS);

        if (checkboxShowEmptyCourses.is(':checked')) {
            $(HOMEWORK_PANELS_LIST).show();
        } else {
            $(HOMEWORK_PANELS_LIST).each(function () {
                hideCoursesWithZeroHomeworks($(this))
            });
        }
    }

    function addGlobalStyle(css) {
        $('head').append($('<style>', {type: 'text/css', text: css}));
    }

    function generateResultAndCopyToBuffer(student, module, result, course) {
        $('#report')
            .val([todayDateFormatted(), student, module, result, window.location.href, course].join("\t"))
            .select();
        document.execCommand("copy");
    }

    let approveHomework = () => clickOnElement(SELECTOR_APPROVE_BUTTON, 500);
    let rejectHomework = () => clickOnElement(SELECTOR_REJECT_BUTTON, 500);

    let clickOnElement = (selector, timeout) => setTimeout(
        () => $(selector).trigger('click'), timeout);

    let getStudentName = () => $(".info__fullname")[0].innerText;
    let getModuleName = () => $(".homework-subheader__theme-title")[0].innerText;
    let getCommentText = () => $(".comment-card__message")[0].innerText;
    //let getMessageCount = () => $(".homework-subheader__theme-title")[0].innerText;
    let getMessageCount = () => $(document.getElementsByClassName("comments-topic--message-count skb-p1 ng-star-inserted"));


//document.getElementsByClassName('test')

    function generateReportRow() {
        var module_full = $(".homework-subheader__theme-title")[0].innerText.split(".")[0];
        var module = module_full.split(":")[0].replace("Тема ", "");
        const student = getStudentName();

        var course = $(".homework-course-info__name")[0].innerText;


        var reportRow = todayDateFormatted() + "\t" + student + "\t" + module + "\t \t" + window.location.href + "\t" + course;

        let containerMain = $('<div>', {id: 'sendel-container-main'});
        let containerRowReport = $('<div>', {id: 'sendel-copy-row'});
        let containerCopyUrl = $('<div>', {id: 'sendel-p-copy-url'});


        let done = $('<button>', {text: '👍 зачет', class: 'skillbox-btn'})
            .css({'backgroundColor': '#2fa52f'})
            .css(button_css);
        let rework = $('<button>', {text: '✖️ незачет', class: 'skillbox-btn'})
            .css({'backgroundColor': '#f84949'})
            .css(button_css);

        done.appendTo(containerRowReport)
        rework.appendTo(containerRowReport)

        let inputCopyRowToReport = $('<input>', {
            type: 'text',
            id: 'report',
            value: reportRow,
            name: 'sendel-copy-row',
            click: function () {
                this.select();
                document.execCommand("copy");
                $('#sendel-copy-row').append('  строка для отчета скопирована!');
            }
        })
            .css({"width": "100%", 'margin-bottom': '10px'});

        //Обработка кликов на кнопки зачет/незачет
        done.click(function () {
            var result = 'зачет';
            generateResultAndCopyToBuffer(student, module, result, course)
            approveHomework();
        });

        rework.click(function () {
            var result = 'незачет';
            generateResultAndCopyToBuffer(student, module, result, course)
            rejectHomework();
        });

        //appends to containers
        $('<span>', {text: 'Строка для отчета: '})
            .css({'display': 'block'})
            .appendTo(containerRowReport);
        inputCopyRowToReport.appendTo(containerRowReport);

        $('<hr>').appendTo(containerMain);
        containerCopyUrl.appendTo(containerMain);
        containerRowReport.appendTo(containerMain);


        containerMain.css(sendel_row);
        containerMain.appendTo($(APPEND_ROWREPORT_ELEMENT));
    }

    function showMyString() {
        var module_full = $(".homework-subheader__theme-title")[0].innerText.split(".")[0];
        var module = module_full.split(":")[0].replace("Тема ", "");
        const student = getStudentName();

        var course = $(".homework-course-info__name")[0].innerText;


        var reportRow = todayDateFormatted() + "\t" + student + "\t" + module + "\t \t" + window.location.href + "\t" + course;

        let containerMain = $('<div>', {id: 'sendel-container-main'});
        let containerRowReport = $('<div>', {id: 'sendel-copy-row'});
        let containerCopyUrl = $('<div>', {id: 'sendel-p-copy-url'});


        let done = $('<button>', {text: '👍 зачет', class: 'skillbox-btn'})
            .css({'backgroundColor': '#2fa52f'})
            .css(button_css);
        let rework = $('<button>', {text: '✖️ незачет', class: 'skillbox-btn'})
            .css({'backgroundColor': '#f84949'})
            .css(button_css);

        done.appendTo(containerRowReport)
        rework.appendTo(containerRowReport)

        let inputCopyRowToReport = $('<input>', {
            type: 'text',
            id: 'report',
            value: reportRow,
            name: 'sendel-copy-row',
            click: function () {
                this.select();
                document.execCommand("copy");
                $('#sendel-copy-row').append('  строка для отчета скопирована!');
            }
        })
            .css({"width": "100%", 'margin-bottom': '10px'});

        //Обработка кликов на кнопки зачет/незачет
        done.click(function () {
            var result = 'зачет';
            generateResultAndCopyToBuffer(student, module, result, course)
            approveHomework();
        });

        rework.click(function () {
            var result = 'незачет';
            generateResultAndCopyToBuffer(student, module, result, course)
            rejectHomework();
        });

        //appends to containers
        $('<span>', {text: 'Строка для отчета: '})
            .css({'display': 'block'})
            .appendTo(containerRowReport);
        inputCopyRowToReport.appendTo(containerRowReport);

        $('<hr>').appendTo(containerMain);
        containerCopyUrl.appendTo(containerMain);
        containerRowReport.appendTo(containerMain);


        containerMain.css(sendel_row);
        containerMain.appendTo($(APPEND_ROWREPORT_ELEMENT));
    }


    function addGreeting() {
        setTimeout(function poll() {
            const textAreaEditor = document.querySelector("app-comments-teacher .fr-view");


            if (!textAreaEditor) {
                setTimeout(poll, 500);
                return;
            }

//Если длина редактируемого поля меньше 21
           // console.log(textAreaEditor.innerHTML.length);
            //console.log(textAreaEditor.innerHTML);

            //setTimeout(()=>console.log(textAreaEditor.innerHTML, textAreaEditor.innerHTML.length), 2000);
            if (textAreaEditor.innerHTML.length < 21) {
                appendGreetingTo(textAreaEditor, getStudentName(), getModuleName(), getMessageCount());
textAreaEditor.replace("Добрый", "Да");

            }
       //     else{
     //                                        const textAreaEditor2 = document.getElementsByClassName(".time-of-the-day");
     //                       console.log(textAreaEditor2.innerText);
        //    setTimeout(()=>textAreaEditor.replace("Добрый", "Да"), 5000);}
     //      }
        });
    }

    function addGitlabSearchButton() {
        let student = getStudentName();
        if (student) {
            let gitlabUrl = "https://gitlab.skillbox.ru/search?group_id=&project_id=&repository_ref=&scope=users&search=" + student.replace(" ", "+");
            $('<a>', {
                text: 'Search ' + student + ' in Gitlab',
                class: 'info__status skb-p3',
                href: gitlabUrl,
                target: '_blank'
            }).appendTo($(".student__info"));
        }
    }


    function bakeHeader() {
        setTimeout(() => {
            compactHomeworkTitle();
            addCopyTokenButton();
            addGitlabSearchButton();
        }, 2000);
    }

    function compactHomeworkTitle() {
        $(".lesson-header-wrapper").css(user_panel_remove_sticky_and_paddings);
        $(".lesson-header-wrapper").css('padding', '5px');
        $(".homework-subheader__theme-title").css(user_panel_remove_sticky_and_paddings);
        $(".homework-course-info").css(user_panel_remove_sticky_and_paddings);
        $(".skb-froala-teacher-page-offset-toolbar").css('position', 'relative');
        $(".homework-subheader").css('padding', '0px 10px 0px 50px');
    }

    function addCopyTokenButton() {
        $('<button>', {
            text: '🔑',
            class: 'ui-sb-button--default-circle ui-sb-button--view-circle-1 homework-course-info__button sendel-ct',
            uisbtooltip: 'Скопировать токен для бота статистики', '_ngcontent-nta-c316': '',
        })
            .css({
                "border-radius": "10px",
                "cursor": "pointer",
                "width": "40px",
                "height": "40px",
            })
            .click(copyRefreshTokenToClipboard)
            .click(function () {
                $(this).addClass('over');
            })
            .mouseleave(function () {
                $(this).removeClass('over');
            })
            .appendTo($(".homework-course-info__buttons"));

        $(".ui-sb-button--view-circle-1").css("margin", "2px");
    }

    function copyRefreshTokenToClipboard() {
        const el = $('<textarea>', {
            text: localStorage.getItem("x-refresh-token")
        });

        $('body').append(el);
        el.select();
        document.execCommand('copy');
        el.remove();
    }

    function todayDateFormatted() {
        return new Date().toLocaleDateString('ru-RU');
    }

    //функция для транслита
    function translit(word) {
        var answer = '';
        var converter = {
            'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д',
            'e': 'е', 'zh': 'ж', 'z': 'з', 'i': 'и',
            'y': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
            'o': 'о', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т',
            'u': 'у', 'f': 'ф', 'h': 'х', 'c': 'ц', 'ch': 'ч',
            'sh': 'ш', 'sch': 'щ', 'y': 'ы', 'x': 'кс',
            'yu': 'ю', 'ya': 'я',

            'A': 'А', 'B': 'Б', 'V': 'В', 'G': 'Г', 'D': 'Д',
            'E': 'Е', 'Zh': 'Ж', 'Z': 'З', 'I': 'И',
            'Y': 'Й', 'K': 'К', 'L': 'Л', 'M': 'М', 'N': 'Н',
            'O': 'О', 'P': 'П', 'R': 'Р', 'S': 'С', 'T': 'Т',
            'U': 'У', 'F': 'Ф', 'H': 'Х', 'C': 'Ц', 'Ch': 'Ч',
            'Sh': 'Ш', 'Sch': 'Щ', 'Y': 'Ы',
             'Yu': 'Ю', 'Ya': 'Я'
        };

        for (var i = 0; i < word.length; ++i) {
            if (converter[word[i]] == undefined) {
                answer += word[i];
            } else {
                answer += converter[word[i]];
            }
        }

        return answer;
    }


    function appendGreetingTo(textAreaEditor, studentName, ModuleName, MessageCount) {
        var title;
        var title2;
        var first_name; // Имя студента
        var flag_replaced; //флаг замены для имени исключения

        flag_replaced=1;
        first_name=studentName.split(" ")[0];

//функция конкатенации имени и приветствия
        function Greeting_plus_name(studentName) {
            title = GREETING_TITLE_WITH_NAME + studentName.split(" ")[0] + '!';
        }

            //индивидуальная замена имён
        switch (first_name) {
            case 'Shamil':
                studentName = studentName.replace("Shamil", "Шамиль");
                Greeting_plus_name(studentName);
                break;
            case 'Миша':
                studentName = studentName.replace("Shamil", "Шамиль");
                Greeting_plus_name(studentName);
                break;
            case 'Сережа':
                studentName = studentName.replace("Сережа", "Сергей");
                Greeting_plus_name(studentName);
                break;
            case 'Doniyor':
                studentName = studentName.replace("Doniyor", "Дониёр");
                Greeting_plus_name(studentName);
                break;
            case 'Stas':
                studentName = studentName.replace("Stas", "Станислав");
                Greeting_plus_name(studentName);
                break;
            case 'Дима':
                studentName = studentName.replace("Дима", "Дмитрий");
                Greeting_plus_name(studentName);
                break;
            default:
                flag_replaced = 0;
}


//Проверяем на заглавную и строчную имя фамилию для русского
        if (INSERT_CYRILLYC_NAME_IN_GREETING && /[А-Я][а-я]+\s[А-Я][а-я]+/u.test(studentName)) {
            Greeting_plus_name(studentName);
        } else if (INSERT_CYRILLYC_NAME_IN_GREETING && /[A-Z][a-z]+\s[A-Z][a-z]+/u.test(studentName)) {
            //иначе транслитерация для любого случая
            title = GREETING_TITLE_WITH_NAME + translit(studentName.split(" ")[0]) + '!';
        } else if (INSERT_CYRILLYC_NAME_IN_GREETING && /[A-z]+\s[A-z]+/u.test(studentName)) {
            //Капитализация
            title = GREETING_TITLE_WITH_NAME + translit(studentName.split(" ")[0]).charAt(0).toUpperCase()
                + translit(studentName.split(" ")[0]).slice(1) + '!';
        } else if (flag_replaced =0){
            title = GREETING_TITLE_WITHOUT_NAME;
        }


        //Первое сообщение от пользователя?
        var flagNewMessage;
        for (let element of MessageCount) {

            (element.innerText == "2 сообщения" || element.innerText == "1 сообщение" ? flagNewMessage = true : "")
        }

        //  (MessageCount.last().innerText == "2 сообщения" ? flagNewMessage = true : "")


        textAreaEditor.insertAdjacentHTML('afterbegin', '<p>' + title +
            '</p><br/><br/><p>' +
            (((ModuleName == '3. Операторы, выражения' || ModuleName == '2. Введение в веб-фреймворки') && flagNewMessage == true) ? GREETING_MIDDLE_SECOND : GREETING_MIDDLE)

            + '</p><br/><p>' + GREETING_FOOTER + '</p>');
    }


})(window);
