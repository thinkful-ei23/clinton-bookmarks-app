'use strict';
/* eslint-disable no-unused-vars, no-console */

const store = (function() {
  const addBookmark = function(bookmark) {
    this.items.push(bookmark);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id, newData) {
    const itemIndex = this.items.findIndex(item => item.id === id);
    Object.assign(this.items[itemIndex], newData);
  };

  const toggleNewExpanded = function() {
    this.newExpanded = !this.newExpanded;
    if (this.newExpanded === true) {
      this.filterExpanded = false;
    }
  };

  const toggleFilterExpanded = function() {
    this.filterExpanded = !this.filterExpanded;
    if (this.filterExpanded === true) {
      this.newExpanded = false;
    }
  };

  const toggleBookmarkExpanded = function(id) {
    const item = this.findById(id);
    item.showInfo = !item.showInfo;
  };

  const setErrorMsg = function(error) {
    this.errorMsg = JSON.parse(error.responseText).message;
  };

  return { 
    searchTerm: '',
    newExpanded: false,
    filterExpanded: false,
    filterRating: '1star',
    filterSort: 'newest',
    minRating: 0,
    errorMsg: null,
    items: [],
    addBookmark,
    findById,
    findAndDelete,
    findAndUpdate,
    toggleNewExpanded,
    toggleFilterExpanded,
    toggleBookmarkExpanded,
    setErrorMsg
  };
}());