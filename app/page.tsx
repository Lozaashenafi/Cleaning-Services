import { db } from '../src/db';
import { services } from '../src/db/schema';

export default async  function  Home() {
  const allServices = await db.select().from(services);

  return (
    <div>
      <h1>Database Connection Test</h1>
      <p>Found {allServices.length} services in the database.</p>
    </div>
  );
}
