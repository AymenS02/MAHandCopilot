"use client";
import React, { useState } from "react";

type DonateModalProps = {
  trigger: React.ReactNode;
};

export const DonateModal = ({ trigger }: DonateModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative rounded-lg p-6 shadow-lg max-w-sm w-full overflow-hidden"
            style={{
              backgroundImage: "url('/pattern.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-green-50 bg-opacity-90 p-4 rounded-lg text-center">
              <h2 className="mb-2 w-full bg-primary rounded-2xl p-6 font-bold text-xl">
                Choose Donation Location
              </h2>
              <ul>
                <li className="mb-2 w-full bg-primary rounded-xl p-6">
                  <a
                    href="https://donorchoice.ca/mountainmosque"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white md:text-l text-center text-base font-semibold"
                  >
                    Mountain Mosque
                  </a>
                </li>
                <li className="mb-2 w-full bg-primary rounded-xl p-6">
                  <a
                    href="https://donorchoice.ca/umermosque"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white md:text-l text-center text-base font-semibold"
                  >
                    Umar Mosque
                  </a>
                </li>
              </ul>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 p-4 text-gray-700 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
