// USER LIST
let userLst = ['Victoria Chambers',
  'Dale Byrd',
  'Dawn Wood',
  'Dan Oliver',
  'Mickey Mouse',
  'Alex Perry'];

//Includes function (because IE < 9 doesn't support indexof())
const includesString = (lst, item) => {
  for (let i = 0; i < lst.length; i += 1) {
    if (lst[i].toLowerCase() === item.toLowerCase()) {
      return true;
    }
  }
  return false;
}

// SETTINGS

let savedNotificationsSetting = localStorage.getItem('notificationsSetting') === "true";
let savedPublicProfile = localStorage.getItem('profileSetting') === "true";
let savedTimeZone = localStorage.getItem('timezoneSetting') || "EST";
let setNotificationsSetting = savedNotificationsSetting;
let setPublicProfile = savedPublicProfile;
let errorDivExists = false;


// PAGE SETUP (Settings - Event Listeners below)
const emailNotifsLabels = document.querySelectorAll('#email-notifications-btn ~ p');
const emailNotifsButton = document.getElementById('email-notifications-btn');
const publicProfileLabels = document.querySelectorAll('#public-profile-btn ~ p');
const publicProfileButton = document.getElementById('public-profile-btn');
const timeZoneSelect = document.getElementById('timezone');
const settingsForm = document.querySelector('.settings-form');
const saveButton = document.getElementById('settings-save-btn');
const cancelButton = document.getElementById('settings-cancel-btn');

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

// Timezone Setting
timeZoneSelect.value = savedTimeZone;



// EVENT LISTENERS

// Header
const notificationAlert = document.getElementById('notification-alert');
const bellSVG = document.getElementById('bell-svg');
const trafficSection = document.querySelector('.traffic');
const trafficContent = document.querySelector('.traffic-content');

const makeNotification = () => {
  //Create HTML elements
  const alertDiv = document.createElement('div');
  alertDiv.className = "notification";
  const alertTextDiv = document.createElement('div');
  const alertDivAlertText = document.createElement('span');
  alertDivAlertText.className = "alert-text";
  alertDivAlertText.textContent = "Alert";
  const alertDivText = document.createElement('p');
  alertDivText.textContent = "This is an alert. Have a nice day!";
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
}

notificationAlert.addEventListener('click', () => {
  makeNotification();
})

bellSVG.addEventListener('click', () => {
  makeNotification();
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
const messageForm = document.querySelector('.message-form');
const messageFormWrapper = messageForm.parentNode;
const autoCompleteDiv = document.getElementsByClassName('autocomplete-field')[0];
const messageRecipient = document.getElementById('message-recipient');
const messageTextarea = document.querySelector('.message-form textarea');

const capitalize = str => {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

messageForm.addEventListener('submit', e => {

  const recipient = messageRecipient.value;
  const msgText = messageTextarea.value.trim();

  const updateErrorText = () => {
    // Given an errorMsg, returns the textContent it should have
    if (!includesString(userLst, recipient)) {
      return "Please select a valid user";
    } else if (msgText === '') {
      return "Please enter a non-empty message";
    } else {
      console.error("There is no error to write text for");
    }
  }

  //Prevent default
  e.preventDefault();

  if (includesString(userLst, recipient) && msgText !== '') {
    //Remove form
    messageFormWrapper.removeChild(messageForm);

    //Create confirmation div
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = "confirmation";
    const confirmationMsg = document.createElement('p');
    confirmationMsg.textContent = `Thank you! Your message was sent to ${capitalize(recipient)}`;
    confirmationDiv.appendChild(confirmationMsg);

    //Add confirmation div to parent
    messageFormWrapper.appendChild(confirmationDiv);

  } else if (!errorDivExists) {
    //Create error div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message-error';
    const errorMsg = document.createElement('p');
    errorMsg.textContent = updateErrorText();
    errorDiv.appendChild(errorMsg);

    //Add error div to parent
    messageForm.insertBefore(errorDiv, autoCompleteDiv.nextElementSibling);

    //Prevent multiple error boxes from appearing
    errorDivExists = true;
  } else {
    const msgToChange = document.querySelector('.message-error p');
    msgToChange.textContent = updateErrorText();
  }

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
  savedNotificationsSetting = setNotificationsSetting;
  savedPublicProfile = setPublicProfile;
  savedTimeZone = timeZoneSelect.value;
  localStorage.setItem('notificationsSetting', setNotificationsSetting.toString());
  localStorage.setItem('profileSetting', setPublicProfile.toString());
  localStorage.setItem('timezoneSetting', timeZoneSelect.value);
})

cancelButton.addEventListener('click', e => {
  e.preventDefault();
  resetSlide(setNotificationsSetting, savedNotificationsSetting, emailNotifsButton, emailNotifsLabels);
  resetSlide(setPublicProfile, savedPublicProfile, publicProfileButton, publicProfileLabels);
  timeZoneSelect.value = savedTimeZone;
  setNotificationsSetting = savedNotificationsSetting;
  setPublicProfile = savedPublicProfile;
})