import React from "react";
import { dollor } from "../../assets/logo";

const Transaction = () => {
  return (
    <div className="transactioncontents p-5">
      <header className="font-bold text-4xl">Transactions</header>
      <div className="grid grid-cols-2 *:bg-white mt-5 rounded-xl overflow-hidden">
        <div className="totalamount p-7">
          <h1 className="font-bold text-3xl mb-2">Total Budget</h1>
          <p className="text-2xl">Rs.10000</p>
        </div>

        <div className="moneyicon p-5 flex justify-end">
          <img src={dollor} alt="dolloricond" />
        </div>
      </div>

      <div className="transactionadd bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mt-5">
        <div className="space-y-6">
          <form action="#">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="type"
                  className="w-full p-3 border border-gray-200 rounded-xl transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Income">Income</option>
                  <option value="Saving">Saving</option>
                  <option value="Expense">Expense</option>
                  <option value="Use Saving">Use Saving</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  className="w-full p-3 border border-gray-200 rounded-xl transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div id="expense-type-div" className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Expense Type
                </label>
                <input
                  type="text"
                  id="expense-type"
                  placeholder="Enter expense type"
                  className="w-full p-3 border border-gray-200 rounded-xl transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-3 border border-gray-200 rounded-xl transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
            <button
              id="add-transaction-btn"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mt-5"
            >
              Add Transaction
            </button>
            <div className="ai-description mt-2">
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write about your daily transaction..."
              ></textarea>
            </div>
          </form>
        </div>
      </div>

      {/* transaction budget table */}
      <div class="overflow-x-auto mt-5">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
                Category
              </th>
              <th class="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
                Expense Type
              </th>
              <th class="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
                Amount
              </th>
              <th class="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
                Date
              </th>
              <th class="bg-gray-800 text-white px-6 py-3 text-center text-lg font-semibold">
                Delete
              </th>
            </tr>
          </thead>
          <tbody id="transactions-table-body"></tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
