import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
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
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedDropdown from "@/components/AnimatedDropdown";

const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Utilities",
  "Health",
  "Entertainment",
];

const Transaction = () => {
  const [text, setText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [type, setType] = useState("expense");

  const form = useForm({
    defaultValues: {
      type: "expense",
      category: "",
      store: "",
      amount: "",
      date: "",
    },
  });
  const {
    control,
    handleSubmit,
    setValue,
    resetField,
    watch,
    formState: { errors },
  } = form;

  // Clear category when switching to income
  useEffect(() => {
    setValue("category", "");
  }, [type, setValue]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload?.id;
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/expenses/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const payload = {
      type: data.type,
      store: data.store,
      amount: data.amount,
      date: data.date,
    };
    if (data.type === "expense") payload.category = data.category;

    try {
      const { data: newTx } = await axios.post(
        "http://localhost:5000/api/expenses",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions((prev) => [...prev, newTx]);
      form.reset({
        type: data.type,
        category: "",
        store: "",
        amount: "",
        date: "",
      });
      toast("Transaction has been successfully added!");
    } catch (err) {
      console.error("Add failed:", err);
      toast(err.response?.data?.message || "Failed to add transaction.");
    }
  };

  const handleParse = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const token = localStorage.getItem("token");
    try {
      const { data: parsed } = await axios.post(
        "http://localhost:5000/api/expenses/parse",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(parsed);
      setText("");
    } catch (err) {
      console.error("Auto-add failed:", err);
      alert("Failed to parse transactions.");
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.length === transactions.length
        ? []
        : transactions.map((tx) => tx._id)
    );
  };

  const deleteSelected = async () => {
    if (!selectedIds.length) return;
    const token = localStorage.getItem("token");
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`http://localhost:5000/api/expenses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setTransactions((prev) =>
        prev.filter((tx) => !selectedIds.includes(tx._id))
      );
      setSelectedIds([]);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete selected transactions.");
    }
  };

  return (
    <div className="p-5 text-black">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      <div className="mb-6 flex gap-4">
        {/* {["expense", "income"].map((val) => (
          <label key={val} className="flex items-center gap-1">
            <input
              type="checkbox"
              value={val}
              checked={watch("type") === val}
              onChange={() => {
                setType(val);
                setValue("type", val);
              }}
            />
            {val.charAt(0).toUpperCase() + val.slice(1)}
          </label>
        ))} */}
        <Tabs
          defaultValue="expense"
          value={type}
          onValueChange={(val) => {
            setType(val);
            setValue("type", val);
          }}
          className="mb-6"
        >
          <TabsList className="bg-gray-100 p-1 rounded-sm space-x-2">
            <TabsTrigger
              value="expense"
              className="
        px-4 py-2 rounded-sm
        transition-colors
        hover:bg-gray-200
        data-[state=active]:bg-blue-600
        data-[state=active]:text-white cursor-pointer
      "
            >
              Expense
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="
        px-4 py-2 rounded-sm
        transition-colors
        hover:bg-gray-200
        data-[state=active]:bg-green-600
        data-[state=active]:text-white cursor-pointer
      "
            >
              Income
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* {type === "expense" && (
              <FormField
                control={control}
                name="category"
                rules={{ required: "Category is required for expenses" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full p-2 border rounded">
                        <option value="" disabled>
                          Select category
                        </option>
                        {EXPENSE_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage>{errors.category?.message}</FormMessage>
                  </FormItem>
                )}
              />
            )} */}
            {type === "expense" && (
              <FormField
                control={control}
                name="category"
                rules={{ required: "Category is required for expenses" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <AnimatedDropdown
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        options={EXPENSE_CATEGORIES}
                        placeholder="Select category"
                        error={errors.category}
                      />
                    </FormControl>
                    <FormMessage>{errors.category?.message}</FormMessage>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={control}
              name="store"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Salary or Store..." {...field} />
                  </FormControl>
                  <FormMessage>{errors.store?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="amount"
              rules={{
                required: "Amount is required",
                min: { value: 1, message: "Amount must be at least 1" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (Rs.)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage>{errors.amount?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="date"
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage>{errors.date?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">
            <Plus />
            Add {type === "expense" ? "Expense" : "Income"}
          </Button>
        </form>
      </Form>

      <form onSubmit={handleParse} className="mt-4 space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full p-3 border rounded"
          placeholder="e.g. 2000 on food and 4000 on clothes"
        />
        <Button type="submit">
          <Plus />
          Auto‑Add
        </Button>
      </form>

      <div className="mt-4 flex items-center gap-4">
        <Button
          onClick={deleteSelected}
          disabled={!selectedIds.length}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
        >
          <Trash />
          Remove
        </Button>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={
              selectedIds.length === transactions.length &&
              transactions.length > 0
            }
            onChange={toggleSelectAll}
          />
          Select All
        </label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200"></th>
              <th className="px-4 py-2 bg-gray-800 text-white text-left">
                Type
              </th>
              <th className="px-4 py-2 bg-gray-800 text-white text-left">
                Category
              </th>
              <th className="px-4 py-2 bg-gray-800 text-white text-left">
                Desc
              </th>
              <th className="px-4 py-2 bg-gray-800 text-white text-left">
                Amount
              </th>
              <th className="px-4 py-2 bg-gray-800 text-white text-left">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(tx._id)}
                      onChange={() => toggleSelect(tx._id)}
                    />
                  </td>
                  <td className="px-4 py-2">{tx.type}</td>
                  <td className="px-4 py-2">{tx.category || "-"}</td>
                  <td className="px-4 py-2">{tx.store}</td>
                  <td className="px-4 py-2">Rs. {tx.amount}</td>
                  <td className="px-4 py-2">
                    {new Date(tx.date).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 italic text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
