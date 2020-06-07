
// EVENT LISTENERS

// Navigation
const desktopNav = document.getElementById('desktop-nav');
const membersNav = document.getElementById('members-nav');
const visitsNav = document.getElementById('visits-nav');
const settingsNav = document.getElementById('settings-nav');
const desktopIcon = document.getElementById('desktop-icon');
const membersIcon = document.getElementById('members-icon');
const visitsIcon = document.getElementById('visits-icon');
const settingsIcon = document.getElementById('settings-icon');

const clearNavClasses = () => {
  desktopIcon.setAttribute("class", "");
  membersIcon.setAttribute("class", "");
  visitsIcon.setAttribute("class", "");
  settingsIcon.setAttribute("class", "");
}

desktopNav.addEventListener('click', () => {
  clearNavClasses();
  desktopIcon.setAttribute("class", "chosen-nav");
})

membersNav.addEventListener('click', () => {
  clearNavClasses();
  membersIcon.setAttribute("class", "chosen-nav");
})

visitsNav.addEventListener('click', () => {
  clearNavClasses();
  visitsIcon.setAttribute("class", "chosen-nav");

})

settingsNav.addEventListener('click', () => {
  clearNavClasses();
  settingsIcon.setAttribute("class", "chosen-nav");

})

// Settings
const emailNotifsLabels = document.querySelectorAll('#email-notifications-btn ~ p');
const emailNotifsButton = document.getElementById('email-notifications-btn');
const publicProfileLabels = document.querySelectorAll('#public-profile-btn ~ p');
const publicProfileButton = document.getElementById('public-profile-btn');

const whitenLabels = (e, color) => {
  for (let i = 0; e.length; i += 1) {
    e[i].style.color = color;
  }
}

emailNotifsButton.addEventListener('click', () => {

  const emailSlideButton = emailNotifsButton.parentNode;

  for (let i = 0; i < emailNotifsLabels.length; i += 1) {
    if (emailNotifsLabels[i].className === "switch-label hidden") {
      emailNotifsLabels[i].className = "switch-label";
    } else {
      emailNotifsLabels[i].className += " hidden";
    }

    if (emailNotifsButton.checked) {
      emailNotifsLabels[i].style.color = "#fff";
      emailNotifsLabels[i].style.fontWeight = "bold";
    } else {
      emailNotifsLabels[i].style.color = "grey";
      emailNotifsLabels[i].style.fontWeight = "";
    }
  }

  if (emailSlideButton.style.backgroundColor === "rgb(255, 255, 255)" ||
    emailSlideButton.style.backgroundColor === "") {
    console.log("Hello");
    emailSlideButton.style.backgroundColor = "rgb(82, 82, 188)";
  } else {
    emailSlideButton.style.backgroundColor = "rgb(255, 255, 255)";
  }

})

publicProfileButton.addEventListener('click', () => {

  const profileSlideButton = publicProfileButton.parentNode;

  for (let i = 0; i < publicProfileLabels.length; i += 1) {
    if (publicProfileLabels[i].className === "switch-label hidden") {
      publicProfileLabels[i].className = "switch-label";
    } else {
      publicProfileLabels[i].className += " hidden";
    }

    if (publicProfileButton.checked) {
      publicProfileLabels[i].style.color = "#fff";
      publicProfileLabels[i].style.fontWeight = "bold";
    } else {
      publicProfileLabels[i].style.color = "grey";
      publicProfileLabels[i].style.fontWeight = "";
    }
  }

  if (profileSlideButton.style.backgroundColor === "rgb(255, 255, 255)" ||
    profileSlideButton.style.backgroundColor === "") {
    console.log("Hello");
    profileSlideButton.style.backgroundColor = "rgb(82, 82, 188)";
  } else {
    profileSlideButton.style.backgroundColor = "rgb(255, 255, 255)";
  }

})


// CHARTS

// Traffic Chart
let ctx1 = document.getElementById('web-traffic-chart').getContext('2d');
var myChart = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

// Daily Traffic Chart
let ctx2 = document.getElementById('daily-traffic-chart').getContext('2d');
var myChart = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

// Mobile Users Chart
let ctx3 = document.getElementById('mobile-users-chart').getContext('2d');
var myChart = new Chart(ctx3, {
  type: 'doughnut',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});