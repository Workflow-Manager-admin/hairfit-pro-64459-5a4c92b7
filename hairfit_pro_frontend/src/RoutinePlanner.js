import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoutinePlanner.css";

// Helper to get day names starting from today (or always Sun-Sat)
const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Returns a new array for week grid, Sun-Sat
function getWeekLabels() {
  return DAY_LABELS;
}

// Default empty week template
function getDefaultWeekTasks() {
  // Each day: array of task objects: { id, text, completed }
  let week = {};
  DAY_LABELS.forEach((day) => {
    week[day] = [];
  });
  return week;
}

// PUBLIC_INTERFACE
/**
 * RoutinePlanner - A modern, responsive 7-day planner for adding/editing/removing/checking routine tasks.
 *
 * Features:
 * - 7-day grid
 * - Add/edit/remove/check tasks on any day
 * - Visual feedback for completion
 * - Return to profile via btn (using React Router)
 */
function RoutinePlanner() {
  const [weekTasks, setWeekTasks] = useState(() => getDefaultWeekTasks());
  const [inputStates, setInputStates] = useState({}); // Track input for each day: { [day]: "" }
  const [editingTask, setEditingTask] = useState(null); // { day, id, oldText }
  const [editValue, setEditValue] = useState("");
  const navigate = useNavigate();

  // Add a task to a day
  const handleAddTask = (day) => {
    const newVal = (inputStates[day] || "").trim();
    if (!newVal) return;
    setWeekTasks((prev) => ({
      ...prev,
      [day]: [...prev[day], { id: Date.now() + Math.random(), text: newVal, completed: false }],
    }));
    setInputStates((prev) => ({ ...prev, [day]: "" }));
  };

  // Remove a task from a day
  const handleRemoveTask = (day, taskId) => {
    setWeekTasks((prev) => ({
      ...prev,
      [day]: prev[day].filter((tk) => tk.id !== taskId),
    }));
    if (editingTask && editingTask.id === taskId) {
      setEditingTask(null);
      setEditValue("");
    }
  };

  // Toggle completion
  const handleToggleTask = (day, taskId) => {
    setWeekTasks((prev) => ({
      ...prev,
      [day]: prev[day].map((tk) =>
        tk.id === taskId ? { ...tk, completed: !tk.completed } : tk
      ),
    }));
  };

  // Start editing a task
  const handleBeginEdit = (day, task) => {
    setEditingTask({ day, id: task.id, oldText: task.text });
    setEditValue(task.text);
  };

  // Confirm edit
  const handleSaveEdit = () => {
    const { day, id } = editingTask;
    const newTxt = editValue.trim();
    if (!newTxt) return;
    setWeekTasks((prev) => ({
      ...prev,
      [day]: prev[day].map((tk) =>
        tk.id === id ? { ...tk, text: newTxt } : tk
      ),
    }));
    setEditingTask(null);
    setEditValue("");
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditValue("");
  };

  return (
    <div className="rf-week-bg">
      <div className="rf-header-row">
        <h1 className="rf-title">
          Weekly Hair Routine Planner
        </h1>
        <button
          className="rf-back-btn"
          onClick={() => navigate("/profile")}
        >
          &larr; Back to Profile
        </button>
      </div>
      <div className="rf-week-grid">
        {getWeekLabels().map((day) => (
          <div className="rf-day-col" key={day}>
            <div className="rf-day-label">{day}</div>
            <div className="rf-task-list">
              {weekTasks[day].length === 0 && (
                <div className="rf-task-empty">No tasks yet</div>
              )}
              {weekTasks[day].map((task) =>
                editingTask && editingTask.day === day && editingTask.id === task.id ? (
                  <div className="rf-task-edit-row" key={task.id}>
                    <input
                      className="rf-edit-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") handleSaveEdit();
                        else if (e.key === "Escape") handleCancelEdit();
                      }}
                      autoFocus
                    />
                    <button
                      className="rf-btn rf-edit-save"
                      onClick={handleSaveEdit}
                      aria-label="Save"
                    >&#10003;</button>
                    <button
                      className="rf-btn rf-edit-cancel"
                      onClick={handleCancelEdit}
                      aria-label="Cancel"
                    >&#10005;</button>
                  </div>
                ) : (
                  <div
                    className={
                      "rf-task-row" +
                      (task.completed ? " rf-task-completed" : "")
                    }
                    key={task.id}
                  >
                    <button
                      className={"rf-check-btn" + (task.completed ? " checked" : "")}
                      onClick={() => handleToggleTask(day, task.id)}
                      aria-label={task.completed ? "Unmark task as done" : "Mark as done"}
                      tabIndex={0}
                    >
                      {task.completed ? (
                        <span>&#10003;</span>
                      ) : (
                        <span className="rf-check-empty"></span>
                      )}
                    </button>
                    <span
                      className={
                        "rf-task-text" +
                        (task.completed ? " rf-task-strike" : "")
                      }
                    >
                      {task.text}
                    </span>
                    <button
                      className="rf-btn rf-task-edit"
                      onClick={() => handleBeginEdit(day, task)}
                      aria-label="Edit task"
                    >&#9998;</button>
                    <button
                      className="rf-btn rf-task-del"
                      onClick={() => handleRemoveTask(day, task.id)}
                      aria-label="Delete task"
                    >&#128465;</button>
                  </div>
                )
              )}
            </div>
            { !editingTask || editingTask.day !== day ? (
              <form
                className="rf-add-row"
                onSubmit={e => {
                  e.preventDefault();
                  handleAddTask(day);
                }}
                autoComplete="off"
              >
                <input
                  className="rf-add-input"
                  type="text"
                  value={inputStates[day] || ""}
                  onChange={e =>
                    setInputStates((prev) => ({ ...prev, [day]: e.target.value }))
                  }
                  placeholder="Add a task (e.g. Shampoo)"
                  aria-label={`Add a task for ${day}`}
                  maxLength={32}
                  onKeyDown={e => {
                    if (e.key === "Escape") {
                      setInputStates(prev => ({ ...prev, [day]: "" }));
                    }
                  }}
                />
                <button
                  type="submit"
                  className="rf-btn rf-task-add"
                  disabled={!(inputStates[day] || "").trim()}
                >
                  +
                </button>
              </form>
            ) : null }
          </div>
        ))}
      </div>
      <div className="rf-footer-hint">
        Tip: Click ✓ to check off a finished task. Click pencil or bin icons to edit or remove.
      </div>
    </div>
  );
}

export default RoutinePlanner;
