'use strict';
/* eslint-disable no-unused-vars, no-console */
/* global $, store */

const bookmarker = (function() {
  // $.fn.extend(function serializeJson(form) {
  //   const formData = new FormData(form);
  //   const o = {};
  //   formData.forEach((val, name) => o[name] = val);
  //   return JSON.stringify(o);
  // });

  function generateBookmark(item) {  
    const stars = generateStars(item);

    if (!item.showInfo) {
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
            <a class="js-visit-url" href="http://${item.url}">
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

  function generateBookmarksString(bookmarks) {
    const items = bookmarks.map((item) => generateBookmark(item));
    return items.join('');
  }

  function generateAddPanel() {
    if (store.newExpanded) {
      return `
        <header class="add-header js-add" style="cursor: pointer;">
          <span class="side-title">new book.mark</span>
        </header>
        <form id="add-bookmark">
          <label hidden for="bookmark-title">Title</label>
          <input type="text" name="title" id="bookmark-title" placeholder="Title">
          <label hidden for="bookmark-url">URL</label>
          <input type="url" name="url" id="bookmark-url" placeholder="URL">
          <label hidden for="bookmark-desc">Description</label>
          <input type="text" name="desc" id="bookmark-desc" placeholder="Description">
          <select class="select-rating">
            <option value="none">Rating</option>
            <option value="5star">5 stars</option>
            <option value="4star">4 stars</option>
            <option value="3star">3 stars</option>
            <option value="2star">2 stars</option>
            <option value="1star">1 star</option>
          </select>
          <button class="bookmark-submit" type="submit">add</button>
        </form>
      `;
    } else {
      return `
      <header class="add-header js-add" style="cursor: pointer;">
        <span class="side-title">new book.mark</span>
      </header>
      `;
    }
  }

  function generateFilterPanel() {
    if (store.filterExpanded === true) {
      return `
      <header class="filter-header js-filter" style="cursor: pointer;">
        <span class="side-title">filter book.marks</span>
      </header>
      <form id="filter-form">
        <label hidden for="min-rating">minimum Rating</label>
        <select class="select-rating">
          <option value="1star">minimum rating</option>
          <option value="5star">5 stars</option>
          <option value="4star">4 stars</option>
          <option value="3star">3 stars</option>
          <option value="2star">2 stars</option>
          <option value="1star">1 star</option>
        </select>
        <label hidden for="select-sort">sort bookmarks</label>
        <select class="select-rating">
          <option value="newest">sort</option>
          <option value="alpha">alphabetical</option>
          <option value="rating">by rating</option>
          <option value="newest">newest first</option>
          <option value="oldest">oldest first</option>
        </select>
      </form>
      `;
    } else {
      return `
      <header class="filter-header js-filter" style="cursor: pointer;">
        <span class="side-title">filter book.marks</span>
      </header>
      `;
    }
  }

  function render() {
    let items = store.items;

    $('.js-add-panel').html(generateAddPanel());
    $('.js-filter-panel').html(generateFilterPanel());

    const bookmarksString = generateBookmarksString(items);
    $('.js-bookmarks').html(bookmarksString);
  }

  function getItemIdFromElement(item) {
    return Number($(item)
      .closest('li')
      .attr('bookmark-id'));
  }

  function handleBookmarkToggle() {
    $('.js-bookmarks').on('click', '.js-bookmark', event => {
      const id = getItemIdFromElement(event.target);
      store.toggleBookmarkExpanded(id);
      render();
    });
  }

  function handleAddPanelToggle() {
    $('.js-add-panel').on('click', '.js-add', event => {
      store.toggleNewExpanded();
      render();
    });
  }

  function handleFilterPanelToggle() {
    $('.js-filter-panel').on('click', '.js-filter', event => {
      store.toggleFilterExpanded();
      render();
    });
  }
  
  function bindEventListeners() {
    handleBookmarkToggle();
    handleAddPanelToggle();
    handleFilterPanelToggle();
  }

  return { render, bindEventListeners };
}() );