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
  // Location show
  $(document).on("click", ".location-click", function(e)  {
    e.preventDefault();
    let url = $(this).attr("href");
    history.pushState(null, null, `${url}`);
    clearContent();
    showLocation(url);
  });
  // Add location
  $(document).on("click", ".add-location", (e) => {
    e.preventDefault();
    history.pushState(null, null, `/locations/new`);
    clearContent();
    getNewLocation();
  });
  // Edit location
  $(document).on("click", "button.edit-location", (e) => {
    debugger
    let locationId = $(this).data("id");
    history.pushState(null, null, `/locations/${locationId}/edit`);
    clearContent();
    getEditLocation(locationId);
  });
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
  <h3>Locations</h3><br>
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

///////// NEW LOCATION FUNCTIONS//////////

const getNewLocation = () => {
  $.ajax({
    method: 'get',
    url: `/locations/new.json`,
    success: function(data) {
      console.log(data)
      let newLocationForm = newLocationFormat()
      $('.main-content').append(newLocationForm);
    }
  })
}

const newLocationFormat = () => {
  let newLocationForm = `
    <h3>New Location Form</h3>
  `
  return newLocationForm
}

///////// NEW LOCATION FUNCTIONS//////////

const getEditLocation = (locationId) => {
  $.ajax({
    method: 'get',
    url: `/locations/${locationId}/edit.json`,
    success: function(data) {
      console.log(data)
      let editLocationForm = editLocationFormat()
      $('.main-content').append(editLocationForm);
    }
  })
}

const editLocationFormat = () => {
  let editLocationForm = `
    <h3>Edit Location Form</h3>
  `
  return editLocationForm
}
