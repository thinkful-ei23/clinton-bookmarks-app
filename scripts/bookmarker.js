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
            <a class="js-visit-url" href="${item.url}" target="_blank">
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
          <input type="text" name="title" id="bookmark-title" placeholder="Title" required>
          <label hidden for="bookmark-url">URL</label>
          <input type="url" name="url" id="bookmark-url" placeholder="URL" required>
          <label hidden for="bookmark-desc">Description</label>
          <input type="text" name="desc" id="bookmark-desc" placeholder="Description">
          <select name="rating" class="select-rating">
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
      <header class="add-header js-add" style="cursor: pointer;">
        <span class="side-title">new book.mark</span>
      </header>
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
      <header class="filter-header js-filter" style="cursor: pointer;">
        <span class="side-title">filter book.marks</span>
      </header>
      <form id="filter-form">
        <label for="min-rating">minimum rating:</label>
        <select name="rating" class="select-rating js-select-rating">
          <option value="0" ${select0}>select</option>
          <option value="5" ${select5}>5 stars</option>
          <option value="4" ${select4}>4 stars</option>
          <option value="3" ${select3}>3 stars</option>
          <option value="2" ${select2}>2 stars</option>
          <option value="1" ${select1}>1 star</option>
        </select>
        <label hidden for="select-sort">sort bookmarks</label>
        <select name="sort" class="select-rating js-select-sort">
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

  // function (item) {
  //   switch (item.rating) {
  //   case 5:
  //     return '5star';
  //   case 4:
  //     return '4star';
  //   case 3:
  //     return '3star';
  //   case 2:
  //     return '2star';
  //   case 1:
  //     return '1star';
  //   default:
  //     return 'no-star';
  //   }
  // }

  function render() {
    let items = store.items;

    if (store.minRating > 1) {
      items = items.filter(item => item.rating >= store.minRating);
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
  
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteClicked();
    handleBookmarkToggle();
    handleAddPanelToggle();
    handleFilterPanelToggle();
    handleRatingFilterSelect();
  }

  return { render, bindEventListeners };
}() );