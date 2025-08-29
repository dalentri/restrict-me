// Import the data
import { fragments } from "../data/fragments";
import EditLogo from "../assets/pencil-square-svgrepo-com.svg";

const Gallery = ({ projects, handleDelete, handleEdit }) => {
  return (
    <>
      <div className="rounded-xl bg-base-200 m-5 flex h-300">
        <div className="grid grid-cols-2">
          {/* Constructs each object into a card */}
          {projects.map((art) => (
            <div key={art.index} className="card m-2 w-75 shadow-md">
              <figure>
                <img src={art.imageUrl} />
              </figure>
              <div className="card-body">
                <div className="card-actions absolute top-1 right-1">
                  <button
                    className="btn btn-square"
                    onClick={() => {
                      const modal = document.getElementById(
                        "EditModal",
                      ) as HTMLDialogElement | null;
                      if (modal) {
                        modal.showModal();
                      }
                      handleEdit(art.index);
                    }}
                  >
                    <img src={EditLogo} />
                  </button>
                  <button
                    className="btn btn-square"
                    onClick={() => handleDelete(art.index)}
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
                <h1 className="card-title">{art.title}</h1>
                <p>{art.description}</p>
                <div className="card-actions align-end">
                  <h6 className="font-bold">Restrictions:</h6>
                  {/* Prints each of the restrictions as badges */}
                  {art.restrictions.map((restriction) => (
                    <div className="badge">{restriction}</div>
                  ))}
                  <div className="badge badge-primary">{art.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
