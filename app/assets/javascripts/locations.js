$(() => {
  bindLocationClickHandlers()
})

const bindLocationClickHandlers = () => {
  // Locations index
  $(".see-locations").on("click", (e) => {
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
  // New location
  $(document).on("click", ".add-location", (e) => {
    e.preventDefault();
    history.pushState(null, null, `/locations/new`);
    clearContent();
    getNewLocation();
  });
  // Edit location
  $(document).on("click", "button.edit-location", (e) => {
    let locationId = e.currentTarget.dataset.id;
    history.pushState(null, null, `/locations/${locationId}/edit`);
    clearContent();
    getEditLocation(locationId);
  });
  // Back to Locations button
  $(document).on("click", "button.locations-back", (e) => {

  })
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
}

var total_num_locations = 0 //for Location show page

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
  total_num_locations = locations.length // for Location show page
  locations.forEach((location) => {
    let newLocation = new Location(location)
    let locationHTML = newLocation.formatLocationIndex()
    $('ul.locations').append(locationHTML)
  })
}

const locationIndexStatic = () => {
  let locationIndexHTML = `
  <h3>Kadima Locations</h3><br>
  <button class="btn btn-primary add-location">Add a Location</button><br><br>
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
    <button class="btn btn-xs btn-default edit-location" data-id="${this.id}">Edit</button>
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
    }
  })
}

Location.prototype.formatLocationShow = function() {
  let locationShowHTML = `
  <h3>${this.name} Information</h3>
  <h4>${this.city}, ${this.state}</h4>
  <br>
  <p>Ranked #${this.rank} of ${total_num_locations} locations, based on number of games played there.</p>
  <p>Turf: ${this.turf}<p>
  <p>Lighting: ${this.lighting}</p>
  `
  return locationShowHTML
}

///////// LOCATION FORMS //////////

const listStates = () => {
  var stateOptions = `
    <option value=""></option>
    <option value="AK">AK</option>
    <option value="AL">AL</option>
    <option value="AR">AR</option>
    <option value="AZ">AZ</option>
    <option value="CA">CA</option>
    <option value="CO">CO</option>
    <option value="CT">CT</option>
    <option value="DC">DC</option>
    <option value="DE">DE</option>
    <option value="FL">FL</option>
    <option value="GA">GA</option>
    <option value="HI">HI</option>
    <option value="IA">IA</option>
    <option value="ID">ID</option>
    <option value="IL">IL</option>
    <option value="IN">IN</option>
    <option value="KS">KS</option>
    <option value="KY">KY</option>
    <option value="LA">LA</option>
    <option value="MA">MA</option>
    <option value="MD">MD</option>
    <option value="ME">ME</option>
    <option value="MI">MI</option>
    <option value="MN">MN</option>
    <option value="MO">MO</option>
    <option value="MS">MS</option>
    <option value="MT">MT</option>
    <option value="NC">NC</option>
    <option value="ND">ND</option>
    <option value="NE">NE</option>
    <option value="NH">NH</option>
    <option value="NJ">NJ</option>
    <option value="NM">NM</option>
    <option value="NV">NV</option>
    <option value="NY">NY</option>
    <option value="OH">OH</option>
    <option value="OK">OK</option>
    <option value="OR">OR</option>
    <option value="PA">PA</option>
    <option value="RI">RI</option>
    <option value="SC">SC</option>
    <option value="SD">SD</option>
    <option value="TN">TN</option>
    <option value="TX">TX</option>
    <option value="UT">UT</option>
    <option value="VA">VA</option>
    <option value="VT">VT</option>
    <option value="WA">WA</option>
    <option value="WI">WI</option>
    <option value="WV">WV</option>
    <option value="WY">WY</option>
  `
  return $('#location_state').append(stateOptions);
}

const listTurfs = () => {
  var turfOptions = `
    <option value=""></option>
    <option value="clay">clay</option>
    <option value="concrete">concrete</option>
    <option value="grass">grass</option>
    <option value="sand">sand</option>
    <option value="other">other</option>
  `
  return $('#location_turf').append(turfOptions);
}


///////// NEW LOCATION FUNCTIONS//////////

Location.prototype.formatNewLocation = function() {
  let newLocationHTML = `
    <h3>Add a New Location</h3><br>
    <label>Name </label> <input type="text" id="location_name"><br>
    <label>City </label> <input type="text" id="location_city"><br>
    <label>State </label> <select id="location_state"></select><br>
    <label>Check if this location has lighting at night: </label>  <input type="checkbox" value="1"  id="location_lighting"><br>
    <label>Turf </label><select  id="location_turf"></select><br><br>
    <input type="submit" name="commit" value="Create Location" class="btn btn-primary">
    <a class="btn btn-primary" href="/locations">Back to Locations</a>
  `
  return newLocationHTML
}

const getNewLocation = () => {
  $.ajax({
    method: 'get',
    url: `/locations/new.json`,
    success: function(data) {
      displayNewLocationForm();
    }
  })
}

const displayNewLocationForm = () => {
  let newLocation = new Location(location);
  let newLocationHTML = newLocation.formatNewLocation();
  $('.main-content').append(newLocationHTML);
  listStates();
  listTurfs();
}

const postNewLocation = () => {

}

///////// EDIT LOCATION FUNCTIONS//////////

Location.prototype.formatEditLocation = function() {
  let editLocationHTML = `
    <h3>Edit ${this.name} location (j)</h3><br>
    <label>Name </label> <input type="text" value="${this.name}" id="location_name"><br>
    <label>City </label> <input type="text" value="${this.city}" id="location_city"><br>
    <label>State </label> <select value="${this.state}" id="location_state"></select><br>
    <label>Check if this location has lighting at night: </label>  <input type="checkbox" value="1" value="${this.lighting}" id="location_lighting"><br>
    <label>Turf </label>
    <select value="${this.turf}" id="location_turf"></select><br><br>
    <input type="submit" name="commit" value="Edit Location" class="btn btn-primary">
    <a class="btn btn-primary" href="/locations">Back to Locations</a>
  `
  return editLocationHTML
}



const getEditLocation = (locationId) => {
  $.ajax({
    method: 'get',
    url: `/locations/${locationId}/edit.json`,
    success: function(location) {
      displayEditLocationForm(location);
    }
  })
}

const displayEditLocationForm = (location) => {
  let newLocation = new Location(location);
  let editLocationHTML = newLocation.formatEditLocation();
  $('.main-content').append(editLocationHTML);
  autoLocationEdit(location.state, location.lighting, location.turf);
}

const autoLocationEdit = (state, lighting, turf) => {
  autoSelectState(state);
  autoCheckLighting(lighting);
  autoSelectTurf(turf);
}

const autoSelectState = (state) => {
  listStates();
  $(`select option[value="${state}"]`).attr("selected","selected");
}

const autoSelectTurf = (turf) => {
  listTurfs();
  $(`select option[value="${turf}"]`).attr("selected","selected");
}

const autoCheckLighting = (lighting) => {
  if (lighting === true) {
    $(`#location_lighting`).attr("checked", "checked")
  }
}
