import type { ParentPlatform } from "@/api/rawg/rawg-types"; // Adjust path as needed
import type { ReactElement } from "react";
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaXbox,
  FaGamepad,
} from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";

type Props = {
  platforms?: ParentPlatform[];
};

const ICON_SIZE = 14;

const platformIconMap: Record<string, ReactElement> = {
  pc: <FaWindows size={ICON_SIZE} />,
  playstation: <FaPlaystation size={ICON_SIZE} />,
  xbox: <FaXbox size={ICON_SIZE} />,
  nintendo: <SiNintendoswitch size={ICON_SIZE} />,
  mac: <FaApple size={ICON_SIZE} />,
  linux: <FaLinux size={ICON_SIZE} />,
};

const GamesAvailable: React.FC<Props> = ({ platforms }) => {
  if (!platforms?.length) return null;

  return (
    <div className='flex items-center gap-2'>
      {platforms.map(({ platform }) => {
        const icon = platformIconMap[platform.slug] ?? (
          <FaGamepad size={ICON_SIZE} />
        );

        return (
          <span
            key={platform.id}
            title={platform.name}
            className='transition-colors duration-200 hover:text-primary'
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
};

export default GamesAvailable;
