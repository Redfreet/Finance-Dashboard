import Record from "../models/record.model.js";

// /api/dashboard/summary
export const getDashboardSummary = async (req, res) => {
  try {
    const totals = await Record.aggregate([
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpenses = 0;

    totals.forEach((item) => {
      if (item._id === "income") totalIncome = item.totalAmount;
      if (item._id === "expense") totalExpenses = item.totalAmount;
    });

    const netBalance = totalIncome - totalExpenses;

    // Category-wise
    const categoryTotals = await Record.aggregate([
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          type: "$_id.type",
          totalAmount: 1,
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);

    const recentActivity = await Record.find()
      .sort({ date: -1 })
      .limit(5)
      .populate("createdBy", "name");

    // Monthly Trends
    const monthlyTrends = await Record.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalIncome,
          totalExpenses,
          netBalance,
        },
        categoryTotals,
        recentActivity,
        monthlyTrends,
      },
    });
  } catch (error) {
    console.error("Error in getDashboardSummary:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
