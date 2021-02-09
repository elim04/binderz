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

  $('#user-btn').on('click', () => {
    $('.logged-in').slideToggle();
  })

  $('#logout').on('click', () => {
    changeNavOnLogout();
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
        $('.login').show();
      })
      .fail((error) => console.error('Error on logout:', error))
      .always(() => console.log('executing logout request'))
  }

})
