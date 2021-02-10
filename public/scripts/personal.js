$(function () {

  const createPersonal = (userInfo) => {
    const personalHTML = `
    <div id="personal-page">
    <div class="user-icon"><i class="fas fa-user-astronaut"></i></div>
    <div class="user-name">${userInfo.name}
    <div class="setting-button-container">
    <button id="setting" type="button" class="btn"><i class="fas fa-cog"></i></button></div>
    </div>
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

  const settingsInput = () => {
    const inputHtml = `<form id="new-name" action="/me">
    <input id="newName" name="newName" type="text" placeholder="New Name" autofocus></input>
    <input type="submit" hidden></form>`
    return inputHtml;
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

    $('#setting').on('click', function() {
      console.log('clicked setting')
      const oldName = $('.user-name').text()
      $('.user-name').contents().filter(function(){
        return this.nodeType === 3;
    }).remove();
      $('.user-name').prepend(settingsInput);
      $('.setting-button-container').hide();
      // $('.user-name').prepend(oldName)

      $('#new-name').on('submit', function(event) {
        event.preventDefault();
        const data = $(this).serialize();
        console.log(data, "DATA")
        const newName = $('#newName').val();
        if (newName) {
          updateUser(data)
          $('#new-name').remove();
          $('.user-name').prepend(newName);
          $('.setting-button-container').show();
        } else {
          $('#new-name').remove();
          $('.user-name').prepend(oldName);
          $('.setting-button-container').show();
        }
      })
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
