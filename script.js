//sentences array
var sentences = ['The Caltrain, broke down so I was late to work.', 'I love to eat, bread, cheese, and eggs every morning.']



// function to split sentence by spaces
function splitWords(sentence) {
  var wordArray = sentence.split(' ');
  $('.container').empty();
  for (var i=0; i < wordArray.length;i++) {
    var textToAppend = '';
    // handles existing commas differently slightly
    if (wordArray[i].charAt(wordArray[i].length-1) == ',' ) {

      textToAppend =  wordArray[i].substring(0, wordArray[i].length - 1) + "<span class='space comma'>, </span>";
    }
    else {
      textToAppend = wordArray[i];
      if (i != wordArray.length - 1)
        textToAppend = textToAppend + "<span class='space'> </span>"
    }
    $('.container').append(textToAppend);
    
  }
}
//outputs position of commas
function sendOutput() {
  var commaLocationArray = [];
  for (var i=0;i<$('.space').length;i++) {
    if ($($('.space')[i]).hasClass('comma'))
      commaLocationArray.push(i);
  }
  console.log(commaLocationArray);

}
function findSentence() {
  // finds the next sentence or displays error message
  var sentencePosition = $('.container').data('sentence');
  if (sentencePosition < sentences.length)
    splitWords(sentences[sentencePosition]);
  else
    $('.container').html('No more sentences!')

}

$(document).on('click', '.space', function() {
  // checking if it has a comma already or not, toggles
  if ($(this).hasClass('comma')) {
    $(this).html(' ');
    $(this).removeClass('comma');
  } else {
    $(this).html(', ');
    $(this).addClass('comma');
  }
});



$(document).ready(function() {
  findSentence();

  $('#next-sentence').click(function() {
    sendOutput();
    var sentencePosition = $('.container').data('sentence');
    $('.container').data('sentence', sentencePosition + 1)
    findSentence();
  });

});

