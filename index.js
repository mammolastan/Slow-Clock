// Globals
const hand = document.querySelector(".time-hand");
let intervalSetHand;

// Set time hand. Defaults to 12-hour clock.
function setHandPosition(totalSeconds = 43200) {
  // Get new date for right now, set hour/min/sec
  const d = new Date();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  // Get percentage of day elapsed to far, calculated in seconds.
  var pctDayElapsed = (hours * 3600 + minutes * 60 + seconds) / totalSeconds;

  // Determine how much rotation to apply to the clock hand
  const rotation = pctDayElapsed * 360;

  // Apply rotation to clock hand
  hand.style.transform = `rotate(${rotation}deg)`;
}
function toggleDashboard() {
  $(".dashboard").fadeToggle();
}

function changeTheme() {
  $("html").attr(
    "data-clockTheme",
    event.target.getAttribute("data-clockTheme")
  );

  toggleDashboard();
}

// Begin interval to set clock hand
function beginInterval(totalSeconds) {
  if (intervalSetHand) {
    clearInterval(intervalSetHand);
  }
  setHandPosition(totalSeconds);
  intervalSetHand = setInterval(setHandPosition(totalSeconds), 10000);
}

beginInterval(43200);

// Begin jQuery Ready Function
$(document).ready(function () {
  // Apply keypress events
  $(document).keypress(function (event) {
    const key = event.which;

    // 'o' to display Dashboard
    if (key === 111 || key === 79) {
      toggleDashboard();
    }
    // 'f' for fullscreen
    if (key === 102 || key === 70) {
      document.documentElement.requestFullscreen();
    }
  });

  // Double click for options
  $(document).dblclick(function (event) {
    toggleDashboard();
  });
  // Set double tap for options
  let tapped = false;

  window.addEventListener(
    "touchstart",
    (e) => {
      if (!tapped) {
        tapped = setTimeout(function () {
          tapped = null;
        }, 300); //wait 300ms
      } else {
        clearTimeout(tapped);
        e.preventDefault();
        tapped = null;
        toggleDashboard();
      }
    },
    { passive: false }
  );

  //   Close Dashboard with click
  $(".dashboard").on("click", function (e) {
    if (e.target !== this) return;
    toggleDashboard();
  });

  // Set background changes click actions
  $(".dashboard .group.theme button").click(changeTheme);

  //  Set click actions for clock standard options
  $(".dashboard .group.standard button").click(function (event) {
    if (event.target.innerHTML.indexOf("12") > -1) {
      beginInterval(43200);
    } else {
      beginInterval(86400);
    }
  });

  // Open intro modal
  $("#introModal").modal("show");
});
// End jQuery Ready
