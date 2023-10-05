import { Keyboard, Star } from "@/assets/index";
import { Icon, IconGroupContainer } from "./IconGroup.styled";

type IconGroupProps = {
  icon: "Star" | "Keyboard";
  content?: string | number;
};

const icons = { Keyboard, Star };
const altDict = {
  Star: "Stargazers count",
  Keyboard: "Language",
};
const IconGroup = ({ icon, content }: IconGroupProps) => {
  return (
    <IconGroupContainer>
      <Icon src={icons[icon]} alt={altDict[icon] ?? ""} />
      <span style={{ fontWeight: 500 }}>{content ?? "None"}</span>
    </IconGroupContainer>
  );
};

export default IconGroup;
