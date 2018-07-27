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

  const sortByRating = function(store) {
    return store.sort((item1, item2) => item2.rating - item1.rating);
  };

  const sortByAlpha = function(store) {
    return store.sort((item1, item2) => {
      const title1 = item1.title.toLowerCase();
      const title2 = item2.title.toLowerCase();
      if (title1 < title2) {
        return -1;
      } else if (title1 > title2) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const sortByNewest = function(store) {
    return store.sort((item1, item2) => {
      const id1 = item1.id.toLowerCase();
      const id2 = item2.id.toLowerCase();
      if (id1 < id2) {
        return -1;
      } else if (id1 > id2) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const sortByOldest = function(store) {
    return store.sort((item1, item2) => {
      const id1 = item1.id.toLowerCase();
      const id2 = item2.id.toLowerCase();
      if (id1 < id2) {
        return 1;
      } else if (id1 > id2) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  return { 
    searchTerm: '',
    newExpanded: false,
    filterExpanded: false,
    filterRating: '1star',
    filterSort: 'newest',
    minRating: 0,
    errorMsg: null,
    sortMethod: '',
    items: [],
    addBookmark,
    findById,
    findAndDelete,
    findAndUpdate,
    toggleNewExpanded,
    toggleFilterExpanded,
    toggleBookmarkExpanded,
    setErrorMsg,
    sortByRating,
    sortByAlpha,
    sortByNewest,
    sortByOldest
  };
}());