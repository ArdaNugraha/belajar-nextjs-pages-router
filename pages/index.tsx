import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("Arda");

  return (
    <>
      <div>
        index page
        <h1 className="text-3xl font-bold underline">
          Welcome to my website {value}
        </h1>
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-101"
          onClick={() => setValue("Antum")}
        >
          Change Value
        </button>
      </div>
    </>
  );
}
