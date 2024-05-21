const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Boss...");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Master...");
  } else {
    speak("Good Evening Sir...");
  }
}

window.addEventListener('load', () => {
  speak("Initializing JARVIS...");
  wishMe();
});

btn.addEventListener('click', () => {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    content.textContent = `You: ${transcript}`;

    // Process the user's input here
    processCommand(transcript.toLowerCase());
  };

  recognition.start();
});

function processCommand(command) {
  if (command === 'hello jarvis') {
    speak('Hello, how can I assist you today?');
  } else if (command === 'goodbye jarvis') {
    speak('Goodbye, have a great day!');
  } else if (command === 'what is the time') {
    const now = new Date();
    const time = now.toLocaleTimeString();
    speak(`The time is ${time}`);
  } else if (command === 'what is the date') {
    const now = new Date();
    const date = now.toLocaleDateString();
    speak(`Today's date is ${date}`);
  } else if (command === 'open google') {
    speak('Opening Google');
    window.open('https://www.google.com', '_blank');
  } 
else if (command === 'open youtube') {
  speak('Opening Youtube');
  window.open('https://www.youtube.com', '_blank');
} else if (command === 'play music') {
    speak('Playing music');
    // Add your own logic to play music
  } else if (command === 'stop music') {
    speak('Stopping music');
    // Add your own logic to stop music
  } else {
    speak("I'm sorry, I didn't understand that. Could you please repeat yourself?");
  }
}
