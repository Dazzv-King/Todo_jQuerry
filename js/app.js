// Создаем для начала глоб.переменные
var todo = $('#todo'),
	add_input = todo.find('.todo__add__input'),
	add_btn = todo.find('.todo__add__button'),
	list = todo.find('.todo__list'), 
	listFromLS = $.parseJSON(localStorage.getItem('todo') || '[]'); // Получаем список из LS или пустой массив
	item_template = $('#todo__template').text();

// Сохраняем список в LS
function saveList() {
	localStorage.setItem('todo', JSON.stringify(listFromLS))
}

// Создание нового списка
function buildList() {
	list.html(''); 
	$(listFromLS).each(function(index, text){ //Перебираем список из LS, и у каждого объекта берем индекс и самого объекта
		var item = makeItem(text);
		list.append(item);
		setItemActions(item, index);
	})
};

//Создание задачи 
function makeItem(text) {
	var li = $('<li>'); // создаем тег ли
	li.html(item_template.replace(/{{textfromJQ}}/g, text)); //находим и передаём нашего объекта из LS
	return li;
}

//Добавим действие для кнопок
function setItemActions(item, index) {
	var remove_btn = item.find('.todo__item__remove__btn'),
		edit_btn = item.find('.todo__item__edit__btn'),
		edit_input = item.find('.todo__item__input'),
		item_text = item.find('.todo__item__text');
	var apply_btn = item.find('.todo__item__apply__btn');
	
	remove_btn.on('click', function() {
		listFromLS.splice(index, 1); //вырезаем 
		changeAction();  // и вызиваем функцию
	});

	edit_btn.on('click', function() {
		edit_input.show();
		apply_btn.show();
		item_text.hide();
		edit_btn.hide();
	})
	
	apply_btn.on('click', function() {
		listFromLS[index] = edit_input.val();
		changeAction();
	})
}

// Сохраняем изменения
function changeAction() {
	buildList();
	saveList();
}

// добавление задачи
add_btn.on('click', function() {
	var text = add_input.val();
	listFromLS.push(text);
	add_input.val('');
	changeAction();
});

buildList();
