import React, { useEffect, useState } from "react";
import { notesService } from "../services/notes";
import { Note } from "../entities/notes";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import ActionBar from "../components/actionbar";
import Categories from "../components/categories";
import NoteCard from "../components/notecard";
import DeleteModal from "../components/deletemodal";
import FilterNotes from "../components/filternotes";

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all");
  const navigate = useNavigate();
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteContent, setNewNoteContent] = useState<string>('');

  const token = localStorage.getItem("token");

  // Validación del token y redirección
  if (!token) {
    window.location.reload(); // Redirige y recarga la página
    navigate("/")
    return null;
  }

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? { ...note, title: updatedNote.title, content: updatedNote.content } : note
      )
    );
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await notesService.getById(token);
        if (response) {
          setNotes(response.data);
        }
      } catch (err) {
        console.error("Error al obtener las notas:", err);
      }
    };

    fetchNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };
  

  const handleDelete = (id: number) => {
    setNoteToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (noteToDelete === null) return;

    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await notesService.deleteById(noteToDelete, token);

        if (response.success) {
          setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteToDelete));
          setShowModal(false);
          setNoteToDelete(null);
        } else {
          console.error("Error al eliminar la nota:", response.message);
          setShowModal(false);
        }
      }
    } catch (err) {
      console.error("Error al eliminar la nota:", err);
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setNoteToDelete(null);
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
  };

  const handleFilterChange = (filterType: "all" | "active" | "archived") => {
    setFilter(filterType);
  };

  const handleToggleArchive = async (noteId: number, newIsArchived: boolean) => {
    try {
      const updatedNote = await notesService.update(noteId, token!, newIsArchived);
      if (updatedNote) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === noteId ? { ...note, is_archived: newIsArchived } : note
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar el estado de archivado:", error);
    }
  };

  const filteredNotes = notes
    .filter((note) => {
      if (filter === "active") return !note.is_archived;
      if (filter === "archived") return note.is_archived;
      return true;
    })
    .filter((note) =>
      selectedCategory ? note.categories.some((cat) => cat.name === selectedCategory) : true
    );

  const handleCreateNote = async () => {
    if (!newNoteTitle || !newNoteContent) {
      alert("Title and content are required");
      return;
    }

    try {
      const response = await notesService.create(token!,newNoteTitle,newNoteContent);
      if (response.success) {
        setNotes([response.data, ...notes]);
        setNewNoteTitle('');
        setNewNoteContent('');
        window.location.reload()
      } else {
        console.error("Error al crear la nota:", response.message);
      }
    } catch (err) {
      console.error("Error al crear la nota:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onLogout={handleLogout} />
      <main className="flex-1 p-6">
        <ActionBar />
        
        {/* Formulario de creación de nota */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create a New Note</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Content"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded h-32"
            />
            <button
              onClick={handleCreateNote}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Create Note
            </button>
          </div>
        </div>

        {/* Categorías y filtros */}
        <Categories
          categories={notes.length > 0 ? notes[0].categories : []}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <FilterNotes filter={filter} onFilterChange={handleFilterChange} />

        {/* Lista de notas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onToggleArchive={handleToggleArchive}
                onUpdateNote={handleUpdateNote}
              />
            ))
          ) : (
            <p>No notes available.</p>
          )}
        </div>
      </main>

      <DeleteModal
        showModal={showModal}
        message="Are you sure you want to delete this note?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Home;
