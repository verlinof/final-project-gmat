import logo from "../images/gmat-logo.png";

function Navbar() {
  return (
    <>
      <nav className="border-gray-200 bg-slate-500">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <img src={logo} className="h-12 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Final Project GMAT
            </span>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
