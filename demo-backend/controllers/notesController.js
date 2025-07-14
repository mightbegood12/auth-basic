import pool from "../config/postgresConfig.js";

const createNewAndUpdateNote = async (req, res) => {
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
        return res.status(201).json({
          success: true,
          message: "Note created successfully",
          note_id,
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
    "SELECT note_id, note_title, note_content FROM notes_data WHERE user_id = $1 ORDER BY created_at DESC ",
    [user_id]
  );
  const note_list = queryResult.rows;
  return res.status(200).json({ success: true, notes: note_list });
};

const deleteNoteById = async (req, res) => {
  const user_id = req.user.user_id;
  const note_id = req.query.id;
  const queryResult = await pool.query(
    "DELETE FROM notes_data WHERE note_id = $1 AND user_id = $2",
    [note_id, user_id]
  );
  if (queryResult.rowCount > 0) {
    return res
      .status(200)
      .json({ success: true, message: "Note Deleted Successfully!" });
  }
  return res.json({ success: false, message: "Unsuccessful Note Deletion!" });
};

const fetchNoteById = async (req, res) => {
  const user_id = req.user.user_id;
  const note_id = req.query.id;
  const queryResult = await pool.query(
    "SELECT note_title, note_content, created_at, updated_at FROM notes_data WHERE user_id = $1 AND note_id = $2",
    [user_id, note_id]
  );
  // console.log(queryResult);
  // console.log(user_id, note_id);
  if (queryResult.rowCount > 0) {
    return res.status(200).json({
      success: true,
      message: "Note fetched Successfully",
      note: queryResult.rows[0],
    });
  }
  return res.status(400).json({
    success: false,
    message: "Unsuccessfull attempt at fetching note!",
  });
};

export { createNewAndUpdateNote, fetchNotes, fetchNoteById, deleteNoteById };
