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

  const setSearchTerm = function(string) {
    this.searchTerm = string;
  };

  const toggleNewExpanded = function() {
    this.newExpanded = !this.newExpanded;
  };

  const toggleFilterExpanded = function() {
    this.filterExpanded = !this.filterExpanded;
  };

  const toggleBookmarkExpanded = function(num) {
    const itemIndex = this.items.findIndex(item => item.id === num);
    this.items[itemIndex].expanded = !this.items[itemIndex].expanded;
  };

  const setMinRating = function(num) {
    this.minRating = num;
  };

  const setErrorMsg = function(error) {
    this.errorMsg = JSON.parse(error.responseText).message;
  };

  return { 
    searchTerm: '',
    newExpanded: false,
    filterExpanded: false,
    minRating: 0,
    errorMsg: null,
    items: [
      {id:123, title:'Article on Dogs', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima doloribus voluptate, aut modi magnam corrupti recusandae omnis odit, laborum, quia aliquid distinctio temporibus dolores repellat harum corporis sit numquam optio?', url:'http://www.dogs.com/', rating:5, expanded:true, timestamp:'2018.07.25-11:32:56'},
      {id:321, title:'Article on Cats', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima doloribus voluptate, aut modi magnam corrupti recusandae omnis odit, laborum, quia aliquid distinctio temporibus dolores repellat harum corporis sit numquam optio?', url:'http://www.cats.com/', rating:3, expanded:false, timestamp:'2018.07.26-08:09:10'}
    ],
    addBookmark,
    findById,
    findAndDelete,
    findAndUpdate,
    setSearchTerm,
    toggleNewExpanded,
    toggleFilterExpanded,
    toggleBookmarkExpanded,
    setMinRating,
    setErrorMsg
  };
}());