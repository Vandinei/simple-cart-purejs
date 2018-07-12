//Variables

const courses = document.querySelector("#courses-list");
const shoppingCartContent = document.querySelector('#cart-content tbody');
const clearCarBtn = document.querySelector('#clear-cart');
const shoppingCart = document.querySelector("#shopping-cart");

//Listeners

loadEventListener();

function loadEventListener(){
    //When a new course is added
    courses.addEventListener('click', buyCourse);

    //When the remove  button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    //Clear cart btn

    clearCarBtn.addEventListener('click', clearCart);

    //Document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}

//Functions

function buyCourse(e){

    e.preventDefault();

    console.log(e.target);
    //use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')){
        //read the course values
        let course = e.target.parentElement.parentElement;
        console.log(course);
        //read the values
        getCourseInfo(course);
   
    }

}

// Add the courses into the local storage

function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into the array
    courses.push(course);

    // since storage only saves strings, we need to convert JSON into String
    localStorage.setItem('courses', JSON.stringify(courses) );
}

// Get the contents from storage
function getCoursesFromStorage() {

    let courses;

    // if something exist on storage then we get the value, otherwise create an empty array
    if(localStorage.getItem('courses') === null) {
         courses = [];
    } else {
         courses = JSON.parse(localStorage.getItem('courses') );
    }
    return courses;

}

//Reads the HTML information of the selected course
function getCourseInfo(course){
    //Create an Object with Course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }

    //Insert into to the shopping cart
    addIntoCart(courseInfo);

}

//Display the selecected course into the shopping cart

function addIntoCart(course){

    //display cart on add 
    shoppingCart.style.display = 'block';

    //create a <tr>
    const row = document.createElement('tr');

    //Build the template

    row.innerHTML = `
        <tr>   
            <td>
            <img src="${course.image}" width="100" />
            </td>
            <td>
            ${course.title}
            </td>
            <td>
            ${course.price}
            </td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

    //Add into the shopping cart
    shoppingCartContent.appendChild(row);

     // Add course into Storage
     saveIntoStorage(course);

}


// remove course from the dom
function removeCourse(e) {
    let course, courseId;

    // Remove from the dom
    if(e.target.classList.contains('remove')) {
         e.target.parentElement.parentElement.remove();
         course = e.target.parentElement.parentElement;
         courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    // remove from the local storage
    removeCourseLocalStorage(courseId);
}

// remove from local storage
function removeCourseLocalStorage(id) {
    // get the local storage data
    let coursesLS = getCoursesFromStorage();

    // loop trought the array and find the index to remove
    coursesLS.forEach(function(courseLS, index) {
         if(courseLS.id === id) {
              coursesLS.splice(index, 1);
         }
    });

    // Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}


//Clear the shopping cart

function clearCart(){
   // shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }


     // Clear from Local Storage
     clearLocalStorage();
     
}

// Clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}

// Loads when document is ready and print courses into shopping cart

function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // LOOP throught the courses and print into the cart
    coursesLS.forEach(function(course) {
         // create the <tr>
         const row = document.createElement('tr');

         // print the content
         row.innerHTML = `
              <tr>
                   <td>
                        <img src="${course.image}" width=100>
                   </td>
                   <td>${course.title}</td>
                   <td>${course.price}</td>
                   <td>
                        <a href="#" class="remove" data-id="${course.id}">X</a>
                   </td>
              </tr>
         `;
         shoppingCartContent.appendChild(row);
    });
}