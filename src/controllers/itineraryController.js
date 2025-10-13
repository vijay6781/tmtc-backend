import Itinerary from "../models/Itinerary.js";
// import client from "../config/redis.js";

// Create itinerary
export const createItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all itineraries for logged-in user
export const getItineraries = async (req, res) => {
  try {
    console.log("Fetching from DB 🚀");

    const {
      destination,
      startDate,
      endDate,
      page = 1,
      limit = 10,
      sort = "createdAt:desc",
    } = req.query;

    const query = { userId: req.user._id };

    // Filtering
    if (destination) query.destination = { $regex: destination, $options: "i" };
    if (startDate && endDate) {
      query.startDate = { $gte: new Date(startDate) };
      query.endDate = { $lte: new Date(endDate) };
    }

    // Sorting: dynamic asc/desc using ?sort=field:order
    const [sortField, sortOrder] = sort.split(":"); // e.g., "startDate:asc"
    const sortOption = { [sortField]: sortOrder === "desc" ? -1 : 1 };

    // Pagination
    const pageNumber = Math.max(parseInt(page, 10), 1);
    const pageSize = Math.max(parseInt(limit, 10), 1);
    const skip = (pageNumber - 1) * pageSize;

    // Fetch total and paginated results in parallel for performance
    const [total, itineraries] = await Promise.all([
      Itinerary.countDocuments(query),
      Itinerary.find(query).sort(sortOption).skip(skip).limit(pageSize),
    ]);

    res.json({
      page: pageNumber,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      data: itineraries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single itinerary
export const getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!itinerary)
      return res.status(404).json({ message: "Itinerary not found" });
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update itinerary
export const updateItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!itinerary)
      return res.status(404).json({ message: "Itinerary not found" });
    await client.del(`itineraries:${req.user._id}`);
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete itinerary
export const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!itinerary)
      return res.status(404).json({ message: "Itinerary not found" });
    await client.del(`itineraries:${req.user._id}`);
    res.json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
