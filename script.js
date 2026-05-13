:root {
  --bg: #121826;
  --card-bg: #1e2538;
  --text: #e5e7eb;
  --gray: #9ca3af;
  --primary: #6366f1;
  --hover: #4f46e5;
  --danger: #ef4444;
  --lottery: #f59e0b;
}

.light {
  --bg: #f3f4f6;
  --card-bg: #ffffff;
  --text: #1f2937;
  --gray: #6b7280;
  --primary: #6366f1;
  --hover: #4f46e5;
  --danger: #ef4444;
  --lottery: #f59e0b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", sans-serif;
}

body {
  background-color: var(--bg);
  color: var(--text);
  min-height: 100vh;
  padding: 40px 20px;
  transition: background 0.4s ease, color 0.4s ease;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

/* ========= 每日一签 ========= */
.lottery-box {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.lottery-result {
  font-size: 16px;
  margin-bottom: 12px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--lottery);
  font-weight: 500;
  line-height: 1.5;
}

.draw-btn {
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  background: var(--lottery);
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s;
}

.draw-btn:disabled {
  background: var(--gray);
  cursor: not-allowed;
}

.draw-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

/* ========= 主题按钮 ========= */
#themeBtn {
  margin-bottom: 20px;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: var(--primary);
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

#themeBtn:hover {
  background: var(--hover);
  transform: translateY(-2px);
}

h1 {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
}

.count-info {
  text-align: center;
  color: var(--gray);
  margin-bottom: 25px;
}

.input-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#todoInput {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: var(--card-bg);
  color: var(--text);
  font-size: 16px;
  outline: none;
  transition: 0.3s;
}

#todoInput:focus {
  box-shadow: 0 0 0 2px var(--primary);
}

#addBtn {
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  background: var(--primary);
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}

#addBtn:hover {
  background: var(--hover);
}

.filter-box {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 6px 14px;
  border-radius: 16px;
  border: none;
  background: transparent;
  color: var(--gray);
  cursor: pointer;
  transition: 0.3s;
}

.filter-btn.active {
  background: var(--primary);
  color: #fff;
}

ul {
  list-style: none;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: var(--card-bg);
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.todo-item.done .todo-text {
  text-decoration: line-through;
  color: var(--gray);
}

.todo-text {
  flex: 1;
  margin: 0 12px;
}

.del-btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  background: var(--danger);
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

#clearAll {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--danger);
  background: transparent;
  color: var(--danger);
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

#clearAll:hover {
  background: var(--danger);
  color: #fff;
}
