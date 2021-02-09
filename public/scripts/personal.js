$(function () {

  const createPersonal = (userInfo) => {
    const personalHTML = `
    <div id="personal-page">
    <div class="user-icon"><i class="fas fa-user-astronaut"></i></div>
    <div class="user-name">${userInfo.name}</div>
    <div class="user-email">${userInfo.email}</div>

    <div class="resource-btn-group">
      <button id="liked-resource-btn" class="bttn-stretch bttn-md bttn-primary">Liked</button>
      <button id="saved-resource-btn" class="bttn-stretch bttn-md bttn-primary">Saved</button>
      <button id="personal-resource-btn" class="bttn-stretch bttn-md bttn-primary">Personal</button>
    </div>
    </div>
    `

    return personalHTML
  }

  const renderPersonalArea = (user) => {
    $('#personal-box').append(createPersonal(user));
    $('#personal-box').hide();

    $('#personal-resource-btn').data(user)

    $('#liked-resource-btn').on('click', () => {
      loadLikedResources();
    })

    $('#saved-resource-btn').on('click', () => {
      loadLikedResources();
    })

    $('#personal-resource-btn').on('click', function(){
      loadPersonalResources($(this).data());
    })
  }

  window.renderPersonalArea = renderPersonalArea;

  function loadLikedResources () {
    $.ajax({
      url: '/api/resources/likedResources',
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

  function loadPersonalResources (user) {
    $.ajax({
      url: `/api/resources/?user_id=${user.id}`,
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

  $('#my-page').on('click', function () {
    if($('#personal-box').is(':hidden')){
      $('#main-container').empty();
      $('#create-resource').hide()
    }else{
      loadResources();
      $('#create-resource').show()
    }
    $('#personal-box').toggle()
  })
})
