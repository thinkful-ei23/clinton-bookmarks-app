'use strict';
/* eslint-disable no-unused-vars */
/* global $ */

const store = (function() {
  let bookmarks = [
    { id: 123, title: 'Article on Dogs', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima doloribus voluptate, aut modi magnam corrupti recusandae omnis odit, laborum, quia aliquid distinctio temporibus dolores repellat harum corporis sit numquam optio?', url: 'http://www.dogs.com/', rating: 5, expanded: true, timestamp: '2018.07.25-11:32:56'},
    { id: 321, title: 'Article on Cats', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima doloribus voluptate, aut modi magnam corrupti recusandae omnis odit, laborum, quia aliquid distinctio temporibus dolores repellat harum corporis sit numquam optio?', url: 'http://www.cats.com/', rating: 3, expanded: true, timestamp: '2018.07.26-08:09:10'}
  ];
  let searchTerm = '';
  let newExpanded = false;
  let filterExpanded = false;
  let minRating = 0;
  let errorMsg = null;

  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const setSearchTerm = function(string) {
    this.searchTerm = string;
  };

  const toggleNewExpanded = function() {
    this.newExpanded = !this.newExpanded;
  };

  const toggleFilterExpanded = function() {
    this.filterExpanded = !this.filterExpanded;
  };

  const setMinRating = function(num) {
    this.minRating = num;
  };

  const setErrorMsg = function(string) {
    this.errorMsg = string;
  };

  return { bookmarks, searchTerm, newExpanded, filterExpanded, minRating, errorMsg, addBookmark, findById, findAndDelete, setSearchTerm, toggleNewExpanded, toggleFilterExpanded, setMinRating, setErrorMsg };
}() );