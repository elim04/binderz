const signUp = function (data) {
  return $.ajax({
    method: "POST",
    url: "/api/users/register",
    data
  });
}

const logIn = function (data) {
  return $.ajax({
    method: "POST",
    url: "/api/users/login",
    data
  });
}

const logOut = function () {
  return $.ajax({
    method: "POST",
    url: "/api/users/logout"
  })
}

const updateRatingCall = function (data, newRating) {
  data.newRating = newRating
  return $.ajax({
    method: "POST",
    url: `/api/users/${data.resource.id}/rating`,
    data
  })
}

function addResource(formContent) {
  return $.ajax({
    method: "POST",
    url: "/api/resources",
    data: formContent,
  });
}

function getMyDetails() {
  console.log("getMyDetails");
  return $.ajax({
    url: "/api/users/me",
  });
}

function getAllTopics() {
  return $.ajax({
    url: "/api/resources/topics"
  })
}

const updateUser = function (newName) {
  console.log(newName, "IN THE USER CALL")
  return $.ajax({
    method: "POST",
    url: "/api/users/me",
    data: newName
  })
}

const getResources = function (params) {
  return $.ajax({
    url: `/api/resources/?${params}`,
    method: 'GET'
  })
}

const getLikedResources = function() {
  return $.ajax({
    url: `/api/resources/likedResources`,
    method: 'GET'
  })
}
