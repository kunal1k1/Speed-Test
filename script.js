const paragraphs = [
    "Life is a journey filled with endless possibilities, challenges, and moments that shape who we are. Every day, we wake up to a world that is constantly changing, offering new opportunities to learn, grow, and explore. Sometimes, life feels like a smooth ride, where everything falls into place effortlessly, and happiness surrounds us like a warm embrace. Other times, it feels like an uphill battle, full of obstacles that test our patience, resilience, and determination. But in both moments of joy and struggle, there is always something to learn, something to cherish, and something to look forward to. The beauty of life lies in its unpredictability—the way it surprises us with unexpected friendships, teaches us valuable lessons through failures, and rewards us for our perseverance. It is a delicate balance of highs and lows, laughter and tears, success and setbacks, all woven together into the unique story of our existence. No matter how tough things get, there is always hope, always a reason to keep going, and always something to be grateful for. In the end, it is not about how many times we fall but how many times we rise, learn, and move forward with a heart full of dreams and a mind open to endless possibilities."
];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

let timer;
let maxTime = 180; // ⏳
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {  
            isTyping = true;
            timer = setInterval(initTimer, 1000);
        }

        if (typedChar == null) {  
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {  
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        // 
        let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    inpField.value = "";

    //
    timeTag.innerText = maxTime;  
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

// ✅ Initialize the Test
resetGame(); 
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
