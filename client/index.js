$(document).ready(() => {
    $("#starred-page").hide()
    $("#search-page").hide()
  
    $(".navbar-brand").on("click", () => {
      $("#home-page").show()
      $("#starred-page").hide()
      $("#search-page").hide()
    })
  
    $("#starred-page-a").on("click", () => {
      $("#starred-page").show()
      $("#home-page").hide()
      $("#search-page").hide()
    })
  
    $("#home-page-a").on("click", () => {
      $("#home-page").show()
      $("#starred-page").hide()
      $("#search-page").hide()
    })
  
    $("#search-page-a").on("click", () => {
      $("#search-page").show()
      $("#starred-page").hide()
      $("#home-page").hide()
    })
  
  
    $.ajax({
      url: "http://localhost:3000/api/",
      method: "GET"
    })
    .then(function(profile) {
      $("#username").prepend(`${profile.login}`)
      $("#avatar").prepend(`
        <img src="${profile.avatar_url}" role="img" width="30" height="30" alt="" id="avatar">`)
  
      return $.ajax({
        url: `http://localhost:3000/api/repos/user/${profile.login}`,
        method: "GET"
      })
    })
    .then(function(repos) {
      repos.forEach(repo => {
        $("#owned-repos-tbody").append(
          `<tr>
              <td>
                <a href="#">
                  <strong>${repo.full_name}</strong><br>
                </a>
              </td>
          </tr>`
        )
      })
    })
    .fail(function(jqXHR, textStatus) {
      console.log("request failed", textStatus);
    })
  
    let $searchStarredRepoInput = $("#search-starred-repo-input").val()
    $("#submit-search-starred-repo-button").on("click", () => {
      $.ajax({
        url: `http://localhost:3000/api/repos/starred/search?q=${$searchStarredRepoInput}`,
        method: "GET"
      })
      .done(function(foundRepos) {
        $("#starred-repos-tbody").hide()
        $("#search-starred-repos-result-tbody").show()
  
        foundRepos.forEach(foundRepos => {
          $("#search-starred-repos-result-tbody").append(
            `<tr>
                <td>
                  <a href="#" id="toggle-status">
                    <strong>${foundRepos.full_name}</strong><br>
                    <small>by ${foundRepos.owner.login}</small>
                    <p>${foundRepos.description}</p>
                  </a>
                </td>
            </tr>`
          )
        })
      })
      .fail(function(jqXHR, textStatus) {
        console.log("request failed", textStatus);
      })
    })
  
    $.ajax({
      url: "http://localhost:3000/api/repos/starred",
      method: "GET"
    })
    .done(function(starredRepos) {
      starredRepos.forEach(starredRepo => {
        $("#starred-repos-tbody").append(
          `<tr>
              <td>
                <a href="#" id="starred-repo-a">
                  <strong id="starred-repo-name">${starredRepo.name}</strong><br>
                  <small id="starred-repo-owner">by ${starredRepo.owner.login}</small>
                  <p>${starredRepo.description}</p>
                </a>
              </td>
          </tr>`
        )
      })
    })
    .fail(function(jqXHR, textStatus) {
      console.log("request failed", textStatus);
    })
  
    let $createRepoNameInput = $("#create-repo-name-input").val()
    let $createRepoDescriptionInput = $("#create-repo-description-input").val()
  
    $("#submit-create-repo-button").on("click", () => {
      console.log($createRepoNameInput);
      $.ajax({
        url: "http://localhost:3000/api/repos",
        method: "POST",
        data: {
          name: $createRepoNameInput,
          description: $createRepoDescriptionInput
        }
      })
      .done(function(starredRepos) {
      })
      .fail(function(jqXHR, textStatus) {
        console.log("request failed", textStatus);
      })
    })
  
    let $searchRepoInput = $("#search-repo-input").val()
    $("#submit-search-repo-button").on("click", () => {
      $.ajax({
        url: `http://localhost:3000/api/repos/user/${$searchRepoInput}`,
        method: "GET"
      })
      .done(function(foundRepos) {
        foundRepos.forEach(foundRepos => {
          if (foundRepos.description === null) {
            foundRepos.description = "No description provided"
          }
          $("#search-repos-result-tbody").append(
            `<tr>
                <td>
                  <a href="#" id="toggle-status">
                    <strong>${foundRepos.full_name}</strong><br>
                    <small>by ${foundRepos.owner.login}</small>
                    <p>${foundRepos.description}</p>
                  </a>
                </td>
            </tr>`
          )
        })
      })
      .fail(function(jqXHR, textStatus) {
        console.log("request failed", textStatus);
      })
    })
  })