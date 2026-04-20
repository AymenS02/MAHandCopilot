"use client";
import {
  motion,
  AnimatePresence as FramerMotionAnimatePresence,
} from "framer-motion";

export const AnimatePresence = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <FramerMotionAnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {children}
        </motion.div>
      </FramerMotionAnimatePresence>
    </>
  );
};
