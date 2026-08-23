// ========================================
// PAGE 1 — INITIAL ELEMENTS
// ========================================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let noCount = 0;


// ========================================
// NO BUTTON MESSAGES
// ========================================

const messages = [
    "You can't escape 😏",
    "Nice try 😂",
    "Still trying? 👀",
    "You can't escape me ❤️",
    "Why are you still clicking NO? 😂",
    "I warned you 😌",
    "Just say YES already ❤️"
];


// ========================================
// NO BUTTON
// ========================================

noBtn.addEventListener("click", function () {

    noCount++;

    message.textContent =
        messages[Math.min(
            noCount - 1,
            messages.length - 1
        )];

    moveNoButton();

});


function moveNoButton() {

    const maxX =
        window.innerWidth -
        noBtn.offsetWidth -
        20;

    const maxY =
        window.innerHeight -
        noBtn.offsetHeight -
        20;

    const randomX =
        Math.max(
            10,
            Math.random() * maxX
        );

    const randomY =
        Math.max(
            10,
            Math.random() * maxY
        );

    noBtn.style.position = "fixed";

    noBtn.style.left =
        randomX + "px";

    noBtn.style.top =
        randomY + "px";
}


// ========================================
// YES BUTTON → BALLOON PAGE
// ========================================

yesBtn.addEventListener("click", function () {

    document.querySelector(".birthday-card").innerHTML = `

        <h1>
            🎈 Pop all 4 balloons!
        </h1>

        <p>
            Each balloon has one little word
            for you ❤️
        </p>

        <div class="balloon-area">

            <div class="balloon balloon1"></div>

            <div class="balloon balloon2"></div>

            <div class="balloon balloon3"></div>

            <div class="balloon balloon4"></div>

        </div>

        <div id="words"></div>

    `;

    startBalloons();

});


// ========================================
// BALLOON GAME
// ========================================

function startBalloons() {

    const balloons =
        document.querySelectorAll(".balloon");

    const words =
        document.getElementById("words");

    let popped = 0;

    const wordOrder = [
        "YOU",
        "ARE",
        "VERY",
        "SPECIAL ❤️"
    ];


    balloons.forEach(function(balloon) {

        balloon.addEventListener(
            "click",
            function() {

                // Prevent double click

                if (
                    balloon.classList.contains("popped")
                ) {
                    return;
                }


                // Pop balloon

                balloon.classList.add("popped");


                // Flower explosion

                createFlowerBurst(balloon);


                // Hide balloon

                setTimeout(function() {

                    balloon.style.display =
                        "none";

                }, 250);


                // Show word

                const word =
                    document.createElement("span");

                word.textContent =
                    wordOrder[popped] + " ";

                words.appendChild(word);


                popped++;


                // All balloons popped

                if (popped === 4) {

                    setTimeout(function() {

                        const continueButton =
                            document.createElement("button");

                        continueButton.id =
                            "continueBtn";

                        continueButton.textContent =
                            "Continue ❤️";


                        document
                            .querySelector(".birthday-card")
                            .appendChild(
                                continueButton
                            );


                        continueButton.addEventListener(
                            "click",
                            showPage3
                        );

                    }, 600);

                }

            }
        );

    });

}


// ========================================
// FLOWER BURST
// ========================================

function createFlowerBurst(balloon) {

    const rect =
        balloon.getBoundingClientRect();

    const flowers = [
        "🌸",
        "🌼",
        "🌺",
        "🌷"
    ];


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const flower =
            document.createElement("span");


        flower.textContent =
            flowers[
                Math.floor(
                    Math.random() *
                    flowers.length
                )
            ];


        flower.style.position =
            "fixed";

        flower.style.left =
            rect.left +
            rect.width / 2 +
            "px";

        flower.style.top =
            rect.top +
            rect.height / 2 +
            "px";

        flower.style.fontSize =
            "18px";

        flower.style.pointerEvents =
            "none";

        flower.style.zIndex =
            "9999";


        document.body.appendChild(flower);


        const x =
            (Math.random() - 0.5) * 180;

        const y =
            (Math.random() - 0.5) * 180;


        flower.animate(

            [
                {
                    transform:
                        "translate(0,0) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(${x}px,${y}px) scale(0.5)`,

                    opacity: 0
                }
            ],

            {
                duration: 800,
                easing: "ease-out"
            }

        );


        setTimeout(function() {

            flower.remove();

        }, 800);

    }

}


// ========================================
// PAGE 3 — SECURITY QUESTION
// ========================================

function showPage3() {

    document.querySelector(
        ".birthday-card"
    ).innerHTML = `

        <div class="emoji">
            🔐
        </div>

        <h1>
            WAIT! 👀
        </h1>

        <p>
            Before I let you continue...
            <br>
            I need to make sure you're actually
            the birthday person. 😌
        </p>

        <h2>
            Who is the most awesome person today?
        </h2>

        <div class="quiz-options">

            <button class="answerBtn">
                A) Me 😂
            </button>

            <button class="answerBtn">
                B) Obviously me 😎
            </button>

            <button class="answerBtn">
                C) Moonika ❤️
            </button>

        </div>

        <div id="quizMessage"></div>

    `;

    startBirthdayQuiz();

}


// ========================================
// SECURITY ANSWERS
// ========================================

function startBirthdayQuiz() {

    const answers =
        document.querySelectorAll(".answerBtn");


    answers.forEach(function(answer) {

        answer.addEventListener(
            "click",
            function() {

                // Disable all answers

                answers.forEach(function(button) {

                    button.disabled = true;

                });


                // Go directly to
                // ACCESS GRANTED page

                showAccessGranted();

            }
        );

    });

}


// ========================================
// ACCESS GRANTED PAGE
// ========================================

function showAccessGranted() {

    document.querySelector(
        ".birthday-card"
    ).innerHTML = `

        <div class="access-screen">

            <div class="emoji">
                🔓
            </div>

            <h1>
                ACCESS GRANTED
            </h1>

            <p>
                Identity verified successfully. 😌
            </p>

            <p>
                Welcome, birthday girl. ❤️
            </p>

            <div class="access-loader">

                <div class="access-loader-bar"></div>

            </div>

            <p class="access-status">
                Verifying birthday privileges...
            </p>

        </div>

    `;


    // Start small access animation

    setTimeout(function() {

    showWarning();

}, 2200);

}


// ========================================
// LOADING SCREEN
// ========================================




// ========================================
// WARNING PAGE
// ========================================

function showWarning() {

    document.querySelector(
        ".birthday-card"
    ).innerHTML = `

        <div class="warning-screen">

            <div class="emoji">
                ⚠️
            </div>

            <h2>
                WARNING ⚠️
            </h2>

            <p>
                Excessive smiling may occur.😊
            </p>

            <p>
                Please continue at your own risk. 😌
            </p>

            <button id="continueBtn">
                CONTINUE →
            </button>

        </div>

    `;


    document
        .getElementById("continueBtn")
        .addEventListener(
            "click",
            showPage4
        );

}


// ========================================
// PAGE 4 — MEMORY LANE
// ========================================

// ========================================
// PAGE 4 — MEMORY LANE
// ========================================

function showPage4() {

    const card = document.querySelector(".birthday-card");

    card.classList.add("memory-card");

    card.innerHTML = `

        <div class="memory-page">

            <div class="emoji">
                📸
            </div>

            <h1>
                Memory Lane ❤️
            </h1>

            <p class="memory-intro">
                A few moments worth remembering...
            </p>

            <div class="photo-container">

                <div class="photo-card">

                    <img
                        src="images/photo1.jpg"
                        alt="Memory 1"
                    >

                    <p>
                        One of those moments
                        I'll always remember. ❤️
                    </p>

                </div>

                <button id="nextPhotoBtn">
                    NEXT ❤️
                </button>

            </div>

        </div>

    `;

    startMemoryGallery();
}

// ========================================
// MEMORY GALLERY
// ========================================

function startMemoryGallery() {

    const memories = [

        {
            image: "photo4.jpg",
            caption: "One of those moments I'll always remember. ❤️"
        },

        {
            image: "photo2.jpg",
            caption: "Some memories just hit differently. 🥹"
        },

        {
            image: "photo3.jpg",
            caption: "And somehow, this one still makes me smile. ❤️"
        },

        {
            image: "photo0.jpg",
            caption: "Here's to many more memories together. 🥂❤️"
        }

    ];

    let currentPhoto = 0;

    const image =
        document.querySelector(".photo-card img");

    const caption =
        document.querySelector(".photo-card p");

    const nextButton =
        document.getElementById("nextPhotoBtn");


    nextButton.addEventListener("click", function() {

        currentPhoto++;

        // If all photos are finished
        if (currentPhoto >= memories.length) {

            showFinalMessage();

            return;
        }


        // Change image

        image.style.opacity = "0";

        caption.style.opacity = "0";


        setTimeout(function() {

            image.src =
                memories[currentPhoto].image;

            image.alt =
                "Memory " +
                (currentPhoto + 1);

            caption.textContent =
                memories[currentPhoto].caption;


            image.style.opacity = "1";

            caption.style.opacity = "1";

        }, 300);

    });

}

// ========================================
// FINAL MESSAGE
// ========================================

// ========================================
// MESSAGE FROM MY HEART
// ========================================

/// ========================================
// PAGE 5 — MESSAGE FROM MY HEART
// ========================================

function showFinalMessage() {

    document.querySelector(".birthday-card").innerHTML = `

        <div class="heart-message">

            <div class="emoji">
                💌
            </div>

            <h1>
                A Message From My Heart ❤️
            </h1>

            <div class="letter">

                <div class="letter-top">
                    <span>Dear Monika,</span>
                </div>

                <p>
                    You are so uniquely beautiful,
                    and I hope you understand that
                    no one else wears a smile quite like yours.
                </p>

                <p>
                    You are passionate, kind, and a light
                    in other people's lives. And even though
                    the world can be cruel sometimes,
                    you always find a way to shine.
                </p>

                <p>
                    Never forget how special you are,
                    and never stop being the person
                    who brings a little more light
                    into the world.
                </p>

                <div class="letter-ending">

                    <p>
                        With all my heart, 
                        ❤️
                    </p>

                    <p class="signature">
                        
                    </p>

                </div>

            </div>

            <button id="nepaliMessageBtn">
                अर्को एउटा कुरा... ❤️
            </button>

        </div>

    `;


    document
        .getElementById("nepaliMessageBtn")
        .addEventListener(
            "click",
            showNepaliMessage
        );

}
// ========================================
// PAGE 6 — NEPALI MESSAGE
// ========================================

function showNepaliMessage() {

    document.querySelector(".birthday-card").innerHTML = `

        <div class="nepali-message">

            <div class="emoji">
                💕
            </div>

            <h1>
                तिम्रो लागि ❤️
            </h1>

            <div class="nepali-letter">

                <p>
                    म हाँसी दिउँला सधैँ,
                    तिमी हाँसोमा रङ्ग थपि आउनू है। ❤️
                </p>

            </div>

            <button id="finalWishBtn">
                अन्तिम एउटा कुरा... ❤️
            </button>

        </div>

    `;

    document
        .getElementById("finalWishBtn")
        .addEventListener(
            "click",
            showFinalWish
        );
}


// ========================================
// FINAL BIRTHDAY WISH
// ========================================

function showFinalWish() {

    document.querySelector(".birthday-card").innerHTML = `

        <div class="final-message">

            <div class="emoji">
                🎂❤️
            </div>

            <h1>
                Happy Birthday Monika! ❤️
            </h1>

            <p>
                I hope this little surprise
                made you smile.
            </p>

            <p>
                May this year bring you
                everything you've been wishing for. ✨
            </p>

            <h2>
                You deserve the very best. ❤️
            </h2>

        </div>

    `;

}
