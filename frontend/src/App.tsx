import React, {
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { ToastContainer } from "react-toastify";
import ErrorAlert from "./components/common/ErrorAlert";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Header from "./components/layout/Header";
import NoteEditor from "./components/notes/NoteEditor";
import NotesGrid from "./components/notes/NotesGrid";
import { useApi } from "./hooks/useApi";
import type { ApiResponse, PaginatedResponse } from "./types/api.types";
import type { Note } from "./types/note.types";
import { TOAST_CONFIG } from "./utils/constants";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [optimisticNotes] = useOptimistic(
    notes,
    (state: Note[], newNote: Note) => [...state, newNote]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [startTransition] = useTransition();
  const { request, error, setError } = useApi();

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async (): Promise<void> => {
    try {
      const result = await request<ApiResponse<PaginatedResponse<Note>>>(
        "/notes"
      );
      setNotes(result.data.items);
    } catch (err) {
      console.error("Failed to load notes:", err);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleCreateNote = (): void => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note: Note): void => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = async (savedNote: Note): Promise<void> => {
    startTransition(() => {
      if (editingNote) {
        // Update existing note
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === savedNote._id ? savedNote : note
          )
        );
      } else {
        // Add new note
        setNotes((prevNotes) => [savedNote, ...prevNotes]);
      }
      setShowEditor(false);
      setEditingNote(null);
    });
  };

  const handleDeleteNote = async (noteId: string): Promise<void> => {
    try {
      await request(`/notes/${noteId}`, { method: "DELETE" });
      startTransition(() => {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
      });
    } catch (err) {
      console.error("Failed to delete note:", err);
      throw err; // Re-throw for NoteCard to handle
    }
  };

  const handleCancelEdit = (): void => {
    setShowEditor(false);
    setEditingNote(null);
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorAlert error={error} onClose={() => setError(null)} />

      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateNote={handleCreateNote}
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* Editor */}
        {showEditor && (
          <div className="mb-8">
            <NoteEditor
              note={editingNote}
              onSave={handleSaveNote}
              onCancel={handleCancelEdit}
              isNew={!editingNote}
            />
          </div>
        )}

        {/* Notes Grid */}
        <NotesGrid
          notes={optimisticNotes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          searchQuery={searchQuery}
          onCreateNote={handleCreateNote}
        />

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm pb-8">
          <p>Notes App - Built with React 19 & TypeScript & Tailwind CSS v4</p>
        </footer>
      </div>

      <ToastContainer {...TOAST_CONFIG} />
    </div>
  );
};

export default App;
