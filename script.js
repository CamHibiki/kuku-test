let score = 0;
let index = 0;
let timeLeft = 10;
let timer;
let questions = [];
let correctAnswers = [];  // 正解した問題を記録
let incorrectAnswers = []; // 間違えた問題を記録

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
        alert(`Test finished! Score: ${score}/25`);
        finishTest(); // ここでテスト結果を送信
        return;
    }
    document.getElementById("question").innerText = questions[index].q;
    document.getElementById("answer").value = "";
    timeLeft = 10;
    document.getElementById("timer").innerText = `Time left: ${timeLeft} sec`;
    timer = setInterval(countdown, 1000);
}

// **カウントダウンタイマー**
function countdown() {
    timeLeft--;
    document.getElementById("timer").innerText = `Time left: ${timeLeft} sec`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        incorrectAnswers.push(questions[index].q);
        index++;
        nextQuestion();
    }
}

// **解答を送信**
function submitAnswer() {
    let userAnswer = parseInt(document.getElementById("answer").value);
    if (userAnswer === questions[index].a) {
        score++;
        correctAnswers.push(questions[index].q);
    } else {
        incorrectAnswers.push(questions[index].q);
    }
    document.getElementById("score").innerText = `Score: ${score}`;
    clearInterval(timer);
    index++;
    nextQuestion();
}

// **テスト開始**
generateQuestions();
nextQuestion();

// **結果をGoogleスプレッドシートに送信**
function sendTestResult(name, score, correct, incorrect) {
    var url = "GASのWebアプリURL"; // ここにデプロイしたGASのURLを入れる
    var data = { name: name, score: score, correct: correct, incorrect: incorrect };

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log("Success:", result))
    .catch(error => console.error("Error:", error));
}

// **テスト終了時に結果を送信**
function finishTest() {
    let name = document.getElementById("username").value;
    sendTestResult(name, score, correctAnswers.join(", "), incorrectAnswers.join(", "));
}
