const filterByType = (type, ...values) => values.filter(value => typeof value === type),//фильтруются значения соответствующие переданному типу

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));//получили коллекцию элементов и преобразовали в массив
		responseBlocksArray.forEach(block => block.style.display = 'none');//скрыть все сообщения
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();//скрыть все блоки
		document.querySelector(blockSelector).style.display = 'block';//сделает блок видимым
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;//выведет span с сообщением
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),//выведет ошибку, которую передали в catch

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),//выведет сообщение что есть данные или отсутствуют

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),//сделает видимым сообщение, что нет результата инпут пустой

	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");//функция eval принимает значение инпут дата и фильтрует по типу и объединяет в строку
			const alertMsg = (valuesArray.length) ?//если есть длинна массива
				`Данные с типом ${type}: ${valuesArray}` : //выведет данные с соответствующим типом
				`Отсутствуют данные типа ${type}`; // иначе отсутствуют данные этого типа
			showResults(alertMsg);//вывести сообщение
		} catch (e) {
			showError(`Ошибка: ${e}`);//выведет ошибку
		}
	};

const filterButton = document.querySelector('#filter-btn');//кнопка фильтра

filterButton.addEventListener('click', e => {//обработчик событий
	const typeInput = document.querySelector('#type');//селект с типом данных
	const dataInput = document.querySelector('#data');//инпут с данными

	if (dataInput.value === '') {//если инпут пустой
		dataInput.setCustomValidity('Поле не должно быть пустым!');//выдаст пользовательскую ошибку
		showNoResults();//выведет сообщение, что инпут пустой
	} else {
		dataInput.setCustomValidity('');//нет пользовательской ошибки
		e.preventDefault();//отменить перезагрузку страницы
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());//проверит какое сообщение вывести или ошибку
	}
});

