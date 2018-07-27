'use strict';
/* eslint-disable no-unused-vars, no-console */
/* global $, bookmarker, store, api */

$(document).ready(function() {
  bookmarker.bindEventListeners();
  api.getBookmarks((items) => {
    items.forEach((item) => store.addBookmark(item));
    bookmarker.render();
  });
});