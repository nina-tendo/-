var data ;
var modalWindow = document.querySelector('.modal-window');
var close = document.querySelector('.closeButton');
var sortAscending = document.querySelector('.sortAscending');
var sortDescendingly = document.querySelector('.sortDescending');

function init(obj) {
    data = obj;
    for (var i = 0; i < obj.length; i++) {
        var li = document.querySelector('.js-list-item').cloneNode(true);
        li.classList.remove('js-list-item');
        li.querySelector('img').setAttribute('src', obj[i].picture.large);
        li.querySelector('.title-name').textContent = obj[i].name.title;
        li.querySelector('.first-name').textContent = obj[i].name.first;
        li.querySelector('.last-name').textContent = obj[i].name.last;
        li.setAttribute('id', i);
        document.querySelector('.list').appendChild(li);

    }
    initScriptClick();

}

var load = function http() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            init(JSON.parse(xhr.responseText).results);
        }
    };

};


function modalCall(event) {
    var modalContent = document.querySelector('.modal-content');
    var target = event.target;
    var id;
    var li = target.closest('li');
    if (!li) return;

    (function () {
        id = li.getAttribute('id');
        var thisItem = data[id];

        modalContent.querySelector('img').setAttribute('src', thisItem.picture.large);
        modalContent.querySelector('.info-street').lastElementChild.textContent =  thisItem.location.street;
        modalContent.querySelector('.info-city').lastElementChild.textContent =  thisItem.location.city;
        modalContent.querySelector('.info-state').lastElementChild.textContent =  thisItem.location.state;
        modalContent.querySelector('.info-email').lastElementChild.textContent =  thisItem.email;
        modalContent.querySelector('.info-tel').lastElementChild.textContent =  thisItem.phone;

        modalWindow.style.display = 'block'


    }())
}

function initScriptClick() {
    var listItems = document.querySelectorAll('.list-item');
    for (var i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener('click', modalCall);
    }
}

sortAscending.onclick = function () {

    data = data.sort(function (a,b) {
        if(a.name.first > b.name.first){
            return 1;
        }
        if(a.name.first < b.name.first){
            return -1;
        }
        return 0;
    });

    document.querySelector('.list').innerHTML = '';
    init(data)
};
sortDescendingly.onclick = function () {
    data = data.sort(function (a,b) {
        if(a.name.first > b.name.first){
            return -1;
        }
        if(a.name.first < b.name.first){
            return 1;
        }
        return 0;
    });

    document.querySelector('.list').innerHTML = '';
    init(data)
};
console.log(close);
close.onclick = function () {
    modalWindow.style.display = 'none'
};

load();