const register = function (data) {
  return $.ajax({
    method:"POST",
    url: "/users",
    data
  });
}


function getAllResources() {
  console.log()
}
