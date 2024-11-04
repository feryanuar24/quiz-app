const users = [
  {
    name: "Super",
    email: "super@gmail.com",
    password: "super123",
  },
];

let point = 0;

const renderLoginPage = () => {
  // Render login page
  document.getElementById("container").innerHTML = `
    <form id="login-form" class="form">
        <h1 class="form-title">Login</h1>
        <label for="email-input" class="form-label>">Email</label>
        <input type="email" name="email" id="email-input" class="form-input" />
        <label for="password-input" class="form-label>">Password</label>
        <input type="password" name="password" id="password-input" class="form-input" />
        <button type="submit" id="login-button" class="form-button">Login</button>
    </form>
    <p class="form-text">Tidak memiliki akun? <a id="register-link" class="form-link">Register</a></p>
  `;

  // Add event listener to register link
  document
    .getElementById("register-link")
    .addEventListener("click", renderRegisterPage);

  // Login form listener
  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email-input").value;
      const password = document.getElementById("password-input").value;
      const user = users.find((user) => user.email === email);

      if (user && user.password === password) {
        alert("Login Success");
        renderRulePage();
      } else {
        alert("Login Failed");
      }
    });
};

const renderRegisterPage = () => {
  // Render register page
  document.getElementById("container").innerHTML = `
    <form id="register-form" class="form">
        <h1 class="form-title">Register</h1>
        <label for="name-input" class="form-label">Name</label>
        <input type="text" name="name" id="name-input" class="form-input" />
        <label for="email-input" class="form-label">Email</label>
        <input type="email" name="email" id="email-input" class="form-input" />
        <label for="password-input" class="form-label">Password</label>
        <input type="password" name="password" id="password-input" class="form-input" />
        <button type="submit" id="register-button" class="form-button">Register</button>
    </form>
    <p class="form-text">Sudah memiliki akun? <a id="login-link" class="form-link">Login</a></p>
  `;

  // Add event listener to login link
  document
    .getElementById("login-link")
    .addEventListener("click", renderLoginPage);

  // Register form listener
  document
    .getElementById("register-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name-input").value;
      const email = document.getElementById("email-input").value;
      const password = document.getElementById("password-input").value;

      users.push({ name, email, password });

      alert("Register Success");
      renderLoginPage();
    });
};

const renderRulePage = () => {
  // Render rule page
  document.getElementById("container").innerHTML = `
      <h1 class="rule-title">Aturan dalam kuis ini</h1>
      <ol class="rule-list">
        <li class="rule-item">Anda hanya memiliki waktu 15 detik untuk setiap pertanyaan.</li>
        <li class="rule-item">Anda tidak dapat memilih opsi apapun ketika waktu habis.</li>
        <li class="rule-item">Setelah kuis dimulai, Anda tidak dapat meminimalkan layar atau membuka halaman lain.</li>
        <li class="rule-item">Jika Anda melanggar poin 3, itu akan dianggap melanggar aturan (diskualifikasi).</li>
        <li class="rule-item">Jika 2 pelanggaran dihitung, Anda akan dikeluarkan.</li>
        <li class="rule-item">Anda tidak dapat keluar dari kuis selama Anda sedang bermain.</li>
        <li class="rule-item">Anda akan mendapatkan poin berdasarkan jawaban yang benar.</li>
      </ol>
      <button id="exit-button" class="rule-button">Keluar</button>
      <button id="start-button" class="rule-button">Mulai Kuis</button>
    `;

  // Exit button listener
  document
    .getElementById("exit-button")
    .addEventListener("click", renderLoginPage);

  // Start button listener
  document
    .getElementById("start-button")
    .addEventListener("click", renderQuestion1);
};

const renderQuestion1 = () => {
  // Fullscreen
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    // IE/Edge
    elem.msRequestFullscreen();
  }

  // Tambahkan event listener untuk mendeteksi perubahan visibilitas halaman
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Render Question 1
  document.getElementById("container").innerHTML = `
    <p class="timer-text">Waktu sisa: <span id="timer">15</span> detik</p>
    <h1 class="question-title">Soal 1: Apa fungsi dari element HTML</h1>
    <div class="answer-option">
      <input type="radio" id="answer1" name="answer" value="1">
      <label for="answer1">Menampilkan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer2" name="answer" value="2">
      <label for="answer2">Mengatur tampilan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer3" name="answer" value="3">
      <label for="answer3">Menyimpan data</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer4" name="answer" value="4">
      <label for="answer4">Mengatur data</label>
    </div>
    <p class="question-progress">1 dari 5 Pertanyaan</p>
    <button id="submit-button" class="submit-button">Selanjutnya</button>
  `;

  // Timer
  let timer = 15;

  const timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.getElementById("timer").innerText = timer;
    } else {
      clearInterval(timerInterval);
      alert("Waktu habis!");
      renderLoginPage();
    }
  }, 1000);

  // Next question listener
  document
    .getElementById("submit-button")
    .addEventListener("click", function () {
      clearInterval(timerInterval);
      let answer = document.querySelector('input[name="answer"]:checked').value;
      if (answer === "1") {
        point = point + 20;
      }
      renderQuestion2();
    });
};

const renderQuestion2 = () => {
  // Render Question 2
  document.getElementById("container").innerHTML = `
    <p class="timer-text">Waktu sisa: <span id="timer">15</span> detik</p>
    <h1 class="question-title">Soal 2: Apa fungsi dari element CSS</h1>
    <div class="answer-option">
      <input type="radio" id="answer1" name="answer" value="1">
      <label for="answer1">Menampilkan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer2" name="answer" value="2">
      <label for="answer2">Mengatur tampilan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer3" name="answer" value="3">
      <label for="answer3">Menyimpan data</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer4" name="answer" value="4">
      <label for="answer4">Mengatur data</label>
    </div>
    <p class="question-progress">2 dari 5 Pertanyaan</p>
    <button id="submit-button" class="submit-button">Selanjutnya</button>
  `;

  // Timer
  let timer = 15;

  const timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.getElementById("timer").innerText = timer;
    } else {
      clearInterval(timerInterval);
      alert("Waktu habis!");
      renderLoginPage();
    }
  }, 1000);

  // Next question listener
  document
    .getElementById("submit-button")
    .addEventListener("click", function () {
      clearInterval(timerInterval);
      let answer = document.querySelector('input[name="answer"]:checked').value;
      if (answer === "2") {
        point = point + 20;
      }
      renderQuestion3();
    });
};

const renderQuestion3 = () => {
  // Render Question 3
  document.getElementById("container").innerHTML = `
    <p class="timer-text">Waktu sisa: <span id="timer">15</span> detik</p>
    <h1 class="question-title">Soal 3: Apa fungsi dari element JavaScript</h1>
    <div class="answer-option">
      <input type="radio" id="answer1" name="answer" value="1">
      <label for="answer1">Menampilkan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer2" name="answer" value="2">
      <label for="answer2">Mengatur tampilan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer3" name="answer" value="3">
      <label for="answer3">Menyimpan data</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer4" name="answer" value="4">
      <label for="answer4">Mengatur data</label>
    </div>
    <p class="question-progress">3 dari 5 Pertanyaan</p>
    <button id="submit-button" class="submit-button">Selanjutnya</button>
  `;

  // Timer
  let timer = 15;

  const timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.getElementById("timer").innerText = timer;
    } else {
      clearInterval(timerInterval);
      alert("Waktu habis!");
      renderLoginPage();
    }
  }, 1000);

  // Next question listener
  document
    .getElementById("submit-button")
    .addEventListener("click", function () {
      clearInterval(timerInterval);
      let answer = document.querySelector('input[name="answer"]:checked').value;
      if (answer === "4") {
        point = point + 20;
      }
      renderQuestion4();
    });
};

const renderQuestion4 = () => {
  // Render Question 4
  document.getElementById("container").innerHTML = `
    <p class="timer-text">Waktu sisa: <span id="timer">15</span> detik</p>
    <h1 class="question-title">Soal 4: Apa fungsi dari element PHP</h1>
    <div class="answer-option">
      <input type="radio" id="answer1" name="answer" value="1">
      <label for="answer1">Menampilkan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer2" name="answer" value="2">
      <label for="answer2">Mengatur tampilan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer3" name="answer" value="3">
      <label for="answer3">Menyimpan data</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer4" name="answer" value="4">
      <label for="answer4">Mengatur data</label>
    </div>
    <p class="question-progress">4 dari 5 Pertanyaan</p>
    <button id="submit-button" class="submit-button">Selanjutnya</button>
  `;

  // Timer
  let timer = 15;

  const timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.getElementById("timer").innerText = timer;
    } else {
      clearInterval(timerInterval);
      alert("Waktu habis!");
      renderLoginPage();
    }
  }, 1000);

  // Next question listener
  document
    .getElementById("submit-button")
    .addEventListener("click", function () {
      clearInterval(timerInterval);
      let answer = document.querySelector('input[name="answer"]:checked').value;
      if (answer === "3") {
        point = point + 20;
      }
      renderQuestion5();
    });
};

const renderQuestion5 = () => {
  // Render Question 5
  document.getElementById("container").innerHTML = `
    <p class="timer-text">Waktu sisa: <span id="timer">15</span> detik</p>
    <h1 class="question-title">Soal 5: Apa fungsi dari element SQL</h1>
    <div class="answer-option">
      <input type="radio" id="answer1" name="answer" value="1">
      <label for="answer1">Menampilkan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer2" name="answer" value="2">
      <label for="answer2">Mengatur tampilan halaman web</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer3" name="answer" value="3">
      <label for="answer3">Menyimpan data</label>
    </div>
    <div class="answer-option">
      <input type="radio" id="answer4" name="answer" value="4">
      <label for="answer4">Mengatur data</label>
    </div>
    <p class="question-progress">5 dari 5 Pertanyaan</p>
    <button id="submit-button" class="submit-button">Selesai</button>
  `;

  // Timer
  let timer = 15;

  const timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.getElementById("timer").innerText = timer;
    } else {
      clearInterval(timerInterval);
      alert("Waktu habis!");
      renderLoginPage();
    }
  }, 1000);

  // Next question listener
  document
    .getElementById("submit-button")
    .addEventListener("click", function () {
      clearInterval(timerInterval);
      let answer = document.querySelector('input[name="answer"]:checked').value;
      if (answer === "3") {
        point = point + 20;
      }
      renderResultPage();
    });
};

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
    document.getElementById("container").innerHTML = `
      <h1 class="fail-title">Gagal Tes</h1>
      <button id="exit-button" class="fail-button">Keluar</button>
    `;

    // Tambahkan event listener untuk tombol keluar
    document.getElementById("exit-button").addEventListener("click", () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        renderLoginPage();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
        renderLoginPage();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
        renderLoginPage();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
        renderLoginPage();
      }
    });

    // Hapus event listener untuk menghindari pemanggilan berulang
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  }
}

const renderResultPage = () => {
  // Render Result Page
  document.getElementById("container").innerHTML = `
    <h1 class="result-title">Hasil Kuis</h1>
    <p class="result-point">Point Anda: ${point}</p>
    <button id="exit-button" class="result-button">Keluar</button>
  `;

  // Exit button listener
  document
    .getElementById("exit-button")
    .addEventListener("click", renderLoginPage);
};

renderLoginPage();
