let mealData = document.getElementById("mealData"),
  searchLi = document.querySelector(".searchLi"),
  categoryLi = document.querySelector(".categoryLi"),
  areaLi = document.querySelector(".areaLi"),
  ingredientsLi = document.querySelector(".ingredientsLi"),
  navW = $(".nav-tab").innerWidth(),
  search = document.querySelector("#search"),
  searchByFirstLetter = document.querySelector("#searchByFirst"),
  contact = document.querySelector(".contact");

$(".open-close").click(closeOpen);
function closeOpen() {
  // console.log(navW);
  if ($(".side-nav").css("left") == "0px") {
    $(".side-nav").animate({ left: `-${navW}px` }, 1000);
    $(".open-close").removeClass("fa-x");
    $(".open-close").addClass("fa-align-justify");
    animationsRevers();
  } else {
    $(".side-nav").animate({ left: `0px` }, 1000);
    $(".open-close").removeClass("fa-align-justify");
    $(".open-close").addClass("fa-x");
    animations();
  }

  // console.log($(".nav-tab").innerWidth()); // show nav width
}

//-----------------------

searchLi.addEventListener("click", function () {
  $(".loadingContainer").fadeOut(200);
  $(".searchContainer").css("display", "block");
  closeOpen();
  mealData.innerHTML = "";
});

search.addEventListener("input", function () {
  $(".searchContainer").css("display", "block");

  getMealsByName(search.value);
});

searchByFirstLetter.addEventListener("keyup", function () {
  getMealsByName(this.value);
});

searchByFirstLetter.addEventListener("keyup", function () {
  getMealsByFirstLetter(searchByFirstLetter.value);
  if (searchByFirstLetter.value == "" || searchByFirstLetter.value == null) {
    getMealsByName("");
  }
});

getMealsByName();

async function getMealsByName(name) {
  if (name == null) {
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s`
    );
    let responseArea = await result.json();
    let finalArea = responseArea.meals;
    $(".loadingContainer").fadeOut(400);
    displayFiltered(finalArea.slice(0, 20));
  } else {
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    let responseArea = await result.json();
    let finalArea = responseArea.meals;
    $(".loadingContainer").fadeOut(400);
    displayFiltered(finalArea.slice(0, 20));
  }
}

//-----------------------
categoryLi.addEventListener("click", getCategory);
async function getCategory() {
  $(".loadingContainer").fadeOut(200);
  closeOpen();
  $(".searchContainer").css("display", "none");
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await result.json();
  let finalRsponse = response.categories;
  // console.log(finalRsponse);
  $(".loadingContainer").fadeOut(400);

  displayCategories(finalRsponse);
}

function displayCategories(array) {
  $(".loadingContainer").fadeOut(200);
  cartona = ``;
  for (let i = 0; i < array.length; i++) {
    cartona += `
    <div class="col-md-3">
                  <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick = (filterCategory('${array[i].strCategory}'))>
                      <img class="w-100" src="${array[i].strCategoryThumb}" alt="" srcset="">
                      <div class="meal-layer position-absolute text-center text-black p-2">
                          <h3>${array[i].strCategory}</h3>
                          <p>${array[i].strCategoryDescription}</p>
                      </div>
                  </div>
          </div>`;
  }

  mealData.innerHTML = cartona;
}
////------------------------------

//// Filter by Category
async function filterCategory(category = "Seafood") {
  $(".loadingContainer").fadeOut(200);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await result.json();
  finalRsponse = response.meals;
  // console.log(finalRsponse);
  displayFiltered(finalRsponse);
}

function displayFiltered(array) {
  $(".loadingContainer").fadeOut(200);
  cartona = ``;
  for (let i = 0; i < array.length; i++) {
    cartona += `
    <div class="col-md-3">
                <div onclick="getMeal(${array[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${array[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${array[i].strMeal}</h3>
                    </div>
                </div>
        </div>
    `;
  }

  mealData.innerHTML = cartona;
}

//-----------------------
areaLi.addEventListener("click", getArea);

async function getArea() {
  $(".loadingContainer").fadeOut(200);
  $(".searchContainer").css("display", "none");
  closeOpen();

  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let responseArea = await result.json();
  let finalArea = responseArea.meals;
  // console.log(finalArea);
  $(".loadingContainer").fadeOut(400);

  displayArea(finalArea);
}

function displayArea(array) {
  $(".loadingContainer").fadeOut(200);
  cartona = ``;
  for (let i = 0; i < array.length; i++) {
    cartona += `
    <div class="col-md-3">
                <div class="shadow-lg bg-dark p-3 m-2 rounded text-center cursor-pointer content" onclick = "filterArea('${array[i].strArea}')">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${array[i].strArea}</h3>
                </div>
        </div>
    `;
  }

  mealData.innerHTML = cartona;
}

async function filterArea(Area = "Canadian") {
  $(".loadingContainer").fadeOut(200);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`
  );
  response = await result.json();
  finalRsponse = response.meals;
  // console.log(finalRsponse);
  displayFiltered(finalRsponse.slice(0, 20));
}

//-----------------------
ingredientsLi.addEventListener("click", getIngredients);
async function getIngredients() {
  $(".loadingContainer").fadeOut(200);
  $(".searchContainer").css("display", "none");
  closeOpen();
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let responseArea = await result.json();
  let finalArea = responseArea.meals;
  console.log(finalArea);
  $(".loadingContainer").fadeOut(400);

  displayIngredients(finalArea.slice(0, 20));
}

function displayIngredients(array) {
  $(".loadingContainer").fadeOut(200);
  cartona = ``;
  for (let i = 0; i < 20; i++) {
    cartona += `<div class="col-md-3">
    <div class="rounded-2 text-center cursor-pointer" onclick = "filterIngredients('${
      array[i].strIngredient
    }')">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${array[i].strIngredient}</h3>
            <p>${array[i].strDescription.split(" ").slice(0, 10).join(" ")}</p>
    </div>
</div>`;
  }

  mealData.innerHTML = cartona;
}
//${array[i].strIngredient}
async function filterIngredients(ingredients) {
  $(".loadingContainer").fadeOut(200);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await result.json();
  finalRsponse = response.meals;
  console.log(finalRsponse);
  displayFiltered(finalRsponse);
}

//-----------------------
async function getMeal(mealId = "list") {
  $(".loadingContainer").fadeOut(200);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await result.json();
  finalRsponse = response.meals;
  console.log(`hello from get meal ${finalRsponse}`);
  $(".loadingContainer").fadeOut(400);

  displayMeal(finalRsponse);
}

function displayMeal(meal) {
  $(".loadingContainer").fadeOut(200);
  let recipes = ``;
  for (let i = 1; i < 20; i++) {
    if (meal[0][`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-2 alert alert-light rounded">${
        meal[0][`strMeasure${i}`]
      } ${meal[0][`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal[0].strTags?.split(",");
  let tag = ``;
  for (let i = 0; i < tags?.length; i++) {
    tag += `<li class="my-3 mx-1 p-2 alert alert-light rounded">${tags[i]}</li>`;
  }
  let cartona = `<div class="col-md-4 text-center text-white">
                    <img src="${meal[0].strMealThumb}" class="w-100" alt="" srcset="">
                    <p class="pt-3 fs-2">${meal[0].strMeal}</p>
                </div>
                <div class="col-md-8">
                    <div class="content text-white">
                        <h2>Instructions</h2>
                        <p>${meal[0].strInstructions}
                        </p>
                        <h5>Area : <span>${meal[0].strArea}</span></h5>
                        <h5>Category : <span>${meal[0].strCategory}</span></h5>
                        <h2>Recipes :</h2>
                        <ul class="d-flex p-0 flex-wrap list-unstyled" id="recipes">
                            
                        </ul>
                        <h2>Tags :</h2>
                        <ul class="d-flex p-0 flex-wrap list-unstyled" id="tags">
                            
                        </ul>
                        <h2>

                        <a class="btn btn-success" target="_blank" href="${meal[0].strSource}">Source</a>
                        <a class="btn btn-danger video ms-2 text-white" target="_blank" href="${meal[0].strYoutube}">Youtube</a>

                    </div>
                </div>`;
  mealData.innerHTML = cartona;
  document.getElementById("recipes").innerHTML = recipes;

  document.getElementById("tags").innerHTML = tag;
}

////////////////////////

contact.addEventListener("click", displayContact);

function displayContact() {
  $(".loadingContainer").fadeOut(200);
  closeOpen();
  let cartoona = `<div class='text-center' >
                    <div class="row text-center">
                        <div class="col-md-6">
                                <input type="text" class="form-control shadow mb-2 " id="name"
                                    placeholder="Enter Your Name">
                                <div class="alert alert-danger mt-1 d-none" id="alertName" role="alert">
                                    Special Characters and Numbers not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                                <input type="text" class="form-control shadow mb-2 " id="email"
                                    placeholder="Enter Email">
                                <div class="alert alert-danger mt-1 d-none" id="alertEmail" role="alert">
                                    Enter valid email. *Ex: xxx@yyy.zzz
                            </div>
                        </div>
                        <div class="col-md-6">
                                <input type="text" class="form-control shadow mb-2 " id="phone"
                                    placeholder="Enter Phone">
                                <div class="alert alert-danger mt-1 d-none" id="alertPhone" role="alert">
                                    Enter valid Phone Number
                            </div>
                        </div>
                        <div class="col-md-6">
                                <input type="text" class="form-control shadow mb-2 " id="age" placeholder="Enter Age">
                                <div class="alert alert-danger mt-1 d-none" id="alertAge" role="alert">
                                    Enter valid age
                            </div>
                        </div>
                        <div class="col-md-6">
                                <input type="text" class="form-control shadow mb-2 " id="password"
                                    placeholder="Enter Password">
                                <div class="alert alert-danger mt-1 d-none" id="alertPass" role="alert">
                                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                        <div class="col-md-6">
                                <input type="text" class="form-control shadow mb-2 " id="Repassword"
                                    placeholder="Enter RePassword">
                                <div class="alert alert-danger mt-1 d-none" id="alertRePass" role="alert">
                                    Enter valid Repassword
                            </div>
                        </div>
                    </div>
                    <button type="submit" disabled="true" id="submit"
                        class="btn btn-outline-danger mt-3">Submit</button>
                </div>`;

  mealData.innerHTML = cartoona;
  validate();
}

function validate() {
  let inputName = document.getElementById("name");
  let inputEmail = document.getElementById("email");
  let inputPhone = document.getElementById("phone");
  let inputAge = document.getElementById("age");
  let inputPass = document.getElementById("password");
  let inputRePass = document.getElementById("Repassword");
  let alertName = document.getElementById("alertName");
  let alertEmail = document.getElementById("alertEmail");
  let alertPhone = document.getElementById("alertPhone");
  let alertAge = document.getElementById("alertAge");
  let alertPass = document.getElementById("alertPass");
  let alertRePass = document.getElementById("alertRePass");

  inputName.addEventListener("input", function () {
    if (regexName(inputName) == true) {
      inputName.classList.remove("is-invalid");
      inputName.classList.add("is-valid");
      alertName.classList.replace("d-block", "d-none");
    } else {
      inputName.classList.remove("is-valid");
      inputName.classList.add("is-invalid");
      alertName.classList.replace("d-none", "d-block");
    }
  });

  inputEmail.addEventListener("input", function () {
    if (regexEmail(inputEmail) == true) {
      inputEmail.classList.remove("is-invalid");
      inputEmail.classList.add("is-valid");
      alertEmail.classList.replace("d-block", "d-none");
    } else {
      inputEmail.classList.remove("is-valid");
      inputEmail.classList.add("is-invalid");
      alertEmail.classList.replace("d-none", "d-block");
    }
  });
  inputAge.addEventListener("input", function () {
    if (regexAge(inputAge) == true) {
      inputAge.classList.remove("is-invalid");
      inputAge.classList.add("is-valid");
      alertAge.classList.replace("d-block", "d-none");
    } else {
      inputAge.classList.remove("is-valid");
      inputAge.classList.add("is-invalid");
      alertAge.classList.replace("d-none", "d-block");
    }
  });
  inputPhone.addEventListener("input", function () {
    if (regexPhone(inputPhone)) {
      inputPhone.classList.remove("is-invalid");
      inputPhone.classList.add("is-valid");
      alertPhone.classList.replace("d-block", "d-none");
    } else {
      inputPhone.classList.remove("is-valid");
      inputPhone.classList.add("is-invalid");
      alertPhone.classList.replace("d-none", "d-block");
    }
  });

  inputPass.addEventListener("input", function () {
    if (regexPass(inputPass)) {
      inputPass.classList.remove("is-invalid");
      inputPass.classList.add("is-valid");
      alertPass.classList.replace("d-block", "d-none");
    } else {
      inputPass.classList.remove("is-valid");
      inputPass.classList.add("is-invalid");
      alertPass.classList.replace("d-none", "d-block");
    }
  });
  inputRePass.addEventListener("input", function () {
    if (inputPass.value == inputRePass.value) {
      inputRePass.classList.remove("is-invalid");
      inputRePass.classList.add("is-valid");
      alertRePass.classList.replace("d-block", "d-none");
      validate();
    } else {
      inputRePass.classList.remove("is-valid");
      inputRePass.classList.add("is-invalid");
      alertRePass.classList.replace("d-none", "d-block");
      validate();
    }
  });
  if (
    regexName(inputName) == true &&
    regexEmail(inputEmail) == true &&
    regexPhone(inputPhone) == true &&
    regexAge(inputAge) == true &&
    regexPass(inputPass) == true &&
    inputPass.value == inputRePass.value
  ) {
    document.getElementById("submit").removeAttribute("disabled");
  } else {
    document.getElementById("submit").setAttribute("disabled", "true");
  }
}

function regexName(inputName) {
  let regex = /^[a-zA-Z ]+$/;
  return regex.test(inputName.value);
}
function regexEmail(inputEmail) {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(inputEmail.value);
}
function regexAge(inputAge) {
  let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;

  return regex.test(inputAge.value);
}
function regexPhone(inputPhone) {
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  return regex.test(inputPhone.value);
}
function regexPass(inputPass) {
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

  return regex.test(inputPass.value);
}
////////////

function animations() {
  $(".links ul .searchLi").animate(
    { paddingTop: "40px", opacity: "1" },
    300,
    function () {
      $(".links ul .categoryLi").animate(
        { paddingTop: "40px", opacity: "1" },
        400,
        function () {
          $(".links ul .areaLi").animate(
            { paddingTop: "40px", opacity: "1" },
            500,
            function () {
              $(".links ul .ingredientsLi").animate(
                { paddingTop: "40px", opacity: "1" },
                600,
                function () {
                  $(".links ul .contact").animate(
                    { paddingTop: "40px", opacity: "1" },
                    700
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}

function animationsRevers() {
  $(".links ul .searchLi").animate(
    { paddingTop: "80px", opacity: "0" },
    300,
    function () {
      $(".links ul .categoryLi").animate(
        { paddingTop: "80px", opacity: "0" },
        400,
        function () {
          $(".links ul .areaLi").animate(
            { paddingTop: "80px", opacity: "0" },
            500,
            function () {
              $(".links ul .ingredientsLi").animate(
                { paddingTop: "80px", opacity: "0" },
                600,
                function () {
                  $("nav ul .contact").animate(
                    { paddingTop: "80px", opacity: "0" },
                    700
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}
