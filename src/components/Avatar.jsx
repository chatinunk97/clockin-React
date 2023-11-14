import defaultAvatarImage from "../assets/defaultAvatar.png";

export default function Avatar({ className = "h-[60px] w-[60px] border rounded-full", src }) {
  const defaultClass = "rounded-full aspect-square";
  const classes = defaultClass + " " + className;
  return <img src={src || defaultAvatarImage} alt="user" className={classes} />;
}
