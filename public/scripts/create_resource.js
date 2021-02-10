$(function () {
  $('.create-resource-info').on('submit', function (event) {
    event.preventDefault();
    $('.modal-bg2').removeClass('bg-active');
    const data = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/api/resources",
      data: data
    })
      .done(() => {
        loadResources()
        clearInput('resource');
        clearTextArea('resource');
      })
      .fail(() => console.log('Error'))
      .always(() => console.log('Successful request'));

  });

});
