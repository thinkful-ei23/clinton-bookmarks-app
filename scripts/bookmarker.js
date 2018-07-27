'use strict';
/* eslint-disable no-unused-vars, no-console */
/* global $, store, api */

const bookmarker = (function() {
  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

  function generateBookmark(item) {  
    const stars = generateStars(item);

    if (!item.showInfo) {
      return `
      <li bookmark-id="${item.id}">
        <article class="bookmark">
          <button aria-label="Bookmark: ${item.title}" class="bookmark-header js-bookmark" tabindex="0">
            <span class="bookmark-title">${item.title}</span>
            <img class="bookmark-rating" src="img/${stars}.png" alt="${item.rating} stars">
          </button>
        </article>
      </li>
      `;
    } else {
      return `
      <li bookmark-id="${item.id}">
        <article class="bookmark">
          <button aria-label="Bookmark: ${item.title}" class="bookmark-header js-bookmark" tabindex="0">
            <span class="bookmark-title">${item.title}</span>
            <img class="bookmark-rating" src="img/${stars}.png" alt="${item.rating} stars">
          </button>
          <section class="bookmark-info" role="region">
            <p>${item.desc}</p>
            <button class="delete-button js-delete-button">delete</button>
            <div class="visit-button">
              <input type="button" onclick="window.open('${item.url}', '_blank');" target="_blank" value="visit site" class="visit-url">
            </div>
            </input>
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
        <button aria-label="new bookmark" class="add-header js-add" style="cursor: pointer;" tabindex="0">
          <span class="side-title">new book.mark</span>
        </button>
        <form id="add-bookmark">
          <label for="bookmark-title">Title</label>
          <input type="text" name="title" id="bookmark-title" placeholder="Title" required>
          <label for="bookmark-url">URL</label>
          <input type="url" name="url" id="bookmark-url" placeholder="URL" required>
          <label for="bookmark-desc">Description</label>
          <input type="text" name="desc" id="bookmark-desc" placeholder="Description">
          <label for="select-rating">Select Rating</label>
          <select name="rating" id="select-rating">
            <option value="" disabled selected>Rating</option>
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
      <button aria-label="new bookmark" class="add-header js-add" style="cursor: pointer;" tabindex="0">
        <span class="side-title">new book.mark</span>
      </button>
      `;
    }
  }

  function generateFilterPanel() {
    let select0, select1, select2, select3, select4, select5;
    select0 = select1 = select2 = select3 = select4 = select5 = '';
    switch(store.minRating) {
    case 0:
      select0 = 'selected';
      break;
    case 1:
      select1 = 'selected';
      break;
    case 2:
      select2 = 'selected';
      break;
    case 3:
      select3 = 'selected';
      break;
    case 4:
      select4 = 'selected';
      break;
    case 5:
      select5 = 'selected';
      break;
    }

    if (store.filterExpanded) {
      return `
      <button aria-label="filter bookmarks" class="filter-header js-filter" style="cursor: pointer;" tabindex="0">
        <span class="side-title">filter book.marks</span>
      </button>
      <div class="no-gap"></div>
      <form id="filter-form">
        <label for="min-rating">minimum rating:</label>
        <select name="rating" id="min-rating" class="select-rating js-select-rating">
          <option value="0" ${select0}>select</option>
          <option value="5" ${select5}>5 stars</option>
          <option value="4" ${select4}>4 stars</option>
          <option value="3" ${select3}>3 stars</option>
          <option value="2" ${select2}>2 stars</option>
          <option value="1" ${select1}>1 star</option>
        </select>
        <label for="select-sort">sort bookmarks by:</label>
        <select name="sort" id="select-sort" class="select-rating js-select-sort">
          <option value="newest">select</option>
          <option value="alpha">alphabetical</option>
          <option value="rating">rating</option>
          <option value="newest">newest first</option>
          <option value="oldest">oldest first</option>
        </select>
      </form>
      `;
    } else {
      return `
      <button aria-label="filter bookmarks" class="filter-header js-filter" style="cursor: pointer;" tabindex="0">
        <span class="side-title">filter book.marks</span>
      </button>
      `;
    }
  }

  function render() {
    let items = store.items;

    if (store.minRating > 1) {
      items = items.filter(item => item.rating >= store.minRating);
    }

    if (store.searchTerm) {
      items = items.filter(item => item.title.toLowerCase().includes(store.searchTerm));
    }

    const bookmarksString = generateBookmarksString(items);
    $('.js-bookmarks').html(bookmarksString);

    $('.js-add-panel').html(generateAddPanel());
    $('.js-filter-panel').html(generateFilterPanel());
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('li')
      .attr('bookmark-id');
  }

  function handleNewBookmarkSubmit() {
    $('.add-panel').on('submit', '#add-bookmark', function(event) {
      event.preventDefault();
      const newData = $(event.target).serializeJson();
      api.createBookmark(newData, (newBookmark) => {
        store.addBookmark(newBookmark);
        render();
      }, (error) => {
        store.setErrorMsg(error);
        render();
      });
    });
  }

  function handleDeleteClicked() {
    $('.js-bookmarks').on('click', '.js-delete-button', function(event) {
      event.preventDefault();
      const id = getItemIdFromElement(event.target);
      api.deleteBookmark(id, store.findAndDelete(id), (error) => {
        store.setErrorMsg(error);
        render();
      });
      render();
    });
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

  function handleRatingFilterSelect() {
    $('.js-filter-panel').on('change', '.js-select-rating', function() {
      const rating = Number($('.js-select-rating').val());
      store.minRating = rating;
      render();
    });
  }

  function handleSearchInput() {
    $('.js-search-bar').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.searchTerm = val;
      render();
    });
  }
  
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteClicked();
    handleBookmarkToggle();
    handleAddPanelToggle();
    handleFilterPanelToggle();
    handleRatingFilterSelect();
    handleSearchInput();
  }

  return { render, bindEventListeners };
}() );