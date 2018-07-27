'use strict';
/* eslint-disable no-unused-vars, no-console */
/* global $ */

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/clint/items';

  let getBookmarks = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  let createBookmark = function(newBookmark, callback, error) {
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: error
    });
  };

  let updateBookmark = function(id, updateData, callback, error){
    $.ajax({
      url: `${BASE_URL}${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: updateData,
      success: callback,
      error: error
    });
  };

  let deleteBookmark = function(id, callback, error) {
    $.ajax({
      url: `${BASE_URL}${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: error
    });
  };

  return { getBookmarks, createBookmark, updateBookmark, deleteBookmark };
}() );