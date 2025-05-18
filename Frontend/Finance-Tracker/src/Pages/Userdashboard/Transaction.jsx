import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseJwt } from "@/utils/parseJwt";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const Transaction = () => {
  const [text, setText] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Fetch once on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = parseJwt(token);
    const userId = payload?.id;
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/expenses/user/${userId}`, {
        headers: { Authorization: token },
      })
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Auto‑add handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const token = localStorage.getItem("token");
    try {
      const { data: saved } = await axios.post(
        "http://localhost:5000/api/expenses/parse",
        { text },
        { headers: { Authorization: token } }
      );
      setTransactions(saved);
      setText("");
    } catch (err) {
      console.error("Auto‑add failed:", err);
      alert("Failed to add transactions.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Transactions</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="3"
          className="w-full p-3 border rounded"
          placeholder="e.g. 2000 on food and 4000 on clothes"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Auto‑Add Transactions
        </button>
      </form>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {["Category", "Store/Desc", "Amount", "Date"].map((h) => (
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
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx._id} className="border-b">
                  <td className="px-4 py-2">{tx.category}</td>
                  <td className="px-4 py-2">{tx.store}</td>
                  <td className="px-4 py-2">Rs. {tx.amount}</td>
                  <td className="px-4 py-2">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
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
