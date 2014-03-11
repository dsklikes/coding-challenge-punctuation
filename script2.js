var app = app || {};

  
  app.Sentence = Backbone.Model.extend({
    // what position commas are in
    defaults: {
      content: '',
      //content Array after split
      contentArray: [],
      commas: []
    },
    initialize: function() {
      // splits on space in initialize
      this.set('contentArray', this.get('content').split(' '));
    }
  });

  var Sentences = Backbone.Collection.extend({
      model: app.Sentence,
      // keeps track of which sentence we are on
      sentenceNumber: 0

    });

  app.AppView = Backbone.View.extend({
    initialize: function() {
      this.render();
      this.checkCommas();
    },
    el: '.container',
    template: _.template($('#sentence-template').html()),
    events: {

      'click .space': 'toggleComma',
      'click #next': 'nextSentence'
    },
    checkCommas: function() {
      // iterates through and checks where commas are and updates model to have indexes of where commas are
      var commasArray = [];
      $('.comma').each( function() {
          commasArray.push( $('.space').index($(this)));
      });
      this.collection.at(this.collection.sentenceNumber).set('commas', commasArray)
    },
    nextSentence: function() {
      // gets next sentence
      this.checkCommas();
      this.collection.sentenceNumber++;
      this.render();
    },  
    toggleComma: function(e) {
      // toggleComma based on if comma exists
      var sel = $(e.currentTarget);
      if (sel.hasClass('comma')) {
        sel.html(' ');
        sel.removeClass('comma');
      } else {
        sel.html(', ');
        sel.addClass('comma');
      }
    },
    render: function() {
      if (this.collection.sentenceNumber < this.collection.length)
        this.$el.html(this.template({wordArray: this.collection.at(this.collection.sentenceNumber).get('contentArray')}));
      else
        this.$el.html('End of sentences.');
    }
  })

  






$('#start').click(function() {
  // would be a fetch if coming from database
  app.sentences = new Sentences([{ content: 'The Caltrain, broke down so I was late to work.'},{content: 'I love to eat, bread, cheese, and eggs every morning.'}]);
  
  new app.AppView({collection: app.sentences});
});



