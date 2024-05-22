const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const music = document.getElementById('music');

let musicPlaying = false; // Flag to track if music is currently playing

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const day = new Date();
  const hour = day.getHours();

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
  } else if (command === 'open youtube') {
    speak('Opening YouTube');
    window.open('https://www.youtube.com', '_blank');
  } else if (command === 'open facebook') {
    speak('Opening Facebook');
    window.open('https://www.facebook.com', '_blank');
  } else if (command === 'open whatsapp') {
    speak('Opening WhatsApp');
    window.open('https://www.whatsapp.com', '_blank');
  } 
  else if (command === 'open xxx') {
    speak('Opening xxx');
    window.open('https://www.pornhub.com/view_video.php?viewkey=ph627726b3ca13a', '_blank');
  } else if (command === 'play music') {
    if (!musicPlaying) {
      speak('Playing music');
      fetch('https://my-assistant-beta.vercel.app/play/track_id_here') // Replace 'track_id_here' with the actual track ID
        .then(response => response.text())
        .then(data => speak(data))
        .catch(err => speak('Error: Unable to play track.'));
      musicPlaying = true;
    } else {
      speak('Music is already playing');
    }
  } else if (command === 'pause music') {
    if (musicPlaying) {
      speak('Pausing music');
      fetch('https://my-assistant-beta.vercel.app/pause')
        .then(response => response.text())
        .then(data => speak(data))
        .catch(err => speak('Error: Unable to pause playback.'));
      musicPlaying = false;
    } else {
      speak('No music is currently playing');
    }
  } else {
    speak("I'm sorry, I didn't understand that. Could you please repeat yourself?");
  }
}
