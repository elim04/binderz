const showError = function(message, type) {
  $(`.${type}_error`).append(`<p>${message}</p>`);
  $(`.${type}_error`).slideDown("slow", function () { });
}

const clearError = function(type) {
  $(`.${type}_error`).empty();
  $(`.${type}_error`).css('display', 'none');
}

const clearInput = function (type) {
  $(`.modal-${type}-content`).find('input').each(function () {
    $(this).val('');
  })
}
