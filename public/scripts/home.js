$(function () {
  $( window ).resize(() => {
    imagesLoaded(document.querySelector('#main-container'), function(){
      masonaryResize()
    })
  })

  const masonaryResize = function(){
    const $masonary = $('#main-container');
    const $masonaryBrick = $('.block');
    const $viewportWidth = $(window).width();

    let masonaryHeight = 0;

    for(let i = 0; i < $masonaryBrick.length; i++){
      masonaryHeight += $masonaryBrick[i].offsetHeight + 15;
    }

    if($viewportWidth >= 1024){
      console.log(1024)
      $masonary.height(masonaryHeight/4 + masonaryHeight/($masonaryBrick.length +1))
    }else if($viewportWidth < 1024 && $viewportWidth >= 800){
      console.log(800)
      $masonary.height(masonaryHeight/3 + masonaryHeight/($masonaryBrick.length +1))
    }else{
      console.log('<800')
      $masonary.height(masonaryHeight/2 + masonaryHeight/($masonaryBrick.length +1))
    }
  }

  const createResource = function (resource) {
    let resourceHTML = `
      <div class="block">
        <div class="img-container">
          <img src="${resource.image_src}" />
          <a href= "${resource.url}">
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
        <div class="content">
          <p>${resource.title}</p>
        </div>
      </div>
    `;

    return resourceHTML;
  }

  const createModalResource = function (resourceObj) {

    let modalResourceHTML = `
      <div class="modal-resource">
        <div class="left-container">
          <div class="modal-img-show">
            <img id="resource-img" src="${resourceObj["resource"].image_src}" alt="" />
          </div>
          <div class="below-img">
            <div class="likes">
              <a>COUNTER</a>
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
          <div class="view-description">
            <a><p>
            ${resourceObj["resource"].description}
            </p></a>
          </div>
          <div class="view-comments">
            <h3>Comments</h3>
            <div class="comment">
            </div>
          </div>
        </div>
        <span class="modal-resource-close">X</span>
      </div>
    `;

    return modalResourceHTML;
  }

//render the base modal without comments
  const renderModal = function(resource) {
    $('.modal-bg1').empty();

    const newModal = createModalResource(resource);
    $('.modal-bg1').append(newModal);

    $(".modal-resource-close").on("click", function() {
    $(".modal-bg1").removeClass("bg-active");
    $('.img-container').removeClass('change-order')
  })

  $('#1').on('click', function () {
    ratings(1)
  })
  $('#2').on('click', function () {
    ratings(2)
  })
  $('#3').on('click', function () {
    ratings(3)
  })
  $('#4').on('click', function () {
    ratings(4)
  })
  $('#5').on('click', function () {
    ratings(5)
  })


  }
  //render comments ontop of base modal
  const loadComments = function(commentsObj) {

    for (const comm of commentsObj["comments"]) {

      const newComment = `
      <p class="user-name">${comm.name}</p>
      <p>${comm.comment}</p>
      `;

      $('.comment').prepend(newComment);

    }

  }

  const loadLikeStatus = function(resourceObj) {

    if (!resourceObj["resource"].likes) {
      $('.likes').append('<i id="heart-btn" class="far fa-heart fa-2x"></i>');
    } else {
      $('.likes').append('<i id="heart-btn" class="fas fa-heart fa-2x"></i>');
    }

    $('#heart-btn').on("click", function() {

      $.ajax({
        method: 'POST',
        url: '/api/:resources_id/liked',
        data
      })

      $('heart-btn')

      console.log("liked")

    })

  }

  function loadResources () {
    $.ajax({
      url: '/api/resources',
      method: 'GET'
    })
      .done((data) => {
        renderResources(data.resources);
        imagesLoaded(document.querySelector('#main-container'), function(){
          masonaryResize()
        })
      })
      .fail(() => console.log('An error has occurred'))
      .always(() => console.log('Succesful request'));
  }

  window.loadResources = loadResources;

  const renderResources = function(resources){
    $('#main-container').empty();

    for (let resource of resources) {
      const newResource = createResource(resource);

      $('#main-container').prepend(newResource);
      $('#main-container .block').first().data(resource)
    }

    $('.block').on('click', function(){
      const data = $(this).data()
      $('.modal-bg1').addClass('bg-active');
      $('.img-container').addClass('change-order');


      $.ajax({
        url: `/api/resources/${data.id}`,
        method: 'GET'
      })
        .done((data) => {
          console.log('data', data);
          renderModal(data);
          loadComments(data);
          loadLikeStatus(data);
        })
        .fail(() => console.log('an error has occured'))
        .always(() => console.log("successful request of modal"));
    })


    masonaryResize();
  }

  loadResources();
})
