$(function() {

  $("#create-resource").on("click", async function() {
    let isLoggedIn;
    try {
      isLoggedIn = await getMyDetails();
    } catch(err) {
      console.log(err, "error")
    }
    if (isLoggedIn) {
      $('.modal-bg2').addClass('bg-active');
      $('.img-container').addClass('change-order')
    } else {
      $('.modal-bg3').addClass('bg-active');
      $('.img-container').addClass('change-order')
    }
  })

  $(".modal-resource-close").on("click", function() {
    $(this).closest(".modal-resource").parent().removeClass('bg-active');
    $('.img-container').removeClass('change-order')
  })

  // $(".modal-bg1").on("click", function() {
  //   $(".modal-bg1").removeClass("bg-active");
  //   $('.img-container').removeClass('change-order')
  // })

})



