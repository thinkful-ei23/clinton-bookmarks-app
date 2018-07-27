'use strict';
/* global cuid */

// eslint-disable-next-line no-unused-vars
const Item = (function(){

  // const validateName = function(name) {
  //   if (!name) throw new TypeError('Name must not be blank');
  // };

  const create = function(title, desc, url, rating, timestamp) {
    return {
      id: cuid(),
      title, 
      desc,
      url,
      rating,
      timestamp,
      showInfo: false
    };
  };

  return {
    // validateName,
    create,
  };
  
}());