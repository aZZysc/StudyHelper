function saveTask() {
  const titleInput = document.getElementById("titleInput");
  const descInput = document.getElementById("descInput");

  const task = {
    title: titleInput.value.trim(),
    desc: descInput.value.trim(),
    createdAt: new Date().toISOString()
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");

  if (taskId !== null) {
    tasks[taskId] = task; // Обновление
  } else {
    tasks.push(task);     // Добавление новой
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  // ✅ Автоматический переход на главную
  window.location.href = "index.html";
}
