//Add game chart to location show page to show has many relationships

$(() => {
  bindLocationClickHandlers()
})

const bindLocationClickHandlers = () => {
  // Locations index
  $(document).on("click", ".see-locations", (e) => {
    e.preventDefault();
    history.pushState(null, null, `/locations`);
    clearContent();
    getLocations();
  });
  // Show Location
  $(document).on("click", ".location-click", function(e)  {
    e.preventDefault();
    let url = $(this).attr("href");
    history.pushState(null, null, `${url}`);
    clearContent();
    showLocation(url);
  });
  // New location form
  // $(document).on("click", ".add-location", function(e) {
  //   e.preventDefault();
  //   var authToken = $('meta[name=csrf-token]').attr('content');
  //   history.pushState(null, null, `/locations/new`);
  //   clearContent();
  //   getNewLocation(authToken);
  // });
  // Location submit non-AJAX form
  $(document).on('submit', 'form.location-form', function(e) {
    e.preventDefault();
    $.ajax({
      type: this.method,
      url: this.action,
      data: $(this).serialize(),
      success: function(data) {
        var location = data;
        let url = `/locations/${location.id}`;
        clearContent();
        showLocation(url);
      }
    })
  })
  // Edit location
  // $(document).on("click", "a.edit-location", function(e) {
  //   let locationId = $(this).date("id");
  //   history.pushState(null, null, `/locations/${locationId}/edit`);
  //   clearContent();
  //   getEditLocation(locationId);
  // });
  // Edit Location submit
  // $(document).on("submit", "form.edit_location", (e) => {
  //   e.preventDefault();
  //   console.log(this)
  // })
}


//////// LOCATION OBJECT //////////

function Location(location) {
  this.id = location.id
  this.name = location.name
  this.city = location.city
  this.state = location.state
  this.lighting = location.lighting
  this.turf = location.turf
  this.games = location.games
  this.rank = location.rank
  this.total_locations = location.total_locations
}


//////// LOCATION INDEX FUNCTIONS //////////

const getLocations = () => {
  $.ajax({
    method: 'get',
    url: `/locations.json`,
    success: function(locations) {
      displayLocations(locations)
    }
  });
}

const displayLocations = (locations) => {
  let locationIndexHTML = locationIndexStatic();
  $('.main-content').html(locationIndexHTML);
  locations.forEach((location) => {
    let newLocation = new Location(location)
    let locationHTML = newLocation.formatLocationIndex()
    $('ul.locations').append(locationHTML)
  })
}

const locationIndexStatic = () => {
  let locationIndexHTML = `
  <h3>Kadima Locations</h3><br>
  <a class="btn btn-primary add-location" href="/locations/new">Add a Location</a><br><br>
  <ul class="locations">
  </ul>
  `
  return locationIndexHTML
}

Location.prototype.formatLocationIndex = function() {
  let locationHTML = `
  <li data-id="${this.id}">
    <a href="/locations/${this.id}" class="location-click"><strong>${this.name}</strong></a><br>
    ${this.city}, ${this.state}<br>
    <a class="btn btn-xs btn-default edit-location" href="/locations/${this.id}/edit" data-id="${this.id}">Edit</a>
  </li><br>
  `
  return locationHTML
}

///////// LOCATION SHOW FUNCTIONS//////////

const showLocation = (url) => {
  $.ajax({
    method: 'get',
    url: `${url}.json`,
    success: function(location) {
    let newLocation = new Location(location);
    let locationShowHTML = newLocation.formatLocationShow();
    $('.main-content').append(locationShowHTML);
    newLocation.formatLighting();
    }
  })
}

Location.prototype.formatLocationShow = function() {
  let locationShowHTML = `
  <h3>${this.name} Information</h3>
  <h4>${this.city}, ${this.state}</h4>
  <br>
  <p>Ranked #${this.rank} of ${this.total_locations} locations, based on number of games played there.</p><br>
  <p>Turf: ${this.turf}<p><br>
  <p id="lighting"></p><br>
  <br>
  <a href="/locations/${this.id}/edit" class="btn btn-primary edit-location">Edit Location</a>
  <a href="/locations" class="btn btn-primary see-locations">See All Locations</a>
  `
  return locationShowHTML
}

Location.prototype.formatLighting = function() {
  let text = ""
  if (this.lighting) {
    text = `<strong>This location has lighting at night!</strong>`
  } else {
    text = `This location is NOT lit at night.`
  }
  return $('#lighting').html(text)
}

///////// LOCATION FORMS //////////

// const listStates = () => {
//   var stateOptions = `
//     <option value=""></option>
//     <option value="AK">AK</option>
//     <option value="AL">AL</option>
//     <option value="AR">AR</option>
//     <option value="AZ">AZ</option>
//     <option value="CA">CA</option>
//     <option value="CO">CO</option>
//     <option value="CT">CT</option>
//     <option value="DC">DC</option>
//     <option value="DE">DE</option>
//     <option value="FL">FL</option>
//     <option value="GA">GA</option>
//     <option value="HI">HI</option>
//     <option value="IA">IA</option>
//     <option value="ID">ID</option>
//     <option value="IL">IL</option>
//     <option value="IN">IN</option>
//     <option value="KS">KS</option>
//     <option value="KY">KY</option>
//     <option value="LA">LA</option>
//     <option value="MA">MA</option>
//     <option value="MD">MD</option>
//     <option value="ME">ME</option>
//     <option value="MI">MI</option>
//     <option value="MN">MN</option>
//     <option value="MO">MO</option>
//     <option value="MS">MS</option>
//     <option value="MT">MT</option>
//     <option value="NC">NC</option>
//     <option value="ND">ND</option>
//     <option value="NE">NE</option>
//     <option value="NH">NH</option>
//     <option value="NJ">NJ</option>
//     <option value="NM">NM</option>
//     <option value="NV">NV</option>
//     <option value="NY">NY</option>
//     <option value="OH">OH</option>
//     <option value="OK">OK</option>
//     <option value="OR">OR</option>
//     <option value="PA">PA</option>
//     <option value="RI">RI</option>
//     <option value="SC">SC</option>
//     <option value="SD">SD</option>
//     <option value="TN">TN</option>
//     <option value="TX">TX</option>
//     <option value="UT">UT</option>
//     <option value="VA">VA</option>
//     <option value="VT">VT</option>
//     <option value="WA">WA</option>
//     <option value="WI">WI</option>
//     <option value="WV">WV</option>
//     <option value="WY">WY</option>
//   `
//   return $('#location_state').append(stateOptions);
// }
//
// const listTurfs = () => {
//   var turfOptions = `
//     <option value=""></option>
//     <option value="clay">clay</option>
//     <option value="concrete">concrete</option>
//     <option value="grass">grass</option>
//     <option value="sand">sand</option>
//     <option value="other">other</option>
//   `
//   return $('#location_turf').append(turfOptions);
// }
//
// const formLocationId = (form) => {
//   if (form.hasClass("new_location")) {
//     let locationId = 0
//   } else {
//     let locationId = form.data("id")
//   }
//   return locationId
// }
//
// const postLocationForm = (locationId, form) => {
//   $.ajax({
//       type: (locationId === 0) ? "POST"  : "PATCH",
//       url: (locationId === 0) ? "/locations" : "/locations/" + locationId,
//       data: form.serialize(),
//       success: function(data) {console.log("great!")},
//       dataType: "json"
//   })
// }

// $(function() {
//   $('form').submit(function(e) {
//     e.preventDefault();
//     var values = $(this).serialize();
//     var product = $.post('/products', values);
//     product.done(function(data) {
//       $('.page-heading').text("")
//       $('form').html("")
//       var product = data;
//       $("#productName").text(product["name"]);
//       $("#productInventory").text(product["inventory"]);
//       $("#productPrice").text("$"+product["price"]);
//       $("#productDescription").text(product["description"]);
//     });
//   });
// });
//
// $.ajax({
//     type: (currentGame === 0) ? "POST"  : "PATCH",
//     url: (currentGame === 0) ? "/locations" : "/locations/" + locationId,
//     data: { game: { state: getBoard() }},
//     success: callback,
//     dataType: "json",
// })


///////// NEW LOCATION FUNCTIONS//////////

// Location.prototype.formatNewLocation = function(authToken) {
//   let newLocationHTML = `
//     <h3>Add a New Location (j)</h3><br>
//     <form class="new_location" id="new_location" action="/locations" method="post" accept-charset="UTF-8">
//       <input name="utf8" type="hidden" value="✓">
//       <input type="hidden" name="authenticity_token" value="${authToken}">
//       <label>Name </label> <input type="text" name="location[name]" id="location_name"><br>
//       <label>City </label> <input type="text" name="location[city]" id="location_city"><br>
//       <label>State </label> <select name="location[state]" id="location_state"></select><br>
//       <label>Check if this location has lighting at night: </label>  <input type="checkbox" name="location[lighting]" value="1"  id="location_lighting"><br>
//       <label>Turf </label><select name="location[turf]" id="location_turf"></select><br><br>
//       <input type="submit" name="commit" value="Create Location" class="btn btn-primary">
//       <a class="btn btn-primary see-locations" href="/locations">Back to Locations</a>
//     </form>
//   `
//   return newLocationHTML
// }
//
// const getNewLocation = (authToken) => {
//   $.ajax({
//     method: 'get',
//     url: `/locations/new.json`,
//     success: function(data) {
//       displayNewLocationForm(authToken);
//     }
//   })
// }
//
// const displayNewLocationForm = (authToken) => {
//   let newLocation = new Location(location);
//   let newLocationHTML = newLocation.formatNewLocation(authToken);
//   $('.main-content').append(newLocationHTML);
//   listStates();
//   listTurfs();
// }

// const postNewLocation = () => {
//   $.ajax({
//     type: "POST",
//     url: "/locations",
//     data: $("form.new_location").serialize(),
//     success: function(response) {
//       console.log(response)
//     }
//   })
// }

///////// EDIT LOCATION FUNCTIONS//////////

// Location.prototype.formatEditLocation = function() {
//   let editLocationHTML = `
//     <h3>Edit ${this.name} location (j)</h3><br>
//     <form class="edit_location" data-id="${this.id}" id="edit_location_${this.id}" action="/locations/${this.id}" method="post">
//       <label>Name </label> <input type="text" value="${this.name}" id="location_name"><br>
//       <label>City </label> <input type="text" value="${this.city}" id="location_city"><br>
//       <label>State </label> <select value="${this.state}" id="location_state"></select><br>
//       <label>Check if this location has lighting at night: </label>  <input type="checkbox" value="1" value="${this.lighting}" id="location_lighting"><br>
//       <label>Turf </label>
//       <select value="${this.turf}" id="location_turf"></select><br><br>
//       <input type="submit" name="commit" value="Edit Location" class="btn btn-primary">
//       <a class="btn btn-primary see-locations" href="/locations">Back to Locations</a>
//     </form>
//   `
//   return editLocationHTML
// }
//
// const getEditLocation = (locationId) => {
//   $.ajax({
//     method: 'get',
//     url: `/locations/${locationId}/edit.json`,
//     success: function(location) {
//       displayEditLocationForm(location);
//     }
//   })
// }
//
// const displayEditLocationForm = (location) => {
//   let newLocation = new Location(location);
//   let editLocationHTML = newLocation.formatEditLocation();
//   $('.main-content').append(editLocationHTML);
//   autoLocationEdit(location.state, location.lighting, location.turf);
// }
//
// const autoLocationEdit = (state, lighting, turf) => {
//   autoSelectState(state);
//   autoCheckLighting(lighting);
//   autoSelectTurf(turf);
// }
//
// const autoSelectState = (state) => {
//   listStates();
//   $(`select option[value="${state}"]`).attr("selected","selected");
// }
//
// const autoSelectTurf = (turf) => {
//   listTurfs();
//   $(`select option[value="${turf}"]`).attr("selected","selected");
// }
//
// const autoCheckLighting = (lighting) => {
//   if (lighting === true) {
//     $(`#location_lighting`).attr("checked", "checked")
//   }
// }
