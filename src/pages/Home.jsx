import { items } from "../data/mockData";

function Home() {
  return (
    <section>
      <h1>Lost and found items</h1>
      <p>{items.length} items reported. Build the item list here.</p>
    </section>
  );
}

export default Home;