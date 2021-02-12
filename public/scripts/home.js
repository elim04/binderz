
$(function() {
  $(window).resize(() => {
    imagesLoaded(document.querySelector('#main-container'), function() {
      masonaryResize();
    });
  });

  const masonaryResize = function() {
    const $masonary = $('#main-container');
    const $masonaryBrick = $('.block');
    const $viewportWidth = $(window).width();

    let masonaryHeight = 0;

    for (let i = 0; i < $masonaryBrick.length; i++) {
      masonaryHeight += $masonaryBrick[i].offsetHeight + 15;
    }

    if ($viewportWidth >= 1024) {
      $masonary.height(masonaryHeight / 4 + masonaryHeight / ($masonaryBrick.length + 1));
    } else if ($viewportWidth < 1024 && $viewportWidth >= 800) {
      $masonary.height(masonaryHeight / 3 + masonaryHeight / ($masonaryBrick.length + 1));
    } else {
      $masonary.height(masonaryHeight / 2 + masonaryHeight / ($masonaryBrick.length + 1));
    }
  };

  window.masonaryResize = masonaryResize;

  const createResource = function(resource) {
    let resourceHTML = `
      <div class="block">
        <div class="img-container">
          <img src="${resource.image_src}" />
          <a href="${resource.url}" target="_blank">
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
        <div class="content">
          <p>${resource.title}</p>
        </div>
      </div>
    `;

    return resourceHTML;
  };

  const createModalResource = function(resourceObj) {

    let modalResourceHTML = `
      <div class="modal-resource-content">
        <div class="left-container">
        <div class="modal-img-show">
          <img id="resource-img" src="${resourceObj["resource"].image_src}" alt="" />
        </div>
          <div class="below-img">
            <div class="likes">
              <p class="counter"></p>
            </div>
            <div class="rating">
              <span id="1" class="fa fa-star"></span>
              <span id="2" class="fa fa-star"></span>
              <span id="3" class="fa fa-star"></span>
              <span id="4" class="fa fa-star"></span>
              <span id="5" class="fa fa-star"></span>
            </div>
          </div>
        </div>
        <div class="view-resource-info">
          <div class="view-title">
            <span>${resourceObj["resource"].title}</span>
          </div>
          <div class="description">
            <p class="description-title">Description</p>
          </div>
          <div class="view-description">
            <p class="description-content">
            ${resourceObj["resource"].description}
            </p>
          </div>
          <h3>Comments</h3>
          <div class="add-comment-form">
            <form class="add-comment method="POST" action="/api/resources">
              <input id="comment-box" type="text" name="comment-from-user" placeholder="Enter comment here" required />
              <button class="bttn-unite bttn-sm bttn-primary comment-btn" type="submit">Submit</button>
            </form>
          </div>
          <div class="view-comments">
            <div class="comments">
            </div>
          </div>
        </div>
        <span class="modal-view-resource-close"><i class="far fa-times-circle fa-2x"></i></span>
    </div>
    `;

    return modalResourceHTML;
  };

  //render the base modal without comments
  const renderModal = function(resource) {
    $('.modal-bg1').empty();
    const newModal = createModalResource(resource);
    $('.modal-bg1').append(newModal);

    $(".modal-view-resource-close").on("click", function() {
      updateRatingCall(resource, currentRating)
        .then(() => {
          modalDisplay(1, 'remove');
        })
        .catch((err) => console.log(err));
    });

    let currentRating;
    $('.rating').on('click', async function(event) {
      const id = event.target.id;
      let isLoggedIn = await logInCheck();
      if (isLoggedIn) {
        ratings(id);
        currentRating = id;
      } else {
        resourceToLogin('rate');
      }
    });
  };
  //render comments ontop of base modal
  const loadComments = function(commentsObj) {
    $('.comments').empty();

    for (const comm of commentsObj["comments"]) {
      const newComment = `
      <div class="comment">
        <p class="user-name">${comm.name}</p>
        <p>${comm.comment}</p>
      </div>
      `;

      $('.comments').prepend(newComment);

    }

    $('.add-comment').on('submit', async function(event) {
      event.preventDefault();

      const isLoggedIn = await logInCheck();

      if (!isLoggedIn) {
        resourceToLogin('comment on a resource');
        return;
      }

      addComment(commentsObj, $(this).serialize())
        .done((data) => {
          $.ajax({
            url: `api/resources/${data.comment.resource_id}/comments`,
            method: 'GET'
          })
            .done(comments => {
              loadComments({ comments: comments });
            });
        });
      $('#comment-box').val('');
    });

  };

  const loadLikeStatus = function(resourceObj) {

    let currentCount = Number(resourceObj['likeCount'].likecount);

    displayLikes(currentCount);

    checkHeartStatus(resourceObj);

    $('#heart-btn').on("click", async function() {

      let isLoggedIn = await logInCheck();

      if (isLoggedIn) {

        if ($('#heart-btn').hasClass('far')) {

          $('#heart-btn').attr('class', 'fas fa-heart fa-2x');
          addFullHeart(resourceObj)
            .done((data) => {
              $.ajax({
                method: 'GET',
                url: `/api/resources/${data['likedResource'].resource_id}/likes`,
              })
                .done((currentCount) => {
                  displayLikes(Number(currentCount.data.likecount));
                })
                .fail(() => console.log('noo have to fix refresh'));
            });

        } else if ($('#heart-btn').hasClass('fas')) {
          $('#heart-btn').attr('class', 'far fa-heart fa-2x');
          addEmptyHeart(resourceObj)
            .done((data) => {
              $.ajax({
                method: 'GET',
                url: `/api/resources/${data['resource'].resource_id}/likes`,
              })
                .done((currentCount) => {
                  displayLikes(Number(currentCount.data.likecount));
                })
                .fail(() => console.log('noo have to fix refresh'));
            });
        }

      } else {
        resourceToLogin('like');
      }

    });

  };

  function loadResources() {
    $.ajax({
      url: '/api/resources',
      method: 'GET'
    })
      .done((data) => {
        renderResources(data.resources);
        imagesLoaded(document.querySelector('#main-container'), function() {
          masonaryResize();
        });
      })
      .fail(() => console.log('An error has occurred'))
      .always(() => console.log('Succesful request'));
  }

  window.loadResources = loadResources;

  const renderResources = function(resources) {
    $('#main-container').empty();

    for (let resource of resources) {
      const newResource = createResource(resource);

      $('#main-container').prepend(newResource);
      $('#main-container .block').first().data(resource);
    }

    $('.block').on('click', function() {
      const data = $(this).data();
      modalDisplay(1, 'add');
      $.ajax({
        url: `/api/resources/${data.id}`,
        method: 'GET'
      })
        .done((data) => {
          renderModal(data);
          loadComments(data);
          loadLikeStatus(data);
          loadCurrentRating(data);
        })
        .fail(() => console.log('an error has occured'))
        .always(() => console.log("successful request of modal"));
    });
    masonaryResize();
  };

  window.renderResources = renderResources;

  loadResources();

  const createTopicHTML = (topic) => {
    const topicHTML = `
      <option value="${topic.id}">${topic.topic}</option>
    `;
    return topicHTML;
  };

  const renderTopics = (topics) => {
    for (let topic of topics) {
      const newTopic = createTopicHTML(topic);

      $('#topic option:eq(0)').after(newTopic);
      $('#resource-modal-topic option:eq(0)').after(newTopic);
    }
  };

  const loadTopics = () => {
    getAllTopics()
      .done(res => renderTopics(res))
      .fail(err => console.error(err));
  };

  loadTopics();
});
