import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const SavingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const form = useForm({
    defaultValues: { name: "", target: "", deadline: "" },
  });

  // load goals on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/goals", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setGoals(res.data);
        const sum = res.data.reduce((acc, g) => acc + g.savedAmount, 0);
        setTotalSaved(sum);
      })
      .catch(console.error);
  }, []);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const payload = { ...data, target: Number(data.target) };
      const res = await axios.post("http://localhost:5000/api/goals", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals((prev) => [...prev, res.data]);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to add goal");
    }
  };

  const addToGoal = async (id, amount) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/goals/${id}/save`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals((prev) => prev.map((g) => (g._id === id ? res.data : g)));
      setTotalSaved((prev) => prev + amount);
    } catch (err) {
      console.error(err);
      alert("Failed to save to goal");
    }
  };

  const deleteGoal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/goals/${id}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = goals.filter((g) => g._id !== id);
      setGoals(updated);
      setTotalSaved(updated.reduce((acc, g) => acc + g.savedAmount, 0));
    } catch (err) {
      console.error(err);
      alert("Failed to delete goal.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Savings Goals</h2>
      <div className="mb-6">
        <p className="text-lg">Total Savings: Rs. {totalSaved}</p>
      </div>

      {/* New Goal Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Vacation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Amount (Rs.)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="flex items-center gap-2">
            <Plus />
            Add Goal
          </Button>
        </form>
      </Form>

      {/* Goals Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {[
                "Name",
                "Target (Rs.)",
                "Saved (Rs.)",
                "Deadline",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 bg-gray-800 text-white text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr key={goal._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{goal.name}</td>
                <td className="px-4 py-2">{goal.target}</td>
                <td className="px-4 py-2">{goal.savedAmount}</td>
                <td className="px-4 py-2">
                  {new Date(goal.deadline).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {goal.savedAmount < goal.target && (
                    <AddToGoalForm goalId={goal._id} onAdd={addToGoal} />
                  )}
                  <Button
                    onClick={() => deleteGoal(goal._id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-500"
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Component to add savings
function AddToGoalForm({ goalId, onAdd }) {
  const [amount, setAmount] = useState("");
  const handle = (e) => {
    e.preventDefault();
    if (!amount) return;
    onAdd(goalId, Number(amount));
    setAmount("");
  };
  return (
    <form onSubmit={handle} className="flex items-center gap-1">
      <Input
        type="number"
        placeholder="Amt"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-20"
        min="1"
      />
      <Button
        type="submit"
        className="flex items-center gap-1 bg-green-600 hover:bg-green-500"
      >
        <Plus size={12} />
        Add
      </Button>
    </form>
  );
}

export default SavingGoals;
