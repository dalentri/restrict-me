const EditModal = ({ confirmEdit, handleChange, formData, editingProject }) => {
  return (
    <dialog className="modal" id="EditModal">
      <div className="modal-box">
        <h2 className="font-bold text-2xl">Edit Details:</h2>
        <form
          onSubmit={(e) => {
            if (editingProject) {
              confirmEdit(e, editingProject.index);
              const modal = document.getElementById(
                "EditModal",
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.close();
              }
            }
          }}
        >
          <div className="grid gap-3 mt-4">
            <label className="input">
              Title:
              <input
                className=""
                value={formData.title}
                onChange={handleChange}
                name="title"
                required
              />
            </label>
            <textarea
              className="textarea"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              name="description"
            />
            <label className="input">
              Restrictions
              <input
                className=""
                value={formData.restrictions}
                onChange={handleChange}
                name="restrictions"
              />
            </label>
            <label className="input">
              Image Url:
              <input
                className=""
                value={formData.imageUrl}
                onChange={handleChange}
                name="imageUrl"
              />
            </label>
            <fieldset>
              <legend className="fieldset-legend">Status</legend>
              <select
                required
                defaultValue="Select a status"
                className="select"
                name="status"
                onChange={handleChange}
                value={formData.status}
              >
                <option disabled={true}>Select a status</option>
                <option>not started</option>
                <option>in-progress</option>
                <option>finished</option>
                <option>cancelled</option>
              </select>
            </fieldset>
            <label className="mb-4">
              Progress:
              <input
                type="range"
                min="0"
                max="100"
                className="range ml-2"
                value={formData.progress}
                onChange={handleChange}
                name="progress"
              />
            </label>
          </div>
          <button type="submit" className="btn">
            Confirm Changes
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default EditModal;
