import type { ParentPlatform } from "@/api/rawg/rawg-types";
type Props = {
  platforms: ParentPlatform[] | undefined;
};

const GamesAvilabel: React.FC<Props> = ({ platforms }) => {
  return (
    <div className="flex gap-2">
      {platforms?.map((platform) => (
        <p>{platform.platform.name}</p>
      ))}
    </div>
  );
};

export default GamesAvilabel;
