import pool from "../config/postgresConfig.js";

const createNewNote = async (req, res) => {
  try {
    const { note_id, note_content, note_title } = req.body;
    const user_id = req.user.user_id;

    const isMatch = await pool.query(
      "SELECT * FROM notes_data WHERE user_id = $1 and note_id = $2",
      [user_id, note_id]
    );

    if (isMatch.rowCount > 0) {
      const updateResult = await pool.query(
        "UPDATE notes_data SET note_content = $1, note_title = $2 WHERE user_id = $3 AND note_id = $4",
        [note_content, note_title, user_id, note_id]
      );

      if (updateResult.rowCount > 0) {
        return res.status(200).json({
          success: true,
          message: "Note updated successfully",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Failed to update note",
        });
      }
    } else {
      // Create new note
      const queryResult = await pool.query(
        "INSERT INTO notes_data (user_id, note_id, note_content, note_title) VALUES ($1,$2,$3,$4)",
        [user_id, note_id, note_content, note_title]
      );

      if (queryResult.rowCount > 0) {
        return res.status(200).json({
          success: true,
          message: "Note created successfully",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Failed to create note",
        });
      }
    }
  } catch (err) {
    console.error("Error in createNewNote:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const fetchNotes = async (req, res) => {
  const user_id = req.user.user_id;
  const queryResult = await pool.query(
    "SELECT * FROM notes_data WHERE user_id = $1",
    [user_id]
  );
  const note_list = queryResult.rows;
  return res.status(200).json({ success: true, notes: note_list });
};

export { createNewNote, fetchNotes };
