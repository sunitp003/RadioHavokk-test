// PWA Service Worker Registration
        if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' })
                    .catch(error => console.warn('PWA service worker registration failed:', error));
            });
        }

        // if ('serviceWorker' in navigator) {
        //     const swCode = `
        //         self.addEventListener('install', e => self.skipWaiting());
        //         self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
        //         self.addEventListener('fetch', e => e.respondWith(fetch(e.request).catch(() => new Response('Offline'))));
        //     `;
        //     const blob = new Blob([swCode], { type: 'application/javascript' });
        //     navigator.serviceWorker.register(URL.createObjectURL(blob)).catch(err => console.log('SW failed'));
        // }

        // PWA Install Prompt Logic
        let deferredPrompt;
        const pwaInstallBtn = document.getElementById('pwaInstallBtn');
        const desktopInstallBtn = document.getElementById('desktopInstallBtn');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            if (pwaInstallBtn) { pwaInstallBtn.classList.remove('hidden'); pwaInstallBtn.classList.add('flex'); }
            if (desktopInstallBtn) { desktopInstallBtn.classList.remove('hidden'); desktopInstallBtn.classList.add('flex'); }
        });

        const handleInstallClick = async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    if (pwaInstallBtn) pwaInstallBtn.classList.add('hidden');
                    if (desktopInstallBtn) desktopInstallBtn.classList.add('hidden');
                }
                deferredPrompt = null;
            }
        };

        if (pwaInstallBtn) pwaInstallBtn.addEventListener('click', handleInstallClick);
        if (desktopInstallBtn) desktopInstallBtn.addEventListener('click', handleInstallClick);
        window.addEventListener('appinstalled', () => {
            deferredPrompt = null;
            if (pwaInstallBtn) pwaInstallBtn.classList.add('hidden');
            if (desktopInstallBtn) desktopInstallBtn.classList.add('hidden');
        });

        const radioDatabase = [
    { "name": "BigFM 106.2", "link": "https://listen.openstream.co/6983/audio", "tags": ["Bollywood", "Hindi", "90s", "00s", "Modern"] }, 
    { "name": "Radio Mirchi", "link": "https://eu8.fastcast4u.com/proxy/clyedupq?mp=%2F1", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Mirchi Love", "link": "https://bhs.edge.mystreaming.net/uber/lrbollywood/icecast.audio", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Bolly 102.9 FM", "link": "https://ice6.securenetsystems.net/INTRADIO?type=.mp3", "tags": ["Hindi", "Bollywood", "Modern", "90s"] }, 
    { "name": "Filmy Mirchi", "link": "https://streaming.webhostnepal.com/8020/stream", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "Mirchi Top 20", "link": "https://bhs.edge.mystreaming.net/uber/bollywoodnow/icecast.audio", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Mirchi Pune", "link": "https://stream.zeno.fm/wgaznsmt92quv", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Mirchi 90s Radio", "link": "https://stream.zeno.fm/fdgs82xkzhhvv", "tags": ["Hindi", "Bollywood", "90s"] }, 
    { "name": "Kadak FM", "link": "https://admn-radio-cdn-lb.starzplayarabia.com/out/v1/admn_radio_enc/kadak/kadak_hls_nd/index_kadakfm_audio_enc_ara.m3u8", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Radio Olive", "link": "https://playerservices.streamtheworld.com/api/livestream-redirect/OLIVE1063.mp3", "tags": ["Hindi", "Bollywood", "Modern", "00s"] }, 
    { "name": "Radio Olive Retro", "link": "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_OLIVE_RETRO_S03_SC", "tags": ["Hindi", "Bollywood", "Retro"] }, 
    { "name": "Radio Olive Kids", "link": "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_OLIVE_CLUB_S04AAC.aac", "tags": ["Bollywood", "Hindi", "Modern"] }, 
    { "name": "BollyVibes Radio", "link": "https://bollyvibes.radioca.st/stream", "tags": ["Bollywood", "Hindi", "00s", "Modern"] }, 
    { "name": "Diverse FM", "link": "https://carol.epichosts.co.uk:8570/;", "tags": ["Bollywood", "Hindi", "00s", "Modern"] }, 
    { "name": "Mirchi FM", "link": "https://listen.openstream.co/4603/audio", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Radio Badal", "link": "https://listen.openstream.co/6654/;stream.mp3", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "Radio Namkin", "link": "https://stream.zeno.fm/yg1qhsbaqv5tv", "tags": ["Hindi", "Bollywood", "Retro", "90s"] }, 
    { "name": "Hindi Retro", "link": "https://stream.zeno.fm/v2zfmxef798uv", "tags": ["Hindi", "Bollywood", "Retro"] }, 
    { "name": "Radio Dil Se", "link": "https://stream.zeno.fm/143d7gty24zuv", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "Bombay Beats India Radio", "link": "https://strm112.1.fm/bombaybeats_mobile_mp3", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "Dance Masti", "link": "https://bhs.edge.mystreaming.net/uber-app/bollywooddance/icecast.audio", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Golden Voice Fm", "link": "https://stream.zeno.fm/s3sqemewrg0uv", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "Bollywood 2010’s", "link": "https://bhs.edge.mystreaming.net/uber/bollywood2010s/icecast.audio", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Fusion Life", "link": "https://c28.radioboss.fm:18046/stream", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Bollywood Bio", "link": "https://stream.zeno.fm/kr08sxc2tfeuv", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Rhythm Radio", "link": "https://s3.radio.co/s2f19d44d0/listen", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Bollywood Gane Purane", "link": "https://stream.zeno.fm/6n6ewddtad0uv", "tags": ["Hindi", "Bollywood", "Retro"] }, 
    { "name": "Bollywood Mix", "link": "https://bhs.edge.mystreaming.net/uber/bollywoodmix/icecast.audio", "tags": ["Bollywood", "Hindi", "00s", "Modern"] }, 
    { "name": "Bollywood Diwali", "link": "https://bhs.edge.mystreaming.net/uber/bollywooddiwali/icecast.audio", "tags": ["Bollywood", "Hindi", "00s", "Modern"] }, 
    { "name": "Radio Saavan", "link": "https://sp14.instainternet.com/8268/stream", "tags": ["Hindi", "Bollywood", "Retro", "90s"] }, 
    { "name": "Radio Mirchi New Jersey", "link": "https://14833.live.streamtheworld.com/NYC_HIN_ESTAAC.aac", "tags": ["Hindi", "Bollywood", "00s", "Modern"] }, 
    { "name": "Radio Mirchi Qatar", "link": "https://streams.radio.co/s8d06d0298/listen", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "Goldy Evergreen", "link": "https://stream.zeno.fm/n2fd0edh9k8uv", "tags": ["Hindi", "Bollywood", "Retro", "90s"] }, 
    { "name": "Radio Mirchi 98.3 FM", "link": "https://stream-284.surfernetwork.com/wgaznsmt92quv", "tags": ["Hindi", "Bollywood", "90s"] }, 
    { "name": "92.7 Big FM online", "link": "https://stream.zeno.fm/dbstwo3dvhhtv", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "Radio Hungama Bollywood Dil Se", "link": "https://stream.zeno.fm/143d7gty24zuv", "tags": ["Hindi", "Bollywood", "Modern", "00s"] }, 
    { "name": "Radio Hungama Evergreen Bollywood", "link": "https://server.mixify.in:8010/radio.mp3", "tags": ["Hindi", "Bollywood", "Retro"] }, 
    { "name": "Radio Hungama 90s Once Again", "link": "https://stream.zeno.fm/rm4i9pdex3cuv", "tags": ["Hindi", "Bollywood", "90s"] }, 
    { "name": "Bolly Top 100", "link": "https://stream.zeno.fm/6hebzur8d72tv", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Mirchi Love live", "link": "https://a10.asurahosting.com:9030/radio.mp3", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Mirchi Love Hindi", "link": "https://drive.uber.radio/uber/bollywoodlove/icecast.audio", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Mirchifiji", "link": "https://icecast1.sere.plus/MirchiFiji", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Radio Badal 2", "link": "https://listen.openstream.co/6654/;stream.mp3", "tags": ["Hindi", "Bollywood", "90s"] }, 
    { "name": "Radio Retro Bollywood 90s", "link": "https://stream.zeno.fm/u0hrd3xkzhhvv", "tags": ["Hindi", "Bollywood", "90s"] }, 
    { "name": "Club Mirchi", "link": "https://stream-141.zeno.fm/6n6ewddtad0uv", "tags": ["Hindi", "Bollywood", "90s"] }, 
    { "name": "Mohabbat Radio", "link": "https://stream.zeno.fm/t2ekq8zsgtzuv", "tags": ["Hindi", "Bollywood", "90s"] }, 
    { "name": "Non Stop Hindi", "link": "http://s5.voscast.com:8216/stream", "tags": ["Hindi", "Bollywood", "Retro", "90s"] }, 
    { "name": "Radio Gaana", "link": "https://sp14.instainternet.com/8044/stream", "tags": ["Hindi", "Bollywood", "Retro"] }, 
    { "name": "Radio Namkin Live", "link": "https://stream-19.zeno.fm/84h7fsbaqv5tv?zs=5fWIjd5dTEWImmlwdIadqA", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Radio Nasha", "link": "https://stream-289.surfernetwork.com/zu59ykebs2zuv", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Radio Rangila", "link": "https://rangeelaradio.radioca.st/;", "tags": ["Hindi", "Marathi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Vividh Bharti", "link": "https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/chunklist.m3u8", "tags": ["Akashvani", "Hindi", "Marathi", "News"] }, 
    { "name": "Bollywood 90s", "link": "https://sp14.instainternet.com:8226/stream", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "CINA Radio", "link": "https://ice8.securenetsystems.net/CINA", "tags": ["Hindi", "Bollywood", "Retro", "90s"] }, 
    { "name": "Goldy Cool", "link": "https://stream.zeno.fm/3k1fb86tfm8uv", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "Radio Rangoli", "link": "https://play.radioking.io/rangoli-radio", "tags": ["Hindi", "Bollywood", "90s", "00s"] }, 
    { "name": "Lyca Radio - Midlands", "link": "https://listen-lycaradio.sharp-stream.com/831_lyca_radio_leicester_192_mp3", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Lyca gold 2", "link": "https://listen-lycaradio.sharp-stream.com/1458.mp3", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Lyca gold", "link": "https://listen-lycaradio.sharp-stream.com/1035.mp3", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Navatarang", "link": "https://stream.rcs.revma.com/5f56gd8a303vv", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Masala Radio Houston", "link": "https://s3.voscast.com:10201/stream.mp3", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "103.5 HUM FM", "link": "https://ice10.securenetsystems.net/HUMFM", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "VDesi Radio Atlanta", "link": "https://ice66.securenetsystems.net/WVDESI", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Rukus Avenue Radio", "link": "https://15053.live.streamtheworld.com/RUKUS_AVENUE_RADIOAAC.aac", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Radio Rangrez Texas", "link": "https://streaming.live365.com/a37825", "tags": ["Hindi", "Bollywood", "Modern", "00s"] }, 
    { "name": "Madhur Awaz", "link": "https://stream.madhurawaz.com/", "tags": ["Hindi", "Bollywood", "Retro"] }, 
    { "name": "Radio Sangeet Houston", "link": "https://ice8.securenetsystems.net/SGTRADIO", "tags": ["Hindi", "Bollywood", "Modern"] }, 
    { "name": "Intense 102.9 FM Reston", "link": "https://ice6.securenetsystems.net/INTRADIO", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Radio Nyra Durham", "link": "https://streams.radio.co/s8d06d0298/listen", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Radio Zindagi 540 AM Islip", "link": "https://us9.maindigitalstream.com/stream/rznynjct", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Radio Zindagi 1550 AM San Francisco", "link": "https://us9.maindigitalstream.com/ssl/RadioZindagi", "tags": ["Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Radio Nagar", "link": "https://centova87.shoutcastservices.com/proxy/nagar90/stream", "tags": ["Marathi", "Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Radio Karmaveer 88.4 FM", "link": "https://a4.asurahosting.com:6670/radio.mp3", "tags": ["Marathi", "Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Radio Nagpur live", "link": "https://a6.asurahosting.com:8360/radio.mp3", "tags": ["Marathi", "Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "MGM Chh. Sambhajinagar", "link": "https://streamasiacdn.atc-labs.com/mgmradio.aac", "tags": ["Marathi", "Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Akola FM", "link": "https://stream-179.surfernetwork.com/ewyiefmqkxkuv", "tags": ["Marathi", "Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "FM Samarpan", "link": "https://stream-175.surfernetwork.com/iz7xg9sjx7suv", "tags": ["Marathi", "Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Marathi Bhavgite", "link": "https://stream.zeno.fm/a22rz9brfa0uv", "tags": ["Marathi"] }, 
    { "name": "Ratnagiri Fresh", "link": "https://stream.zeno.fm/at16xeuwea0uv", "tags": ["Marathi", "Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Londoncha Mavala", "link": "https://stream.zeno.fm/kh8cywsrsfhvv", "tags": ["Marathi"] }, 
    { "name": "Mayboli Marathi", "link": "https://stream.zenolive.com/463d8uzrwfeuv.aac", "tags": ["Marathi"] }, 
    { "name": "Marathi Tarang", "link": "https://silverstream.radioca.st/;", "tags": ["Marathi"] }, 
    { "name": "Radio Mast Marathi", "link": "https://stream.zeno.fm/8fqvoovoiwtuv", "tags": ["Marathi"] }, 
    { "name": "Mi Marathi", "link": "https://stream.zeno.fm/887x5s857f8uv", "tags": ["Marathi"] }, 
    { "name": "DJ Marathi", "link": "https://stream.zeno.fm/akvjqcyibd1uv", "tags": ["Marathi"] }, 
    { "name": "Radio Pune City FM", "link": "https://sp14.instainternet.com/8088/stream", "tags": ["Marathi"] }, 
    { "name": "Marathi Music", "link": "https://stream.zeno.fm/cv7xsbww2a0uv", "tags": ["Marathi"] }, 
    { "name": "MARATHI BAKTIGITE", "link": "https://stream.zeno.fm/t36nr37tfa0uv", "tags": ["Marathi"] }, 
    { "name": "Bhaktisudha", "link": "https://stream.radiojar.com/cfqyfcspcv8uv", "tags": ["Marathi"] }, 
    { "name": "FM Jay Shiv Shambhu", "link": "https://stream.zeno.fm/kuimlkicg43tv", "tags": ["Marathi"] }, 
    { "name": "MAZI SHALA 1", "link": "https://stream.zeno.fm/yaw77vbzra0uv", "tags": ["Marathi"] }, 
    { "name": "VBS Panaji", "link": "https://d1tmej9eu7kw5c.cloudfront.net/146ed6ec6dea5a24/146ed6ec6dea5a24.m3u8", "tags": ["Akashvani", "Konkani", "Hindi", "Marathi", "English"] }, 
    { "name": "AIR Mhadei, Panaji", "link": "https://d3hrxqn1tritdh.cloudfront.net/029a89eb18474dbd/029a89eb18474dbd.m3u8", "tags": ["Akashvani", "Konkani", "Hindi", "Marathi", "English"] }, 
    { "name": "Radio Parbhani", "link": "https://stream.tamilfmradios.com/?url=http://85.25.185.202:8074/stream", "tags": ["Marathi", "Hindi"] }, 
    { "name": "Radio Nagar 90.4 FM", "link": "https://centova87.shoutcastservices.com/proxy/nagar90/stream", "tags": ["Marathi", "Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Radio Parijat", "link": "https://stream.zeno.fm/rxq8uv39c8zuv", "tags": ["Marathi", "Hindi", "Bollywood", "Retro", "90s", "00s", "Modern"] }, 
    { "name": "Mann Deshi Tarang Vahini", "link": "https://streamasiahlscdn.atc-labs.com/radiomanndeshi.m3u8", "tags": ["Marathi"] },  
    { "name": "Smile FM 90.8", "link": "https://stream.tamilfmradios.com/?url=http://198.245.61.103:8113/stream?type=http&nocache=2", "tags": ["Marathi"] }, 
    { "name": "Shripad Radio", "link": "https://shripadradio.radioca.st/;", "tags": ["Marathi"] }, 
    { "name": "MGM radio 90.8", "link": "https://dz1aqwz3bmbil.cloudfront.net/mgmradio.m3u8", "tags": ["Marathi"] }, 
    { "name": "Radio Vishwas", "link": "https://dgnlfn5aus0c6.cloudfront.net/radiovishwas.m3u8", "tags": ["Marathi", "Akashvani"] }, 
    { "name": "FM Rainbow Mumbai", "link": "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio008/hlspbaudio00832kbps.m3u8", "tags": ["Akashvani", "Marathi", "Hindi"] }, 
    { "name": "Air Mumbai", "link": "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio010/hlspbaudio01064kbps.m3u8", "tags": ["Akashvani", "News", "Marathi"] }, 
    { "name": "AIR FM gold Mumbai", "link": "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio007/hlspbaudio00732kbps.m3u8", "tags": ["Akashvani", "Marathi", "Hindi"] }, 
    { "name": "Akashvani Pune", "link": "https://d1tmej9eu7kw5c.cloudfront.net/7b3a089ab67dcf3c/7b3a089ab67dcf3c.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "AIR Pune", "link": "https://d1tmej9eu7kw5c.cloudfront.net/39d650ca0476a1fe/39d650ca0476a1fe.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Nanded", "link": "https://d1cvqgmbcpg5yn.cloudfront.net/111df0bc650820de/111df0bc650820de.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Dharashiv", "link": "https://d1tmej9eu7kw5c.cloudfront.net/9292ab34adae1d38/9292ab34adae1d38.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Akola", "link": "https://d1tmej9eu7kw5c.cloudfront.net/5dd27f81c839f0f5/5dd27f81c839f0f5.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "AIR Chh. Sambhajinagar", "link": "https://d1cvqgmbcpg5yn.cloudfront.net/0aa149c510dd74a3/0aa149c510dd74a3.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Yavatmal", "link": "https://d1tmej9eu7kw5c.cloudfront.net/b8a30c8945577840/b8a30c8945577840.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Parbhani", "link": "https://d3hrxqn1tritdh.cloudfront.net/825fdd17744384f5/825fdd17744384f5.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Puneri Awaj 107.8 FM", "link": "https://icecast.bkwsu.eu/radio-awaz-pune.mp3", "tags": ["Marathi"] }, 
    { "name": "Akashvani Nagpur", "link": "https://d1tmej9eu7kw5c.cloudfront.net/84ad8273437552d7/84ad8273437552d7.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "VBS Nagpur", "link": "https://d3hrxqn1tritdh.cloudfront.net/019f90c3d79daeb9/019f90c3d79daeb9.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Radio Indus", "link": "https://stream-18.zeno.fm/48kybvzrwfeuv?zs=uuPy82hBRHezlbF8-6rfMA", "tags": ["Marathi"] }, 
    { "name": "Akashvani Amravati", "link": "https://d1tmej9eu7kw5c.cloudfront.net/662185c15bea296f/662185c15bea296f.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Chandrapur", "link": "https://radio.wavespb.com/live/8469b942291df38f/8469b942291df38f.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Radio Deogiri 91.2 FM", "link": "https://a7.asurahosting.com/listen/radio_deogiri/radio.mp3", "tags": ["Marathi"] }, 
    { "name": "Akashvani Dhule", "link": "https://d1tmej9eu7kw5c.cloudfront.net/c0040b54233d76a1/c0040b54233d76a1.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Sindhudurg", "link": "https://d3hrxqn1tritdh.cloudfront.net/77aa8f10f47897a3/77aa8f10f47897a3.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "AIR Mumbai Asmita", "link": "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio010/hlspbaudio01032kbps.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Vividh Bharti Mumbai", "link": "https://d1tmej9eu7kw5c.cloudfront.net/146ed6ec6dea5a24/146ed6ec6dea5a24.m3u8", "tags": ["Akashvani", "Marathi", "Hindi"] }, 
    { "name": "Akashvani Nashik", "link": "https://d1tmej9eu7kw5c.cloudfront.net/810a1db2ef684745/810a1db2ef684745.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Satara", "link": "https://radio.wavespb.com/live/6878cc031c86befd/6878cc031c86befd.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Solapur", "link": "https://d1tmej9eu7kw5c.cloudfront.net/2792d5e06dbdc800/2792d5e06dbdc800.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Jalgaon", "link": "https://d1cvqgmbcpg5yn.cloudfront.net/bd41e24a31710397/bd41e24a31710397.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Sangli", "link": "https://d1cvqgmbcpg5yn.cloudfront.net/545fd5bb6cc5929b/545fd5bb6cc5929b.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Kolhapur", "link": "https://d3hrxqn1tritdh.cloudfront.net/7f050cef66718f7a/7f050cef66718f7a.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "AIR Ahilyanagar", "link": "https://d1tmej9eu7kw5c.cloudfront.net/e52945b98fa63678/e52945b98fa63678.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Beed", "link": "https://d1tmej9eu7kw5c.cloudfront.net/3f62bdf39635ed61/3f62bdf39635ed61.m3u8", "tags": ["Akashvani", "Marathi"] }, 
    { "name": "Akashvani Ratnagiri", "link": "https://d1cvqgmbcpg5yn.cloudfront.net/615b82703c7e8a4c/615b82703c7e8a4c.m3u8", "tags": ["Akashvani", "Marathi"] }
];
        const clusters = ["d1cvqgmbcpg5yn", "d3hrxqn1tritdh", "d1tmej9eu7kw5c", "dgnlfn5aus0c6", "dz1aqwz3bmbil", "airhlspush"];

        // ===== Adaptive performance profiles =====
        const performanceModeSelect = document.getElementById('performanceModeSelect');
        const PERFORMANCE_MODES = ['auto', 'low', 'balanced', 'high'];
        function detectPerformanceMode() {
            const memory = Number(navigator.deviceMemory || 0);
            const cores = Number(navigator.hardwareConcurrency || 0);
            if ((memory && memory <= 2) || (cores && cores <= 2)) return 'low';
            if ((memory >= 6 && cores >= 6) || memory >= 8) return 'high';
            return 'balanced';
        }
        function resolvePerformanceMode(mode) { return mode === 'auto' ? detectPerformanceMode() : mode; }
        let requestedPerformanceMode = (() => {
            try {
                const saved = localStorage.getItem('radioHavokkPerformanceMode');
                return PERFORMANCE_MODES.includes(saved) ? saved : 'auto';
            } catch (_) { return 'auto'; }
        })();
        let performanceMode = resolvePerformanceMode(requestedPerformanceMode);
        function applyPerformanceMode() {
            performanceMode = resolvePerformanceMode(requestedPerformanceMode);
            document.documentElement.dataset.performanceMode = performanceMode;
            if (performanceModeSelect) {
                performanceModeSelect.value = requestedPerformanceMode;
                performanceModeSelect.title = requestedPerformanceMode === 'auto'
                    ? 'Auto: detected ' + performanceMode + ' profile'
                    : 'Performance profile: ' + performanceMode;
            }
        }
        if (performanceModeSelect) performanceModeSelect.addEventListener('change', () => {
            requestedPerformanceMode = PERFORMANCE_MODES.includes(performanceModeSelect.value) ? performanceModeSelect.value : 'auto';
            try { localStorage.setItem('radioHavokkPerformanceMode', requestedPerformanceMode); } catch (_) {}
            applyPerformanceMode();
        });
        applyPerformanceMode();

        // ===== Chrome / Android lock-screen media controls =====
        function updateMediaSessionStation(item) {
            if (!('mediaSession' in navigator) || !item) return;
            try {
                if ('MediaMetadata' in window) navigator.mediaSession.metadata = new MediaMetadata({
                    title: item.name, artist: 'Live Radio', album: 'Radio Havokk',
                    artwork: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }]
                });
                navigator.mediaSession.playbackState = isPlayingState ? 'playing' : 'paused';
            } catch (error) { console.debug('Media Session metadata unavailable:', error); }
        }
        function setupMediaSessionActions() {
            if (!('mediaSession' in navigator)) return;
            const handlers = {
                play: () => { if (globalActiveIndex !== null && audioEngineNode.paused) audioEngineNode.play().then(triggerPlayStateUI).catch(triggerErrorStateUI); },
                pause: () => audioEngineNode.pause(),
                stop: () => audioEngineNode.pause(),
                nexttrack: () => { if (globalActiveIndex !== null) { const i = (globalActiveIndex + 1) % radioDatabase.length; bootStreamEngine(radioDatabase[i], i); } },
                previoustrack: () => { if (globalActiveIndex !== null) { const i = (globalActiveIndex - 1 + radioDatabase.length) % radioDatabase.length; bootStreamEngine(radioDatabase[i], i); } }
            };
            Object.entries(handlers).forEach(([action, handler]) => { try { navigator.mediaSession.setActionHandler(action, handler); } catch (_) {} });
        }
        setupMediaSessionActions();


        let activeTagFilter = 'all';
        let filterSearchText = '';
        let currentHlsEngineInstance = null;
        let globalActiveIndex = null;
        let isPlayingState = false;

       let favoritesList = [];
        try {
            let parsed = JSON.parse(localStorage.getItem('radioFavorites'));
            favoritesList = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            favoritesList = [];
        }

        const gridNode = document.getElementById('cardsLayoutGrid');
        const searchNode = document.getElementById('globalSearch');
        const audioEngineNode = document.getElementById('audioStreamingEngine');
        const footerTitleNode = document.getElementById('footerTitle');
        const footerSubtitleNode = document.getElementById('footerSubtitle');
        const waveIconNode = document.getElementById('playingWaveIcon');
        const bottomPlayPauseBtn = document.getElementById('bottomPlayPauseBtn');
        const mobilePlayPauseBtn = document.getElementById('mobilePlayPauseBtn');
        const dockPlayIcon = document.getElementById('dockPlayIcon'); 
        const mobileDockPlayIcon = document.getElementById('mobileDockPlayIcon');
        const volumeSlider = document.getElementById('volumeSlider');

        // ====== Advanced 10-Band EQ + Spatial Audio Engine ======
        // ====== 5-Band EQ + Full Spatial Audio Engine ======
        const EQ_BANDS = [
            { label: "60", frequency: 60 }, { label: "250", frequency: 250 },
            { label: "1k", frequency: 1000 }, { label: "4k", frequency: 4000 },
            { label: "16k", frequency: 16000 }
        ];
        const EQ_PRESETS = {
            Flat: [0, 0, 0, 0, 0],
            Rock: [5, 2, -1, 3, 5],
            Pop: [0, 4, 1, 3, 1],
            Classical: [4, 1, -1, 2, 4],
            Vocal: [-2, 3, 5, 2, -1],
            Jazz: [3, -1, 2, 3, 3],
            EDM: [5, -1, 3, 2, 5],
            Acoustic: [2, 0, 3, 2, 2],
            "Hip-Hop": [5, 1, 0, 2, -1],
            Podcast: [-1, 4, 4, 0, -3]
        };
        let audioCtx = null, sourceNode = null, preampNode = null, eqFilters = [], bassFilter = null, trebleFilter = null;
        let splitter = null, merger = null, crossDelayL = null, crossDelayR = null;
        let monoInputL = null, monoInputR = null, monoBus = null;
        let crossGainL = null, crossGainR = null, directGainL = null, directGainR = null;
        let convolver = null, reverbWet = null, reverbDry = null;
        let compressorNode = null, masterGainNode = null, stereoPannerNode = null;
        let eqEnabled = localStorage.getItem('radioHavokkEQEnabled') === 'true';
        let eqBypassGain = null, eqEffectsGain = null;
        const eqMasterToggleBtn = document.getElementById('eqMasterToggleBtn');
        const eqMasterToggleText = document.getElementById('eqMasterToggleText');
        const eqToggleBtn = document.getElementById('eqToggleBtn');
        const eqStatusText = document.getElementById('eqStatusText');
        const eqPanel = document.getElementById('eqPanel');
        const eqBandsNode = document.getElementById('eqBands');
        const eqEngineStatus = document.getElementById('eqEngineStatus');
        const EQ_DEFAULT_STATE = { bands: [...EQ_PRESETS.Flat], bass: 0, treble: 0, preamp: 0, compression: 0, balance: 0, ambience: 0, surround: 0, mono: false };
        let eqState = (() => {
            try {
                const saved = JSON.parse(localStorage.getItem('radioHavokkEQ'));
                if (!saved || typeof saved !== 'object') return { ...EQ_DEFAULT_STATE, bands: [...EQ_DEFAULT_STATE.bands] };
                return {
                    ...EQ_DEFAULT_STATE,
                    ...saved,
                    bands: Array.isArray(saved.bands)
                        ? (saved.bands.length === EQ_BANDS.length
                            ? saved.bands
                            : saved.bands.length === 15
                                ? [[0,1,2],[3,4,5],[6,7,8],[9,10,11],[12,13,14]].map(group =>
                                    Math.round(group.reduce((sum, index) => sum + (Number(saved.bands[index]) || 0), 0) / group.length))
                                : [...EQ_DEFAULT_STATE.bands]
                          ).map(value => Math.max(-12, Math.min(12, Number(value) || 0)))
                        : [...EQ_DEFAULT_STATE.bands],
                    mono: Boolean(saved.mono)
                };
            } catch (error) {
                return { ...EQ_DEFAULT_STATE, bands: [...EQ_DEFAULT_STATE.bands] };
            }
        })();

        function saveEQState() {
            try { localStorage.setItem('radioHavokkEQ', JSON.stringify(eqState)); } catch (error) { /* storage may be unavailable */ }
        }

        function buildEQControls() {
            eqBandsNode.innerHTML = EQ_BANDS.map((band, index) => `
                <label class="eq-band">
                    <span class="eq-band-value" id="eqValue${index}">0</span>
                    <input type="range" min="-12" max="12" step="1" value="0"
                        data-band="${index}" aria-label="${band.frequency} Hz gain">
                    <span class="eq-band-frequency">${band.label}<small>Hz</small></span>
                </label>`).join('');
            eqBandsNode.querySelectorAll('input[data-band]').forEach(input => {
                input.addEventListener('input', () => {
                    const i = Number(input.dataset.band);
                    eqState.bands[i] = Number(input.value);
                    document.getElementById('eqValue' + i).textContent = input.value > 0 ? '+' + input.value : input.value;
                    applyEQSettings();
                    setActivePreset(null);
                });
            });
        }

        function makeReverbImpulse(ctx) {
            const reverbSeconds = performanceMode === 'low' ? 0.8 : performanceMode === 'balanced' ? 1.5 : 2.4;
            const length = Math.floor(ctx.sampleRate * reverbSeconds);
            const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
            for (let channel = 0; channel < 2; channel++) {
                const data = impulse.getChannelData(channel);
                for (let i = 0; i < length; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.2);
                }
            }
            return impulse;
        }

        function initAudioEQ() {
            if (audioCtx) return true;
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                sourceNode = audioCtx.createMediaElementSource(audioEngineNode);
                // Keep a direct, bit-clean route available for master EQ bypass.
                eqBypassGain = audioCtx.createGain();
                eqEffectsGain = audioCtx.createGain();
                sourceNode.connect(eqBypassGain);
                eqBypassGain.connect(audioCtx.destination);
                preampNode = audioCtx.createGain();
                eqFilters = EQ_BANDS.map((band, index) => {
                    const filter = audioCtx.createBiquadFilter();
                    filter.type = 'peaking';
                    filter.frequency.value = band.frequency;
                    filter.Q.value = 1.0;
                    filter.gain.value = eqState.bands[index];
                    return filter;
                });
                bassFilter = audioCtx.createBiquadFilter();
                bassFilter.type = 'lowshelf';
                bassFilter.frequency.value = 95;
                bassFilter.gain.value = eqState.bass;
                trebleFilter = audioCtx.createBiquadFilter();
                trebleFilter.type = 'highshelf';
                trebleFilter.frequency.value = 6500;
                trebleFilter.gain.value = eqState.treble;

                sourceNode.connect(preampNode);
                eqFilters.reduce((previous, current) => {
                    previous.connect(current);
                    return current;
                }, preampNode).connect(bassFilter);
                bassFilter.connect(trebleFilter);

                // Stereo cross-feed creates a wider headphone/speaker image.
                splitter = audioCtx.createChannelSplitter(2);
                merger = audioCtx.createChannelMerger(2);
                directGainL = audioCtx.createGain(); directGainR = audioCtx.createGain();
                crossGainL = audioCtx.createGain(); crossGainR = audioCtx.createGain();
                crossDelayL = audioCtx.createDelay(0.04); crossDelayR = audioCtx.createDelay(0.04);
                monoInputL = audioCtx.createGain(); monoInputR = audioCtx.createGain(); monoBus = audioCtx.createGain();
                monoInputL.gain.value = 0.5; monoInputR.gain.value = 0.5; monoBus.gain.value = 0;
                trebleFilter.connect(splitter);
                splitter.connect(directGainL, 0); directGainL.connect(merger, 0, 0);
                splitter.connect(directGainR, 1); directGainR.connect(merger, 0, 1);
                splitter.connect(crossDelayL, 0); crossDelayL.connect(crossGainL); crossGainL.connect(merger, 0, 1);
                splitter.connect(crossDelayR, 1); crossDelayR.connect(crossGainR); crossGainR.connect(merger, 0, 0);
                splitter.connect(monoInputL, 0); splitter.connect(monoInputR, 1);
                monoInputL.connect(monoBus); monoInputR.connect(monoBus);
                monoBus.connect(merger, 0, 0); monoBus.connect(merger, 0, 1);

                reverbDry = audioCtx.createGain();
                reverbWet = audioCtx.createGain();
                convolver = audioCtx.createConvolver();
                convolver.buffer = makeReverbImpulse(audioCtx);
                compressorNode = audioCtx.createDynamicsCompressor();
                compressorNode.knee.value = 6;
                compressorNode.attack.value = 0.003;
                compressorNode.release.value = 0.18;
                masterGainNode = audioCtx.createGain();
                stereoPannerNode = audioCtx.createStereoPanner();
                merger.connect(reverbDry);
                merger.connect(convolver);
                reverbDry.connect(compressorNode);
                convolver.connect(reverbWet);
                reverbWet.connect(compressorNode);
                compressorNode.connect(masterGainNode);
                masterGainNode.connect(stereoPannerNode);
                stereoPannerNode.connect(eqEffectsGain);
                eqEffectsGain.connect(audioCtx.destination);
                applyEQSettings();
                return true;
            } catch (error) {
                console.warn('Advanced audio processing unavailable:', error);
                eqEngineStatus.textContent = 'Audio effects unavailable for this stream/browser (CORS may be restricting audio access).';
                return false;
            }
        }

        function applyEQSettings() {
            saveEQState();
            if (!audioCtx) return;
            eqFilters.forEach((filter, i) => filter.gain.setTargetAtTime(eqState.bands[i], audioCtx.currentTime, 0.025));
            preampNode.gain.setTargetAtTime(Math.pow(10, eqState.preamp / 20), audioCtx.currentTime, 0.025);
            bassFilter.gain.setTargetAtTime(eqState.bass, audioCtx.currentTime, 0.025);
            trebleFilter.gain.setTargetAtTime(eqState.treble, audioCtx.currentTime, 0.025);
            stereoPannerNode.pan.setTargetAtTime(eqState.balance / 100, audioCtx.currentTime, 0.03);
            const compression = eqState.compression / 100;
            compressorNode.threshold.setTargetAtTime(compression ? -6 - compression * 20 : 0, audioCtx.currentTime, 0.04);
            compressorNode.ratio.setTargetAtTime(compression ? 1 + compression * 11 : 1, audioCtx.currentTime, 0.04);
            compressorNode.knee.setTargetAtTime(compression ? 6 : 0, audioCtx.currentTime, 0.04);
            const width = eqState.surround / 100;
            const cross = width * 0.28;
            const stereoOn = !eqState.mono;
            directGainL.gain.setTargetAtTime(stereoOn ? 1 - cross * 0.35 : 0, audioCtx.currentTime, 0.03);
            directGainR.gain.setTargetAtTime(stereoOn ? 1 - cross * 0.35 : 0, audioCtx.currentTime, 0.03);
            crossGainL.gain.setTargetAtTime(stereoOn ? cross : 0, audioCtx.currentTime, 0.03);
            crossGainR.gain.setTargetAtTime(stereoOn ? cross : 0, audioCtx.currentTime, 0.03);
            monoBus.gain.setTargetAtTime(eqState.mono ? 1 : 0, audioCtx.currentTime, 0.03);
            crossDelayL.delayTime.setTargetAtTime(0.008 + width * 0.012, audioCtx.currentTime, 0.03);
            crossDelayR.delayTime.setTargetAtTime(0.012 + width * 0.012, audioCtx.currentTime, 0.03);
            const wet = eqState.ambience / 100 * 0.45;
            reverbWet.gain.setTargetAtTime(wet, audioCtx.currentTime, 0.04);
            reverbDry.gain.setTargetAtTime(1 - wet * 0.35, audioCtx.currentTime, 0.04);
            // Crossfade the complete processing chain against the untouched source.
            // All EQ values remain stored while bypassed and return unchanged on re-enable.
            eqBypassGain.gain.setTargetAtTime(eqEnabled ? 0 : 1, audioCtx.currentTime, 0.035);
            eqEffectsGain.gain.setTargetAtTime(eqEnabled ? 1 : 0, audioCtx.currentTime, 0.035);
        }

        function syncEQMasterButton() {
            if (!eqMasterToggleBtn) return;
            eqMasterToggleBtn.classList.toggle('is-on', eqEnabled);
            eqMasterToggleBtn.setAttribute('aria-pressed', String(eqEnabled));
            eqMasterToggleText.textContent = eqEnabled ? 'EQ ON' : 'EQ OFF';
            eqStatusText.textContent = eqEnabled ? 'EQ On' : 'EQ Off';
        }

        function toggleEQMaster() {
            eqEnabled = !eqEnabled;
            try { localStorage.setItem('radioHavokkEQEnabled', String(eqEnabled)); } catch (_) {}
            syncEQMasterButton();
            if (globalActiveIndex !== null) {
                const ready = initAudioEQ();
                if (ready) {
                    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
                    applyEQSettings();
                    eqEngineStatus.textContent = eqEnabled ? 'All equalizer effects are ON' : 'Clean original audio • Equalizer bypassed';
                }
            } else {
                eqEngineStatus.textContent = eqEnabled ? 'EQ enabled • Select a station to apply' : 'EQ off • Clean original audio';
            }
        }

        function syncEQUI() {
            eqBandsNode.querySelectorAll('input[data-band]').forEach(input => {
                const i = Number(input.dataset.band);
                input.value = eqState.bands[i];
                const value = eqState.bands[i];
                document.getElementById('eqValue' + i).textContent = value > 0 ? '+' + value : value;
            });
            document.getElementById('bassBoostSlider').value = eqState.bass;
            document.getElementById('bassBoostValue').textContent = eqState.bass + ' dB';
            document.getElementById('ambienceSlider').value = eqState.ambience;
            document.getElementById('ambienceValue').textContent = eqState.ambience + '%';
            document.getElementById('surroundSlider').value = eqState.surround;
            document.getElementById('surroundValue').textContent = eqState.surround + '%';
            document.getElementById('preampSlider').value = eqState.preamp;
            document.getElementById('preampValue').textContent = (eqState.preamp > 0 ? '+' : '') + eqState.preamp + ' dB';
            document.getElementById('trebleSlider').value = eqState.treble;
            document.getElementById('trebleValue').textContent = (eqState.treble > 0 ? '+' : '') + eqState.treble + ' dB';
            document.getElementById('compressionSlider').value = eqState.compression;
            document.getElementById('compressionValue').textContent = eqState.compression + '%';
            document.getElementById('balanceSlider').value = eqState.balance;
            document.getElementById('balanceValue').textContent = eqState.balance === 0 ? 'Center' : (eqState.balance < 0 ? 'L ' + Math.abs(eqState.balance) : 'R ' + eqState.balance);
            const monoButton = document.getElementById('monoToggleBtn');
            monoButton.classList.toggle('active', eqState.mono);
            monoButton.textContent = eqState.mono ? 'On' : 'Off';
        }

        function setActivePreset(name) {
            document.querySelectorAll('.eq-preset').forEach(button => button.classList.toggle('active', button.dataset.preset === name));
        }

        function setPreset(name) {
            if (!EQ_PRESETS[name]) return;
            eqState.bands = [...EQ_PRESETS[name]];
            if (name === 'Flat') {
                eqState.bass = 0; eqState.treble = 0; eqState.preamp = 0;
                eqState.compression = 0; eqState.balance = 0; eqState.ambience = 0; eqState.surround = 0; eqState.mono = false;
            }
            syncEQUI(); applyEQSettings(); setActivePreset(name); saveEQState();
        }

        function openEQPanel() {
            eqPanel.classList.add('open');
            eqPanel.setAttribute('aria-hidden', 'false');
            if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        }
        function closeEQPanel() {
            eqPanel.classList.remove('open');
            eqPanel.setAttribute('aria-hidden', 'true');
        }

        buildEQControls();
        syncEQUI();
        syncEQMasterButton();
        saveEQState();
        eqToggleBtn.addEventListener('click', () => {
            openEQPanel();
            if (globalActiveIndex !== null) {
                const ok = initAudioEQ();
                if (ok && audioCtx.state === 'suspended') audioCtx.resume();
                eqEngineStatus.textContent = ok ? (eqEnabled ? 'All equalizer effects are ON' : 'Clean original audio • Equalizer bypassed') : 'Effects could not be initialized';
            }
        });
        eqMasterToggleBtn.addEventListener('click', toggleEQMaster);
        document.getElementById('eqCloseBtn').addEventListener('click', closeEQPanel);
        eqPanel.addEventListener('click', event => { if (event.target === eqPanel) closeEQPanel(); });
        document.addEventListener('keydown', event => { if (event.key === 'Escape') closeEQPanel(); });
        document.querySelectorAll('.eq-preset').forEach(button => button.addEventListener('click', () => setPreset(button.dataset.preset)));
        document.getElementById('eqResetBtn').addEventListener('click', () => setPreset('Flat'));
        document.getElementById('bassBoostSlider').addEventListener('input', event => {
            eqState.bass = Number(event.target.value);
            document.getElementById('bassBoostValue').textContent = eqState.bass + ' dB';
            applyEQSettings();
        });
        document.getElementById('ambienceSlider').addEventListener('input', event => {
            eqState.ambience = Number(event.target.value);
            document.getElementById('ambienceValue').textContent = eqState.ambience + '%';
            applyEQSettings();
        });
        document.getElementById('surroundSlider').addEventListener('input', event => {
            eqState.surround = Number(event.target.value);
            document.getElementById('surroundValue').textContent = eqState.surround + '%';
            applyEQSettings();
        });
        document.getElementById('preampSlider').addEventListener('input', event => {
            eqState.preamp = Number(event.target.value);
            document.getElementById('preampValue').textContent = (eqState.preamp > 0 ? '+' : '') + eqState.preamp + ' dB';
            applyEQSettings(); setActivePreset(null);
        });
        document.getElementById('trebleSlider').addEventListener('input', event => {
            eqState.treble = Number(event.target.value);
            document.getElementById('trebleValue').textContent = (eqState.treble > 0 ? '+' : '') + eqState.treble + ' dB';
            applyEQSettings(); setActivePreset(null);
        });
        document.getElementById('compressionSlider').addEventListener('input', event => {
            eqState.compression = Number(event.target.value);
            document.getElementById('compressionValue').textContent = eqState.compression + '%';
            applyEQSettings(); setActivePreset(null);
        });
        document.getElementById('balanceSlider').addEventListener('input', event => {
            eqState.balance = Number(event.target.value);
            document.getElementById('balanceValue').textContent = eqState.balance === 0 ? 'Center' : (eqState.balance < 0 ? 'L ' + Math.abs(eqState.balance) : 'R ' + eqState.balance);
            applyEQSettings(); setActivePreset(null);
        });
        document.getElementById('monoToggleBtn').addEventListener('click', () => {
            eqState.mono = !eqState.mono;
            syncEQUI(); applyEQSettings(); setActivePreset(null);
        });

        // ====== Keyboard Shortcuts ======
        document.addEventListener('keydown', (e) => {
            if(document.activeElement.tagName === "INPUT") return; // Don't trigger if typing in search
            if (e.code === 'Space') {
                e.preventDefault();
                toggleGlobalPlayPause();
            } else if (e.code === 'ArrowUp') {
                e.preventDefault();
                audioEngineNode.volume = Math.min(1, audioEngineNode.volume + 0.1);
                volumeSlider.value = audioEngineNode.volume;
            } else if (e.code === 'ArrowDown') {
                e.preventDefault();
                audioEngineNode.volume = Math.max(0, audioEngineNode.volume - 0.1);
                volumeSlider.value = audioEngineNode.volume;
            } else if (e.code === 'KeyM') {
                audioEngineNode.muted = !audioEngineNode.muted;
            }
        });

        function toggleGlobalPlayPause() {
            if (globalActiveIndex === null) return;
            if (isPlayingState) audioEngineNode.pause();
            else audioEngineNode.play().then(() => triggerPlayStateUI()).catch(() => triggerErrorStateUI());
        }

        // ===========================================

        function buildInterfaceGrid() {
            gridNode.innerHTML = '';

            const datasets = radioDatabase.filter(item => {
                const isFav = favoritesList.includes(item.name);
                let filterMatch = false;
                if (activeTagFilter === 'all') filterMatch = true;
                else if (activeTagFilter === 'favorites') filterMatch = isFav;
                else filterMatch = item.tags.includes(activeTagFilter);

                const stringMatch = item.name.toLowerCase().includes(filterSearchText.toLowerCase()) ||
                    item.tags.some(tag => tag.toLowerCase().includes(filterSearchText.toLowerCase()));
                return filterMatch && stringMatch;
            });

            if (datasets.length === 0) {
                gridNode.innerHTML = `<div class="col-span-full py-16 text-center text-sm text-zinc-500 font-medium flex flex-col items-center gap-3"><i data-lucide="radio-receiver" class="w-10 h-10 opacity-50"></i>No stations found matching filters.</div>`;
                if(window.lucide) lucide.createIcons();
                return;
            }

            datasets.forEach((data) => {
                const card = document.createElement('div');
                const rawDbIndex = radioDatabase.findIndex(x => x.link === data.link && x.name === data.name);
                const isFav = favoritesList.includes(data.name);

                card.className = `station-card border border-white/5 p-4 rounded-2xl flex flex-col justify-between gap-3 relative overflow-hidden group cursor-pointer`;
                if (globalActiveIndex === rawDbIndex) card.classList.add('active-card');

                let playIcon = (globalActiveIndex === rawDbIndex && isPlayingState) ? 'pause' : 'play';
                let favIconClass = isFav ? 'text-red-500 fill-red-500' : 'text-zinc-500 hover:text-white';

                let chips = '';
                data.tags.slice(0, 2).forEach(tag => {
                    if (tag) chips += `<span class="bg-white/5 border border-white/10 text-zinc-400 text-[10px] px-2 py-0.5 rounded-full">${tag}</span>`;
                });

                const imgMarkup = data.logo ?
                    `<img src="${data.logo}" class="w-14 h-14 rounded-xl object-cover bg-black/50 border border-white/10 shadow-lg" alt="Logo">` :
                    `<div class="w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center shadow-lg"><i data-lucide="radio" class="w-6 h-6 text-zinc-400"></i></div>`;

                card.innerHTML = `
                    <div class="flex items-start justify-between w-full">
                        ${imgMarkup}
                        <button class="fav-btn p-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors z-10">
                            <i data-lucide="heart" class="w-4 h-4 ${favIconClass}"></i>
                        </button>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm text-zinc-100 truncate pr-8 group-hover:text-emerald-400 transition-colors">${data.name}</h3>
                        <div class="flex flex-wrap gap-1 mt-1.5 mb-2">${chips}</div>
                        <div class="now-playing mt-1 text-[11px]" data-stream-url="${encodeURIComponent(data.link)}">
                            <span><i data-lucide="music-4" class="w-3 h-3 inline pb-0.5"></i></span> Checking info...
                        </div>
                    </div>
                    
                    <button class="play-btn absolute bottom-4 right-4 w-10 h-10 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-100 translate-y-0 transition-all z-10 ${globalActiveIndex === rawDbIndex ? 'translate-y-0 opacity-100' : ''}">
                        <i data-lucide="${playIcon}" class="w-4 h-4 ${playIcon === 'play' ? 'ml-0.5' : ''} play-icon-node"></i>
                    </button>
                `;

                // card.addEventListener('click', (e) => {
                //     if(e.target.closest('.fav-btn') || e.target.closest('.play-btn')) return;
                //     if (globalActiveIndex !== rawDbIndex) bootStreamEngine(data, rawDbIndex);
                // });

                card.querySelector('.play-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (globalActiveIndex === rawDbIndex) {
                        toggleGlobalPlayPause();
                    } else {
                        bootStreamEngine(data, rawDbIndex);
                    }
                });

                card.querySelector('.fav-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(data.name);
                });

                gridNode.appendChild(card);
                observeNowPlayingCard(card);
            });
            
            if(window.lucide) lucide.createIcons();
        }

        const nowPlayingCache = new Map();
        const metadataInFlight = new Set();
        const nowPlayingObserver = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting || document.hidden) return;
                const node = entry.target.querySelector('.now-playing');
                if (node) loadNowPlaying(node);
            });
        }, { rootMargin: '120px 0px', threshold: 0.01 }) : null;

        function observeNowPlayingCard(card) {
            if (nowPlayingObserver) nowPlayingObserver.observe(card);
            else {
                const node = card.querySelector('.now-playing');
                if (node) loadNowPlaying(node);
            }
        }

        async function loadNowPlaying(node) {
            const encodedUrl = node.dataset.streamUrl;
            if (!encodedUrl) return;
            const storedStreamUrl = decodeURIComponent(encodedUrl);
            const streamUrl = storedStreamUrl === "https://stream.tamilfmradios.com/?url=http://198.245.61.103:8113/stream?type=http&nocache=2"
                ? "http://198.245.61.103:8113/stream?type=http&nocache=2"
                : storedStreamUrl;
            const cached = nowPlayingCache.get(streamUrl);
            if (cached && Date.now() - cached.checkedAt < 60000) {
                renderNowPlaying(node, cached);
                return;
            }
            if (metadataInFlight.has(streamUrl)) return;
            metadataInFlight.add(streamUrl);
            node.innerHTML = `<span><i data-lucide="music-4" class="w-3 h-3 inline pb-0.5"></i></span> Checking info...`;
            if(window.lucide) lucide.createIcons({root: node});
            
            try {
                const response = await fetch(`/api/now-playing?url=${encodeURIComponent(streamUrl)}`, { cache: 'no-store' });
                if (!response.ok) throw new Error('Metadata service unavailable');
                const result = await response.json();
                const value = { ...result, checkedAt: Date.now() };
                nowPlayingCache.set(streamUrl, value);
                renderNowPlaying(node, value);
            } catch (error) {
                const value = { title: '', message: 'Song info unavailable', checkedAt: Date.now() };
                nowPlayingCache.set(streamUrl, value);
                renderNowPlaying(node, value);
            } finally {
                metadataInFlight.delete(streamUrl);
            }
        }

        function renderNowPlaying(node, result) {
            if (!node.isConnected) return;
            node.classList.remove('is-scrolling');
            if (result.title) {
                const fullText = `🎵 ${result.title}`;
                const track = document.createElement('span');
                track.className = 'now-playing-track';
                const firstCopy = document.createElement('span');
                firstCopy.className = 'now-playing-copy';
                firstCopy.textContent = fullText;
                const secondCopy = document.createElement('span');
                secondCopy.className = 'now-playing-copy';
                secondCopy.setAttribute('aria-hidden', 'true');
                secondCopy.textContent = fullText;
                track.append(firstCopy, secondCopy);
                node.replaceChildren(track);
                node.title = result.title;

                requestAnimationFrame(() => {
                    if (node.isConnected && firstCopy.scrollWidth > node.clientWidth) {
                        node.classList.add('is-scrolling');
                    }
                });
            } else {
                node.textContent = result.message || 'Song info unavailable';
                node.title = node.textContent;
            }
        }

        setInterval(() => {
            if (document.hidden) return; // Keep background work quiet; audio playback remains untouched.
            document.querySelectorAll('.station-card .now-playing').forEach(node => {
                const rect = node.getBoundingClientRect();
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    const url = decodeURIComponent(node.dataset.streamUrl || '');
                    nowPlayingCache.delete(url);
                    loadNowPlaying(node);
                }
            });
        }, 60000);

        function toggleFavorite(stationName) {
            const idx = favoritesList.indexOf(stationName);
            if (idx > -1) favoritesList.splice(idx, 1);
            else favoritesList.push(stationName);
            localStorage.setItem('radioFavorites', JSON.stringify(favoritesList));
            buildInterfaceGrid();
        }

        async function runMatrixResolution(url) {
            if (!url.includes('cloudfront.net') && !url.includes('bitgravity.com')) return url;
            footerSubtitleNode.textContent = "Checking primary matrix cluster...";
            try {
                const controller = new AbortController();
                setTimeout(() => controller.abort(), 2000);
                const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
                if (res.status === 200) return url;
            } catch (e) { }

            footerSubtitleNode.textContent = "Resolving fallback servers...";
            for (let chunk of clusters) {
                let cleanUrl = url;
                if (url.includes('cloudfront.net')) cleanUrl = url.replace(/https:\/\/[^\/]+/, `https://${chunk}.cloudfront.net`);
                else if (url.includes('bitgravity.com')) cleanUrl = url.replace(/https:\/\/[^\/]+/, `https://${chunk}.pc.cdn.bitgravity.com`);
                try {
                    const ctrl = new AbortController();
                    setTimeout(() => ctrl.abort(), 1500);
                    const test = await fetch(cleanUrl, { method: 'HEAD', signal: ctrl.signal });
                    if (test.status === 200) return cleanUrl;
                } catch (err) { }
            }
            return url;
        }

        async function bootStreamEngine(item, databaseIndex) {
            updateMediaSessionStation(item);
            if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
            globalActiveIndex = databaseIndex;
            isPlayingState = false;
            buildInterfaceGrid();

            if (currentHlsEngineInstance) {
                currentHlsEngineInstance.destroy();
                currentHlsEngineInstance = null;
            }
            audioEngineNode.pause();
            audioEngineNode.src = '';

            if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
            footerTitleNode.textContent = item.name;
            footerSubtitleNode.textContent = "Connecting to transmission link...";
            
            waveIconNode.innerHTML = `<i data-lucide="loader-2" class="w-6 h-6 animate-spin text-emerald-400"></i>`;
            waveIconNode.className = "w-12 h-12 bg-emerald-900/30 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400";
            if(window.lucide) lucide.createIcons({ root: waveIconNode });

            const targetStreamRoute = item.link === "http://s5.voscast.com:8216/stream"
                ? "/api/stream"
                : item.link === "https://stream.tamilfmradios.com/?url=http://198.245.61.103:8113/stream?type=http&nocache=2"
                    ? "/api/smile-fm"
                    : await runMatrixResolution(item.link);

            if (targetStreamRoute.includes('.m3u8')) {
                if (Hls.isSupported()) {
                    const profile = {
                        low: { maxBufferLength: 6, maxMaxBufferLength: 10, maxBufferSize: 8 * 1024 * 1024, backBufferLength: 12 },
                        balanced: { maxBufferLength: 10, maxMaxBufferLength: 16, maxBufferSize: 16 * 1024 * 1024, backBufferLength: 24 },
                        high: { maxBufferLength: 14, maxMaxBufferLength: 22, maxBufferSize: 24 * 1024 * 1024, backBufferLength: 36 }
                    }[performanceMode] || { maxBufferLength: 10, maxMaxBufferLength: 16, maxBufferSize: 16 * 1024 * 1024, backBufferLength: 24 };
                    const hls = new Hls({
                        enableWorker: performanceMode !== 'low', lowLatencyMode: false,
                        maxBufferLength: profile.maxBufferLength, maxMaxBufferLength: profile.maxMaxBufferLength,
                        maxBufferSize: profile.maxBufferSize, backBufferLength: profile.backBufferLength,
                        liveSyncDuration: 6, liveMaxLatencyDuration: 12,
                        manifestLoadingTimeOut: 15000, fragLoadingTimeOut: 20000
                    });
                    currentHlsEngineInstance = hls;
                    let networkRetries = 0, mediaRecoveries = 0;
                    hls.loadSource(targetStreamRoute);
                    hls.attachMedia(audioEngineNode);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => audioEngineNode.play().then(triggerPlayStateUI).catch(triggerErrorStateUI));
                    hls.on(Hls.Events.ERROR, (event, data) => {
                        if (!data.fatal || currentHlsEngineInstance !== hls) return;
                        if (data.type === Hls.ErrorTypes.NETWORK_ERROR && networkRetries < 4) {
                            networkRetries += 1;
                            const delay = Math.min(1000 * (2 ** (networkRetries - 1)), 8000);
                            footerSubtitleNode.textContent = 'Connection interrupted • retrying...';
                            window.setTimeout(() => { if (currentHlsEngineInstance === hls) hls.startLoad(); }, delay);
                        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR && mediaRecoveries < 2) {
                            mediaRecoveries += 1;
                            footerSubtitleNode.textContent = 'Recovering audio decoder...';
                            try { hls.recoverMediaError(); } catch (_) { triggerErrorStateUI(); }
                        } else {
                            footerSubtitleNode.textContent = 'Stream connection failed. Try this station again.';
                            hls.destroy();
                            if (currentHlsEngineInstance === hls) currentHlsEngineInstance = null;
                            triggerErrorStateUI();
                        }
                    });
                } else if (audioEngineNode.canPlayType('application/vnd.apple.mpegurl')) {
                    audioEngineNode.src = targetStreamRoute;
                    audioEngineNode.play().then(() => triggerPlayStateUI()).catch(() => triggerErrorStateUI());
                } else {
                    footerSubtitleNode.textContent = "HLS stream execution failure.";
                }
            } else {
                audioEngineNode.src = targetStreamRoute;
                audioEngineNode.play().then(() => triggerPlayStateUI()).catch(() => triggerErrorStateUI());
            }
        }

        function triggerPlayStateUI() {
            isPlayingState = true;
            if (globalActiveIndex !== null) updateMediaSessionStation(radioDatabase[globalActiveIndex]);
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
            footerSubtitleNode.textContent = "Playing Live Broadcast";
            
            waveIconNode.innerHTML = `<i data-lucide="radio-tower" class="w-6 h-6"></i>`;
            waveIconNode.className = "w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400 animate-pulse shrink-0";
            
            // Naya code: Har baar naya icon select karo
            const currentDockIcon = document.getElementById('dockPlayIcon');
            const currentMobileDockIcon = document.getElementById('mobileDockPlayIcon');

            if(currentDockIcon) {
                currentDockIcon.setAttribute('data-lucide', 'pause');
                currentDockIcon.classList.remove('ml-1'); 
            }
            if(currentMobileDockIcon) {
                currentMobileDockIcon.setAttribute('data-lucide', 'pause');
                currentMobileDockIcon.classList.remove('ml-0.5');
            }
            
            if(window.lucide) lucide.createIcons();
            syncCardPlayButtons();
        }

        function triggerPauseStateUI() {
            isPlayingState = false;
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
            footerSubtitleNode.textContent = "Broadcast Paused";
            
            waveIconNode.innerHTML = `<i data-lucide="music" class="w-4 h-4 sm:w-5 sm:h-5"></i>`;
            waveIconNode.className = "w-10 h-10 sm:w-12 sm:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-500 shrink-0";
            
            // Naya code: Har baar naya icon select karo
            const currentDockIcon = document.getElementById('dockPlayIcon');
            const currentMobileDockIcon = document.getElementById('mobileDockPlayIcon');

            if(currentDockIcon) {
                currentDockIcon.setAttribute('data-lucide', 'play');
                currentDockIcon.classList.add('ml-1');
            }
            if(currentMobileDockIcon) {
                currentMobileDockIcon.setAttribute('data-lucide', 'play');
                currentMobileDockIcon.classList.add('ml-0.5');
            }
            
            if(window.lucide) lucide.createIcons();
            syncCardPlayButtons();
        }

        function triggerErrorStateUI() {
            isPlayingState = false;
            footerSubtitleNode.textContent = "Stream offline or failed.";
            waveIconNode.innerHTML = `<i data-lucide="triangle-alert" class="w-5 h-5 sm:w-6 sm:h-6"></i>`;
            waveIconNode.className = "w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center text-red-400 shrink-0";
            
            if(dockPlayIcon) {
                dockPlayIcon.setAttribute('data-lucide', 'play');
                dockPlayIcon.classList.add('ml-1');
            }
            if(mobileDockPlayIcon) {
                mobileDockPlayIcon.setAttribute('data-lucide', 'play');
                mobileDockPlayIcon.classList.add('ml-0.5');
            }
            if(window.lucide) lucide.createIcons();
            buildInterfaceGrid();
        }

        function syncCardPlayButtons() {
            document.querySelectorAll('.station-card').forEach((card) => {
                const playBtn = card.querySelector('.play-icon-node');
                const btnParent = card.querySelector('.play-btn');
                if (card.classList.contains('active-card') && playBtn) {
                    playBtn.setAttribute('data-lucide', isPlayingState ? 'pause' : 'play');
                    if(isPlayingState) playBtn.classList.remove('ml-0.5'); else playBtn.classList.add('ml-0.5');
                    btnParent.classList.add('translate-y-0', 'opacity-100');
                } else if (playBtn) {
                    playBtn.setAttribute('data-lucide', 'play');
                    playBtn.classList.add('ml-0.5');
                    btnParent.classList.remove('translate-y-0', 'opacity-100');
                }
            });
            if(window.lucide) lucide.createIcons();
        }

        bottomPlayPauseBtn.addEventListener('click', toggleGlobalPlayPause);
        mobilePlayPauseBtn.addEventListener('click', toggleGlobalPlayPause);

        volumeSlider.addEventListener('input', (e) => audioEngineNode.volume = e.target.value);
        audioEngineNode.addEventListener('play', () => {
            if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
            if (!isPlayingState) triggerPlayStateUI();
        });
        audioEngineNode.addEventListener('pause', () => { if (isPlayingState) triggerPauseStateUI(); });
        audioEngineNode.addEventListener('waiting', () => { if (isPlayingState) footerSubtitleNode.textContent = 'Buffering live broadcast...'; });
        audioEngineNode.addEventListener('stalled', () => { if (isPlayingState) footerSubtitleNode.textContent = 'Stream stalled • waiting for connection...'; });
        audioEngineNode.addEventListener('playing', () => { if (!isPlayingState) triggerPlayStateUI(); });
        audioEngineNode.addEventListener('error', () => { if (globalActiveIndex !== null) triggerErrorStateUI(); });

        // Do not pause or recreate the media element when Chrome is minimized.
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                if (audioCtx && isPlayingState && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
                document.querySelectorAll('.station-card .now-playing').forEach(node => {
                    const url = decodeURIComponent(node.dataset.streamUrl || '');
                    const cached = nowPlayingCache.get(url);
                    if (!cached || Date.now() - cached.checkedAt >= 60000) loadNowPlaying(node);
                });
            }
        });
        window.addEventListener('pageshow', () => {
            if (audioCtx && isPlayingState && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
        });

        searchNode.addEventListener('input', (e) => {
            filterSearchText = e.target.value;
            buildInterfaceGrid();
        });

        // Updated Filter Tab Classes Logic
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-tab').forEach(t => {
                    t.className = "filter-tab inactive-filter-tab px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white flex items-center gap-2";
                });

                e.currentTarget.className = "filter-tab active-filter-tab px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border border-white/10 bg-white text-black shadow-md flex items-center gap-2";

                activeTagFilter = e.currentTarget.dataset.target;
                buildInterfaceGrid();
            });
        });

        buildInterfaceGrid();
