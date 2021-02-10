$(function () {
  $(document).on('click', () => {
    $('.logged-in').hide();
  })

  $('#user-btn').on('click', () => {
    $('.logged-in').slideToggle();
    return false;
  })

  $('#logout').on('click', () => {
    changeNavOnLogout();
    loadResources();
  })

  const changeNavOnLogout = function () {
    logOut()
      .done(() => {
        $('.user')
          .hide()
          .children("button").empty();
        $('#user-initial').empty();
        $('#user-name').empty();
        $('#user-email').empty();
        $('.logged-in').hide();
        $('#my-page').removeData();
        $('#personal-box').empty();
        $('.login').show();
      })
      .fail((error) => console.error('Error on logout:', error))
      .always(() => console.log('executing logout request'))
  }

  function loadSearchedResource(params) {
    $.ajax({
      url: `/api/resources/?${params}`,
      method: 'GET'
    })
      .done((data) => {
        renderResources(data.resources);
        imagesLoaded(document.querySelector('#main-container'), function () {
          masonaryResize()
        })
      })
      .fail(() => console.log('An error has occurred'))
      .always(() => console.log('Succesful request'));
  }

  //search bar functions
  $('#search-form').on('submit', function (e) {
    e.preventDefault();
    console.log($(this))
    let urlParams = $(this).serialize()

    console.log($('#personal-page').is(':visible'))

    if ($('#personal-page').is(':visible')) {
      urlParams += '&user_id=true'
    }

    loadSearchedResource(urlParams)

    $("#search-bar").val("")
    $("#topic").val("none")
  })

  $('#search-form').on('change', 'select', function (event) {
    let urlParams = $(this).closest('#search-form').serialize()

    if ($('#personal-page').is(':visible')) {
      urlParams += '&user_id=true'
    }

    loadSearchedResource(urlParams)

    $("#search-bar").val("")
  })

  $('#home-btn').on('click', () => {
    $("#create-resource").show();
    $("#personal-box").hide();
    loadResources()
  })
})
