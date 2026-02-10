import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const GamesSearch = () => {
  //this line copy the search thing form url like search=game
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  //hear in this useEffect we are listening to the keydown event on the window object
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  //When the Pages refresh Make sure go there where we leave
  useEffect(() => {
    setValue(params.get("search") ?? "");
  }, [params]);

  //here we are listening to the value and applying the debounce
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      const v = value.trim();

      if (!v) next.delete("search");
      else next.set("search", v);
      setParams(next);
    }, 500);

    return () => clearTimeout(t);
  }, [value, params, setParams]);

  return (
    <div className='w-80 flex items-center justify-center relative pl-9'>
      <Input
        type='text'
        placeholder='Search Games..'
        value={value}
        ref={searchRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        className='absolute'
      />
      <div className='absolute right-0 text-gray-400'>⌘+k</div>
    </div>
  );
};

export default GamesSearch;
