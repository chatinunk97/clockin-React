import defaultAvatarImage from "../assets/defaultAvatar.png";

export default function Avatar({ className = "h-10", src }) {
  const defaultClass = "rounded-full aspect-square";
  const classes = defaultClass + " " + className;
  return <img src={src || defaultAvatarImage} alt="user" className={classes} />;
}
