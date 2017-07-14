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
  <p>There have been ${this.games.length} games played at ${this.name}.</p>
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
