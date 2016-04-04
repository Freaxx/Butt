//Js File
//Variables

var thumbs = document.querySelectorAll('.thImage'), mainImage = document.querySelector("#bigImage");

//Functions

function changeImage() {
	//console.log('working');
	console.log(this.src);
	//take thumbnail src image name and split it here "_"
	//this.src
}

//Event Listeners

//console.log(thumbs.length);
for (i = 0; i < thumbs.length; i++) {
	thumbs[i].addEventListener('click',changeImage,false);
}