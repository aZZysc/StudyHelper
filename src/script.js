// Загрузка задач из localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Отображаем имя пользователя
document.getElementById('userName').textContent = localStorage.getItem('user');

// Поиск по задачам
document.getElementById('searchInput').addEventListener('input', renderTasks);

// Выход
function logout() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

// Добавление новой задачи
function addTask() {
  const id = Date.now();
  tasks.push({ id, title: 'New Task', desc: '' });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  window.location.href = `task.html?id=${id}`; // Переход к редактированию
}

// Отображение задач
function renderTasks() {
  const container = document.getElementById('taskList');
  const filter = document.getElementById('searchInput').value.toLowerCase();
  container.innerHTML = '';

  tasks
    .filter(t => t.title.toLowerCase().includes(filter))
    .forEach(task => {
      const card = document.createElement('div');
      card.className = 'task-card';

      card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.desc}</p>
        <div class="task-actions">
          <a href="task.html?id=${task.id}">Open</a>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;

      container.appendChild(card);
    });
}

function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

renderTasks();


// Pomodoro Timer
let time = 1500;
let timer;

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      document.getElementById('timer').textContent = formatTime(time);
    } else {
      clearInterval(timer);
      alert('Time is up!');
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  time = 1500;
  document.getElementById('timer').textContent = formatTime(time);
}

function formatTime(sec) {
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}