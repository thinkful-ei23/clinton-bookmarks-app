'use strict';
/* eslint-disable no-unused-vars, no-console */
/* global $, store */

const bookmarker = (function() {
  $.fn.extend(function serializeJson(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  });

  function generateBookmark(item) {  
    const stars = generateStars(item);

    if (!item.expanded) {
      return `
      <li bookmark-id="${item.id}">
        <article class="bookmark">
          <header class="bookmark-header js-bookmark" style="cursor: pointer;">
            <span class="bookmark-title">${item.title}</span>
            <img class="bookmark-rating" src="img/${stars}.png" alt="${item.rating} stars">
          </header>
        </article>
      </li>
      `;
    } else {
      return `
      <li bookmark-id="${item.id}">
        <article class="bookmark">
          <header class="bookmark-header js-bookmark" style="cursor: pointer;">
            <span class="bookmark-title">${item.title}</span>
            <img class="bookmark-rating" src="img/${stars}.png" alt="${item.rating} stars">
          </header>
          <section class="bookmark-info" role="region">
            <p>${item.desc}</p>
            <a class="delete-button js-delete-button" href="#">delete</a>
            <a class="js-visit-url" href="${item.url}">
              <div class="visit-button">
                <span class="visit-url">visit site</span>
              </div>
            </a>
          </section>
        </article>
      </li>
      `;
    }
  }

  function generateStars(item) {
    switch (item.rating) {
    case 5:
      return '5star';
    case 4:
      return '4star';
    case 3:
      return '3star';
    case 2:
      return '2star';
    case 1:
      return '1star';
    default:
      return 'no-star';
    }
  }

  function generateBookmarksString(items) {
    const bookmarks = items.map((item) => generateBookmark(item));
    return bookmarks.join('');
  }

  function render() {
    let items = store.items;

    // if (store.newExpanded) {
    //   $('.js-add-panel').html();
    // } else {
    //   $('.js-add-panel').html();
    // }

    // if (store.filterExpanded) {
    //   $('.js-filter-panel').html();
    // } else {
    //   $('.js-filter-panel').html();
    // }

    const bookmarksString = generateBookmarksString(items);

    $('.js-bookmarks').html(bookmarksString);
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('li')
      .attr('bookmark-id');
  }

  function handleBookmarkToggle() {
    $('.js-bookmarks').on('click', '.js-bookmark', event => {
      const foundId = getItemIdFromElement(event.target);
      store.toggleBookmarkExpanded(foundId);
      render();
    });
  }
  
  function bindEventListeners() {
    handleBookmarkToggle();
  }

  return { render, bindEventListeners };
}() );