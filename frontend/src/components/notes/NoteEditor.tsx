import { AlertCircle, Save, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/useApi";
import type { ApiResponse } from "../../types/api.types";
import type {
  CreateNoteRequest,
  NoteEditorProps,
  UpdateNoteRequest,
} from "../../types/note.types";
import { LIMITS } from "../../utils/constants";
import LoadingSpinner from "../common/LoadingSpinner";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  onSave,
  onCancel,
  isNew = false,
}) => {
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [isPending, startTransition] = useTransition();
  const { request, error, setError } = useApi();

  // Auto-save functionality with debounce for existing notes
  useEffect(() => {
    if (!isNew && note?._id && (title !== note.title || body !== note.body)) {
      const timeoutId = setTimeout(() => {
        if (title.trim() && (title !== note.title || body !== note.body)) {
          handleAutoSave();
        }
      }, LIMITS.AUTO_SAVE_DELAY);

      return () => clearTimeout(timeoutId);
    }
  }, [title, body, note, isNew]);

  const handleAutoSave = async (): Promise<void> => {
    if (!title.trim() || !note?._id) return;

    setIsSaving(true);
    setSaveStatus("saving");

    try {
      const updateData: UpdateNoteRequest = {
        title: title.trim(),
        body: body.trim(),
      };

      await request<ApiResponse<any>>(`/notes/${note._id}`, {
        method: "PATCH",
        body: JSON.stringify(updateData),
      });

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      console.log(err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!title.trim()) {
      setError("Title is required");
      toast.error("Title is required");
      return;
    }

    setIsSaving(true);
    startTransition(async () => {
      try {
        if (isNew) {
          const createData: CreateNoteRequest = {
            title: title.trim(),
            body: body.trim(),
          };

          const result = await request<ApiResponse<any>>("/notes", {
            method: "POST",
            body: JSON.stringify(createData),
          });

          onSave(result.data);
          toast.success("Note created successfully");
        } else {
          const updateData: UpdateNoteRequest = {
            title: title.trim(),
            body: body.trim(),
          };

          const result = await request<ApiResponse<any>>(
            `/notes/${note?._id}`,
            {
              method: "PATCH",
              body: JSON.stringify(updateData),
            }
          );

          onSave(result.data);
          toast.success("Note updated successfully");
        }
      } catch (err) {
        console.log(err);
        // Error handled by useApi hook
      } finally {
        setIsSaving(false);
      }
    });
  };

  const getSaveStatusIcon = (): React.ReactNode => {
    switch (saveStatus) {
      case "saving":
        return <LoadingSpinner size="small" />;
      case "saved":
        return <Save className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getSaveStatusText = (): string => {
    switch (saveStatus) {
      case "saved":
        return "Changes saved";
      case "saving":
        return "Saving...";
      case "error":
        return "Save failed";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {isNew ? "Create New Note" : "Edit Note"}
        </h2>
        <div className="flex items-center space-x-2">
          {!isNew && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {getSaveStatusIcon()}
              <span>{getSaveStatusText()}</span>
            </div>
          )}
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="noteTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            id="noteTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            maxLength={LIMITS.TITLE_MAX_LENGTH}
          />
          <div className="text-xs text-gray-500 mt-1">
            {title.length}/{LIMITS.TITLE_MAX_LENGTH} characters
          </div>
        </div>

        <div>
          <label
            htmlFor="noteContent"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="noteContent"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your note here..."
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            maxLength={LIMITS.BODY_MAX_LENGTH}
          />
          <div className="text-xs text-gray-500 mt-1">
            {body.length}/{LIMITS.BODY_MAX_LENGTH} characters
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || isSaving || isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {(isSaving || isPending) && <LoadingSpinner size="small" />}
            <span>{isNew ? "Create Note" : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
