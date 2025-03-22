import Image from "next/image";
import "./Island.css";

const Island = () => {
  return (
    <div className="island">
      <div className="island-image-container">
        <Image src="/island.png" alt="Island" className="island-image" width={800} height={800}/>
      </div>
    </div>
  );
};

export default Island;