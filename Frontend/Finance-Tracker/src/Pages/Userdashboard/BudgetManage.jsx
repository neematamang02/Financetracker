import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Useuser from "@/hooks/use-user";
import { useCategories } from "@/hooks/use-categories";

const defaultRow = () => ({
  id: Date.now(),
  category: "",
  amount: "",
  month: new Date().toISOString().slice(0, 7),
  remaining: 0,
});

export default function BudgetManage() {
  const { user, loading: userLoading, error: userError } = Useuser();
  const { categories, loading: catLoading } = useCategories();
  const [budgets, setBudgets] = useState([defaultRow()]);

  // Load persisted budgets
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    axios
      .get(`/api/budgets/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        setBudgets(res.data.map((b) => ({ ...b, remaining: b.amount })))
      )
      .catch(console.error);
  }, [user]);

  // Recalculate remaining budget
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    axios
      .get(`/api/expenses/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const allExp = res.data;
        setBudgets((prev) =>
          prev.map((row) => {
            if (!row.category || !row.month) return row;
            const spent = allExp
              .filter(
                (tx) =>
                  new Date(tx.date).toISOString().slice(0, 7) === row.month &&
                  tx.category === row.category
              )
              .reduce((sum, tx) => sum + tx.amount, 0);
            const remaining = row.amount - spent;
            if (remaining < 0)
              toast.error(`${row.category} over by Rs. ${Math.abs(remaining)}`);
            else if (remaining < row.amount * 0.1)
              toast(`${row.category} nearly exceeded: Rs. ${remaining} left`);
            return { ...row, remaining };
          })
        );
      })
      .catch(console.error);
  }, [budgets, user]);

  const handleChange = (id, field, value) => {
    setBudgets((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
    // TODO: Persist change via API
  };

  const addRow = () => setBudgets((prev) => [...prev, defaultRow()]);
  const removeRow = (id) =>
    setBudgets((prev) => prev.filter((r) => r.id !== id));

  if (userLoading || catLoading) return <p>Loading...</p>;
  if (userError)
    return <p className="text-red-500">Error: {userError.message}</p>;

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Manage Budgets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.map((row) => (
            <div key={row.id} className="grid grid-cols-5 gap-4 items-end">
              <Select
                value={row.category}
                onValueChange={(val) => handleChange(row.id, "category", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Amount (Rs.)"
                value={row.amount}
                onChange={(e) =>
                  handleChange(row.id, "amount", parseFloat(e.target.value))
                }
              />
              <Input
                type="month"
                value={row.month}
                onChange={(e) => handleChange(row.id, "month", e.target.value)}
              />
              <p className="font-semibold">
                Rs. {row.remaining.toFixed(2)} left
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={addRow}>
                  <Plus />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeRow(row.id)}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
