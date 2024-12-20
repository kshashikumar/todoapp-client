"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, CirclePlus } from "lucide-react";
import { colors } from "@/constants/colors";

export function TaskForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`
          );
          const task = await response.json();
          setTitle(task.title);
          setSelectedColor(task.color);
        } catch (error) {
          console.error("Failed to fetch task:", error);
        }
      };
      fetchTask();
    }
  }, [taskId]);

  const saveTask = async () => {
    setLoading(true);
    setError("");
    try {
      const method = taskId ? "PUT" : "POST";
      const endpoint = taskId
        ? `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/tasks`;

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          color: selectedColor,
          completed: false,
        }),
      });

      if (response.ok) {
        console.log(`Task ${taskId ? "updated" : "created"} successfully.`);
        router.push("/");
      } else {
        console.error("Failed to save task.");
      }
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Task title cannot be empty.");
      return;
    }
    await saveTask();
  };

  return (
    <div className="mx-auto max-w-2xl px-4">
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-100"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-sm text-[var(--title-primary)] font-semibold"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Ex: Brush your teeth"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800/50 p-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[var(--title-primary)] font-semibold">
            Color
          </label>
          <div className="flex gap-4">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`h-10 w-10 rounded-full transition-transform ${
                  selectedColor === color
                    ? "scale-125 border-2 border-white"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button
          className={`w-full flex items-center justify-center gap-2 rounded-md p-3 text-center text-white transition-all ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[var(--button-primary-hover)]"
          }`}
          style={{
            backgroundColor: "var(--button-save)",
          }}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? (
            "Adding Task..."
          ) : title.length !== 0 ? (
            <>
              Save <Check className="h-5 w-5" />
            </>
          ) : (
            <>
              Add Task <CirclePlus className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
