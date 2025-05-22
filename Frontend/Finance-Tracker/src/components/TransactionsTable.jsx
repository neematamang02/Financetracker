import React from "react";

const TransactionsTable = ({ transactions, totalBudget }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 mt-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Recent Transactions
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
                Category
              </th>
              <th className="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
                Expense Type
              </th>
              <th className="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
                Amount
              </th>
              <th className="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
                Date
              </th>
              <th className="bg-gray-800 text-white px-6 py-3 text-center text-lg font-semibold">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-6 py-3">{transaction.category}</td>
                  <td className="px-6 py-3">{transaction.type}</td>
                  <td className="px-6 py-3">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-3 text-center text-gray-500">
                  No recent transactions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-green-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-center text-gray-800">
          Total Budget: ${totalBudget.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default TransactionsTable;
