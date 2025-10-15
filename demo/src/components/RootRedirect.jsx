import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../queries/api"; // 👈 make sure you have this API
import { Navigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

function RootRedirect() {
  const { data, isPending, error } = useQuery({
    queryKey: ["allNotes"],
    queryFn: fetchNotes,
  });

  if (isPending) {
    return (
      <div className="loading-container">
        <SyncLoader color="#ffc90f" />
      </div>
    );
  }

  if (error || !data?.notes?.length) {
    // fallback if no notes found
    return <Navigate to="/notes/placeholder" replace />;
  }

  // find most recently updated note
  const latestNote = [...data.notes].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  )[0];

  return <Navigate to={`/notes/${latestNote.note_id}`} replace />;
}

export default RootRedirect;
