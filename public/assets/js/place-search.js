
// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

// Also, this code is fairly old and may not work. I would look through Google Places API for new ways of approach address lookup. 

let placeSearch, autocomplete;
const componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

const fillInAddress = () => {
  const address_components = place.address_components;
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();

  componentForm.forEach(component => {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  })

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  address_components.forEach(component => {
    const addressType = component.types[0];
    if (componentForm[addressType]) {
      const val = component[componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  })
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
const geolocate = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

const initAutocomplete = () => {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}



