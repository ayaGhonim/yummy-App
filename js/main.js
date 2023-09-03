let searchByName = document.getElementById('searchByName')
let searchByLetter = document.getElementById('searchByLetter')
let uName = document.getElementById('uName')
let uEmail = document.getElementById('uEmail')
let uPhone = document.getElementById('uPhone')
let uAge = document.getElementById('uAge')
let uPass = document.getElementById('uPass')
let uRepass = document.getElementById('uRepass')
let nameVaild = document.getElementById('nameVaild')
let emailValid = document.getElementById('emailValid')
let phoneValid = document.getElementById('phoneValid')
let ageValid = document.getElementById('ageValid')
let passValid = document.getElementById('passValid')
let SubmitBtn = document.getElementById('SubmitBtn')
let done = document.getElementById('done')


// looding screen
function loading() {
    $(document).ready(function () {
        $('body').css('overflow', 'hidden').fadeIn(1000, function () {
            $('.lsk-chase').fadeOut(1000)
            $('#loading').fadeOut(3000, function () {
                $('#loading').remove()
                $('body').css('overflow', 'auto')
            })
        })
    })
}
loading()
// open side nav
$('.open-bar').click(function () {
    $('.side').css('left', '0')
    $('.open-bar').css('display', 'none')
    $('.close-bar').css('display', 'block')
    $('#liSearch').animate({top:'45px'},2600)
    $('#liCategory').animate({top:'85px'},2700)
    $('#liArea').animate({top:'135px'},2800)
    $('#liIngredients').animate({top:'185px'},2900)
    $('#liContact').animate({top:'235px'},3000)
       
})

// close side nv
$('.close-bar').click(function () {
    $('.side').css('left', '-18%')
    $('.open-bar').css('display', 'block')
    $('.close-bar').css('display', 'none')
    $('#liSearch').animate({top:'60px'},400)
    $('#liCategory').animate({top:'120px'},600)
    $('#liArea').animate({top:'180px'},800)
    $('#liIngredients').animate({top:'240px'},1000)
    $('#liContact').animate({top:'300px'},1200)
       
})

// fetch api of search
async function getFood(dish) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`)
    let data = await response.json()
    // console.log(data.meals)
    displayFood(data.meals)
    // getMealInfo(data.meals)

}
getFood('')

// fetch api of meal info
async function getById(dish) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dish}`)
    let data = await response.json()
    console.log(data.meals)
    getMealInfo(data.meals)

}

// fetch api of categories
async function getcategory() {
    $(document).ready(function () {
        $('body').css('overflow', 'hidden').fadeIn(1000, function () {
            $('.lsk-chase').fadeOut(1000)
            $('#loadCategory').fadeOut(3000, function () {
                $('#loadCategory').remove()
                $('body').css('overflow', 'auto')
            })
        })
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await response.json()
    console.log(data.categories)
    categorySec(data.categories)
}
// fetch category dishes
async function getcategoryDishes(dish) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${dish}`)
    let data = await response.json()
    console.log(data)
    displayCategory(data.meals)
}

// fetch api for area
async function getArea() {
    $(document).ready(function () {
        $('body').css('overflow', 'hidden').fadeIn(1000, function () {
            $('.lsk-chase').fadeOut(1000)
            $('#loadArea').fadeOut(3000, function () {
                $('#loadArea').remove()
                $('body').css('overflow', 'auto')
            })
        })
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await response.json()
    // console.log(data.meals)
    areaSec(data.meals)
}

// fetch api for area meals
async function getAreaMeals(country) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    let data = await response.json()
    console.log(data.meals)
    displayAreaMeals(data.meals)
    
}

// fetch api for ingredients
async function getIngredients() {
    $(document).ready(function () {
        $('body').css('overflow', 'hidden').fadeIn(1000, function () {
            $('.lsk-chase').fadeOut(1000)
            $('#loadIng').fadeOut(3000, function () {
                $('#loadIng').remove()
                $('body').css('overflow', 'auto')
            })
        })})
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await response.json()
    // console.log(data.meals)
    ingreSec(data.meals)

}

// fetch ingredient meals
async function getIngredientsMeals(ingredient) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let data = await response.json()
    console.log(data.meals)
    displayIngMeals(data.meals)


}

// display main data & search data
function displayFood(arr) {
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div  class="aya col-md-3 mt-4 position-relative overflow-hidden rounded-3">
        <div class="layer position-absolute rounded-3 bg-opacity-75 bg-light">
            <h6 class="food-name fs-2 ">${arr[i].strMeal}</h6>
        </div>
        <img src="${arr[i].strMealThumb}"  class=" w-100 rounded-3" alt="">
        <h3 class="d-none">${arr[i].idMeal}</h3>
    </div>
    `
    }
    document.getElementById('mainFood').innerHTML = cartona
    $('.aya').click(function () {
        let x = $(this).find('h3').text()
        console.log(x)
        getById(x)
        $('#mainHome').css('display', 'none')
        $('#dishInfo').css('display', 'block')


    })
}

// display category data
function categorySec(arr2) {
    let cartona = ``
    for (let i = 0; i < arr2.length; i++) {
        cartona += `
        <div class="categories col-md-3 mt-5 position-relative overflow-hidden">
                <img src="${arr2[i].strCategoryThumb}" class="w-100 rounded-3" alt="">
                <div class="layer position-absolute rounded-3 bg-opacity-75 bg-light text-center">
                        <h4 class="mt-2 fs-1 ">${arr2[i].strCategory}</h4>
                        <p class="px-1">${arr2[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
                 <h3 class="d-none">${arr2[i].strCategory}</h3>
        </div>
    `
    }
    document.getElementById('categoryFood').innerHTML = cartona
    $('.categories').click(function () {
        let x = $(this).find('h3').text()
        console.log(x)
        getcategoryDishes(x)
        $('#category').css('display', 'none')
        $('#categoryInfo').css('display', 'block')
    })
}
// display area data
function areaSec(arr3) {
    let cartona = ``
    for (let i = 0; i < arr3.length; i++) {
        cartona += `
        <div class="area col-md-3 text-center py-3">
        <h3 class="text-white area-home"><i class="fa-solid fa-house-laptop"></i></h3>
        <h3 class="text-white">${arr3[i].strArea}</h3>
        <h4 class="d-none">${arr3[i].strArea}</h4>
    </div>
    `
    }
    document.getElementById('areaFood').innerHTML = cartona

    $('.area').click(function () {
        let x = $(this).find('h4').text()
        console.log(x)
        getAreaMeals(x)
        $('#area').css('display', 'none')
        $('#areaMeals').css('display', 'block')
    })
}
// display ingredients data
function ingreSec(arr4) {
    let cartona = ``
    for (let i = 0; i < 25; i++) {
        cartona += `
        <div class="inger col-md-3 text-center text-white p-3">
        <h3 class="text-white  ing-bite"><i class="fa-solid fa-drumstick-bite"></i></h3>
        <h3>${arr4[i].strIngredient}</h3>
        <p>${arr4[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        <h4 class="d-none">${arr4[i].strIngredient}</h4>

    </div>
    `
    }
    document.getElementById('ingredientsList').innerHTML = cartona

    $('.inger').click(function () {
        let x = $(this).find('h4').text()
        console.log(x)
        getIngredientsMeals(x)
        $('#ingredients').css('display', 'none')
        $('#ingMeals').css('display', 'block')
    })
}
// search in side nav
$('#liSearch').click(function () {
    $('#search').css('display', 'block')
    $('#mainHome').css('display', 'none')
    $('#category').css('display', 'none')
    $('#area').css('display', 'none')
    $('#ingredients').css('display', 'none')
    $('#contact').css('display', 'none')
    $('.side').css('left', '-18%')
    $('.open-bar').css('display', 'block')
    $('.close-bar').css('display', 'none')
    $('#dishInfo').css('display', 'none')
    $('#categoryInfo').css('display', 'none')
    $('#areaMeals').css('display', 'none')
    $('#ingMeals').css('display', 'none')
    $('#liSearch').animate({top:'60px'},400)
    $('#liCategory').animate({top:'120px'},600)
    $('#liArea').animate({top:'180px'},800)
    $('#liIngredients').animate({top:'240px'},1000)
    $('#liContact').animate({top:'300px'},1200)






    searchByName.addEventListener('input', function () {
        $('#mainHome').css('display', 'block')
        $('#dishInfo').css('display', 'none')
        getFood(searchByName.value)

    })
    searchByLetter.addEventListener('input', function () {
        $('#dishInfo').css('display', 'none')
        $('#mainHome').css('display', 'block')
        getFood(searchByLetter.value)
    })
})
// category in side nav
$('#liCategory').click(function () {
    getcategory()
    $('#categoryInfo').css('display', 'none')
    $('#mainHome').css('display', 'none')
    $('#search').css('display', 'none')
    $('#area').css('display', 'none')
    $('#ingredients').css('display', 'none')
    $('#contact').css('display', 'none')
    $('#category').css('display', 'block')
    $('.side').css('left', '-18%')
    $('.open-bar').css('display', 'block')
    $('.close-bar').css('display', 'none')
    $('#dishInfo').css('display', 'none')
    $('#areaMeals').css('display', 'none')
    $('#ingMeals').css('display', 'none')
    $('#liSearch').animate({top:'60px'},400)
    $('#liCategory').animate({top:'120px'},600)
    $('#liArea').animate({top:'180px'},800)
    $('#liIngredients').animate({top:'240px'},1000)
    $('#liContact').animate({top:'300px'},1200)




})
// area in side nav
$('#liArea').click(function () {
    getArea()
    $('#mainHome').css('display', 'none')
    $('#search').css('display', 'none')
    $('#category').css('display', 'none')
    $('#ingredients').css('display', 'none')
    $('#contact').css('display', 'none')
    $('#area').css('display', 'block')
    $('.side').css('left', '-18%')
    $('.open-bar').css('display', 'block')
    $('.close-bar').css('display', 'none')
    $('#dishInfo').css('display', 'none')
    $('#categoryInfo').css('display', 'none')
    $('#areaMeals').css('display', 'none')
    $('#ingMeals').css('display', 'none')
    $('#liSearch').animate({top:'60px'},400)
    $('#liCategory').animate({top:'120px'},600)
    $('#liArea').animate({top:'180px'},800)
    $('#liIngredients').animate({top:'240px'},1000)
    $('#liContact').animate({top:'300px'},1200)






})
// ingredients in side nav
$('#liIngredients').click(function () {
    getIngredients()
    $('#mainHome').css('display', 'none')
    $('#search').css('display', 'none')
    $('#category').css('display', 'none')
    $('#area').css('display', 'none')
    $('#contact').css('display', 'none')
    $('#ingredients').css('display', 'block')
    $('.side').css('left', '-18%')
    $('.open-bar').css('display', 'block')
    $('.close-bar').css('display', 'none')
    $('#dishInfo').css('display', 'none')
    $('#categoryInfo').css('display', 'none')
    $('#areaMeals').css('display', 'none')
    $('#ingMeals').css('display', 'none')
     $('#liSearch').animate({top:'60px'},400)
    $('#liCategory').animate({top:'120px'},600)
    $('#liArea').animate({top:'180px'},800)
    $('#liIngredients').animate({top:'240px'},1000)
    $('#liContact').animate({top:'300px'},1200)





})
// contact in side nav
$('#liContact').click(function () {
    $('#mainHome').css('display', 'none')
    $('#search').css('display', 'none')
    $('#category').css('display', 'none')
    $('#area').css('display', 'none')
    $('#ingredients').css('display', 'none')
    $('#contact').css('display', 'block')
    $('.side').css('left', '-18%')
    $('.open-bar').css('display', 'block')
    $('.close-bar').css('display', 'none')
    $('#dishInfo').css('display', 'none')
    $('#categoryInfo').css('display', 'none')
    $('#areaMeals').css('display', 'none')
    $('#ingMeals').css('display', 'none')
    $('#liSearch').animate({top:'60px'},400)
    $('#liCategory').animate({top:'120px'},600)
    $('#liArea').animate({top:'180px'},800)
    $('#liIngredients').animate({top:'240px'},1000)
    $('#liContact').animate({top:'300px'},1200)






})
// validation pattern
function checkName(str1) {
    var nameRegex = /^[a-zA-Z0-9]{4,}$/
    return nameRegex.test(str1)
}
function checkEmail(str2) {
    var emailRegex = /^[a-zA-Z0-9_]{3,}@(gmail|yahoo).com$/
    return emailRegex.test(str2)
}
function checkPhone(str3) {
    var phoneRegex = /^01[1205][0-9]{8}$/
    return phoneRegex.test(str3)
}
function checkPass(str4) {
    var passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passRegex.test(str4)
}
SubmitBtn.disabled = true
uName.addEventListener('input', function () {
    validationForm()
    if (checkName(uName.value) && !(uName.value) == "") {
        nameVaild.style.display = 'none'
        emailValid.style.marginLeft = '50%'
    } else {
        nameVaild.style.display = 'block'
        nameVaild.style.width = '100%'
        emailValid.style.marginLeft = '0'
    }
})
uEmail.addEventListener('input', function () {
    validationForm()
    if (checkEmail(uEmail.value) && !(uEmail.value) == "") {
        emailValid.style.display = 'none'
        nameVaild.style.marginRight = '50%'
    } else {
        emailValid.style.display = 'block'
        emailValid.style.marginLeft = '50%'
    }
})
uPhone.addEventListener('input', function () {
    validationForm()
    if (checkPhone(uPhone.value) && !(uPhone.value) == "") {
        phoneValid.style.display = 'none'
        ageValid.style.marginLeft = '50%'
    } else {
        phoneValid.style.display = 'block'
        ageValid.style.marginLeft = '0'
    }
})
uAge.addEventListener('input', function () {
    validationForm()
    if ((uAge.value > 18) && !(uAge.value) == "") {
        ageValid.style.display = 'none'
        phoneValid.style.marginRight = '50%'
    } else {
        ageValid.style.display = 'block'
        phoneValid.style.marginLeft = '50%'
    }
})
uPass.addEventListener('input', function () {
    validationForm()
    if (checkPass(uPass.value) && !(uPass.value) == "") {
        passValid.style.display = 'none'
    } else {
        passValid.style.display = 'block'
    }
})
uRepass.addEventListener('input', function () {
    validationForm()
    if ((uPass.value == uRepass.value) && !(uPass.value) == "") {
        done.innerHTML = 'This Matches with password..'
        done.style.color = 'green'
        SubmitBtn.disabled = false
    } else {
        done.innerHTML = 'Not Match with password..'
        done.style.color = 'crimson'
    }
})
function validationForm() {
    if (uName.value == '' || uEmail.value == '' || uPhone.value == ''
        || uAge.value == '' || uPass.value == '' || uRepass.value == '') {
        SubmitBtn.disabled = true
    } else if (checkName(uName.value)
        && (checkEmail(uEmail.value)
            && checkPhone(uPhone.value)
            && (uAge.value > 18)
            && checkPass(uPass.value)
            && (uPass.value == uRepass.value))) {
        SubmitBtn.disabled = false
    }
    else {
        SubmitBtn.disabled = true
    }
}

// get info about meals

function getMealInfo(arr5) {
    let cartona = ``
    for (let i = 0; i < arr5.length; i++) {
        cartona = `
        <div class="col-md-4">
        <img src="${arr5[i].strMealThumb}" class=" rounded-3 w-100"  >
        <br>
        <h3>${arr5[i].strMeal}</h3>
    </div>
    <div class="col-md-8">
        <h3>Instructions</h3>
        <br>
        <p>${arr5[i].strInstructions}</p>
        <br>
        <h3>Area : <span class="fs-5">${arr5[i].strArea}</span></h3>
        <br>
        <h3>Category : <span class="fs-5">${arr5[i].strCategory}</span></h3>
        <br>
        <h3>Recipes : </h3>
        <br>
        <div class="d-flex flex-wrap">
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient1||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient2||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient3||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient4||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient5||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient6||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient7||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient8||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient9||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient10||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient11||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient12||'Nothing'}</p>
        <p class="recipes-p rounded-2 py-2 px-4 mx-1 text-black">${arr5[i].strIngredient13||'Nothing'}</p>
        </div>
        <h3 class="mb-1">Tags :</h3>
        <div class=" d-flex mt-2 text-black">
        <ul class="list-unstyled d-flex flex-wrap">
        ${arr5[i].strTags?.split(",").map(function(x){
            return `<li class="tags-p rounded-2 p-2 my-2 m-2 d-inline-block text-brown">${x}</li>`
        }).join('')||""}
        </ul>
        </div>
        <div class="d-flex mt-5">
            <a href="${arr5[i].strSource}" class="py-2 px-4 rounded-pill bg-success text-white text-decoration-none fw-semibold me-2">Source</a>
            <a href="${arr5[i].strYoutube}" class="py-2 px-4 rounded-pill bg-danger text-white text-decoration-none fw-semibold">Youtube</a>
        </div>
    </div>
    `
    }
    document.getElementById('mealInfo').innerHTML = cartona
}
// get category meals
// 
function displayCategory(arr) {
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div  class="aya col-md-3 mt-4 position-relative overflow-hidden rounded-3">
        <div class="layer position-absolute rounded-3 bg-opacity-75 bg-light">
            <h6 class="food-name fs-2 ">${arr[i].strMeal}</h6>
        </div>
        <img src="${arr[i].strMealThumb}"  class=" w-100 rounded-3" alt="">
        <h3 class="d-none">${arr[i].idMeal}</h3>



    </div>
    `
    }
    document.getElementById('categoryDishes').innerHTML = cartona

    $('.aya').click(function () {
        let x = $(this).find('h3').text()
        console.log(x)
        getById(x)
        $('#categoryInfo').css('display', 'none')
        $('#dishInfo').css('display', 'block')
       

    })
    
}


// get meals of area
function displayAreaMeals(arr) {
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div  class="area2 col-md-3 mt-4 position-relative overflow-hidden rounded-3">
        <div class="layer position-absolute rounded-3 bg-opacity-75 bg-light">
            <h6 class="food-name fs-2 ">${arr[i].strMeal}</h6>
        </div>
        <img src="${arr[i].strMealThumb}"  class=" w-100 rounded-3" alt="">
        <h3 class="d-none">${arr[i].idMeal}</h3>

    </div>
    `
    }
    document.getElementById('areaDishes').innerHTML = cartona
    $('.area2').click(function () {
        let x = $(this).find('h3').text()
        console.log(x)
        getById(x)
        $('#areaMeals').css('display', 'none')
        $('#dishInfo').css('display', 'block')
        
    })
}

// get meals of ingredients
function displayIngMeals(arr) {
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div  class="ing2 col-md-3 mt-4 position-relative overflow-hidden rounded-3">
        <div class="layer position-absolute rounded-3 bg-opacity-75 bg-light">
            <h6 class="food-name fs-2 ">${arr[i].strMeal}</h6>
        </div>
        <img src="${arr[i].strMealThumb}"  class=" w-100 rounded-3" alt="">
        <h3 class="d-none">${arr[i].idMeal}</h3>
    </div>
    `
    }
    document.getElementById('ingredientsContainer').innerHTML = cartona
    $('.ing2').click(function () {
        let x = $(this).find('h3').text()
        console.log(x)
        getById(x)
        $('#ingMeals').css('display', 'none')
        $('#dishInfo').css('display', 'block')
        
    })
}







