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

const ratings = function (id) {
  for (let check = 1; check <= id; check++) {
    $(`#${check}`).attr('class').val('fa fa-star checked');
  }
  for (let unchecked = 5; unchecked > id; unchecked--) {
    $(`#${unchecked}`).attr('class').val('fa fa-star');
  }
}

