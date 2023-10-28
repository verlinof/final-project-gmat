import logo from "../images/gmat-logo.png";

function Navbar() {
  return (
    <>
      <nav className="border-gray-200 bg-slate-500">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto py-3 px-10">
          <div className="flex items-center">
            <img src={logo} className="h-10 mr-3" alt="Flowbite Logo" />
            <div>
              <p className="self-center text-xl font-semibold whitespace-nowrap text-white">
                Gadjah Mada Aerospace Team
              </p>
              <p className="text-white font-semibold">Verlino Raya Fajri</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
