$(function () {
  $( window ).resize(() => {
    masonaryResize();
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

  const createModalResource = function (resource) {
    let modalResourceHTML = `
    <div class="modal-bg1">
        <div class="modal-resource">
          <div class="left-container">
            <div class="modal-img-show">
              <img src="" alt="" />
            </div>
            <div class="below-img">
              <div class="likes">
                <i id="heart-btn" class="far fa-heart fa-2x"></i>
                <a>COUNTER</a>
              </div>
              <div class="rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </div>
            </div>
          </div>
          <div class="view-resource-info">
            <div class="view-title">
              <a>Title</a>
            </div>
            <div class="view-description">
              <a
                ><p>

                </p></a
              >
            </div>
            <div class="view-comments">
              <h3>Comments</h3>
              <div class="comment">
                <a>TEST TESTING</a>
              </div>
            </div>
          </div>
          <span class="modal-resource-close">X</span>
        </div>
      </div>

    `;

    return modalResourceHTML;
  }

  function loadResources () {
    $.ajax({
      url: '/api/resources',
      method: 'GET'
    })
      .done((data) => {
        renderResources(data.resources)
        masonaryResize();
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

      $.ajax({
        url: `/api/resources/${data.id}`,
        method: 'GET'
      })
      .done(data => console.log(data))
    })

    masonaryResize();
  }

  loadResources();
})
