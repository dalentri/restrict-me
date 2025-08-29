import "./App.css";

const Menu = ({ currentView, setCurrentView }) => {
  return (
    <>
      <div>
        <ul className="menu menu-horizontal bg-base-200 shadow-md rounded-box ">
          <li>
            <a
              className={`font-bold ${currentView === "home" ? "menu-active" : ""}`}
              type="home"
              onClick={() => setCurrentView("home")}
            >
              home
            </a>
          </li>
          <li>
            <a
              className={`font-bold ${currentView === "gallery" ? "menu-active" : ""}`}
              type="gallery"
              onClick={() => setCurrentView("gallery")}
            >
              gallery of trying
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
