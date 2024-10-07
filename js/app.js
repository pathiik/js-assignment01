// Assignment 1 | COMP1073 Client-Side JavaScript

// Creating arrays that store all the words for each section
var nounsList = [
  "The turkey",
  "Mom",
  "Dad",
  "The dog",
  "My teacher",
  "The elephant",
  "The cat",
];
var verbsList = [
  "sat on",
  "ate",
  "danced with",
  "saw",
  "doesn't like",
  "kissed",
];
var adjectivesList = [
  "a funny",
  "a scary",
  "a goofy",
  "a slimy",
  "a barking",
  "a fat",
];
var animalsList = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"];
var settingsList = [
  "on the moon",
  "on the chair",
  "in my spaghetti",
  "in my soup",
  "on the grass",
  "in my shoes",
];

// Creating a new speechSynthesis object
var synth = window.speechSynthesis;

// Defining variables for each of the buttons
var buttonOne = document.getElementById("button-one");
var buttonTwo = document.getElementById("button-two");
var buttonThree = document.getElementById("button-three");
var buttonFour = document.getElementById("button-four");
var buttonFive = document.getElementById("button-five");
var surpriseButton = document.getElementById("surprise-btn");
var playbackButton = document.getElementById("playback-btn");
var storyButton = document.getElementById("story-btn");

// Creating a function that converts text to speech and displays the text
function speakNow(string) {
  // Creating a new speech object, attaching the string of text to speak
  var utterThis = new SpeechSynthesisUtterance(string);

  // Disabling buttons immediately after speaking starts
  disableButtons(true);

  // Calling a function that displays the spoken text
  showText(string);

  // Re-enabling all the buttons as soons as the speech ends
  utterThis.onend = () => {
    showText(""); // Clearing the written text
    disableButtons(false);
  };

  // Speaking the text
  synth.speak(utterThis);
}

// Creating a function to disable all the buttons which takes state of buttons as a parameter
function disableButtons(buttonState) {
  buttonOne.disabled = buttonState;
  buttonTwo.disabled = buttonState;
  buttonThree.disabled = buttonState;
  buttonFour.disabled = buttonState;
  buttonFive.disabled = buttonState;
  surpriseButton.disabled = buttonState;
  playbackButton.disabled = buttonState;
  storyButton.disabled = buttonState;
}

async function fetchStory() {
  var story = "";
  await fetch("https://shortstories-api.onrender.com/")
    .then((response) => response.json())
    .then((data) => {
      story = data.story;
    });

  return story;
}

storyButton.onclick = async function () {
  var story = await fetchStory();
  speakNow(story);
};

// Creating a function to identify the string which needs to be spoken
function identifyString(button) {
  /* Creating an array that stores the following:
   * current word in a specific array of words
   * current index of the word in the specific array of words
   * a random index from that specific array
   * array itself
   */
  var string = [];

  // Using switch-case for referencing array to the specific button
  switch (button) {
    case 0:
      string = [
        nounsList[counters[0]],
        counters[0],
        generateRandomIndex(nounsList),
        nounsList,
      ];
      break;
    case 1:
      string = [
        verbsList[counters[1]],
        counters[1],
        generateRandomIndex(verbsList),
        verbsList,
      ];
      break;
    case 2:
      string = [
        adjectivesList[counters[2]],
        counters[2],
        generateRandomIndex(adjectivesList),
        adjectivesList,
      ];
      break;
    case 3:
      string = [
        animalsList[counters[3]],
        counters[3],
        generateRandomIndex(animalsList),
        animalsList,
      ];
      break;
    case 4:
      string = [
        settingsList[counters[4]],
        counters[4],
        generateRandomIndex(settingsList),
        settingsList,
      ];
      break;
    default:
      break;
  }
  return string;
}

// Creating an array that stores the current index of the word in a specific array of words
counters = [0, 0, 0, 0, 0];

// Creating a function that sends the word to speak to the speaking function
var clickedButton = (button, listLength) => {
  var string = identifyString(button);
  speakNow(string[0]);

  /* Checking whether the end of array is reached or not
   * If yes, resetting the specific counter to 0
   * If not, adding 1 to the counter
   */
  if (counters[button] === listLength - 1) {
    counters[button] = 0;
  } else {
    counters[button]++;
  }
};

// Creating a function to get a random index from an array
function generateRandomIndex(list) {
  return Math.floor(Math.random() * list.length);
}

// Function when the surprise button is presses
surpriseButton.onclick = function () {
  var string = "";
  // Iterating over each array of words, and getting a random word and adding it together
  for (let i = 0; i < 5; i++) {
    let newString = identifyString(i);
    let randomIndex = newString[2];
    list = newString[3];
    string += list[randomIndex] + " ";
  }
  speakNow(string);

  // When the playback button is pressed, it repeats the string of words
  playbackButton.onclick = () => {
    speakNow(string);
  };
};

// Creating a function that calls another function providing separate arguments on each specific button press
function buttonEvent() {
  buttonOne.onclick = () => clickedButton(0, nounsList.length);
  buttonTwo.onclick = () => clickedButton(1, verbsList.length);
  buttonThree.onclick = () => clickedButton(2, adjectivesList.length);
  buttonFour.onclick = () => clickedButton(3, animalsList.length);
  buttonFive.onclick = () => clickedButton(4, settingsList.length);
}

// Creating a function to display the spoken text in the document
var showText = (newText) => {
  var text = document.getElementById("text");
  text.innerHTML = newText;
};

// Calling a function as soon as the window loads
window.onload = function () {
  buttonEvent();
};
