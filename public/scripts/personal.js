$(function() {

  const createPersonal = (userInfo) => {
    const personalHTML = `
    <div id="personal-page">
    <div class="user-icon"><i class="fas fa-user-astronaut"></i></div>
    <div id="user-name-personal" class="user-name">
      ${userInfo.name}
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
    `;

    return personalHTML;
  };

  const settingsInput = () => {
    const inputHtml = `<form id="new-name" action="/me">
    <input id="newName" name="newName" type="text" placeholder="New Name" autofocus></input>
    <input type="submit" hidden></form>`;

    return inputHtml;
  };

  const renderPersonalArea = (user) => {
    $('#personal-box').append(createPersonal(user));
    $('#personal-box').hide();

    $('#liked-resource-btn').bind('click', loadLikedResources);
    $('#saved-resource-btn').bind('click', loadLikedResources);
    $('#personal-resource-btn').bind('click', loadPersonalResources);

    $('#setting').on('click', function() {
      const oldName = $('.user-name').text();
      $('#user-name-personal').contents().filter(function() {
        return this.nodeType === 3;
      }).remove();

      $('#user-name-personal').prepend(settingsInput);
      $('.setting-button-container').hide();
      $('#newName').focus();

      $('#new-name').on('submit', function(event) {
        event.preventDefault();

        const data = $(this).serialize();

        const newName = $('#newName').val();

        if (newName) {
          updateUser(data)
            .done(data => {
              emptyUserInfo();
              changeNavOnLogin({user: data});
              $('#personal-box').show();
            });
          showUsername(newName);
        } else {
          showUsername(oldName);
        }
      });
    });
  };

  window.renderPersonalArea = renderPersonalArea;

  function loadLikedResources() {
    getLikedResources()
      .done((data) => {
        renderResources(data.resources);
        imagesLoaded(document.querySelector('#main-container'), function() {
          masonaryResize();
        });
      })
      .fail(() => console.log('An error has occurred'))
      .always(() => console.log('Succesful request'));
  }

  function loadPersonalResources() {
    getResources('user_id=true')
      .done((data) => {
        renderResources(data.resources);
        imagesLoaded(document.querySelector('#main-container'), function() {
          masonaryResize();
        });
      })
      .fail(() => console.log('An error has occurred'))
      .always(() => console.log('Succesful request'));
  }

  $('#my-page').on('click', function() {
    if ($('#personal-box').is(':hidden')) {
      $('#main-container').empty();
      $('#create-resource').hide();
      $('#personal-box').show();
    }
  });
});
