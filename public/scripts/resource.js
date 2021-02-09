$(function() {

  $("#create-resource").on("click", function() {
    console.log($(this))
    $('.modal-bg2').addClass('bg-active');
    $('.img-container').addClass('change-order')
  })

  $(".modal-resource-close").on("click", function() {
    $(this).closest(".modal-resource").parent().removeClass('bg-active');
    $('.img-container').removeClass('change-order')
  })

  $(".modal-bg1").on("click", function() {
    $(".modal-bg1").removeClass("bg-active");
    $('.img-container').removeClass('change-order')
  })

})
