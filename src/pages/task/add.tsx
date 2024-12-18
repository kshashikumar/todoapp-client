import { Header } from "@/components/Header";
import { TaskForm } from "@/components/TaskForm";

export default function AddTask() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="w-full bg-black">
        <Header />
      </div>
      <div className="py-16">
        <TaskForm />
      </div>
    </div>
  );
}
