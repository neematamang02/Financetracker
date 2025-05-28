import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { jsPDF } from "jspdf";

export default function Reports() {
  // State
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Decode token once
  const token = localStorage.getItem("token");
  let username = "";
  try {
    const payload = jwtDecode(token);
    username = payload.name || "";
  } catch {
    username = "";
  }

  // Show / fetch
  const handleShow = async () => {
    if (!from || !to) {
      return alert("Please select both From and To dates.");
    }
    setLoading(true);
    try {
      const { id: userId } = jwtDecode(token);
      const res = await axios.get(
        `/api/expenses/filter?user_id=${userId}&startDate=${from}&endDate=${to}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEntries(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  // Download PDF
  const handleDownload = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 40;
    const contentWidth = pageWidth - 2 * margin;
    let y = margin;

    // Title with username
    pdf.setFontSize(18);
    pdf.setTextColor("#000000");
    pdf.text(`Financial Report for ${username}`, margin, y);
    y += 20;

    // Date Range
    pdf.setFontSize(12);
    pdf.text(`From: ${from} To: ${to}`, margin, y);
    y += 30;

    // Summary Section (mimicking the grid layout)
    pdf.setFontSize(12);
    const cardWidth = contentWidth / 3 - 10; // 3 cards with gaps
    const cardHeight = 60;

    // Total Income
    pdf.setFillColor("#ffffff");
    pdf.rect(margin, y, cardWidth, cardHeight, "F");
    pdf.setTextColor("#000000");
    pdf.text("Total Income", margin + 5, y + 15);
    pdf.setTextColor("#008000");
    pdf.setFontSize(16);
    pdf.text(`Rs. ${totalIncome.toLocaleString()}`, margin + 5, y + 40);

    // Total Expenses
    pdf.setFillColor("#ffffff");
    pdf.rect(margin + cardWidth + 10, y, cardWidth, cardHeight, "F");
    pdf.setTextColor("#000000");
    pdf.setFontSize(12);
    pdf.text("Total Expenses", margin + cardWidth + 15, y + 15);
    pdf.setTextColor("#ff0000");
    pdf.setFontSize(16);
    pdf.text(
      `Rs. ${totalExpenses.toLocaleString()}`,
      margin + cardWidth + 15,
      y + 40
    );

    // Savings
    pdf.setFillColor("#ffffff");
    pdf.rect(margin + 2 * (cardWidth + 10), y, cardWidth, cardHeight, "F");
    pdf.setTextColor("#000000");
    pdf.setFontSize(12);
    pdf.text("Savings", margin + 2 * (cardWidth + 15), y + 15);
    pdf.setTextColor(savings >= 0 ? "#0000ff" : "#ff0000");
    pdf.setFontSize(16);
    pdf.text(
      `Rs. ${savings.toLocaleString()}`,
      margin + 2 * (cardWidth + 15),
      y + 40
    );

    y += cardHeight + 20;

    // Table Headers
    pdf.setFontSize(12);
    pdf.setFillColor("#f3f4f6"); // bg-gray-100 equivalent
    pdf.rect(margin, y, contentWidth, 20, "F");
    pdf.setTextColor("#374151"); // text-gray-700 equivalent
    const headers = ["Type", "Category", "Description", "Amount", "Date"];
    headers.forEach((header, index) => {
      pdf.text(header, margin + 5 + index * 100, y + 15);
    });
    y += 20;

    // Table Rows
    pdf.setFontSize(10);
    entries.forEach((entry) => {
      pdf.setTextColor("#000000");
      pdf.text(
        entry.type.charAt(0).toUpperCase() + entry.type.slice(1),
        margin + 5,
        y + 10
      );
      pdf.text(entry.category || "—", margin + 105, y + 10);
      pdf.text(entry.store, margin + 205, y + 10);
      pdf.setTextColor(entry.type === "expense" ? "#ff0000" : "#008000");
      pdf.text(
        `${
          entry.type === "expense" ? "-" : "+"
        } Rs. ${entry.amount.toLocaleString()}`,
        margin + 305,
        y + 10
      );
      pdf.setTextColor("#000000");
      pdf.text(
        new Date(entry.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        margin + 405,
        y + 10
      );
      y += 20;

      // Check for page overflow
      if (y > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        y = margin;
      }
    });

    pdf.save(`report_${from}_${to}.pdf`);
  };

  // Compute totals
  const totalExpenses = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const savings = totalIncome - totalExpenses;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      {username && (
        <p className="text-lg">
          Hello, <span className="font-semibold">{username}</span>!
        </p>
      )}

      {/* Date pickers + Show button */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 px-3 py-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 px-3 py-2 border rounded w-full"
          />
        </div>
        <button
          onClick={handleShow}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading…" : "Show Report"}
        </button>
        {entries.length > 0 && (
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download PDF
          </button>
        )}
      </div>

      {/* Report content */}
      <div
        id="report-pane"
        className="space-y-6 p-6 rounded shadow"
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className="p-4 rounded shadow"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h2 className="text-sm font-medium" style={{ color: "#000000" }}>
              Total Income
            </h2>
            <p className="mt-2 text-2xl font-bold" style={{ color: "#008000" }}>
              Rs. {totalIncome.toLocaleString()}
            </p>
          </div>
          <div
            className="p-4 rounded shadow"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h2 className="text-sm font-medium" style={{ color: "#000000" }}>
              Total Expenses
            </h2>
            <p className="mt-2 text-2xl font-bold" style={{ color: "#ff0000" }}>
              Rs. {totalExpenses.toLocaleString()}
            </p>
          </div>
          <div
            className="p-4 rounded shadow"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h2 className="text-sm font-medium" style={{ color: "#000000" }}>
              Savings
            </h2>
            <p
              className="mt-2 text-2xl font-bold"
              style={{
                color: savings >= 0 ? "#0000ff" : "#ff0000",
              }}
            >
              Rs. {savings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Table */}
        <div
          className="overflow-x-auto rounded shadow"
          style={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                {["Type", "Category", "Description", "Amount", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                      style={{ color: "#000000" }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e._id} className="border-t">
                  <td className="px-4 py-2 text-sm capitalize">{e.type}</td>
                  <td className="px-4 py-2 text-sm">{e.category || "—"}</td>
                  <td className="px-4 py-2 text-sm">{e.store}</td>
                  <td
                    className={`px-4 py-2 text-sm font-medium`}
                    style={{
                      color: e.type === "expense" ? "#ff0000" : "#008000",
                    }}
                  >
                    {e.type === "expense" ? "-" : "+"} Rs.{" "}
                    {e.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(e.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No data for selected date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
