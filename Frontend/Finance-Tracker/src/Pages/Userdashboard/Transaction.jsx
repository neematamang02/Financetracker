// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { useForm, FormProvider } from "react-hook-form";
// import { toast } from "sonner";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import Useuser from "@/hooks/use-user";
// import { useCategories } from "@/hooks/use-categories";
// import AnimatedDropdown from "@/components/AnimatedDropdown";
// import {
//   Add,
//   Calendar,
//   DocumentText,
//   MoneyAdd,
//   MoneyRemove,
//   Tag,
//   Trash,
//   Wallet,
// } from "iconsax-reactjs";

// export default function Transaction() {
//   // Custom hooks for user and categories
//   const { user, loading: userLoading } = Useuser();
//   const { categories, loading: catLoading, addCategory } = useCategories();

//   // State management
//   const [transactions, setTransactions] = useState([]);
//   const [bulkText, setBulkText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [type, setType] = useState("expense");
//   const [cache, setCache] = useState({ expense: {}, income: {} });

//   // Form setup with react-hook-form
//   const methods = useForm({
//     defaultValues: {
//       type: "expense",
//       category: "",
//       store: "",
//       amount: "",
//       date: "",
//     },
//   });
//   const {
//     register,
//     unregister,
//     control,
//     handleSubmit,
//     setValue,
//     reset,
//     getValues,
//   } = methods;

//   // Handle tab switching and form state preservation
//   const handleTabChange = (newType) => {
//     // Cache current form values for the old tab
//     setCache((c) => ({ ...c, [type]: getValues() }));

//     // If switching to income, remove category field registration
//     if (newType === "income") {
//       unregister("category");
//     }

//     // Determine values to restore for the new tab
//     const toRestore = cache[newType] || {
//       category: "",
//       store: "",
//       amount: "",
//       date: "",
//     };

//     // Reset form values, ensuring type field is updated
//     reset({ type: newType, ...toRestore });
//     setType(newType);
//     setValue("type", newType);
//   };

//   // Fetch transactions when user is available
//   useEffect(() => {
//     if (!user) return;
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     axios
//       .get(`/api/expenses/user/${user._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setTransactions(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [user]);

//   // Submit new transaction
//   const onSubmit = async (data) => {
//     const token = localStorage.getItem("token");
//     const payload = {
//       type: data.type,
//       store: data.store,
//       amount: Number(data.amount),
//       date: data.date,
//     };
//     // Only include category for expenses
//     if (data.type === "expense") payload.category = data.category;

//     try {
//       const res = await axios.post("/api/expenses", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTransactions((prev) => [...prev, res.data]);
//       toast.success("Transaction added successfully!");
//       reset({ type: data.type, category: "", store: "", amount: "", date: "" });
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Failed to add transaction");
//     }
//   };

//   const handleAutoAdd = async () => {
//     if (!bulkText.trim()) {
//       toast.error("Please enter some text to parse.");
//       return;
//     }
//     const token = localStorage.getItem("token");
//     try {
//       const { data: saved } = await axios.post(
//         "/api/expenses/parse",
//         { text: bulkText },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setTransactions((prev) => [...prev, ...saved]);
//       toast.success(`${saved.length} transactions added!`);
//       setBulkText("");
//     } catch {
//       toast.error("Bulk-add failed.");
//     }
//   };

//   // Delete selected transactions
//   const deleteSelected = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       await Promise.all(
//         selectedIds.map((id) =>
//           axios.delete(`/api/expenses/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         )
//       );
//       setTransactions((prev) =>
//         prev.filter((tx) => !selectedIds.includes(tx._id))
//       );
//       setSelectedIds([]);
//       toast.success(
//         `${selectedIds.length} transaction(s) deleted successfully!`
//       );
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete transactions");
//     }
//   };

//   // Toggle individual transaction selection
//   const toggleSelect = (id) =>
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );

//   // Filter transactions based on current type
//   const filteredTransactions = useMemo(() => {
//     return transactions.filter((tx) => tx.type === type);
//   }, [transactions, type]);

//   // Toggle selection of all filtered transactions
//   const toggleAll = () => {
//     setSelectedIds((prev) => {
//       if (prev.length === filteredTransactions.length) {
//         return [];
//       } else {
//         return filteredTransactions.map((tx) => tx._id);
//       }
//     });
//   };

//   // Loading state
//   if (userLoading || catLoading)
//     return (
//       <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
//         <Skeleton className="h-8 sm:h-10 w-[200px] sm:w-[250px] mx-auto rounded-lg" />
//         <Skeleton className="h-5 sm:h-6 w-[280px] sm:w-[350px] mx-auto rounded-lg" />
//         <Skeleton className="h-10 sm:h-12 w-[240px] sm:w-[300px] mx-auto rounded-lg mt-4 sm:mt-6" />
//         <Card>
//           <CardHeader>
//             <Skeleton className="h-7 sm:h-8 w-[180px] sm:w-[200px] rounded-lg" />
//             <Skeleton className="h-4 w-[250px] sm:w-[300px] rounded-lg" />
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//               {Array(4)
//                 .fill(0)
//                 .map((_, i) => (
//                   <div key={i} className="space-y-2">
//                     <Skeleton className="h-5 w-[100px] rounded-lg" />
//                     <Skeleton className="h-10 w-full rounded-lg" />
//                   </div>
//                 ))}
//             </div>
//             <div className="flex justify-center mt-4 sm:mt-6">
//               <Skeleton className="h-9 sm:h-10 w-[150px] sm:w-[180px] rounded-lg" />
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
//               <Skeleton className="h-6 w-[150px] rounded-lg" />
//               <Skeleton className="h-9 sm:h-10 w-[150px] rounded-lg" />
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-0">
//             <Skeleton className="h-[300px] sm:h-[400px] w-full rounded-lg" />
//           </CardContent>
//         </Card>
//       </div>
//     );

//   return (
//     <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
//       <div className="text-center space-y-2">
//         <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
//           Transaction Manager
//         </h1>
//         <p className="text-muted-foreground">
//           Track your expenses and income with ease
//         </p>
//       </div>

//       <Tabs
//         defaultValue="expense"
//         value={type}
//         onValueChange={handleTabChange}
//         className="w-full flex items-center"
//       >
//         <TabsList className="grid md:w-1/3 sm:w-auto grid-cols-2 mb-4 sm:mb-6">
//           <TabsTrigger value="expense" className="cursor-pointer">
//             <MoneyRemove
//               size="32"
//               color="#555555"
//               variant="Bulk"
//               className="mr-1"
//             />
//             Expenses
//           </TabsTrigger>
//           <TabsTrigger value="income" className="cursor-pointer">
//             <MoneyAdd
//               size="32"
//               color="#555555"
//               variant="Bulk"
//               className="mr-1"
//             />
//             Income
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value={type} className="space-y-4 sm:space-y-6">
//           {/* Transaction form */}
//           <Card>
//             <CardHeader className="p-4 sm:p-6">
//               <CardTitle className="text-xl sm:text-2xl">
//                 Add New {type === "expense" ? "Expense" : "Income"}
//               </CardTitle>
//               <CardDescription>
//                 Fill in the details below to record your{" "}
//                 {type === "expense" ? "expense" : "income"}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
//               {/* Hidden type field for form */}
//               <input type="hidden" {...register("type")} />

//               <FormProvider {...methods}>
//                 <form
//                   onSubmit={handleSubmit(onSubmit)}
//                   className="space-y-4 sm:space-y-6"
//                 >
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                     {type === "expense" && (
//                       <FormField
//                         control={control}
//                         name="category"
//                         rules={{ required: "Category required" }}
//                         render={({ field, fieldState }) => (
//                           <FormItem>
//                             <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
//                               <Tag size="32" color="#555555" variant="Bulk" />
//                               Category
//                             </FormLabel>
//                             <FormControl>
//                               <AnimatedDropdown
//                                 value={field.value}
//                                 onChange={field.onChange}
//                                 options={categories.map((c) => c.name)}
//                                 placeholder="Select category"
//                                 error={!!fieldState.error}
//                                 showAddNew={true}
//                                 onAddNew={addCategory}
//                                 addNewPlaceholder="Add new category"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     )}

//                     <FormField
//                       control={control}
//                       name="store"
//                       rules={{ required: "Description required" }}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
//                             <DocumentText
//                               size="32"
//                               color="#555555"
//                               variant="Bulk"
//                             />
//                             Description
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder={
//                                 type === "expense"
//                                   ? "e.g., Grocery shopping"
//                                   : "e.g., Salary payment"
//                               }
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={control}
//                       name="amount"
//                       rules={{ required: "Amount required" }}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
//                             <Wallet size="32" color="#555555" variant="Bulk" />
//                             Amount (Rs.)
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               {...field}
//                               placeholder="0.00"
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={control}
//                       name="date"
//                       rules={{ required: "Date required" }}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
//                             <Calendar
//                               size="32"
//                               color="#555555"
//                               variant="Bulk"
//                             />
//                             Date
//                           </FormLabel>
//                           <FormControl>
//                             <Input type="date" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <div className="flex justify-center pt-2 sm:pt-4">
//                     <Button
//                       type="submit"
//                       className={`px-4 sm:px-8 cursor-pointer ${
//                         type === "expense"
//                           ? "bg-red-600 hover:bg-red-700"
//                           : "bg-green-600 hover:bg-green-700"
//                       }`}
//                     >
//                       <Add
//                         size="32"
//                         color="#fff"
//                         variant="Bulk"
//                         className="mr-2"
//                       />
//                       Add {type === "expense" ? "Expense" : "Income"}
//                     </Button>
//                   </div>
//                 </form>
//               </FormProvider>
//             </CardContent>
//           </Card>

//           {/* bulk‐text parser card */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Bulk Add from Text</CardTitle>
//               <CardDescription>
//                 Describe your transactions one per line, e.g.:
//                 <br />
//                 “2000 on groceries” or “5000 from salary”
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <textarea
//                 rows={4}
//                 className="w-full p-3 border rounded"
//                 placeholder="e.g. 1500 on food and 4000 from salary"
//                 value={bulkText}
//                 onChange={(e) => setBulkText(e.target.value)}
//               />
//               <Button onClick={handleAutoAdd} className="cursor-pointer">
//                 <Add size="32" color="#fff" variant="Bulk" className="mr-2" />{" "}
//                 Auto-Add Transactions
//               </Button>
//             </CardContent>
//           </Card>
//           {/* Actions Section */}
//           <Card>
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
//                 <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={
//                         selectedIds.length === filteredTransactions.length &&
//                         filteredTransactions.length > 0
//                       }
//                       onChange={toggleAll}
//                       className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
//                     />
//                     <span className="text-xs sm:text-sm font-medium">
//                       Select All ({selectedIds.length} selected)
//                     </span>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={deleteSelected}
//                   disabled={!selectedIds.length}
//                   variant="destructive"
//                   className="bg-red-600 cursor-pointer hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
//                 >
//                   <Trash
//                     size="32"
//                     color="#fff"
//                     variant="Bulk"
//                     className="mr-2"
//                   />
//                   Delete Selected ({selectedIds.length})
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Transactions table */}
//           <Card className="overflow-hidden">
//             <CardContent className="p-0">
//               {loading ? (
//                 <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   {Array(5)
//                     .fill(0)
//                     .map((_, i) => (
//                       <div
//                         key={i}
//                         className="flex flex-wrap items-center space-x-2 sm:space-x-4"
//                       >
//                         <Skeleton className="h-4 w-4 rounded" />
//                         <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-full" />
//                         {type === "expense" && (
//                           <Skeleton className="h-5 sm:h-6 w-20 sm:w-24 rounded" />
//                         )}
//                         <Skeleton className="h-5 sm:h-6 w-32 sm:w-40 rounded" />
//                         <Skeleton className="h-5 sm:h-6 w-20 sm:w-24 rounded" />
//                         <Skeleton className="h-5 sm:h-6 w-28 sm:w-32 rounded" />
//                       </div>
//                     ))}
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b bg-muted/50">
//                         <th className="h-10 sm:h-12 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground w-[40px]">
//                           <input
//                             type="checkbox"
//                             checked={
//                               selectedIds.length ===
//                                 filteredTransactions.length &&
//                               filteredTransactions.length > 0
//                             }
//                             onChange={toggleAll}
//                             className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
//                           />
//                         </th>
//                         <th className="h-10 sm:h-12 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">
//                           <span className="hidden sm:inline">Type</span>
//                           <span className="sm:hidden">Type</span>
//                         </th>
//                         {type === "expense" && (
//                           <th className="h-10 sm:h-12 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground">
//                             <span className="hidden sm:inline">Category</span>
//                             <span className="sm:hidden">Cat.</span>
//                           </th>
//                         )}
//                         <th className="h-10 sm:h-12 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground">
//                           <span className="hidden sm:inline">Description</span>
//                           <span className="sm:hidden">Desc.</span>
//                         </th>
//                         <th className="h-10 sm:h-12 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground">
//                           <span className="hidden sm:inline">Amount</span>
//                           <span className="sm:hidden">Amt.</span>
//                         </th>
//                         <th className="h-10 sm:h-12 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground">
//                           <span className="hidden sm:inline">Date</span>
//                           <span className="sm:hidden">Date</span>
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredTransactions.length > 0 ? (
//                         filteredTransactions.map((tx) => (
//                           <tr
//                             key={tx._id}
//                             className={`group border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${
//                               selectedIds.includes(tx._id) ? "bg-muted" : ""
//                             }`}
//                           >
//                             <td className="p-3 sm:p-4 align-middle">
//                               <input
//                                 type="checkbox"
//                                 checked={selectedIds.includes(tx._id)}
//                                 onChange={() => toggleSelect(tx._id)}
//                                 className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
//                               />
//                             </td>
//                             <td className="p-3 sm:p-4 align-middle">
//                               <span
//                                 className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                                   tx.type === "expense"
//                                     ? "bg-red-100 text-red-800"
//                                     : "bg-green-100 text-green-800"
//                                 }`}
//                               >
//                                 {tx.type}
//                               </span>
//                             </td>
//                             {type === "expense" && (
//                               <td className="p-3 sm:p-4 align-middle">
//                                 <span className="font-medium text-xs sm:text-sm">
//                                   {tx.category || (
//                                     <span className="text-muted-foreground italic">
//                                       None
//                                     </span>
//                                   )}
//                                 </span>
//                               </td>
//                             )}
//                             <td className="p-3 sm:p-4 align-middle">
//                               <div className="font-medium text-xs sm:text-sm truncate max-w-[100px] sm:max-w-xs">
//                                 {tx.store}
//                               </div>
//                             </td>
//                             <td className="p-3 sm:p-4 align-middle">
//                               <div className="font-semibold text-xs sm:text-sm">
//                                 <span
//                                   className={
//                                     tx.type === "expense"
//                                       ? "text-red-600"
//                                       : "text-green-600"
//                                   }
//                                 >
//                                   {tx.type === "expense" ? "-" : "+"}Rs.{" "}
//                                   {tx.amount.toLocaleString()}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="p-3 sm:p-4 align-middle text-muted-foreground text-xs sm:text-sm">
//                               {new Date(tx.date).toLocaleDateString("en-IN", {
//                                 year: "numeric",
//                                 month: "short",
//                                 day: "numeric",
//                               })}
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td
//                             colSpan={type === "expense" ? 6 : 5}
//                             className="p-8 sm:p-12 text-center"
//                           >
//                             <div className="flex flex-col items-center justify-center">
//                               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mb-3 sm:mb-4">
//                                 <svg
//                                   className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                                   />
//                                 </svg>
//                               </div>
//                               <h3 className="text-base sm:text-lg font-medium mb-1">
//                                 No {type} transactions found
//                               </h3>
//                               <p className="text-muted-foreground text-sm">
//                                 Start by adding your first {type} transaction
//                                 above.
//                               </p>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
// File: src/components/Transaction.jsx

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
} from "iconsax-reactjs";

// IMPORTANT: use a relative path so it actually finds the util file
import { parseAndCategorizeText } from "../../utils/parseTransactions";

export default function Transaction() {
  // Custom hooks for user and categories
  const { user, loading: userLoading } = Useuser();
  const { categories, loading: catLoading, addCategory } = useCategories();

  // Existing state
  const [transactions, setTransactions] = useState([]);
  const [bulkText, setBulkText] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [type, setType] = useState("expense");
  const [cache, setCache] = useState({ expense: {}, income: {} });

  // New state for auto-categorization
  const [autoCategorize, setAutoCategorize] = useState(false);
  const [parsedPreview, setParsedPreview] = useState([]);
  const [overrideCategories, setOverrideCategories] = useState({});

  // Form setup with react-hook-form
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

  // Handle tab switching and form state preservation
  const handleTabChange = (newType) => {
    // Cache current form values for the old tab
    setCache((c) => ({ ...c, [type]: getValues() }));

    // If switching to income, remove category field registration
    if (newType === "income") {
      unregister("category");
    }

    // Determine values to restore for the new tab
    const toRestore = cache[newType] || {
      category: "",
      store: "",
      amount: "",
      date: "",
    };

    // Reset form values, ensuring type field is updated
    reset({ type: newType, ...toRestore });
    setType(newType);
    setValue("type", newType);
  };

  // Fetch transactions when user is available
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

  // Submit new single‐transaction
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const payload = {
      type: data.type,
      store: data.store,
      amount: Number(data.amount),
      date: data.date,
    };
    // Only include category for expenses
    if (data.type === "expense") payload.category = data.category;

    try {
      const res = await axios.post("/api/expenses", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions((prev) => [...prev, res.data]);
      toast.success("Transaction added successfully!");
      reset({ type: data.type, category: "", store: "", amount: "", date: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add transaction");
    }
  };

  // Handle raw‐text bulk-add (server‐side parse)
  const handleAutoAdd = async () => {
    if (!bulkText.trim()) {
      toast.error("Please enter some text to parse.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const { data: saved } = await axios.post(
        "/api/expenses/parse",
        { text: bulkText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions((prev) => [...prev, ...saved]);
      toast.success(`${saved.length} transactions added!`);
      setBulkText("");
    } catch {
      toast.error("Bulk-add failed.");
    }
  };

  // Delete selected transactions
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
      console.error(err);
      toast.error("Failed to delete transactions");
    }
  };

  // Toggle individual transaction selection
  const toggleSelect = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  // Filter transactions based on current type
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => tx.type === type);
  }, [transactions, type]);

  // Toggle selection of all filtered transactions
  const toggleAll = () => {
    setSelectedIds((prev) => {
      if (prev.length === filteredTransactions.length) {
        return [];
      } else {
        return filteredTransactions.map((tx) => tx._id);
      }
    });
  };

  // ────────────────────────────────────────────────────────────────────────────
  // NEW: Effect to run client-side parsing whenever bulkText changes AND
  //      autoCategorize === true
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!autoCategorize) {
      setParsedPreview([]);
      return;
    }
    if (!bulkText.trim()) {
      setParsedPreview([]);
      return;
    }

    const timeout = setTimeout(() => {
      // Run the updated parser (which splits on "and")
      let parsed = parseAndCategorizeText(bulkText);

      // Attach a small temporary ID to each record so React can key them
      parsed = parsed.map((tx, idx) => ({
        __tempId: `tx_${Date.now()}_${idx}`,
        ...tx,
      }));

      setParsedPreview(parsed);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout);
  }, [bulkText, autoCategorize]);
  // ────────────────────────────────────────────────────────────────────────────

  // Show loading skeleton until user & categories load
  if (userLoading || catLoading)
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <Skeleton className="h-8 sm:h-10 w-[200px] sm:w-[250px] mx-auto rounded-lg" />
        <Skeleton className="h-5 sm:h-6 w-[280px] sm:w-[350px] mx-auto rounded-lg" />
        <Skeleton className="h-10 sm:h-12 w-[240px] sm:w-[300px] mx-auto rounded-lg mt-4 sm:mt-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-7 sm:h-8 w-[180px] sm:w-[200px] rounded-lg" />
            <Skeleton className="h-4 w-[250px] sm:w-[300px] rounded-lg" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-[100px] rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 sm:mt-6">
              <Skeleton className="h-9 sm:h-10 w-[150px] sm:w-[180px] rounded-lg" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <Skeleton className="h-6 w-[150px] rounded-lg" />
              <Skeleton className="h-9 sm:h-10 w-[150px] rounded-lg" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-0">
            <Skeleton className="h-[300px] sm:h-[400px] w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Transaction Manager
        </h1>
        <p className="text-muted-foreground">
          Track your expenses and income with ease
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
          {/* ───────────── Single‐Transaction Form ───────────── */}
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
              {/* Hidden type field for form */}
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

          {/* ───────────── BULK-ADD SECTION (UPDATED) ───────────── */}
          <Card>
            <CardHeader>
              <CardTitle>Bulk Add from Text</CardTitle>
              <CardDescription>
                Describe your transactions one per line, e.g.:
                <br />
                “2000 on groceries” or “4000 on clothes”
              </CardDescription>
              {/* ← NEW: Auto-Categorize toggle */}
              <div className="flex items-center space-x-2 mt-2">
                <label className="text-sm font-medium">Auto-Categorize:</label>
                <button
                  onClick={() => setAutoCategorize((prev) => !prev)}
                  className={`px-3 py-1 rounded ${
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
                className="w-full p-3 border rounded"
                placeholder="e.g. 1500 on food and 4000 on clothes"
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
              />

              {autoCategorize ? (
                <>
                  {/* If we've parsed anything, show the preview table */}
                  {parsedPreview.length > 0 ? (
                    <div className="overflow-x-auto max-h-60 overflow-y-auto border rounded">
                      <table className="min-w-full text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-muted/50 text-left">
                            <th className="px-2 py-1">#</th>
                            <th className="px-2 py-1">Type</th>
                            <th className="px-2 py-1">Amount</th>
                            <th className="px-2 py-1">Category</th>
                            <th className="px-2 py-1">Store</th>
                            <th className="px-2 py-1">Date</th>
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
                                <td className="px-2 py-1">{idx + 1}</td>
                                <td className="px-2 py-1 capitalize">
                                  {item.type}
                                </td>
                                <td className="px-2 py-1">
                                  Rs. {item.amount.toLocaleString()}
                                </td>
                                <td className="px-2 py-1">
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
                                <td className="px-2 py-1">
                                  <Input
                                    value={ov.store ?? item.store}
                                    onChange={(e) => {
                                      const newStore = e.target.value;
                                      setOverrideCategories((prev) => ({
                                        ...prev,
                                        [item.__tempId]: {
                                          ...prev[item.__tempId],
                                          store: newStore,
                                        },
                                      }));
                                    }}
                                    className="text-xs w-full"
                                  />
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap">
                                  {new Date(item.date).toLocaleDateString(
                                    "en-IN",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No parsed transactions yet. Start typing above.
                    </p>
                  )}

                  {/* Final “Save Parsed Transactions” button */}
                  <Button
                    onClick={async () => {
                      // Merge overrides + original parse
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
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        setTransactions((prev) => [...prev, ...saved]);
                        toast.success(`${saved.length} transactions added!`);
                        setBulkText("");
                        setParsedPreview([]);
                        setOverrideCategories({});
                      } catch (err) {
                        console.error(err);
                        toast.error(
                          err.response?.data?.message ||
                            "Failed to save transactions"
                        );
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
                    disabled={parsedPreview.length === 0}
                  >
                    Save Parsed Transactions
                  </Button>
                </>
              ) : (
                <>
                  {/* FALLBACK: original Auto-Add button */}
                  <Button onClick={handleAutoAdd} className="cursor-pointer">
                    <Add
                      size="32"
                      color="#fff"
                      variant="Bulk"
                      className="mr-2"
                    />
                    Auto-Add Transactions
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* ───────────── Actions Section ───────────── */}
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

          {/* ───────────── Transactions Table ───────────── */}
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
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  tx.type === "expense"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {tx.type}
                              </span>
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
