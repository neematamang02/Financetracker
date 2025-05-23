import { useState, useEffect } from "react";
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
import {
  Plus,
  Trash2,
  Target,
  Calendar,
  DollarSign,
  PiggyBank,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SavingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const form = useForm({
    defaultValues: { name: "", target: "", deadline: "" },
  });

  // load goals on mount
  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setGoals(res.data);
        const sum = res.data.reduce((acc, g) => acc + g.savedAmount, 0);
        setTotalSaved(sum);
      } catch (err) {
        console.error(err);
        setError("Failed to load savings goals. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
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
      setError("Failed to add goal. Please try again.");
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
      setError("Failed to save to goal. Please try again.");
    }
  };

  const deleteGoal = async (id) => {
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
      setError("Failed to delete goal. Please try again.");
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (savedAmount, target) => {
    const percentage = (savedAmount / target) * 100;
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 50) return "bg-blue-500";
    if (percentage >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-purple-800 flex items-center gap-2">
                <PiggyBank className="h-6 w-6 text-purple-600" />
                Savings Goals
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <span className="text-sm text-gray-500">Total Savings</span>
                <p className="text-xl font-bold text-green-600">
                  {isLoading ? (
                    <Skeleton className="h-7 w-24 bg-gray-200" />
                  ) : (
                    `Rs. ${totalSaved.toLocaleString()}`
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* New Goal Form */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Add New Goal
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goal Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Vacation"
                            {...field}
                            className="border-gray-300"
                          />
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
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            className="border-gray-300"
                          />
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
                          <Input
                            type="date"
                            {...field}
                            className="border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Goal
                </Button>
              </form>
            </Form>
          </div>

          {/* Goals Cards */}
          {isLoading ? (
            <SavingGoalsSkeleton />
          ) : goals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal) => {
                const progressPercentage = Math.min(
                  Math.round((goal.savedAmount / goal.target) * 100),
                  100
                );
                const daysRemaining = getDaysRemaining(goal.deadline);
                const isCompleted = goal.savedAmount >= goal.target;

                return (
                  <Card
                    key={goal._id}
                    className="border border-gray-200 overflow-hidden"
                  >
                    <CardHeader
                      className={`pb-2 ${
                        isCompleted ? "bg-green-50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">
                          {goal.name}
                        </CardTitle>
                        {isCompleted && (
                          <Badge className="bg-green-500">Completed</Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            Target
                          </span>
                          <span className="font-medium">
                            Rs. {goal.target.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 flex items-center gap-1">
                            <PiggyBank className="h-4 w-4" />
                            Saved
                          </span>
                          <span className="font-medium">
                            Rs. {goal.savedAmount.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Deadline
                          </span>
                          <span className="font-medium">
                            {new Date(goal.deadline).toLocaleDateString(
                              "en-IN"
                            )}
                            {daysRemaining > 0 && !isCompleted && (
                              <span className="ml-1 text-xs text-gray-500">
                                ({daysRemaining} days left)
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span className="font-medium">
                              {progressPercentage}%
                            </span>
                          </div>
                          <Progress
                            value={progressPercentage}
                            className="h-2"
                            indicatorClassName={getProgressColor(
                              goal.savedAmount,
                              goal.target
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                      {!isCompleted && (
                        <AddToGoalForm goalId={goal._id} onAdd={addToGoal} />
                      )}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Goal
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the savings goal "
                              {goal.name}". This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteGoal(goal._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <PiggyBank className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No savings goals yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first savings goal to start tracking your progress
              </p>
              <Button
                onClick={() =>
                  document.getElementById("goal-name-input")?.focus()
                }
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Goal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
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
    <form onSubmit={handle} className="flex w-full gap-2">
      <div className="relative flex-1">
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          id="amount-input"
          type="number"
          placeholder="Amount to add"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="pl-9 border-gray-300"
          min="1"
        />
      </div>
      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
}

// Skeleton loading state
function SavingGoalsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="border border-gray-200 overflow-hidden">
          <CardHeader className="pb-2 bg-gray-50">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>

          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex flex-col gap-2">
            <div className="flex w-full gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-16" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default SavingGoals;
