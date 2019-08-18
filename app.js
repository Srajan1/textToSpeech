const synth = window.speechSynthesis;

const textForm= document.querySelector('form');
const textInput= document.querySelector('#text-input');
const voiceSelect= document.querySelector('#voice-select');
const rate= document.querySelector('#rate');
const rateValue= document.querySelector('#rate-value');
const pitch= document.querySelector('#pitch');
const pitchValue= document.querySelector('#pitch-value');

let voices = [];

function getVoices(){
  voices = synth.getVoices();

  voices.forEach(function(voice){
    const option = document.createElement('option');
    option.textContent = voice.name + '{'+ voice.lang +'}';
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  })
}
getVoices();
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged = getVoices;
}


function speak(){
  if(synth.speaking){
    console.error('already speaking');
    return;
  }
  if(textInput.value !== ''){
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    speakText.onend = e =>{
      console.log('done speaking');
    }
    speakText.onerror = e => {
      console.error('something went wrong');
    }

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    voices.forEach(function(voice){
      if(voice.name === selectedVoice){
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);
  }
};

textForm.addEventListener('submit', function(e){
  e.preventDefault();
  speak();
  textInput.blur();
})


rate.addEventListener('change', function(){
  console.log(123);
  rateValue.textContent = rate.value;
});

pitch.addEventListener('change', function(){
  pitchValue.textContent = pitch.value;
});
