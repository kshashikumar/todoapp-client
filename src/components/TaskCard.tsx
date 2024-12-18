"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  onTaskUpdated: () => void;
}

export function TaskCard({ task, onTaskUpdated }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const updateTask = async (id: number, updatedData: Partial<Task>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Task updated successfully.");
        onTaskUpdated();
      } else {
        console.error("Failed to update the task.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const navigateToEdit = () => {
    router.push(`/task/add?id=${task.id}`);
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Task deleted successfully.");
        onTaskUpdated();
      } else {
        console.error("Failed to delete the task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <div
        onClick={navigateToEdit}
        className="flex items-center rounded-lg bg-zinc-800/50 p-4 transition-colors hover:bg-zinc-800 cursor-pointer"
        style={{ borderLeft: `4px solid ${task.color}` }}
      >
        <label
          className="relative flex items-center cursor-pointer mr-3"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) =>
              updateTask(task.id, { completed: e.target.checked })
            }
            className="peer hidden"
          />
          <span
            className="block h-5 w-5 rounded-full border-2 border-zinc-700 bg-zinc-900 
                 peer-checked:bg-[var(--title-secondary)] peer-checked:border-[var(--title-secondary)] 
                 transition-colors flex items-center justify-center"
          >
            {task.completed && (
              <svg
                className="w-3 h-3 text-white transition-opacity duration-200 opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>
        </label>

        <div className="flex-1 min-w-0">
          <span
            className={`block text-sm break-words ${
              task.completed ? "text-zinc-500 line-through" : "text-zinc-100"
            }`}
          >
            {task.title}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDialogOpen(true);
          }}
          className="text-zinc-500 hover:text-red-500 transition-colors flex-shrink-0 ml-3"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-zinc-900 rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold text-zinc-100">
              Confirm Deletion
            </h3>
            <p className="text-zinc-400 mt-2">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => deleteTask(task.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
