/*
 * ============================================================
 * АНГЛИЙСКИЙ АЛФАВИТ
 * ============================================================
 * Данные и логика раздела «Алфавит» вынесены в отдельный файл.
 *
 * Буквы воспроизводятся из MP3:
 *   ./audio/alphabet/A.mp3 ... ./audio/alphabet/Z.mp3
 *
 * Примеры слов по-прежнему произносятся через speakEN().
 * ============================================================
 */

const ALPHABET_DATA = [
  { letter:'A', pronunciation:'эй',  word:'apple',      translation:'яблоко' },
  { letter:'B', pronunciation:'би',  word:'ball',       translation:'мяч' },
  { letter:'C', pronunciation:'си',  word:'cat',        translation:'кот' },
  { letter:'D', pronunciation:'ди',  word:'dog',        translation:'собака' },
  { letter:'E', pronunciation:'и',   word:'elephant',   translation:'слон' },
  { letter:'F', pronunciation:'эф',  word:'fish',       translation:'рыба' },
  { letter:'G', pronunciation:'джи', word:'girl',       translation:'девочка' },
  { letter:'H', pronunciation:'эйч', word:'house',      translation:'дом' },
  { letter:'I', pronunciation:'ай',  word:'ice cream',  translation:'мороженое' },
  { letter:'J', pronunciation:'джей',word:'juice',      translation:'сок' },
  { letter:'K', pronunciation:'кей', word:'kite',       translation:'воздушный змей' },
  { letter:'L', pronunciation:'эл',  word:'lion',       translation:'лев' },
  { letter:'M', pronunciation:'эм',  word:'monkey',     translation:'обезьяна' },
  { letter:'N', pronunciation:'эн',  word:'nose',       translation:'нос' },
  { letter:'O', pronunciation:'оу',  word:'orange',     translation:'апельсин' },
  { letter:'P', pronunciation:'пи',  word:'pencil',     translation:'карандаш' },
  { letter:'Q', pronunciation:'кью', word:'queen',      translation:'королева' },
  { letter:'R', pronunciation:'ар',  word:'rabbit',     translation:'кролик' },
  { letter:'S', pronunciation:'эс',  word:'sun',        translation:'солнце' },
  { letter:'T', pronunciation:'ти',  word:'tiger',      translation:'тигр' },
  { letter:'U', pronunciation:'ю',   word:'umbrella',   translation:'зонт' },
  { letter:'V', pronunciation:'ви',  word:'van',        translation:'фургон' },
  { letter:'W', pronunciation:'дабл-ю', word:'window', translation:'окно' },
  { letter:'X', pronunciation:'экс', word:'xylophone',  translation:'ксилофон' },
  { letter:'Y', pronunciation:'уай', word:'yellow',     translation:'жёлтый' },
  { letter:'Z', pronunciation:'зед', word:'zebra',      translation:'зебра' }
];

/* Рисуем карточки алфавита. */
function renderAlphabet(){
  const box = $('alphabet-list');
  if(!box) return;

  box.innerHTML = ALPHABET_DATA.map(item => `
    <div class="alphabet-card">
      <button
        class="alphabet-letter"
        onclick="alphabetPlayLetter('${item.letter}')"
        aria-label="Произнести букву ${item.letter}">
        <span class="alphabet-upper">${item.letter}</span>
        <span class="alphabet-lower">${item.letter.toLowerCase()}</span>
      </button>

      <div class="alphabet-main">
        <div class="alphabet-name">${item.pronunciation}</div>
        <button
          class="alphabet-word"
          onclick="alphabetSpeakWord('${item.word}')">
          <span>
            <b>${item.word}</b>
            <span class="alphabet-translation">${item.translation}</span>
          </span>
          <span class="alphabet-speak">🔊</span>
        </button>
      </div>
    </div>
  `).join('');
}

/*
 * Проигрываем настоящую запись буквы.
 * Один Audio-объект переиспользуется, чтобы записи не накладывались.
 */
let alphabetAudio = null;

function alphabetPlayLetter(letter){
  const upper = String(letter).toUpperCase();
  const src = `./audio/alphabet/${upper}.mp3`;

  if(alphabetAudio){
    alphabetAudio.pause();
    alphabetAudio.currentTime = 0;
  }

  alphabetAudio = new Audio(src);
  alphabetAudio.preload = 'auto';
  alphabetAudio.play().catch(() => {});
}

/* Пример слова оставляем на обычном TTS. */
function alphabetSpeakWord(word){
  speakEN(word);
}
