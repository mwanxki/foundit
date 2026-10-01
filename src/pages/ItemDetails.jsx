import { useParams } from "react-router-dom";
import { items } from "../data/mockData";

function ItemDetails() {
  const { id } = useParams();
  const item = items.find((i) => i.id === Number(id));

  if (!item) return <p>Item not found.</p>;

  return (
    <section>
      <h1>{item.itemName}</h1>
      <p>Build the item details, matches and claim form here.</p>
    </section>
  );
}

export default ItemDetails;