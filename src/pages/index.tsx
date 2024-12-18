"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CirclePlus, ClipboardList } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { Header } from "@/components/Header";

export default function Home() {
  const [tasks, setTasks] = useState<
    { id: number; title: string; completed: boolean; color: string }[]
  >([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="w-full bg-black">
        <Header />
      </div>

      <main className="mx-auto max-w-2xl px-4">
        <Link href="/task/add">
          <button className="w-full -translate-y-1/2 flex items-center justify-center gap-2 bg-[var(--button-save)] hover:bg--[var(--button-primary-hover)] text-white font-medium py-2 rounded-md transition-colors">
            Create Task <CirclePlus className="h-5 w-5" />
          </button>
        </Link>

        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="text-sm  font-semibold">
            <span className="text-[var(--title-primary)]">Tasks </span>
            <span className="rounded-lg bg-zinc-800 px-2 py-1">
              {tasks.length}
            </span>
          </span>
          <span className="font-semibold text-sm">
            <span className="text-[var(--title-secondary)]">Completed </span>
            <span className="rounded-lg bg-zinc-800 px-2 py-1">
              {completedTasks} of {tasks.length}
            </span>
          </span>
        </div>

        {tasks.length === 0 ? (
          <div>
            <div className="w-full mt-4 border-t border-zinc-700"></div>
            <div className="mt-16 flex flex-col items-center gap-2 text-center">
              <ClipboardList className="h-16 w-16 text-zinc-700" />
              <p className="text-xl font-medium">
                You don&apos;t have any tasks registered yet.
              </p>
              <p className="text-zinc-400">
                Create tasks and organize your to-do items.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onTaskUpdated={fetchTasks} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
