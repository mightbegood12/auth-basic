import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewNote } from "../queries/api.js";
import SyncLoader from "react-spinners/SyncLoader";
import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { NotesLink } from "./NotesLink";

const SortableNote = ({ id, title, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    width: "100%",
    boxSizing: "border-box",
    zIndex: 999,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <NotesLink id={id} title={title} content={content} />
    </div>
  );
};

// 👇 Drag overlay preview
const DragPreview = ({ title, content }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "8px",
        background: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        width: "250px",
        fontSize: "14px",
        pointerEvents: "none", // prevents it from interfering
      }}
    >
      {/* drag and drop container */}
      <div style={{ fontWeight: "bold", marginBottom: "6px" }}>{title}</div>
      <div style={{ color: "#666" }}>{content?.slice(0, 50) ?? ""}</div>
    </div>
  );
};

const NotesSideBar = ({ fetchNotesQuery }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (fetchNotesQuery.data?.notes) {
      setItems(fetchNotesQuery.data.notes);
    }
  }, [fetchNotesQuery.data?.notes]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const mutation = useMutation({
    mutationFn: createNewNote,
    onSuccess: async (data) => {
      toast.success("Note created successfully!");
      navigate(`/notes/${data.note_id}`);
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleCreatingNote = async () => {
    try {
      mutation.mutate("Title");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.note_id === active.id);
    const newIndex = items.findIndex((item) => item.note_id === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);

    // Optional: persist new order here
  };

  return (
    <div className="recent-notes">
      <div className="heading">
        Recent Notes
        <img
          src="/new_item.png"
          alt="new note"
          onClick={handleCreatingNote}
          className="create-Btn"
        />
      </div>

      {fetchNotesQuery.isPending ? (
        <SyncLoader color="#ffc90f" />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.note_id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((note) => (
              <SortableNote
                key={note.note_id}
                id={note.note_id}
                title={note.note_title}
                content={note.note_content?.slice(0, 80) ?? ""}
              />
            ))}
          </SortableContext>

          {/* 👇 Dragging preview */}
          <DragOverlay>
            {activeId ? (
              <DragPreview
                title={
                  items.find((n) => n.note_id === activeId)?.note_title ?? ""
                }
                content={
                  items.find((n) => n.note_id === activeId)?.note_content ?? ""
                }
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {fetchNotesQuery.error && <div>Oops! Something went wrong!</div>}
    </div>
  );
};

export default NotesSideBar;
