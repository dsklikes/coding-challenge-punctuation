coding-challenge-punctuation
============================

2 hour time limit

script.js is without backbone
script2.js is with backbone

Pretty simple backbone app.
1 model of Sentence
1 collection of Sentences
1 view

Notes:
- If there were a real endpoint the collection would be a fetch and the intialize would have a bind to reset function.

- I run through checkCommas at the end of every sentence completion, which creates an array of indexes of where the commas are- I could have probably done something in the toggleComma function that modifies the array too

- I don't like putting loops inside of templates- I could have done a couple things one being creating a space view and basically inserting the word then adding a new space view for i = 0 < wordArrray.length-1 then had the click event on that space view