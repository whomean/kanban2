var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
	.click(function(){
		var columnName = prompt('Enter a column name');
		$.ajax({
			url: baseUrl + '/column',
			method: 'POST',
			data: {
				name: columnName
			},
			success: function(response) {
				var column = new Column(response.id, columnName);
				board.createColumn(column);
			}
		});
	});
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder',
      beforeStop: function(event, item) {
      	var cardId = item.item[0].id;
      	var columnId = item.item[0].parentNode.parentNode.id;
      	var cardName = $(item.item[0]).find('p')[0].innerHTML;
      	console.log($(item.item[0]).find('p')[0].innerHTML);
      	$.ajax({
      		url: baseUrl + '/card/' + cardId,
      		method: 'PUT',
      		data: {
      			name: cardName,
      			bootcamp_kanban_column_id: columnId
      		}
      	});
      	// console.log(item.item[0].lastElementChild.innerHTML);
      	// console.log(item.item[0].id);
      	// console.log(item.item[0].parentNode.parentNode.id);
      }
    }).disableSelection();
}