const input = document.getElementById('message-recipient');

function addActive(choice) {
  if (!choice) return false;
  removeActive(choice);
  if (currentFocus >= choice.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (choice.length - 1);
  choice[currentFocus].classList.add("autocomplete-active");
  console.log("adding active!");
}

const removeActive = choice => {
  for (var i = 0; i < choice.length; i++) {
    choice[i].classList.remove("autocomplete-active");
  }
  console.log("removing active!");
}

const closeAllLists = element => {
  var choices = document.getElementsByClassName("autocomplete-choices");
  for (var i = 0; i < choices.length; i++) {
    if (element != choices[i] && element != input) {
      choices[i].parentNode.removeChild(choices[i]);
    }
  }
}

var currentFocus;
input.addEventListener("input", function (e) {
  var a, b, i, val = this.value;
  closeAllLists();
  if (!val) { return false; }
  currentFocus = -1;
  a = document.createElement('div');
  a.setAttribute("id", this.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-choices");
  this.parentNode.appendChild(a);
  for (i = 0; i < userLst.length; i++) {
    if (userLst[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
      b = document.createElement('div');
      b.innerHTML = "<strong>" + userLst[i].substr(0, val.length) + "</strong>";
      b.innerHTML += userLst[i].substr(val.length);
      b.innerHTML += "<input type='hidden' value='" + userLst[i] + "'>";
      b.classList.add('autocomplete-choice')
      b.addEventListener("click", function (e) {
        input.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
      });
      a.appendChild(b);
    }
  }
})

input.addEventListener("keydown", function (e) {
  var x = document.getElementById(this.id + "autocomplete-list");
  if (x) x = x.getElementsByTagName("div");
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(x);
  } else if (e.keyCode == 38) {
    currentFocus--;
    addActive(x);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      if (x) x[currentFocus].click();
    }
  }
})

document.addEventListener("click", function (e) {
  closeAllLists(e.target);
});