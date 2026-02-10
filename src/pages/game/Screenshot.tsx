import { useState, useCallback, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useGameScreenshots } from "./hooks/use-gameScreenshot";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const Screenshot = ({ id }: { id: number }) => {
  const { data, isLoading, isError, refetch } = useGameScreenshots(id);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Navigation next image but hear we use callback because we say we don't want to run this function on every render
  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null || !data?.results) return;
      setSelectedIndex((prev) =>
        prev === data.results.length - 1 ? 0 : (prev as number) + 1,
      );
    },
    [selectedIndex, data],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null || !data?.results) return;
      setSelectedIndex((prev) =>
        prev === 0 ? data.results.length - 1 : (prev as number) - 1,
      );
    },
    [selectedIndex, data],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  if (isLoading)
    return (
      <div className='flex items-center gap-4 py-12 justify-center w-full'>
        <Spinner className='size-8 text-primary' />
      </div>
    );

  if (isError)
    return (
      <div className='flex flex-col items-center gap-2 py-8 justify-center w-full text-destructive'>
        <span className='text-sm'>Failed to load screenshots</span>
        <Button variant='ghost' size='sm' onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );

  if (!data?.results || data.results.length === 0) return null;

  return (
    <>
      <div className='columns-1 md:columns-2 gap-4 space-y-4'>
        {data.results.map((screenshot, index) => (
          <motion.div
            key={screenshot.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className='break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in'
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={screenshot.image}
              alt={`Screenshot ${screenshot.id}`}
              className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
              <ZoomIn className='text-white/80 size-8 drop-shadow-md' />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm'
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className='absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50'
            >
              <X className='size-6' />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className='absolute left-4 md:left-8 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors z-50 hidden md:block'
            >
              <ChevronLeft className='size-8' />
            </button>

            <button
              onClick={handleNext}
              className='absolute right-4 md:right-8 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors z-50 hidden md:block'
            >
              <ChevronRight className='size-8' />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className='relative max-w-[90vw] max-h-[90vh] shadow-2xl overflow-hidden rounded-md'
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={data.results[selectedIndex].image}
                alt='Full screen view'
                className='w-full h-full object-contain max-h-[90vh]'
              />

              {/* Image Counter */}
              <div className='absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-sm font-medium'>
                {selectedIndex + 1} / {data.results.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Screenshot;
