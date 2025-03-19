import { FaDiscord } from "react-icons/fa";
import { MdContactSupport, MdPolicy } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-2">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="../images/maci.PNG"
              className="h-20"
              alt="Collabears Logo"
            />
          </a>

          <ul className="flex items-center mb-6 text-md font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="#"
                className="hover:text-orange-500 me-4 md:me-6 flex items-center gap-1"
              >
                <FaDiscord />
                Discord
              </a>
            </li>
            <li>
              <a
                href="/legals"
                className="hover:text-orange-500 me-4 md:me-6 flex items-center gap-1"
              >
                <MdPolicy />
                Legals
              </a>
            </li>
            <li>
              <a
                href="/premium"
                className="hover:text-orange-500 me-4 md:me-6  flex items-center gap-1"
              >
                <GiUpgrade />
                Subscribe
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-orange-500 me-4 md:me-6  flex items-center gap-1"
              >
                <MdContactSupport />
                Support
              </a>
            </li>
          </ul>
          <div className="bg-gray-200 text-black p-6 rounded-lg mt-6 text-center">
            <h3 className="text-xl font-semibold">Get more updates...</h3>
            <p className="text-black mt-2">
              Do you want to get notified when a new feature is added? Sign up
              for our newsletter.
            </p>
            <div className="mt-4 flex justify-center">
              <input
                type="email"
                className="p-2 bg-gray-700 rounded-l-md text-white focus:outline-none"
                placeholder="Your email address..."
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              By subscribing, you agree to our{" "}
              <a href="/legals" className="text-orange-500 hover:underline">
                Legals
              </a>
              .
            </p>
          </div>
        </div>

        {/* Feliratkozási rész */}

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="/" className="hover:underline">
            Collabears
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
