/**
 * project WizBattle
 */
const onSound = (text, lang = 'ru-RU', rate = 1, volume = 1) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const voice = voices.filter(x => x.lang === lang)[0];
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voice;
    utterThis.rate = rate;
    utterThis.pitch = 1;
    utterThis.volume = volume;
    utterThis.default = true;
    synth.speak(utterThis);
};

export default onSound;
