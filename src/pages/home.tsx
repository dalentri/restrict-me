import { useEffect, useState } from "react";
import { fragments as initialFragments } from "../data/fragments.tsx";
import EditLogo from "../assets/pencil-square-svgrepo-com.svg";

import AddModal from "../modals/addModal.tsx";
import EditModal from "../modals/editModal.tsx";

const Home = ({ projects, handleDelete, handleEdit }) => {
  // on initial load ,Only shows the projects that are in progress
  const focusedProjects = projects.filter(
    (project) => project.status === "in-progress",
  );

  return (
    <>
      <div className="rounded-xl bg-base-200 m-5">
        <div className="grid grid-cols-1">
          {focusedProjects.map((project) => (
            <div
              key={project.index}
              className="card card-xl card-side m-2 shadow-md h-80 bg-base-300"
            >
              <figure>
                <img className="object-cover" src={project.imageUrl} />
              </figure>
              <div className="card-body">
                <div className="card-actions absolute top-5 right-5">
                  <button
                    className="btn btn-square"
                    onClick={() => {
                      const modal = document.getElementById(
                        "EditModal",
                      ) as HTMLDialogElement | null;
                      if (modal) {
                        modal.showModal();
                      }
                      handleEdit(project.index);
                    }}
                  >
                    <img src={EditLogo} />
                  </button>
                  <button
                    className="btn btn-square"
                    onClick={() => handleDelete(project.index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <h1 className="card-title">{project.title}</h1>
                <p>{project.description}</p>
                <div className="card-actions align-end">
                  <h6 className="font-bold">Restrictions:</h6>
                  {/* Prints each of the restrictions as badges */}
                  {project.restrictions.map((restriction) => (
                    <div className="badge">{restriction}</div>
                  ))}
                  <div className="badge badge-primary">{project.status}</div>
                  <progress
                    className="progress progress-primary"
                    value={project.progress}
                    max="100"
                  ></progress>
                </div>
              </div>
            </div>
          ))}

          {/* "New Pursuit" button and modal  */}
          <button
            className="btn"
            onClick={() => {
              const modal = document.getElementById(
                "PursuitModal",
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
              }
            }}
          >
            Add a pursuit
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
