/*globals App, Backbone */
'use strict';

App.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;

    // TODO: bootstrap these.
    App.movies = new App.Collections.Movies();
    App.movies.fetch();
    App.ratings = new App.Collections.Ratings();
    App.ratings.fetch();
  },

  routes: {
    '': 'index',
    '_=_': 'index',
    'feed': 'feed',
    'movie/:id': 'showMovie',
    'leaderboard': 'leaderboard'
  },

  index: function () {
    var view = new App.Views.MovieList({
      collection: App.movies
    });

    this._swap(view);
  },

  showMovie: function (id) {
    var view = new App.Views.MovieList({
      collection: App.movies,
      currentMovieId: id
    });

    this._swap(view);
  },

  feed: function () {
    var view = new App.Views.RatingFeed({
      collection: App.ratings
    });

    this._swap(view);
  },

  leaderboard: function ( ) {
    var view = new App.Views.Leaderboard();
    this._swap(view);
  },

  _swap: function (view) {
    this._current && this._current.remove();
    this._current = view;
    this.$rootEl.html(view.render().$el);
  }
});
