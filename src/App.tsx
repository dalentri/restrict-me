import { useState, useEffect } from "react";
import "./App.css";

// Import pages
import Menu from "./menu.tsx";
import Home from "./pages/home.tsx";
import Gallery from "./pages/gallery.tsx";

import AddModal from "./modals/addModal.tsx";
import EditModal from "./modals/editModal.tsx";

import { fragments as initialFragments } from "./data/fragments.tsx";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [editingProject, setEditingProject] = useState(null);

  // Changes view based on the menu selection
  const showView = () => {
    switch (currentView) {
      case "home":
        return (
          <Home
            projects={projects}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      case "gallery":
        return (
          <Gallery
            projects={projects}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      default:
        return (
          <Home
            projects={projects}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
    }
  };

  // Gets the projects from local storage for data persistence
  const [projects, setProjects] = useState(() => {
    // checks the user's storage for any keys under "fragments" (stored projects)
    const savedFragments = localStorage.getItem("fragments");
    // If found, load the saved fragments
    if (savedFragments) {
      // If foumnd, convert the found json into an array of objects
      return JSON.parse(savedFragments);
    } else {
      // if not, load the ones manually populated
      return initialFragments;
    }
  });

  // Saves the projects to local storage every time the projects change
  useEffect(() => {
    // Takes the current projects array, converts it to json, and stores it under the "fragments" key
    localStorage.setItem("fragments", JSON.stringify(projects));
  }, [projects]);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    restrictions: "",
    imageUrl: "",
    status: "",
    progress: 0,
  });

  const handleChange = (e) => {
    // Destructuring:
    // e.target : refers to the dom element that triggered the event (like an input field)
    // This line is basically a shortcut for: const name = e.target.name;
    //                                        const value = e.target.value;
    const { name, value } = e.target;
    // Updates state based on the previous state
    setFormData((prevState) => ({
      // The spread format is used to ensure that the data that hasn't been changed remain the same
      ...prevState,
      // A technique called "computed property names":
      // The "name" value is being used as the key for the new property
      // The "value" value is being used as the value of the "name" property
      //
      // This makes it so where each line is automatically adjusted for and handled, for instance:
      // for the title field: ["title"] : "breadsticks"
      // or for the progress field ["progress"] : "90";
      [name]: name === "progress" ? parseInt(value, 10) : value, // if the name is progress, convert to int
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creates a new fragment out of the input information
    const newFragment = {
      index: projects.length + 1,
      title: formData.title,
      description: formData.description,
      restrictions: formData.restrictions.split(",").map((item) => item.trim()),
      imageUrl: formData.imageUrl,
      status: formData.status,
      progress: formData.progress,
    };

    // Updates the projects state by making a copy of the old data and adding the new data
    setProjects((prevProjects) => [...prevProjects, newFragment]);

    // Reset all inputs
    setFormData({
      title: "",
      description: "",
      restrictions: "",
      imageUrl: "",
      status: "",
      progress: 0,
    });
  };

  const handleEdit = (index) => {
    const projectToEdit = projects.find((project) => project.index === index);

    if (projectToEdit) {
      setEditingProject(projectToEdit);
      setFormData({
        title: projectToEdit.title,
        description: projectToEdit.description,
        restrictions: projectToEdit.restrictions.join(", "),
        imageUrl: projectToEdit.imageUrl,
        status: projectToEdit.status,
        progress: projectToEdit.progress,
      });
    }
  };

  const confirmEdit = (e, index) => {
    e.preventDefault();

    const changedFragment = {
      index: index,
      title: formData.title,
      description: formData.description,
      restrictions: formData.restrictions.split(",").map((item) => item.trim()),
      imageUrl: formData.imageUrl,
      status: formData.status,
      progress: formData.progress,
    };

    const updatedProjects = projects.map((project) =>
      project.index === index ? { ...changedFragment, index } : project,
    );
    setProjects(updatedProjects);
    setEditingProject(null);
  };

  const handleDelete = (deleteIndex) => {
    const newFragment = projects.filter(
      (project) => project.index !== deleteIndex,
    );
    setProjects(newFragment);
  };

  return (
    <>
      <div>
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold m-5">restrict me!</h1>
        </div>
        <div className="flex justify-center ">
          <Menu currentView={currentView} setCurrentView={setCurrentView} />
        </div>
        {showView()}
      </div>
      <AddModal
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <EditModal
        confirmEdit={confirmEdit}
        handleChange={handleChange}
        formData={formData}
        editingProject={editingProject}
      />
    </>
  );
}

export default App;
