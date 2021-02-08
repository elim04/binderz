$(function() {
  const openSearchBar = function(){
      $('.search_box').toggle({
        effect: "slide-left",
        easing: "swing",
        duration: 1000
      })
  }

  $('.search-btn').on('click', (event) =>{
    openSearchBar()
  })
})
