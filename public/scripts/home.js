$(function () {
  $( window ).resize(() => {
    masonaryResize();
  })


  const masonaryResize = function(){
    const $masonary = $('#main-container');
    const $masonaryBrick = $('.block');
    let masonaryHeight = 0;

    for(let i = 0; i < $masonaryBrick.length; i++){
      masonaryHeight += $masonaryBrick[i].offsetHeight + 15;
    }

    if(window.screen.width >= 1024){
      console.log(1024)
      $masonary.height(masonaryHeight/4 + masonaryHeight/($masonaryBrick.length +1))
    }else if(window.screen.width < 1024 && window.screen.width >= 800){
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
    `

    return resourceHTML;
  }

  const loadResources = function () {
    $.ajax({
      url: '/api/resources',
      method: 'GET'
    })
      .done((data) => {
        renderResources(data.resources)
      })
      .fail(() => console.log('An error has occurred'))
      .always(() => console.log('Succesful request'));
  }

  const renderResources = function(resources){
    $('#main-container').empty();

    for (let resource of resources) {
      const newResource = createResource(resource);

      $('#main-container').prepend(newResource);
    }

    masonaryResize()
  }

  loadResources();

})
