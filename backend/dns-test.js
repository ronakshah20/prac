import dns from 'dns/promises';
dns.setServers(['8.8.8.8', '8.8.4.4']);
// (async () => {
//     try { 
//         const srv = await dns.resolveSrv('_mongodb._tcp.cluster0.7d9ojc4.mongodb.net'); 
//         console.log('SRV records:', srv); 
//         for (const r of srv) { 
//             const addrs = await dns.resolve(r.name); 
//             console.log(r.name, '->', addrs);
//         }
//     } catch (err) { 
//         console.error('DNS error:', err);
//     }
// })();

// Use 'node dns-test.js' to run this file.

import { MongoClient } from "mongodb";

//const uri = 'mongodb+srv://codehubnoreply_db_user:g9wnSSVeOAdo9AO4@cluster0.7d9ojc4.mongodb.net/test?appName=Cluster0'

//const uri2 = 'mongodb+srv://codehubdb:codehubdb@cluster0.fmcmv9g.mongodb.net/?appName=Cluster0';

const uri3 = 'mongodb+srv://codehub_db:codehub_db@cluster0.npdrxls.mongodb.net/?appName=Cluster0';
const client = new MongoClient(uri3);

const main = async () => {
   try {
      await client.connect()
      console.log("Connected to MongoDB Atlas!")
      // list out all the databases in the cluster
      const dbs = await client.db().admin().listDatabases()
      console.table(dbs.databases)
   } catch (error) {
      console.error(error)
   } finally {
      await client.close()
   }
}

main()
   .catch((err) => console.log(err))
   .finally(() => client.close())