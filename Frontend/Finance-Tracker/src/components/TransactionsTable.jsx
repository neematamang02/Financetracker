import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  ArrowDown2,
  ArrowUp2,
  Calendar,
  Filter,
  Grid9,
  SearchNormal,
  Tag,
  Trash,
  Wallet1,
} from "iconsax-reactjs";

const TransactionsTable = ({
  transactions = [],
  totalBudget = 0,
  onDeleteTransaction = () => {},
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all"); // "all", "expense", "income"
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Filter transactions based on search term and type filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(transaction.amount).includes(searchTerm);

    if (typeFilter === "all") return matchesSearch;
    return matchesSearch && transaction.type.toLowerCase() === typeFilter;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortConfig.key === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
    }

    if (sortConfig.key === "amount") {
      return sortConfig.direction === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    }

    // For category and type
    const valueA = a[sortConfig.key]?.toLowerCase() || "";
    const valueB = b[sortConfig.key]?.toLowerCase() || "";
    return sortConfig.direction === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleDelete = (id) => {
    if (showConfirmDelete === id) {
      onDeleteTransaction(id);
      setShowConfirmDelete(null);
    } else {
      setShowConfirmDelete(id);
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp2 size="20" variant="Bulk" className="ml-2" />
    ) : (
      <ArrowDown2 size="20" variant="Bulk" className="ml-2" />
    );
  };

  if (isLoading) {
    return <TransactionsTableSkeleton />;
  }

  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Wallet1 variant="bulk" size="32" className="text-blue-600" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <SearchNormal
                variant="bulk"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 w-full sm:w-[200px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter variant="bulk" className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={typeFilter === "all"}
                  onCheckedChange={() => setTypeFilter("all")}
                >
                  All Transactions
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={typeFilter === "expense"}
                  onCheckedChange={() => setTypeFilter("expense")}
                >
                  Expenses Only
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={typeFilter === "income"}
                  onCheckedChange={() => setTypeFilter("income")}
                >
                  Income Only
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  className="bg-gray-700 text-white px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-colors"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center">
                    <Tag variant="bulk" className="h-4 w-4 mr-2" />
                    Category
                    {getSortIcon("category")}
                  </div>
                </th>
                <th
                  className="bg-slate-800 text-white px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-colors"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center">
                    <Grid9 variant="bulk" className="h-4 w-4 mr-2" />
                    Type
                    {getSortIcon("type")}
                  </div>
                </th>
                <th
                  className="bg-slate-800 text-white px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-colors"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center">
                    <Wallet1 variant="bulk" className="h-4 w-4 mr-2" />
                    Amount
                    {getSortIcon("amount")}
                  </div>
                </th>
                <th
                  className="bg-slate-800 text-white px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-colors"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    <Calendar variant="bulk" className="h-4 w-4 mr-2" />
                    Date
                    {getSortIcon("date")}
                  </div>
                </th>
                <th className="bg-slate-800 text-white px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                  <div className="flex items-center">
                    <Activity variant="bulk" className="h-4 w-4 mr-2" />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction, index) => (
                  <tr
                    key={transaction._id || index}
                    className={`
                      border-b hover:bg-slate-50 transition-colors
                      ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    `}
                  >
                    {typeFilter !== "income" &&
                      transaction.type !== "income" && (
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="font-medium">
                            {transaction.category || "Uncategorized"}
                          </Badge>
                        </td>
                      )}
                    {(typeFilter === "income" ||
                      transaction.type === "income") &&
                      transaction.type === "income" && (
                        <td
                          className="px-6 py-4"
                          colSpan={typeFilter === "income" ? 1 : 1}
                        >
                          <Badge className="font-medium bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                            Income
                          </Badge>
                        </td>
                      )}
                    <td className="px-6 py-4">
                      <Badge
                        className={`font-medium ${
                          transaction.type === "expense"
                            ? "bg-red-100 text-red-800 hover:bg-red-200 border-red-200"
                            : "bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
                        }`}
                      >
                        {transaction.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${
                          transaction.type === "expense"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {transaction.type === "expense" ? "-" : "+"}$
                        {transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(transaction.date).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(transaction._id || index)}
                        className={`text-red-500 hover:text-red-700 hover:bg-red-50 ${
                          showConfirmDelete === (transaction._id || index)
                            ? "bg-red-50"
                            : ""
                        }`}
                      >
                        {showConfirmDelete === (transaction._id || index) ? (
                          "Confirm Delete"
                        ) : (
                          <Trash variant="bulk" className="h-4 w-4" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={typeFilter === "income" ? 4 : 5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Wallet1
                        variant="bulk"
                        className="h-12 w-12 text-gray-300 mb-3"
                      />
                      <p className="text-lg font-medium text-gray-600 mb-1">
                        No transactions found
                      </p>
                      <p className="text-sm text-gray-500">
                        {searchTerm
                          ? `No results match "${searchTerm}"`
                          : "Add some transactions to see them here"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-t">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-2">
          <p className="text-sm text-gray-600">
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            transactions
          </p>
          <div className="flex items-center gap-2">
            <Wallet1 variant="bulk" className="h-5 w-5 text-green-600" />
            <p className="text-lg font-semibold text-gray-800">
              Total Budget:{" "}
              <span className="text-green-600">${totalBudget.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Skeleton component for loading state
const TransactionsTableSkeleton = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Skeleton className="h-9 w-[200px]" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-slate-800 text-white px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  <div className="flex items-center">
                    <Tag variant="bulk" className="h-4 w-4 mr-2" />
                    Category
                  </div>
                </th>
                <th className="bg-slate-800 text-white px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  <div className="flex items-center">
                    <Grid9 variant="bulk" className="h-4 w-4 mr-2" />
                    Type
                  </div>
                </th>
                <th className="bg-slate-800 text-white px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  <div className="flex items-center">
                    <Wallet1 variant="bulk" className="h-4 w-4 mr-2" />
                    Amount
                  </div>
                </th>
                <th className="bg-slate-800 text-white px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  <div className="flex items-center">
                    <Calendar variant="bulk" className="h-4 w-4 mr-2" />
                    Date
                  </div>
                </th>
                <th className="bg-slate-800 text-white px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-20" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-32" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-8 w-8 mx-auto rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-t">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-7 w-40" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransactionsTable;
