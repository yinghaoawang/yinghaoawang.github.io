let sounds = {
  "bird-score": new buzz.sound("bird-score.wav"),
  "game-over": new buzz.sound("game-over.wav"),
  "bird-jump": new buzz.sound("bird-jump.wav")
};

function play_sound(sound_name) {
  sounds[sound_name].stop();
  sounds[sound_name].play();
}

function stop_all_sounds() {
  Object.keys(sounds).forEach(sound_key => {
    let sound = sounds[sound_key];
    sound.stop();
  });
}

Object.keys(sounds).forEach(sound_key => {
  let sound = sounds[sound_key];
  sound.load();
});
