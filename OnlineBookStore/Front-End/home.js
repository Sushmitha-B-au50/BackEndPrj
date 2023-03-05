
// api url
const api_url =
	"http://localhost:8000/books";

// Defining async function
async function getapi(url) {	
	// Storing response
	const response = await fetch(url);	
	// Storing data in form of JSON
    var data = await response.json();
	if (response) {
		show(data);
	}
}
// Calling that async function
getapi(api_url);


//Function to define innerHTML for HTML table
function show(data) {  
	let tab =
		`
       `;
	// Loop to access all rows
	for (let r of data) {
		tab += `
<div class="card m-3" style="width: 18rem;">
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${r.Bk_FrontCover}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${r.Pages}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${r.Bk_BackCover}" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
        </div>
			<div class="card-body">
			 <h5 class="card-title" name="book" id="bookName">${r.BookName}</h5>
			</div>
			<ul class="list-group list-group-flush">
			<li class="list-group-item"><b>Author</b> - ${r.Author}</li>
			<li class="list-group-item"><b> Ratings</b> - ${(r.Ratings).toFixed(1)}</li>
			<li class="list-group-item" id="BkPrice"><b>Price</b> - ${Object.values(r.Price)}</li>
            </ul>	
			<button class="btn btn-primary"  style="background-color:#555D50; border-color: #5A5A5A; border-style :solid;">Add to Cart</button>
	    </div>`;
	}
	// Setting innerHTML as tab variable
	document.getElementById("content").innerHTML = tab;
}




function funLogin() {
	window.location.href = "http://localhost:8000/login";
  }

async function funLogOut()
{
	document.getElementById('btnLogin').style.display = '';
   document.getElementById('btnLogout').style.display = 'none';
   document.getElementById('loginName').innerHTML = "";
   username = "";
	debugger;
	const response = await fetch(("http://localhost:8000/user/logout"),{
		method:"post",
	});	
}


var username ="";
const url = "http://localhost:8000/user/login";
async function getLoginData() {	
	var cookiesMap = document.cookie.split(";").map( value => {
        var val =value.split("=")
        var obj = { "key" : val[0], "value" : val[1] }
        return obj;
        });

    for( var i = 0 ; i < cookiesMap.length ; i++ ){
        if( cookiesMap[i].key==="UserName"){
            username = cookiesMap[i].value;
        }
    }
	const response = await fetch(url);
	debugger;
	if (response.status==200) {
		hideloader();
		document.getElementById('btnLogout').style.display = '';
		document.getElementById('loginName').innerHTML = username;
	}
}

// Function to hide the loader
function hideloader() {
	document.getElementById('btnLogin').style.display = 'none';
}
// Calling that async function
getLoginData();


function AddtoCart()
{
	if(username == "")
	  alert("Please Login to Buy Books");
	else{
		let books=[];
		books.push();
		// window.location.href = "http://localhost:8000/cart";
		// console.log(books);
	}
}

