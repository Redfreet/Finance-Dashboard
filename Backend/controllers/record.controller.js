import Record from "../models/record.model.js";

// /api/records
export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({
        message: "Amount, type, and category are required",
        success: false,
      });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date: date || Date.now(),
      notes,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Record created successfully",
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Error in createRecord:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// /api/records
export const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let query = {};

    if (type) query.type = type;
    if (category) query.category = category;

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await Record.find(query)
      .sort({ date: -1 })
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error("Error in getRecords:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// /api/records/:id
export const getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).populate(
      "createdBy",
      "name",
    );

    if (!record) {
      return res
        .status(404)
        .json({ message: "Record not found", success: false });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error("Error in getRecordById:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// /api/records/:id
export const updateRecord = async (req, res) => {
  try {
    let record = await Record.findById(req.params.id);

    if (!record) {
      return res
        .status(404)
        .json({ message: "Record not found", success: false });
    }

    record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Record updated successfully",
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Error in updateRecord:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// /api/records/:id
export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res
        .status(404)
        .json({ message: "Record not found", success: false });
    }

    await record.deleteOne();

    res.status(200).json({
      message: "Record deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in deleteRecord:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
