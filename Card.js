// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card" id=' + self.id + '></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var editCardName = $('<button class="edit-card-name"><i class="fa fa-pencil" aria-hidden="true"></i></button>');

		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		editCardName.click(function() {
			var newCardName = prompt("Enter a new card name");
			var columnId = self.element[0].parentNode.parentNode.id;
			var cardId = self.id;
			$(self.element[0]).find("p")[0].innerHTML = newCardName;
			console.log(self.element[0].parentNode.parentNode.id);
			console.log($(self.element[0]).find("p")[0].innerHTML);
			$.ajax({
      		url: baseUrl + '/card/' + cardId,
      		method: 'PUT',
      		data: {
      			name: newCardName,
      			bootcamp_kanban_column_id: columnId
      		}
      	});
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		card.append(editCardName);
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
	  var self = this;
	  $.ajax({
	  	url: baseUrl + '/card/' + self.id,
	  	method: 'DELETE',
	  	success: function() {
	  	  self.element.remove();
	  	}
	  });
	}
}