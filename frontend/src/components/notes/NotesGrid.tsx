import { Plus, Search } from "lucide-react";
import type { NotesGridProps } from "../../types/note.types";

const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  onEdit,
  onDelete,
  searchQuery,
  onCreateNote,
}) => {
  // Filter notes based on search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredNotes.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          {searchQuery ? "No notes found" : "No notes yet"}
        </h3>
        <p className="text-gray-500 mb-6">
          {searchQuery
            ? `No notes match "${searchQuery}". Try a different search term.`
            : "Create your first note to get started!"}
        </p>
        {!searchQuery && (
          <button
            onClick={onCreateNote}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Note</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesGrid;
