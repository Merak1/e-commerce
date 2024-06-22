import Image from "next/image";
interface ImagePreviewProps {
  color: string;
  colorCode: string;
  image: string;
}
const ImagePreview: React.FC<ImagePreviewProps> = ({
  color,
  colorCode,
  image,
}) => {
  return (
    <div className="relative w-[70px] aspect-square">
      <Image src={image} alt={color} fill className="object-contain" />
    </div>
  );
};

export default ImagePreview;
