setInterval(function () {
  document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
}, 1000);

// making the window element draggable:
dragElement(document.getElementById("welcome"));

// function called `dragElement` that makes an HTML element draggable.
function dragElement(element, header) {
  // set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  var dragTarget = header || element;
  dragTarget.onmousedown = startDragging;


  // define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup.
      initialX = e.clientX;
      initialY = e.clientY;
      // set up event listeners for mouse movement (`dragElement`) and mouse button release (`stopDragging`).
      document.onmouseup = stopDragging;
      document.onmousemove = elementDrag;
  }

  // define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position.
      currentX = initialX - e.clientX;
      currentY = initialY - e.clientY;
      initialX = e.clientX;
      initialY = e.clientY;
      // update the element's new position by modifying its `top` and `left` CSS properties.
      element.style.top = (element.offsetTop - currentY) + "px";
      element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
      document.onmouseup = null;
      document.onmousemove = null;
  }
}
// for the welcome window
var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");

welcomeScreenClose.addEventListener("click", function () {
  closeWindow(welcomeScreen);
});
function closeWindow(element) {
  element.style.display = "none";
}

// Function to open the window (if needed)
function openWindow(element) {
  element.style.display = "flex";
}
// for the about window
var aboutSection = document.querySelector("#about");
var aboutSectionClose = document.querySelector("#aboutclose");

dragElement(aboutSection);

aboutSectionClose.addEventListener("click", function () {
  closeWindow(aboutSection);
}); 

//for the interest window
var interestSection = document.querySelector("#interest");
var interestSectionClose = document.querySelector("#interestclose");

dragElement(interestSection);

interestSectionClose.addEventListener("click", function () {
  closeWindow(interestSection);
}); 

// for the contact window
var contactSection = document.querySelector("#contact");
var contactSectionClose = document.querySelector("#contactclose");

dragElement(contactSection);

contactSectionClose.addEventListener("click", function () {
  closeWindow(contactSection);
}); 

// for the image window
var imageSection = document.querySelector("#image");
var imageSectionClose = document.querySelector("#imageclose");

dragElement(imageSection);

imageSectionClose.addEventListener("click", function () {
  closeWindow(imageSection);
}); 
// for the tunes window
var tunesSection = document.querySelector("#tunes");
var tunesSectionClose = document.querySelector("#tunesclose");

dragElement(tunesSection);

tunesSectionClose.addEventListener("click", function () {
  closeWindow(tunesSection);
}); 

let topZ = 10; // initial z-index

document.querySelectorAll('.window').forEach(win => {
  win.addEventListener('mousedown', () => {
    topZ++;
    win.style.zIndex = topZ;
  });
});

const poemLines = [
  "windows closed",  
"pixels fade—",  
"but thanks for staying",  
"and pressing play.",
];

function typePoem(lines, el, lineIdx = 0, charIdx = 0) {
  if (lineIdx >= lines.length) return;
  if (!el.textContent) el.textContent = '';
  
  const line = lines[lineIdx];
  if (charIdx < line.length) {
    el.textContent += line.charAt(charIdx);
    setTimeout(() => typePoem(lines, el, lineIdx, charIdx + 1), 60);
  } else {
    el.textContent += '\n';
    setTimeout(() => typePoem(lines, el, lineIdx + 1, 0), 300);
  }
}
function showPoemEgg() {
  const poemEl = document.getElementById('poemEgg');
  poemEl.style.display = 'block';
  poemEl.textContent = '';
  typePoem(poemLines, poemEl);
}

function checkAllClosedAndShowPoem() {
  const windows = document.querySelectorAll('.window');
  const allClosed = Array.from(windows).every(w => w.style.display === 'none');
  if (allClosed) showPoemEgg();
}
document.querySelectorAll('.closebutton').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.window').style.display = 'none';
    checkAllClosedAndShowPoem();
  });
});
