import dns from 'dns/promises';
dns.setServers(['8.8.8.8', '8.8.4.4']);
(async () => {
    try { 
        const srv = await dns.resolveSrv('_mongodb._tcp.cluster0.7d9ojc4.mongodb.net'); 
        console.log('SRV records:', srv); 
        for (const r of srv) { 
            const addrs = await dns.resolve(r.name); 
            console.log(r.name, '->', addrs);
        }
    } catch (err) { 
        console.error('DNS error:', err);
    }
})();