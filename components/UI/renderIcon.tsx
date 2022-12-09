import Image from 'next/image';

export const renderIcon = ({
  iconName,
  alt,
  height = 30,
  width = 30,
}: {
  iconName: string;
  alt: string;
  height?: number;
  width?: number;
}) => (
  <Image
    src={`/assets/${iconName}.svg`}
    alt={alt}
    className="icon"
    height={height}
    width={width}
  />
);
