const signUp = function (data) {
  return $.ajax({
    method:"POST",
    url: "/api/users/me",
    data
  });
}


function getAllResources() {
  console.log()
}
