export interface Note {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteRequest {
  title: string;
  body: string;
}

export interface UpdateNoteRequest {
  title?: string;
  body?: string;
}

export interface NoteEditorProps {
  note?: Note | null;
  onSave: (note: Note) => void;
  onCancel: () => void;
  isNew?: boolean;
}

export interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => Promise<void>;
}

export interface NotesGridProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => Promise<void>;
  searchQuery: string;
  onCreateNote: () => void;
}
