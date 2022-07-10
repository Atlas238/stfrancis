import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import '../styles/globals.css';
import { userService } from '../services/user.service';
import { Nav } from '../components/Nav';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // run auth check on initial load
        authCheck(router.asPath);

        // set authorized to false to hide page content while changing routes
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // run auth check on route change
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>St Francis House</title>
            </Head>

            <div className="container">
                <Nav />
                <div className="container px-2 py-4">
                    {authorized &&
                        <>
                            <Component {...pageProps} />
                        </>
                    }
                </div>
            </div>

            {/* credits */}
            <div className="text-center mt-4">
                <p>Copyright 2022 : The Saint Francis House Foundation</p>
            </div>
        </>
    );
}