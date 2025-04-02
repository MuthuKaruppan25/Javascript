document.addEventListener("DOMContentLoaded", () => {
    const optionsSection = document.querySelector(".options-section");
    const questionSection = document.querySelector(".quiz-section");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const subBtn = document.getElementById("submit");
    const resultContainer = document.getElementById('result');
    const quizcontainer = document.querySelector(".quiz-container");
    let currquesindex = 0;
    let questions = [];
    let selectedAnswers = new Map();

    fetch("questions.json")
        .then(res => res.json())
        .then(data => {
            questions = data;
            loadQuestions();
        })
        .catch((e) => console.error("Error loading questions:", e));

    function loadQuestions() {
        if (currquesindex > 0) {
            prevBtn.classList.remove("inactive");
        } else {
            prevBtn.classList.add("inactive");
        }

        if (currquesindex >= questions.length - 1) {
            nextBtn.classList.add("inactive");
            subBtn.classList.add("active");
        } else {
            nextBtn.classList.remove("inactive");
            subBtn.classList.remove("active");
        }

        const question = questions[currquesindex];
        questionSection.innerHTML = `<p>${question.question}</p>`;
        optionsSection.innerHTML = ""; // ✅ Clear previous options

        question.options.forEach((option, index) => {
            const li = document.createElement("li");
            li.textContent = option;
            li.classList.add("option");

            li.addEventListener("click", () => {
                document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
                li.classList.add("selected");
                selectedAnswers.set(currquesindex, index); 
            });

            if (selectedAnswers.get(currquesindex) === index) {
                li.classList.add("selected");
            }

            optionsSection.appendChild(li);
        });
    }

    nextBtn.addEventListener("click", () => {
        if (currquesindex < questions.length - 1) {
            currquesindex++;
            loadQuestions();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currquesindex > 0) {
            currquesindex--;
            loadQuestions();
        }
    });

    subBtn.addEventListener("click", () => {
        let score = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers.get(index) === question.correct) {
                score++;
            }
        });
        if (quizcontainer) {
            quizcontainer.style.display = "none";
        } else {
            console.error("Quiz container not found!");
        }
        resultContainer.innerHTML=`<h2>Your score: ${score} / ${questions.length}</h2>`;
        alert(`Your score: ${score} / ${questions.length}`);
    });
});
