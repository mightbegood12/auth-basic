import pool from "../config/postgresConfig.js";

const createNewNote = async (req, res) => {
  try {
    const { note_id, note_content, note_title } = req.body;
    const isMatch = await pool.query(
      "SELECT * FROM notes_data WHERE user_id = $1",
      [req.user.user_id]
    );
    if (isMatch.rowCount > 0) {
      //update the existing field
    } else {
      // creating a new field
      const queryResult = await pool.query(
        "INSERT INTO notes_data (user_id, note_id, note_content, note_title) VALUES ($1,$2,$3,$4)",
        [user_id, note_id, note_content, note_title]
      );
      if (queryResult.rowCount > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Note saved successfully" });
      } else {
        return res.status(400).json({
          success: false,
          message: "Something went wrong while saving note",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export { createNewNote };
