import { RequestHandler } from "express";
import { WeeklyScheduleItem } from "@shared/api";
import { weeklySchedule } from "./data/petData";

// In a real app, these would interact with a database
let mutableSchedule = { ...weeklySchedule };

// GET /api/calendar/schedule/:day - Get schedule for specific day
export const handleGetDaySchedule: RequestHandler = (req, res) => {
  try {
    const { day } = req.params;
    const daySchedule = mutableSchedule[day] || [];
    res.json({ day, schedule: daySchedule });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch day schedule",
      status: 500,
    });
  }
};

// POST /api/calendar/schedule/:day - Add new item to day
export const handleAddScheduleItem: RequestHandler = (req, res) => {
  try {
    const { day } = req.params;
    const newItem: WeeklyScheduleItem = req.body;

    if (!mutableSchedule[day]) {
      mutableSchedule[day] = [];
    }

    // Generate unique ID
    newItem.id = `schedule-${day.toLowerCase()}-${Date.now()}`;
    
    mutableSchedule[day].push(newItem);

    res.status(201).json({
      message: "Schedule item added successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to add schedule item",
      status: 500,
    });
  }
};

// PUT /api/calendar/schedule/:day/:itemId - Update existing item
export const handleUpdateScheduleItem: RequestHandler = (req, res) => {
  try {
    const { day, itemId } = req.params;
    const updatedItem: WeeklyScheduleItem = req.body;

    if (!mutableSchedule[day]) {
      return res.status(404).json({
        error: "Not Found",
        message: "Day not found",
        status: 404,
      });
    }

    const itemIndex = mutableSchedule[day].findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: "Schedule item not found",
        status: 404,
      });
    }

    // Update the item while preserving the ID
    mutableSchedule[day][itemIndex] = { ...updatedItem, id: itemId };

    res.json({
      message: "Schedule item updated successfully",
      item: mutableSchedule[day][itemIndex],
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to update schedule item",
      status: 500,
    });
  }
};

// DELETE /api/calendar/schedule/:day/:itemId - Delete item
export const handleDeleteScheduleItem: RequestHandler = (req, res) => {
  try {
    const { day, itemId } = req.params;

    if (!mutableSchedule[day]) {
      return res.status(404).json({
        error: "Not Found",
        message: "Day not found",
        status: 404,
      });
    }

    const itemIndex = mutableSchedule[day].findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: "Schedule item not found",
        status: 404,
      });
    }

    // Remove the item
    const deletedItem = mutableSchedule[day].splice(itemIndex, 1)[0];

    res.json({
      message: "Schedule item deleted successfully",
      item: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to delete schedule item",
      status: 500,
    });
  }
};

// POST /api/calendar/schedule/move - Move item between days
export const handleMoveScheduleItem: RequestHandler = (req, res) => {
  try {
    const { fromDay, toDay, itemId } = req.body;

    if (!mutableSchedule[fromDay] || !mutableSchedule[toDay]) {
      return res.status(404).json({
        error: "Not Found",
        message: "Source or destination day not found",
        status: 404,
      });
    }

    const itemIndex = mutableSchedule[fromDay].findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: "Schedule item not found",
        status: 404,
      });
    }

    // Move the item
    const [movedItem] = mutableSchedule[fromDay].splice(itemIndex, 1);
    mutableSchedule[toDay].push(movedItem);

    res.json({
      message: "Schedule item moved successfully",
      item: movedItem,
      fromDay,
      toDay,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to move schedule item",
      status: 500,
    });
  }
};

// GET /api/calendar/schedule/reset - Reset to original data
export const handleResetSchedule: RequestHandler = (req, res) => {
  try {
    mutableSchedule = { ...weeklySchedule };
    res.json({
      message: "Schedule reset to original data",
      schedule: mutableSchedule,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to reset schedule",
      status: 500,
    });
  }
};
