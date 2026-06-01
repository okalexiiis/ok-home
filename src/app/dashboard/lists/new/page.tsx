import { ListForm } from "../list-form";

export default function NewList() {
  return (
    <div className="flex flex-col flex-1 gap-8 selection:bg-yellow selection:text-background">
      <header className="w-full border-b-4 border-yellow flex items-center pb-2">
        <h1 className="font-mono text-3xl text-yellow font-bold">new list</h1>
      </header>
      <ListForm />
    </div>
  );
}
