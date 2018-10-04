var $typeaheadEl = $('#typeahead');
var $typeaheadResults = $('#typeahead-results');
var $clearButton = $('#clear');
var dummyTypeaheadData = [
  '#BlackLivesMatter',
  '#LoveIsLove',
  'caturday',
  'puppies',
  'koala',
  'otter',
  'rabbits',
  'cute cat',
  'cute dog'
];

$(function () {
  new Typeahead();
});

function Typeahead() {
  var $selectedEl = null;

  $typeaheadEl.on('change keyup paste', function (event) {
    if (event.originalEvent.keyCode === 38 || event.originalEvent.keyCode === 40) {
      event.preventDefault();
      return false;
    }
    var value = $typeaheadEl.val();
   
    $typeaheadResults.empty();

    if (value.length) {
      $typeaheadResults.removeClass('hidden');
      $clearButton.removeClass('hidden');
    } else {
      $typeaheadResults.addClass('hidden');
      $clearButton.addClass('hidden');
    }

    for (var i = 0; i < dummyTypeaheadData.length; i += 1) {
      if (value.length && dummyTypeaheadData[i].indexOf(value) !== -1) {
        $('<div></div>')
        .addClass('typeahead-item')
        .text(dummyTypeaheadData[i])
        .appendTo($typeaheadResults);
      }
    }
  });

  $typeaheadResults.on('mouseover', function(event) {
    console.log('mouseover: ', event);
    $selectedEl.removeClass('active');
    $selectedEl = $(event.target);
    $selectedEl.addClass('active');
  });
  
  $typeaheadEl.on('focus', function () {
    for (var i = 0; i < dummyTypeaheadData.length; i += 1) {
      var item = $('<div></div>')
      .addClass('typeahead-item')
      .text(dummyTypeaheadData[i])
      .appendTo($typeaheadResults); 
      // select the first by default
      if (i === 0) $selectedEl = item;
    }
    $selectedEl.addClass('active');
    $typeaheadResults.removeClass('hidden');
  });

  $typeaheadEl.on('focusout', function () {
    $typeaheadResults.addClass('hidden');
  });

  $clearButton.on('click', function(event) {
    event.preventDefault();
    $typeaheadEl.val('');
    $clearButton.addClass('hidden');
  });

  $(document).keydown(function(e) {
    console.log('keyboard')
    e.stopPropagation();
    e.preventDefault(); // prevent the default action (scroll / move caret)
    switch(e.which) {
        case 38: // up
          _updateSelectedEl($selectedEl.prev());
          break;

        case 40: // down
          _updateSelectedEl($selectedEl.next());
          break;

        default: return; // exit this handler for other keys
    }
  });
  
  function _updateSelectedEl(newEl) {
    console.log('newEl: ', newEl);
    if (newEl.length > 0) {
      $selectedEl.removeClass('active');
      $selectedEl = newEl;
      $selectedEl.addClass('active');
      $selectedEl[0].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
}