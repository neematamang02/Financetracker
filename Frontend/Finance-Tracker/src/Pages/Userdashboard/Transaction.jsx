import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Useuser from "@/hooks/use-user";
import { useCategories } from "@/hooks/use-categories";
import AnimatedDropdown from "@/components/AnimatedDropdown";
import {
  Add,
  Calendar,
  DocumentText,
  MoneyAdd,
  MoneyRemove,
  Tag,
  Trash,
  Wallet,
  InfoCircle,
  Refresh,
} from "iconsax-reactjs";

export default function EnhancedTransaction() {
  const { user, loading: userLoading } = Useuser();
  const { categories, loading: catLoading, addCategory } = useCategories();
  const [transactions, setTransactions] = useState([]);
  const [bulkText, setBulkText] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [type, setType] = useState("expense");
  const [cache, setCache] = useState({ expense: {}, income: {} });
  const [autoCategorize, setAutoCategorize] = useState(true);
  const [parsedPreview, setParsedPreview] = useState([]);
  const [overrideCategories, setOverrideCategories] = useState({});
  const [isAIParsing, setIsAIParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [correctedText, setCorrectedText] = useState("");

  const methods = useForm({
    defaultValues: {
      type: "expense",
      category: "",
      store: "",
      amount: "",
      date: "",
    },
  });
  const {
    register,
    unregister,
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
  } = methods;

  const handleTabChange = (newType) => {
    setCache((c) => ({ ...c, [type]: getValues() }));
    if (newType === "income") unregister("category");
    const toRestore = cache[newType] || {
      category: "",
      store: "",
      amount: "",
      date: "",
    };
    reset({ type: newType, ...toRestore });
    setType(newType);
    setValue("type", newType);
  };

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(`/api/expenses/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const payload = {
      type: data.type,
      store: data.store,
      amount: Number(data.amount),
      date: data.date,
    };
    if (data.type === "expense") payload.category = data.category;
    try {
      const res = await axios.post("/api/expenses", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions((prev) => [...prev, res.data]);
      toast.success("Transaction added successfully!");
      reset({ type: data.type, category: "", store: "", amount: "", date: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add transaction");
    }
  };

  // Enhanced AI parsing function
  const handleEnhancedParsing = async () => {
    if (!bulkText.trim()) {
      toast.error("Please enter some text to parse.");
      return;
    }

    setIsAIParsing(true);
    setParseError("");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "/api/expenses/parse",
        { text: bulkText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const {
        transactions: saved,
        correctedText: corrected,
        count,
      } = response.data;

      setTransactions((prev) => [...prev, ...saved]);
      setCorrectedText(corrected);
      toast.success(`${count} transactions added successfully!`);
      setBulkText("");
      setParsedPreview([]);
      setOverrideCategories({});
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to parse transactions";
      setParseError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsAIParsing(false);
    }
  };

  // Enhanced preview parsing with better algorithm
  const enhancedPreviewParsing = async (text) => {
    if (!text.trim()) {
      setParsedPreview([]);
      return;
    }

    try {
      // Simple client-side parsing for preview (fallback algorithm)
      const sentences = text
        .split(/[,;]|(?:\s+and\s+)/)
        .map((s) => s.trim())
        .filter(Boolean);
      const parsed = [];

      sentences.forEach((sentence, idx) => {
        const words = sentence.toLowerCase().split(/\s+/);
        const numberMatch = sentence.match(/\d+(?:\.\d+)?/);

        if (numberMatch) {
          const amount = Number.parseFloat(numberMatch[0]);
          let type = "expense";
          let description = "";

          // Better type detection
          if (
            words.some((w) =>
              ["got", "received", "earned", "salary", "income"].includes(w)
            )
          ) {
            type = "income";
            const fromIndex = words.findIndex((w) => w === "from");
            description =
              fromIndex !== -1
                ? words.slice(fromIndex + 1).join(" ")
                : "income";
          } else {
            const onIndex = words.findIndex((w) =>
              ["on", "for", "at"].includes(w)
            );
            description =
              onIndex !== -1
                ? words.slice(onIndex + 1).join(" ")
                : words.slice(-2).join(" ");
          }

          // Category detection
          let category = type === "expense" ? "Others" : "Other Income";
          if (type === "expense") {
            if (words.some((w) => ["food", "groceries", "meal"].includes(w)))
              category = "Food";
            else if (
              words.some((w) => ["transport", "taxi", "bus"].includes(w))
            )
              category = "Transport";
          } else {
            if (words.some((w) => ["salary", "wage", "pay"].includes(w)))
              category = "Salary";
          }

          parsed.push({
            __tempId: `tx_${Date.now()}_${idx}`,
            type,
            amount,
            category,
            store: description || category,
            date: new Date().toISOString(),
          });
        }
      });

      setParsedPreview(parsed);
    } catch (error) {
      console.error("Preview parsing failed:", error);
      setParsedPreview([]);
    }
  };

  const deleteSelected = async () => {
    const token = localStorage.getItem("token");
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`/api/expenses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setTransactions((prev) =>
        prev.filter((tx) => !selectedIds.includes(tx._id))
      );
      setSelectedIds([]);
      toast.success(
        `${selectedIds.length} transaction(s) deleted successfully!`
      );
    } catch (err) {
      toast.error("Failed to delete transactions");
    }
  };

  const toggleSelect = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const filteredTransactions = useMemo(
    () => transactions.filter((tx) => tx.type === type),
    [transactions, type]
  );

  const toggleAll = () =>
    setSelectedIds((prev) =>
      prev.length === filteredTransactions.length
        ? []
        : filteredTransactions.map((tx) => tx._id)
    );

  useEffect(() => {
    if (!autoCategorize || !bulkText.trim()) {
      setParsedPreview([]);
      return;
    }
    const timeout = setTimeout(() => {
      enhancedPreviewParsing(bulkText);
    }, 500);
    return () => clearTimeout(timeout);
  }, [bulkText, autoCategorize]);

  if (userLoading || catLoading)
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <Skeleton className="h-8 sm:h-10 w-[200px] sm:w-[250px] mx-auto rounded-lg" />
        <Skeleton className="h-5 sm:h-6 w-[280px] sm:w-[350px] mx-auto rounded-lg" />
        <Skeleton className="h-10 sm:h-12 w-[240px] sm:w-[300px] mx-auto rounded-lg mt-4 sm:mt-6" />
      </div>
    );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Enhanced Transaction Manager
        </h1>
        <p className="text-muted-foreground">
          AI-powered transaction parsing with custom algorithms
        </p>
      </div>

      <Tabs
        defaultValue="expense"
        value={type}
        onValueChange={handleTabChange}
        className="w-full flex items-center"
      >
        <TabsList className="grid md:w-1/3 sm:w-auto grid-cols-2 mb-4 sm:mb-6">
          <TabsTrigger value="expense" className="cursor-pointer">
            <MoneyRemove
              size="32"
              color="#555555"
              variant="Bulk"
              className="mr-1"
            />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="income" className="cursor-pointer">
            <MoneyAdd
              size="32"
              color="#555555"
              variant="Bulk"
              className="mr-1"
            />
            Income
          </TabsTrigger>
        </TabsList>

        <TabsContent value={type} className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">
                Add New {type === "expense" ? "Expense" : "Income"}
              </CardTitle>
              <CardDescription>
                Fill in the details below to record your{" "}
                {type === "expense" ? "expense" : "income"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <input type="hidden" {...register("type")} />
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {type === "expense" && (
                      <FormField
                        control={control}
                        name="category"
                        rules={{ required: "Category required" }}
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                              <Tag size="32" color="#555555" variant="Bulk" />
                              Category
                            </FormLabel>
                            <FormControl>
                              <AnimatedDropdown
                                value={field.value}
                                onChange={field.onChange}
                                options={categories.map((c) => c.name)}
                                placeholder="Select category"
                                error={!!fieldState.error}
                                showAddNew={true}
                                onAddNew={addCategory}
                                addNewPlaceholder="Add new category"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={control}
                      name="store"
                      rules={{ required: "Description required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                            <DocumentText
                              size="32"
                              color="#555555"
                              variant="Bulk"
                            />
                            Description
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                type === "expense"
                                  ? "e.g., Grocery shopping"
                                  : "e.g., Salary payment"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="amount"
                      rules={{ required: "Amount required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                            <Wallet size="32" color="#555555" variant="Bulk" />
                            Amount (Rs.)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              placeholder="0.00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="date"
                      rules={{ required: "Date required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                            <Calendar
                              size="32"
                              color="#555555"
                              variant="Bulk"
                            />
                            Date
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-center pt-2 sm:pt-4">
                    <Button
                      type="submit"
                      className={`px-4 sm:px-8 cursor-pointer ${
                        type === "expense"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      <Add
                        size="32"
                        color="#fff"
                        variant="Bulk"
                        className="mr-2"
                      />
                      Add {type === "expense" ? "Expense" : "Income"}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoCircle size="24" color="#555555" variant="Bulk" />
                Bulk Add from Text
              </CardTitle>
              <CardDescription>
                Describe your transactions naturally. Examples:
                <br />
                <Badge variant="outline" className="mt-1 mr-2">
                  "I spent 5000 on food and got 25000 salary from ABC company"
                </Badge>
                <br />
                <Badge variant="outline" className="mt-1 mr-2">
                  "Paid 1500 for groceries, received 3000 from freelance work"
                </Badge>
              </CardDescription>
              <div className="flex items-center space-x-2 mt-2">
                <label className="text-sm font-medium">Smart Preview:</label>
                <button
                  onClick={() => setAutoCategorize((prev) => !prev)}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    autoCategorize
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {autoCategorize ? "On" : "Off"}
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                rows={4}
                className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., I spent 5000 on food and got 25000 salary from ABC company yesterday"
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
              />

              {parseError && (
                <Alert variant="destructive">
                  <AlertDescription>{parseError}</AlertDescription>
                </Alert>
              )}

              {correctedText && (
                <Alert>
                  <InfoCircle size="16" />
                  <AlertDescription>
                    <strong>Interpretation:</strong> {correctedText}
                  </AlertDescription>
                </Alert>
              )}

              {autoCategorize && parsedPreview.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2 border-b">
                    <h4 className="font-medium text-sm">
                      Smart Preview ({parsedPreview.length} transactions
                      detected)
                    </h4>
                  </div>
                  <div className="overflow-x-auto max-h-60 overflow-y-auto">
                    <table className="min-w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-muted/30 text-left">
                          <th className="px-3 py-2">#</th>
                          <th className="px-3 py-2">Type</th>
                          <th className="px-3 py-2">Amount</th>
                          <th className="px-3 py-2">Category</th>
                          <th className="px-3 py-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedPreview.map((item, idx) => {
                          const ov = overrideCategories[item.__tempId] || {};
                          return (
                            <tr
                              key={item.__tempId}
                              className="border-b hover:bg-muted/10"
                            >
                              <td className="px-3 py-2">{idx + 1}</td>
                              <td className="px-3 py-2">
                                <Badge
                                  variant={
                                    item.type === "expense"
                                      ? "destructive"
                                      : "default"
                                  }
                                  className="text-xs"
                                >
                                  {item.type}
                                </Badge>
                              </td>
                              <td className="px-3 py-2 font-medium">
                                Rs. {item.amount.toLocaleString()}
                              </td>
                              <td className="px-3 py-2">
                                <AnimatedDropdown
                                  value={ov.category ?? item.category}
                                  onChange={(newCat) =>
                                    setOverrideCategories((prev) => ({
                                      ...prev,
                                      [item.__tempId]: {
                                        ...prev[item.__tempId],
                                        category: newCat,
                                      },
                                    }))
                                  }
                                  options={categories.map((c) => c.name)}
                                  placeholder="Select"
                                  showAddNew={true}
                                  onAddNew={addCategory}
                                  addNewPlaceholder="Add category"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={ov.store ?? item.store}
                                  onChange={(e) =>
                                    setOverrideCategories((prev) => ({
                                      ...prev,
                                      [item.__tempId]: {
                                        ...prev[item.__tempId],
                                        store: e.target.value,
                                      },
                                    }))
                                  }
                                  className="text-xs w-full min-w-[120px]"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleEnhancedParsing}
                  disabled={isAIParsing || !bulkText.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer flex-1"
                >
                  {isAIParsing ? (
                    <Refresh size="16" className="mr-2 animate-spin" />
                  ) : (
                    <Add size="16" className="mr-2" />
                  )}
                  {isAIParsing ? "Processing..." : "Parse & Add"}
                </Button>

                {autoCategorize && parsedPreview.length > 0 && (
                  <Button
                    onClick={async () => {
                      const finalTxns = parsedPreview.map((item) => {
                        const ov = overrideCategories[item.__tempId] || {};
                        return {
                          type: item.type,
                          amount: item.amount,
                          category: ov.category ?? item.category,
                          store: ov.store ?? item.store,
                          date: item.date,
                        };
                      });
                      const token = localStorage.getItem("token");
                      try {
                        const { data: saved } = await axios.post(
                          "/api/expenses/bulk",
                          { transactions: finalTxns },
                          { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setTransactions((prev) => [...prev, ...saved]);
                        toast.success(`${saved.length} transactions added!`);
                        setBulkText("");
                        setParsedPreview([]);
                        setOverrideCategories({});
                      } catch (err) {
                        toast.error(
                          err.response?.data?.message ||
                            "Failed to save transactions"
                        );
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  >
                    Save Preview ({parsedPreview.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === filteredTransactions.length &&
                        filteredTransactions.length > 0
                      }
                      onChange={toggleAll}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-xs sm:text-sm font-medium">
                      Select All ({selectedIds.length} selected)
                    </span>
                  </div>
                </div>
                <Button
                  onClick={deleteSelected}
                  disabled={!selectedIds.length}
                  variant="destructive"
                  className="bg-red-600 cursor-pointer hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  <Trash
                    size="32"
                    color="#fff"
                    variant="Bulk"
                    className="mr-2"
                  />
                  Delete Selected ({selectedIds.length})
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-wrap items-center space-x-2 sm:space-x-4"
                      >
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-full" />
                        {type === "expense" && (
                          <Skeleton className="h-5 sm:h-6 w-20 sm:w-24 rounded" />
                        )}
                        <Skeleton className="h-5 sm:h-6 w-32 sm:w-40 rounded" />
                        <Skeleton className="h-5 sm:h-6 w-20 sm:w-24 rounded" />
                        <Skeleton className="h-5 sm:h-6 w-28 sm:w-32 rounded" />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 text-left">
                        <th className="h-10 sm:h-12 px-3 sm:px-4 w-[40px]">
                          <input
                            type="checkbox"
                            checked={
                              selectedIds.length ===
                                filteredTransactions.length &&
                              filteredTransactions.length > 0
                            }
                            onChange={toggleAll}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                          />
                        </th>
                        <th className="h-10 sm:h-12 px-3 sm:px-4 w-[80px]">
                          Type
                        </th>
                        {type === "expense" && (
                          <th className="h-10 sm:h-12 px-3 sm:px-4">
                            Category
                          </th>
                        )}
                        <th className="h-10 sm:h-12 px-3 sm:px-4">
                          Description
                        </th>
                        <th className="h-10 sm:h-12 px-3 sm:px-4">Amount</th>
                        <th className="h-10 sm:h-12 px-3 sm:px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((tx) => (
                          <tr
                            key={tx._id}
                            className={`group border-b hover:bg-muted/10 ${
                              selectedIds.includes(tx._id) ? "bg-muted/20" : ""
                            }`}
                          >
                            <td className="p-3 sm:p-4">
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(tx._id)}
                                onChange={() => toggleSelect(tx._id)}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                              />
                            </td>
                            <td className="p-3 sm:p-4 capitalize">
                              <Badge
                                variant={
                                  tx.type === "expense"
                                    ? "destructive"
                                    : "default"
                                }
                                className="text-xs"
                              >
                                {tx.type}
                              </Badge>
                            </td>
                            {type === "expense" && (
                              <td className="p-3 sm:p-4">
                                <span className="font-medium text-xs sm:text-sm">
                                  {tx.category || (
                                    <span className="text-muted-foreground italic">
                                      None
                                    </span>
                                  )}
                                </span>
                              </td>
                            )}
                            <td className="p-3 sm:p-4">
                              <div className="font-medium text-xs sm:text-sm truncate max-w-[100px] sm:max-w-xs">
                                {tx.store}
                              </div>
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="font-semibold text-xs sm:text-sm">
                                <span
                                  className={
                                    tx.type === "expense"
                                      ? "text-red-600"
                                      : "text-green-600"
                                  }
                                >
                                  {tx.type === "expense" ? "-" : "+"} Rs.{" "}
                                  {tx.amount.toLocaleString()}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 sm:p-4 text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
                              {new Date(tx.date).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={type === "expense" ? 6 : 5}
                            className="p-8 sm:p-12 text-center"
                          >
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                <svg
                                  className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </div>
                              <h3 className="text-base sm:text-lg font-medium mb-1">
                                No {type} transactions found
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                Start by adding your first {type} transaction
                                above.
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
