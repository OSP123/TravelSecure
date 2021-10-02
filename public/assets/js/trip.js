const nameInput = $("#tripName"),
  destinationInput = $("#autocomplete"),
  methodOfTransportInput = $("#methodOfTransport"),
  arrivalDateInput = $("#datepicker");

const url = window.location.search;
let tripId;
let userId;
// Sets a flag for whether or not we're updating a post to be false initially
let updating = false;

function submitTrip(trip) {
  $.post("/trips/new", trip, function () {
    window.location.href = "/trips";
  });
}

function updateTrip(trip) {
  $.ajax({
    method: "PUT",
    url: "/trips",
    data: trip,
  }).done(function () {
    window.location.href = "/trips";
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  // Wont submit the post if we are missing a body, title, or author
  if (
    !destinationInput.val().trim() ||
    !methodOfTransportInput.val().trim() ||
    !arrivalDateInput.val()
  ) {
    return;
  }
  // Constructing a newPost object to hand to the database
  const newTrip = {
    name: nameInput.val().trim(),
    destination: destinationInput.val().trim(),
    methodOfTransport: methodOfTransportInput.val().trim(),
    arrivalDate: arrivalDateInput.val().trim(),
  };

  // If we're updating a post run updatePost to update a post
  // Otherwise run submitPost to create a whole new post
  if (updating) {
    newTrip.id = tripId;
    updateTrip(newTrip);
  } else {
    submitTrip(newTrip);
  }
}

$("#tripForm").on("submit", handleFormSubmit);
