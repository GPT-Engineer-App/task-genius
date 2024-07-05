import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  const addTask = () => {
    if (newTaskTitle.trim() === "") return;
    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setEditingTaskId(taskId);
    setEditingTaskTitle(task.title);
  };

  const saveTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: editingTaskTitle } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskTitle("");
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task"
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
          <Separator />
          <div className="mt-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                  />
                  {editingTaskId === task.id ? (
                    <Input
                      value={editingTaskTitle}
                      onChange={(e) => setEditingTaskTitle(e.target.value)}
                      className="mr-2"
                    />
                  ) : (
                    <span
                      className={`${
                        task.completed ? "line-through text-muted" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {editingTaskId === task.id ? (
                    <Button onClick={() => saveTask(task.id)}>Save</Button>
                  ) : (
                    <Button onClick={() => editTask(task.id)}>Edit</Button>
                  )}
                  <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;