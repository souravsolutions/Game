import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const GamesSearch = () => {
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(params.get("search") ?? "");
  }, [params]);

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      const v = value.trim();

      if (!v) next.delete("search");
      else next.set("search", v);
      setParams(next);
    }, 400);

    return () => clearTimeout(t);
  }, [value, params, setParams]);

  return (
    <div className='w-80 flex items-center justify-center'>
      <Input
        type='text'
        placeholder='Search Games..'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </div>
  );
};

export default GamesSearch;
