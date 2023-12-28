import { FC, useState } from "react";
import { ContactRecord } from "../data";

const Avatar: FC<{ contact: ContactRecord }> = ({ contact }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setLoading((loading)=>!loading)
  }

  const imageStyle = loading ? { display: "none" } : {};
  return ( 
    <div>
      <img
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
          onLoad={handleImageLoad}
          style={imageStyle}
        />
    </div>
  );
};

export default Avatar;
