

interface Props {
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>,
}


export default function Selector({ quantity, setQuantity }: Props) {
    return (
      <div className="flex items-center justify-center w-24 h-8 border border-gray-400 rounded">
        <button className="w-8 h-8 flex items-center justify-center border-r border-gray-400"
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity == 1}>
          -
        </button>
        <div className="flex items-center justify-center border-r border-gray-400 w-8 h-8">
          {quantity}
        </div>
        <button className="w-8 h-8 flex items-center justify-center border-l border-gray-400"
        onClick={() => setQuantity(quantity + 1)}
        disabled={quantity == 20}>
          +
        </button>
      </div>
    );
  }