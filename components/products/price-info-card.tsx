import Image from "next/image";

interface Props {
  title: string;
  iconSrc: string;
  value: string;
}

const PriceInfoCard = ({ title, iconSrc, value }: Props) => {
  return (
    <div className="price-info-card">
      <p className="text-base text-black">{title}</p>

      <div className="flex gap-1">
        <Image src={iconSrc} alt={title} width={24} height={24} />

        <p className="text-2xl font-bold text-black">{value}</p>
      </div>
    </div>
  );
};

export default PriceInfoCard;
