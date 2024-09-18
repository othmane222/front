import { useState } from "react";
import {Link} from "react-router-dom";
const LandingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  }

  return (
    <header className={"bg-secondary-3 text-white"}>
      <div className={"container max-w-screen-xl px-4 md:px-6 mx-auto flex justify-between py-4"}>
        <div className="flex items-center gap-x-10 z-20">
          <div id="logo" className={"text-3xl bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent"}>
            CRAFTY
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-x-8">
              <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="https://www.ycombinator.com/launches/Gh3-codecrafters-advanced-code-challenges-for-senior-engineers">About</a>
              <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="/perks">Perks</a>
              <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="/pricing">Pricing</a>
              <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="/expense">Expense</a>
              <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="/categories">Categories</a>
              <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="/Cart">Cart</a>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link
              to={"/login"}
              className="bg-theme-neutral-800 hover:bg-theme-neutral-700 rounded-full px-5 py-1 border border-theme-neutral-700 hover:border-theme-neutral-500 transition-all text-theme-neutral-200 font-medium text-lg text-center"
          >
            Log in
          </Link>
          <Link
              to={"/signup"}
              className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-600 rounded-full px-4 py-1 border border-theme-neutral-700 hover:border-theme-neutral-500 transition-all text-theme-neutral-200 font-medium text-lg text-center"
          >
            Try now
          </Link>
        </div>
        <div className="block md:hidden flex items-center z-20" onClick={toggleMenu}>
          <div role="button" className="w-14 h-14 bg-neutral-800 rounded-full flex items-center p-3 hover:bg-neutral-700">
            <div className="space-y-1.5 w-full">
              <div className="h-px bg-white"></div>
              <div className="h-px bg-white"></div>
              <div className="h-px bg-white"></div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col justify-start items-start h-full z-10 md:hidden">
          <div className="flex flex-col items-center gap-8 ml-4 py-4">
            <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="https://www.ycombinator.com/launches/Gh3-codecrafters-advanced-code-challenges-for-senior-engineers">About</a>
            <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="/perks">Perks</a>
            <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="/pricing">Pricing</a>
            <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="/expense">Expense</a>
            <a className="font-base font-semibold sm:text-base text-theme-neutral-200 hover:text-fuchsia-500 transition-all" href="/categories">Categories</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingNav;
