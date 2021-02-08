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

  $('.create-resource-info').on('submit', function() {
    $(this).closest('.model-resource').parent().removeClass('bg-active');
    $('.img-container').removeClass('change-order');
  })

})
