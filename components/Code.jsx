import { useState } from "react";
import copy from "copy-to-clipboard";
import { CopyIcon } from "../icons/CopyIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Code = ({ children, terminal = false }) => {
  const [terminalCommand, setTerminalCommand] = useState("npm run");

  const handleCopy = () => {
    // console.log(children);
    if (terminal) {
      copy(terminalCommand + " " + children);
    } else {
      copy(children);
    }
  };

  return (
    <div className="my-1">
      {terminal && (
        <div>
          <button
            className={classNames(
              terminalCommand === "npm run"
                ? "bg-gray-700 dark:bg-gray-700 text-gray-50"
                : "",
              "border border-blue-100 dark:border-gray-700 px-4 py-1 rounded-tl-md"
            )}
            onClick={() => setTerminalCommand("npm run")}
          >
            npm
          </button>
          <button
            className={classNames(
              terminalCommand === "yarn"
                ? "bg-gray-700 dark:bg-gray-700 text-gray-50"
                : "",
              "border border-blue-100 dark:border-gray-700 px-4 py-1 rounded-tr-md"
            )}
            onClick={() => setTerminalCommand("yarn")}
          >
            yarn
          </button>
        </div>
      )}
      <div className="flex justify-between p-3 rounded-md bg-blue-50 border border-blue-100 dark:border-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
        <div className="flex">
          {terminal ? (
            <>
              {terminalCommand} {children}
            </>
          ) : (
            <>{children}</>
          )}
        </div>
        <button
          className="p-1.5 rounded-md border border-blue-400 hover:border-blue-500 text-blue-400 hover:text-blue-500 dark:text-gray-300 dark:hover:text-gray-50 dark:border-gray-300 dark:hover:border-gray-50"
          onClick={() => handleCopy()}
        >
          <CopyIcon />
        </button>
      </div>
    </div>
  );
};
