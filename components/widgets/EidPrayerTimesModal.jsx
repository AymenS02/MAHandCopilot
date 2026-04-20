"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function EidPrayerTimesModal() {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedMasjid, setSelectedMasjid] = useState("");

  // Data for each masjid timing option (only images)
  const masjidData = {
    mountain: {
      image: "/Eid-ul-Adha-2025-Mountain.jpeg", // Place your Mountain Masjid image in /public
    },
    umar: {
      image: "/Eid-ul-Adha-2025-Umar.jpeg", // Place your Umar Masjid image in /public
    },
  };

  const openOptionsModal = () => {
    setShowOptionsModal(true);
    setShowImageModal(false);
    setSelectedMasjid("");
  };

  const handleOptionSelect = (masjid) => {
    setSelectedMasjid(masjid);
    setShowOptionsModal(false);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <>
      <Button
        size="lg"
        className="px-4 text-[16px]"
        variant="special"
        onClick={openOptionsModal}
      >
        Eid Prayer Times
      </Button>

      {/* Options Modal */}
      {showOptionsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowOptionsModal(false)}
        >
          <div
            className="relative bg-white p-6 rounded-md max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-2xl font-bold mb-6">
              Choose Masjid Eid Timings
            </h2>
            <div className="flex justify-center space-x-6">
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionSelect("mountain");
                }}
                className="px-6 py-3 rounded bg-primary text-white hover:bg-primary-dark"
              >
                Mountain Masjid
              </button>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionSelect("umar");
                }}
                className="px-6 py-3 rounded bg-primary text-white hover:bg-primary-dark"
              >
                Umar Masjid
              </button>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowOptionsModal(false);
              }}
              className="mt-6 text-gray-700 hover:underline block mx-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeImageModal}
        >
          <div
            className="relative bg-white p-6 rounded-md max-w-3xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[500px] mb-4">
              <Image
                src={masjidData[selectedMasjid].image}
                alt="Masjid Prayer Times"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeImageModal();
              }}
              className="mt-4 text-gray-700 hover:underline block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
