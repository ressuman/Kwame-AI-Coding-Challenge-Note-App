import { Calendar, Clock, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import type { NoteCardProps } from "../../types/note.types";
import { formatDate } from "../../utils/dateFormatter";
import LoadingSpinner from "../common/LoadingSpinner";

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setIsDeleting(true);
      try {
        await onDelete(note._id);
        toast.success("Note deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete note");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-lg truncate pr-2">
          {note.title}
        </h3>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit note"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
            title="Delete note"
          >
            {isDeleting ? (
              <LoadingSpinner size="small" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="text-gray-600 text-sm mb-4 line-clamp-3">
        {note.body || <span className="italic text-gray-400">No content</span>}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>Created {formatDate(note.createdAt)}</span>
          </div>
          {note.updatedAt !== note.createdAt && (
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>Updated {formatDate(note.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
