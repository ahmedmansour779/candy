
interface Item {
  title: string;
  value: string;
  icon: string;
}
interface Items {
  items: Item[];
}


const BriefInfo = ({ items }: Items) => {
  return (
    <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 text-sm">
      {items.map((item: Item, index) => (
        <div
          key={index}
          className="shadow bg-white rounded-lg p-4 flex flex-col gap-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center rounded-lg p-2">
              <img src={item.icon} alt="icon"  className="" />
            </div>
            <p className="h-fit flex justify-end bg-green-100 border border-green-300  p-1 rounded-lg shadow text-green-500">
              7.2%
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[18px] font-medium leading-7">
              {item.value}
            </p>
            <p className="text-[12px] font-medium">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BriefInfo;
