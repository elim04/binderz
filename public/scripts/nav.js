$(function () {
  // const openSearchBar = function(){
  //     $('.search_box').toggle({
  //       effect: "slide-left",
  //       easing: "swing",
  //       duration: 1000
  //     })
  // }

  // $('.search-btn').on('click', (event) =>{
  //   openSearchBar()
  // })

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
})
