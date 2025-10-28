const { getAiReview } = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const review = await getAiReview(code);

    res.status(200).json({ review });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Failed to get AI review" });
  }
};
