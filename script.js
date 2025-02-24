let score = 0;
let index = 0;
let timeLeft = 10;
let timer;
let questions = [];

// **ランダムな九九の問題を生成**
function generateQuestions() {
    for (let i = 0; i < 25; i++) {
        let num1 = Math.floor(Math.random() * 9) + 1;
        let num2 = Math.floor(Math.random() * 9) + 1;
        questions.push({ q: `${num1} × ${num2} =`, a: num1 * num2 });
    }
}

// **次の問題を表示**
function nextQuestion() {
    if (index >= questions.length) {
        alert(`テスト終了！スコア: ${score}/25`);
        return;
    }
    document.getElementById("question").innerText = questions[index].q;
    document.getElementById("answer").value = "";
    timeLeft = 10;
    document.getElementById("timer").innerText = `残り時間: ${timeLeft}秒`;
    timer = setInterval(countdown, 1000);
}

// **カウントダウンタイマー**
function countdown() {
    timeLeft--;
    document.getElementById("timer").innerText = `残り時間: ${timeLeft}秒`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        index++;
        nextQuestion();
    }
}

// **解答を送信**
function submitAnswer() {
    let userAnswer = parseInt(document.getElementById("answer").value);
    if (userAnswer === questions[index].a) {
        score++;
        document.getElementById("score").innerText = `スコア: ${score}`;
    }
    clearInterval(timer);
    index++;
    nextQuestion();
}

// **テスト開始**
generateQuestions();
nextQuestion();
