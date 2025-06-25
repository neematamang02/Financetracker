import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Useuser from "@/hooks/use-user";
import { useCategories } from "@/hooks/use-categories";
import AnimatedDropdown from "@/components/AnimatedDropdown";
import {
  Add,
  Archive,
  Calendar,
  Tag,
  Timer,
  Trash,
  Wallet,
} from "iconsax-reactjs";

const defaultRow = () => ({
  id: Date.now() + Math.random(),
  category: "",
  amount: 0,
  deadline: "", // YYYY-MM-DD
  remaining: 0,
});

export default function BudgetManage() {
  const { user, loading: userL, error: userE } = Useuser();
  const { categories, loading: catL, addCategory } = useCategories();
  const [budgets, setBudgets] = useState([defaultRow()]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch budgets & expenses together
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");

    async function loadData() {
      try {
        const [budgetRes, expenseRes] = await Promise.all([
          axios.get(`/api/budget/user/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`/api/expenses/user/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const expenses = expenseRes.data;
        const rows = budgetRes.data.map((b) => {
          const spent = expenses
            .filter(
              (tx) =>
                tx.category === b.category &&
                new Date(tx.date) <= new Date(b.month + "-31")
            )
            .reduce((sum, tx) => sum + tx.amount, 0);

          return {
            ...b,
            id: b._id,
            amount: b.amount,
            deadline: b.month + "-01",
            remaining: b.amount - spent,
          };
        });
        setBudgets(rows);
      } catch (err) {
        console.error("Failed to load data", err);
        toast.error("Could not load budgets");
      }
    }
    loadData();
  }, [user]);

  // Field edits
  const handleChange = (id, field, val) => {
    setBudgets((bs) =>
      bs.map((b) => (b.id === id ? { ...b, [field]: val } : b))
    );
  };

  const addRow = () => setBudgets((bs) => [...bs, defaultRow()]);

  // OPTION 1: immediate delete
  const handleDelete = async (row) => {
    const token = localStorage.getItem("token");
    if (row._id) {
      try {
        await axios.delete(`/api/budget/${row._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Budget deleted");
      } catch (err) {
        console.error("Delete failed:", err.response?.data || err.message);
        toast.error("Couldn’t delete budget");
        return;
      }
    }
    setBudgets((bs) => bs.filter((b) => b.id !== row.id));
  };

  // Bulk save
  const saveAll = async () => {
    if (isSubmitting || !user) return;
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`/api/budget/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await Promise.all(
        budgets.map((b) =>
          axios.post(
            "/api/budget",
            {
              category: b.category,
              amount: b.amount,
              month: b.deadline.slice(0, 7),
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      toast.success("Budgets saved successfully");
    } catch (error) {
      console.error("Save error:", error.response?.data || error.message);
      toast.error(
        "Failed to save budgets: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userL || catL)
    return (
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Manage Budgets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <span className="ml-3">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );

  if (userE)
    return (
      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{userE.message}</p>
        </CardContent>
      </Card>
    );

  return (
    <Card className="mt-5 border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Wallet size="32" variant="Bulk" className="h-5 w-5 text-blue-600" />{" "}
          Manage Budgets
        </CardTitle>
        <CardDescription>
          Set and track your spending limits by category
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {budgets.map((row, index) => (
            <div
              key={row.id}
              className="grid grid-cols-1 sm:grid-cols-5 gap-2  items-end p-4 rounded-lg hover:bg-gray-50"
            >
              {/* Category */}
              <div className="sm:col-span-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Tag
                    size="32"
                    variant="Bulk"
                    className="h-4 w-4 text-gray-500"
                  />{" "}
                  Category
                </label>
                <AnimatedDropdown
                  value={row.category}
                  onChange={(v) => handleChange(row.id, "category", v)}
                  options={categories.map((c) => c.name)}
                  placeholder="Select category"
                  showAddNew
                  onAddNew={addCategory}
                  addNewPlaceholder="Add new category"
                />
              </div>

              {/* Amount */}
              <div className="sm:col-span-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Wallet
                    size="32"
                    variant="Bulk"
                    className="h-4 w-4 text-gray-500"
                  />{" "}
                  Amount
                </label>
                <Input
                  type="number"
                  placeholder="Budget Amount"
                  value={row.amount}
                  onChange={(e) =>
                    handleChange(row.id, "amount", Number(e.target.value))
                  }
                  className="border-gray-200 focus:ring-blue-500 py-5"
                />
              </div>

              {/* Deadline */}
              <div className="sm:col-span-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Calendar
                    size="32"
                    variant="Bulk"
                    className="h-4 w-4 text-gray-500"
                  />{" "}
                  Deadline
                </label>
                <Input
                  type="month"
                  value={row.deadline.slice(0, 7)}
                  onChange={(e) =>
                    handleChange(row.id, "deadline", `${e.target.value}-01`)
                  }
                  className="border-gray-200 focus:ring-blue-500 py-5"
                />
              </div>

              {/* Remaining */}
              <div className="sm:col-span-1">
                <label className=" gap-1 text-sm flex items-center font-medium text-gray-700 mb-1">
                  <Timer
                    size="32"
                    variant="Bulk"
                    className="h-4 w-4 text-gray-500"
                  />
                  Remaining
                </label>
                <div
                  className={`py-2 px-3 rounded-md font-semibold ${
                    row.remaining < 0
                      ? "bg-red-50 text-red-700"
                      : row.remaining < row.amount * 0.2
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  Rs. {row.remaining.toFixed(2)} left
                </div>
              </div>

              {/* Actions */}
              <div className="sm:col-span-1 flex gap-2 justify-end">
                {index === budgets.length - 1 && (
                  <Button
                    size="icon"
                    onClick={addRow}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Add
                      size="32"
                      color="#fff"
                      variant="Bulk"
                      className="h-4 w-4"
                    />
                  </Button>
                )}
                <Button
                  size="icon"
                  onClick={() => handleDelete(row)}
                  variant="destructive"
                >
                  <Trash
                    size="32"
                    color="#fff"
                    variant="Bulk"
                    className="h-4 w-4"
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <Button variant="outline" onClick={addRow}>
            <Add size="32" color="#000" variant="Bulk" className="mr-2" /> Add
            Budget
          </Button>
          <Button onClick={saveAll} disabled={isSubmitting}>
            <Archive size="32" color="#fff" variant="Bulk" />
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              "Save Budgets"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
