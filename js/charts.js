// SETTINGS

let savedNotificationsSetting = localStorage.getItem('notificationsSetting') === "true";
let savedPublicProfile = localStorage.getItem('profileSetting') === "true";
let savedTimeZone = localStorage.getItem('timezoneSetting') || "EST";
let setNotificationsSetting = savedNotificationsSetting;
let setPublicProfile = savedPublicProfile;
let setTimeZone = savedTimeZone;

console.log(savedNotificationsSetting.toString());
console.log(savedPublicProfile.toString());



// PAGE SETUP (Settings - Event Listeners below)
const emailNotifsLabels = document.querySelectorAll('#email-notifications-btn ~ p');
const emailNotifsButton = document.getElementById('email-notifications-btn');
const publicProfileLabels = document.querySelectorAll('#public-profile-btn ~ p');
const publicProfileButton = document.getElementById('public-profile-btn');
const settingsForm = document.querySelector('.settings-form');
const saveButton = document.getElementById('settings-save-btn');
const cancelButton = document.getElementById('settings-cancel-btn');

const whitenLabels = (e, color) => {
  for (let i = 0; e.length; i += 1) {
    e[i].style.color = color;
  }
}

const changeSlideButton = (checkButton, labels, setValue) => {
  const slide = checkButton.parentNode;
  for (let i = 0; i < labels.length; i += 1) {
    if (labels[i].className === "switch-label hidden") {
      labels[i].className = "switch-label";
    } else {
      labels[i].className += " hidden";
    }

    if (setValue) {
      labels[i].style.color = "#fff";
      labels[i].style.fontWeight = "bold";
    } else {
      labels[i].style.color = "grey";
      labels[i].style.fontWeight = "";
    }

  }

  if (setValue) {
    slide.style.backgroundColor = "rgb(82, 82, 188)";
    return true;
  } else {
    slide.style.backgroundColor = "rgb(255, 255, 255)";
    return false;
  }
}

// Notification Setting
if (savedNotificationsSetting) {
  setNotificationsSetting = true;
  emailNotifsButton.checked = true;
  changeSlideButton(emailNotifsButton, emailNotifsLabels, setNotificationsSetting);
}

// Profile Setting
if (savedPublicProfile) {
  setPublicProfile = true;
  publicProfileButton.checked = true;
  changeSlideButton(publicProfileButton, publicProfileLabels, setPublicProfile);
}



// EVENT LISTENERS

// Header
const notificationAlert = document.getElementById('notification-alert');
const trafficSection = document.querySelector('.traffic');
const trafficContent = document.querySelector('.traffic-content');

notificationAlert.addEventListener('click', () => {

  //Create HTML elements
  const alertDiv = document.createElement('div');
  alertDiv.className = "notification";
  const alertTextDiv = document.createElement('div');
  const alertDivAlertText = document.createElement('span');
  alertDivAlertText.className = "alert-text";
  alertDivAlertText.textContent = "Alert";
  const alertDivText = document.createElement('p');
  alertDivText.textContent = "Text here comes the text, once upon a time there was a good dog - whew!";
  const alertDivBtn = document.createElement('button');
  alertDivBtn.className = "alert-btn";
  alertDivBtn.textContent = "X";

  //Construct HTML
  alertTextDiv.appendChild(alertDivAlertText);
  alertTextDiv.appendChild(alertDivText);
  alertDiv.appendChild(alertTextDiv);
  alertDiv.appendChild(alertDivBtn);
  trafficSection.insertBefore(alertDiv, trafficContent);

  //Add event listeners for close buttons
  alertDivBtn.addEventListener('click', () => {
    const parentDiv = alertDiv;
    trafficSection.removeChild(parentDiv);
  })

})

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


// Message User
const messageForm = document.querySelector('.message-form')

messageForm.addEventListener('submit', e => {
  e.preventDefault();
})


// Settings

// Slide Buttons

emailNotifsButton.addEventListener('click', () => {
  setNotificationsSetting = !setNotificationsSetting;
  changeSlideButton(emailNotifsButton, emailNotifsLabels, setNotificationsSetting);
})

publicProfileButton.addEventListener('click', () => {
  setPublicProfile = !setPublicProfile;
  changeSlideButton(publicProfileButton, publicProfileLabels, setPublicProfile);
})

// Form Submission

const resetSlide = (set, saved, button, labels) => {
  if (set !== saved) {
    changeSlideButton(button, labels, saved);
    button.checked = !button.checked;
  }
}

// Submission Buttons
saveButton.addEventListener('click', e => {
  e.preventDefault();
  localStorage.setItem('notificationsSetting', setNotificationsSetting.toString());
  localStorage.setItem('profileSetting', setPublicProfile.toString());
  localStorage.setItem('timezoneSetting', 'EST'); //DUMMY VALUE
})

cancelButton.addEventListener('click', e => {
  e.preventDefault();
  resetSlide(setNotificationsSetting, savedNotificationsSetting, emailNotifsButton, emailNotifsLabels);
  resetSlide(setPublicProfile, savedPublicProfile, publicProfileButton, publicProfileLabels);
  //TODO need code to reset timezone
  setNotificationsSetting = savedNotificationsSetting;
  setPublicProfile = savedPublicProfile;
  setTimeZone = savedTimeZone;

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