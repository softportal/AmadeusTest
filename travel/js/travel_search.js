function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

autocomplete(document.getElementById("from-place"), countries);

function myMap() {
    var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    var mapOptions = {
        zoom: 4,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListener(map, 'click', function(e) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        placeMarker(e.latLng, map);
    });
}

var markers = []
function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    markers.push(marker);
    marker.setMap(map);
}

var show_map_btn = document.getElementById("show-map");

show_map_btn.addEventListener("click", function(){
    document.getElementById("map").style.display = "block";
    document.getElementById("hide-map").style.display = "block";
    document.getElementById("show-map").style.display = "none";
}, false);

var show_map_btn = document.getElementById("hide-map");

show_map_btn.addEventListener("click", function(){
    document.getElementById("map").style.display = "none";
    document.getElementById("hide-map").style.display = "none";
    document.getElementById("show-map").style.display = "block";
}, false);

document.getElementById("map").style.display = "none";
document.getElementById("hide-map").style.display = "none";
document.getElementById("show-map").style.display = "block";

var search_btn = document.getElementById("search");

search_btn.addEventListener("click", function(){
    var origin = document.getElementById("from-place").value;
    var budget = document.getElementById("budget").value;
    var dateStart = document.getElementById("date-start").value;
    var dateEnd = document.getElementById("date-end").value;
    var travelers = document.getElementById("travelers").value;

    if (markers[0]){
        var latitude = markers[0].getPosition().lat();
        var longitude = markers[0].getPosition().lng();
    }

    var dateS = new Date(dateStart);
    var timeDiff = Date.parse(dateEnd) - Date.parse(dateStart);
    var duration  = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if ((dateS.getMonth()+1) < 10){
        var start_time = dateS.getFullYear() + "-0" + (dateS.getMonth()+1) + "-" + dateS.getDate();
    }else{
        var start_time = dateS.getFullYear() + "-" + (dateS.getMonth()+1) + "-" + dateS.getDate();
    }

    var ajax_url = "http://server01:3000/";
    var params = "init="+start_time+"&end="+duration+"&passengers="+travelers+"&price="+budget+"&origin="+origin;

    if (markers[0]){
        ajax_url += "search-by-location";
        params += "&latitude="+latitude+"&longitude="+longitude;
    }else{
        ajax_url += "search";
    }

    ajax_url += '?' + params;

    jQuery("#travel_list").html("<p>Not found results</p>");
    jQuery.ajax({
        type: 'GET',
        url: ajax_url,
        success: function(d){
            if (d.data === undefined){
                html = "<p>503 Service Unavailable</p>"
                jQuery("#travel_list").append(html);
            } else if (d == "NotFoundError"){
                html = "<p>Not results</p>";
                jQuery("#travel_list").append(html);
            }
            else {
                jQuery("#travel_list").html("");
                d.data.forEach(function(obj){
                    html = '<div class="col-md-4 col-sm-6 fh5co-tours animate-box target-travel" data-animate-effect="fadeIn"> \
                        <div href="#"><img src="images/place-1.jpg" class="img-responsive">\
                            <div class="desc">\
                                <span></span>\
                                <h3>'+obj.destination+'</h3>\
                                <span class="price">'+obj.price.total+'€</span>\
                                <a class="btn btn-primary btn-outline" href="#">Buy now <i class="icon-arrow-right22"></i></a>\
                            </div>\
                        </div>\
                    </div>';
                    jQuery("#travel_list").append(html);
                });
            }
            $('html, body').animate({scrollTop:'1000'}, 'slow');
        },
        error: function(e){
            console.log(e);
        }
      });

}, false);

