import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash, Calendar, PiggyBank, Tag } from "lucide-react";
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

const defaultRow = () => ({
  id: Date.now(),
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

  // fetch budgets
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    axios
      .get(`/api/budgets/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => {
        setBudgets(r.data.map((b) => ({ ...b, remaining: b.amount })));
      });
  }, [user]);

  // recalc on expense change
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    axios
      .get(`/api/expenses/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => {
        const all = r.data;
        setBudgets((bs) =>
          bs.map((b) => {
            const spent = all
              .filter((tx) => {
                // same category and before deadline
                return (
                  tx.category === b.category &&
                  new Date(tx.date) <= new Date(b.deadline)
                );
              })
              .reduce((s, tx) => s + tx.amount, 0);
            const rem = b.amount - spent;
            return { ...b, remaining: rem };
          })
        );
      });
  }, [budgets, user]);

  const handleChange = (id, field, val) => {
    setBudgets((bs) =>
      bs.map((b) => (b.id === id ? { ...b, [field]: val } : b))
    );
  };

  const addRow = () => setBudgets((bs) => [...bs, defaultRow()]);

  const removeRow = (id) => setBudgets((bs) => bs.filter((b) => b.id !== id));

  // persist create/edit/delete
  const saveAll = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      // naive: delete all existing then re-post
      await axios.delete(`/api/budgets/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await Promise.all(
        budgets.map((b) =>
          axios.post(
            "/api/budgets",
            {
              category: b.category,
              amount: b.amount,
              month: b.deadline.slice(0, 7),
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        )
      );

      toast.success("Budgets saved successfully");
    } catch (error) {
      toast.error("Failed to save budgets");
      console.error(error);
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
          <PiggyBank className="h-5 w-5 text-blue-600" />
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
              className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end p-4 rounded-lg transition-all duration-200 hover:bg-gray-50"
            >
              <div className="sm:col-span-1">
                <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Tag className="h-4 w-4 text-gray-500" />
                  Category
                </label>
                <AnimatedDropdown
                  value={row.category}
                  onChange={(v) => handleChange(row.id, "category", v)}
                  options={categories.map((c) => c.name)}
                  placeholder="Select category"
                  showAddNew={true}
                  onAddNew={addCategory}
                  addNewPlaceholder="Add new category"
                />
              </div>

              <div className="sm:col-span-1">
                <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <PiggyBank className="h-4 w-4 text-gray-500" />
                  Budget Amount
                </label>
                <Input
                  type="number"
                  placeholder="Budget Amount"
                  value={row.amount || ""}
                  onChange={(e) =>
                    handleChange(row.id, "amount", Number(e.target.value))
                  }
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Deadline
                </label>
                <Input
                  type="date"
                  value={row.deadline}
                  onChange={(e) =>
                    handleChange(row.id, "deadline", e.target.value)
                  }
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
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

              <div className="sm:col-span-1 flex gap-2 justify-end">
                {index === budgets.length - 1 && (
                  <Button
                    size="icon"
                    onClick={addRow}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="icon"
                  onClick={() => removeRow(row.id)}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            variant="outline"
            onClick={addRow}
            className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Budget
          </Button>
          <Button
            onClick={saveAll}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
