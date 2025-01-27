import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa"; // Icono para editar
import { Note } from "../entities/notes";
import { notesService } from "../services/notes";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number, title: string) => void;
  onToggleArchive: (noteId: number, newIsArchived: boolean) => void;
  onUpdateNote: (note:any)=>void
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onToggleArchive, onUpdateNote }) => {
  const [isArchived, setIsArchived] = useState(note.is_archived);
  const [isEditing, setIsEditing] = useState(false); // Estado para determinar si está en modo edición
  const [title, setTitle] = useState(note.title); // Estado para el título
  const [content, setContent] = useState(note.content); // Estado para el contenido
  const token = localStorage.getItem("token");

  const handleArchiveToggle = async () => {
    if (!token) {
      console.error("Token not found!");
      return;
    }

    try {
      await notesService.update(note.id, token, !isArchived); 
      setIsArchived(!isArchived);
      onToggleArchive(note.id, !isArchived); 
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Cambia al estado de edición
  };

  const handleSaveEdit = async () => {
    if (!token) {
      console.error("Token not found!");
      return;
    }
  
    try {
      const updatedNote = await notesService.edit(note.id, token, title, content);
      if (updatedNote) {
        setIsEditing(false); // Deja de estar en modo edición después de guardar
        // Aquí llamamos a handleUpdateNote para actualizar el estado en Home
        onUpdateNote(updatedNote); // Esta es la función que pasamos desde Home
        window.location.reload()
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  

  return (
    <div
      key={note.id}
      className="p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 h-96 flex flex-col justify-between"
    >
      <div>
        {note.categories && note.categories.length > 0 && (
          <div className="flex gap-2 mb-4">
            {note.categories.map((category) => (
              <span
                key={category.id}
                className="bg-teal-700 text-white px-3 py-1 rounded-full text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {isEditing ? (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`text-2xl font-semibold text-teal-700 mb-4 w-full ${isEditing ? 'border-2 border-teal-500' : ''} overflow-x-auto`}  // Permite el desplazamiento horizontal
              style={{ wordWrap: 'break-word' }} 
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`text-gray-700 w-full mb-4 ${isEditing ? 'border-2 border-teal-500' : ''}`}  // Color de borde condicional
            />
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">{note.title}</h3>
            <div className="note-content overflow-y-auto max-h-48 mb-4">
              <p className="text-gray-700">{note.content}</p>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${isArchived ? "bg-gray-400" : "bg-teal-600"} text-white`}
          >
            {isArchived ? "Archived" : "Active"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
            onClick={handleArchiveToggle}
          >
            <FaExchangeAlt className="text-teal-700" size={20} />
          </button>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 transition duration-300"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 transition duration-300"
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition duration-300"
                  onClick={handleEditToggle}
                >
                  <FaPen className="mr-2" />
                  Edit
                </button>

                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition duration-300"
                  onClick={() => onDelete(note.id, note.title)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
