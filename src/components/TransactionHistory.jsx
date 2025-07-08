import React, { useEffect, useState } from "react";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    setTransactions(data);
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-brandBlue">Transaction History</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center">No transactions found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-700 font-semibold">
                <th className="py-2">#</th>
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
                <th className="py-2">Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={tx.id} className="border-b text-gray-600">
                  <td className="py-2">{i + 1}</td>
                  <td className="py-2">{tx.type}</td>
                  <td className="py-2">🪙 {tx.amount}</td>
                  <td className="py-2">{tx.date}</td>
                  <td className="py-2 text-xs text-gray-400">{tx.paymentId || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
