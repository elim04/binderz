$(function () {
  $('.create-resource-info').on('submit', function (event) {
    event.preventDefault();
    $('.modal-bg2').removeClass('bg-active');
    const data = $(this).serialize();

    addResource(data)
      .done(() => {
        loadResources()
        clearInput('resource');
        clearTextArea('resource');
      })
      .fail(() => console.log('Error'))
      .always(() => console.log('Successful request'));
  });
});
