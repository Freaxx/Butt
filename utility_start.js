// JavaScript Document
(function() {
	"use strict";
	var request, url, movieLinks, path, build, filterLinks = document.querySelectorAll(".filterNav a"), srchInput = document.querySelector("#srch"), live = document.querySelector("#livesrch");
	

	function init() {
		url="admin/includes/getMovies.php";
		build='';
		path="init";
		reqInfo(path);
	}
	
	

	
	

	function reqInfo(path) {
		// Purpose of this function is passed data from the client to the server(https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
		if(window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		}else{
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}
		request.open("GET", url, true);
		request.send();

		if(path==="liveSearch") {
		request.onreadystatechange = searchItems;
	}else{
		request.onreadystatechange = addItems;
	    }

	}







	
	
	function addItems() {
		//populate the full list on the page
		var con = document.querySelector(".movies");
		var details = document.querySelector(".details");
		con.innerHTML = "";
		build = "";
		
		
		if((request.readyState===4) || (request.status===204)) {
			var items = JSON.parse(request.responseText);
			//console.log(items);
			
			if(items.length!==0) {

				if(items.length > 1) {
					con.innerHTML = "";
					// "" = nothing KEEE
					build = "";

					
			    for(var i=0;i<items.length; i++) {
					build = '<div class="inline">';
					build += '<img class="thumb" src="images/'+items[i].movies_thumb+'" alt="'+items[i].movies_title + '">';
					build += '<h2 class="movieTitle">'+items[i].movies_title+'</h2>';
					build += items[i].movies_year+'<br>';
					build += '<a href="index.php?id='+items[i].movies_id+'">See More...</a>';
					build += '</div>';
					// Just change this part ^ and it'll work for the live search.;
					// Just make it the details.php page. 
						
				con.innerHTML += build;
				
				}


				var movieLinks = document.querySelectorAll(".movies a");
				for(var j=0; j<movieLinks.length; j++) {
					movieLinks[j].addEventListener("click", itemDetails, false);

				}

	}else{


        var sBuild = "";
		details.innerHTML = "";
		sBuild = '<div class="row">';
		sBuild += '<div class="small-12 large-centered columns detailsAll">';
	    sBuild += '<img class="detailsImage" src="images/'+items[0].movies_fimg+'" alt="">';
		sBuild += '<h2 class="detailsTitle">'+items[0].movies_title+'</h2>';
		sBuild += '<p class="detailsText">'+items[0].movies_storyline+'</p>';
		sBuild += '<a class="goBack" href="index.php">Go Back</a></div></row>';
		details.innerHTML = sBuild;


	}

	}else{


		//error, no content
		con.innerHTML = "sorry, there was a server error, please try later.";
		
	}
	
  }
  
}
	

	
	




	function searchItems() {
		build = "";

	
		if((request.readyState===4) || (request.status===204)) {
			var srchItems = JSON.parse(request.responseText);
			var items = JSON.parse(request.responseText);
			var details = document.querySelector(".details");

			for(var i=0;i<srchItems.length; i++) {
				build = '<div class="targetLink"><a href="#"><div class="liveSearchSection"><img class="srchTH" src="images/'+srchItems[i].movies_thumb+'" alt="'+srchItems[i].movies_title + '">';
				build += '<div class="srchText"><h3 class="srchTitle">'+srchItems[i].movies_title+'</h3>';
				build += '<p class="srchYear">'+srchItems[i].movies_year+'</p></div></div></a></div><br>';

			}


			live.innerHTML = build;
		    var srchLinks = document.querySelectorAll(".targetLink a");


		    //it's not sending to the details ajax section for some odd reason. 
		    // SO TO SHOW THAT IT AT LEAST WORKED SOMEWHAT I just made it populate on the search result because it's been 10 hours since I've been fideling with this thing
		    // and it will not work for the life of me. 

				for(var j=0; j<srchLinks.length; j++) {
					srchLinks[j].addEventListener("click", addItems, false);



				}


		}else{

            var liveResult = "no results found";
			live.innerHTML =  liveResult;

	

		

		}

    }

	
	






	
	
	
		function liveSearch() {
		// Purpose of this function is to rewrite the URL to be passed the search query on the PHP side.

		
		if (srchInput.value === "") {
 
          
            var liveResult = "";

			live.innerHTML =  liveResult;

        }else if(srchInput.value === " "){




            var liveSpace = "What movie ever started with a space? C'mon.";

			live.innerHTML =  liveSpace;

       


		}else{
			var capture = srchInput.value;
			url="admin/includes/getMovies.php?srch="+capture;
			path = "liveSearch";
			reqInfo(path);

		}


	}
	






	
	
	function filterItems(evt) {
		evt.preventDefault();
		var str = evt.target.href;
		var arr = str.split("=");
		str = arr[1];
		if(str) {
			url = "admin/includes/getMovies.php?filter="+str;
		}else{
			url = "admin/includes/getMovies.php";
		}
		path = "filterItems";
		reqInfo(path);
	}
	










	function itemDetails(evt) {

		if(evt.target.href === undefined){ 
		return str;
		 }

	//console.log("Item Details");
	evt.preventDefault();
	//console.log(evt.target)
	var str = evt.target.href;
	//console.log();
	var arr = str.split("=");
	//console.log(arr[1]);
	url = "admin/includes/getMovies.php?id="+arr[1];
	//console.log(url)
	path = "itemDetails";
	reqInfo(path);

}


	
	



	


	// Listeners
	for(var i=0; i<filterLinks.length; i++){
		filterLinks[i].addEventListener("click", filterItems, false);
		
	}
	
	window.addEventListener("load", init, false);
	srchInput.addEventListener("keyup",liveSearch,false);
	
	
})();