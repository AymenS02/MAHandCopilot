export const PackageCard = ({
  name,
  icon,
  price,
}: {
  name: string;
  icon: React.ReactNode;
  price?: number;
}) => {
  return (
    <div className="bg-white border-2 border-primary w-[300px] flex flex-col items-center justify-centerborder-primary rounded-xl p-4 shadow-lg">
      <div className="items-center space-y-1 flex flex-col">
        <div className="flex-shrink-0">{icon}</div>
        <h2 className="text-xl font-bold text-primary">{name}</h2>
        {price && <p className="text-base font-medium">${price} CAD</p>}
      </div>
    </div>
  );
};
