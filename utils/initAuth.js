// ./initAuth.js
import { init } from "next-firebase-auth";

const initAuth = () => {
  init({
    authPageURL: "/signin",
    appPageURL: "/dashboard",
    loginAPIEndpoint: "/api/auth/signin", // required
    logoutAPIEndpoint: "/api/auth/logout", // required
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: "climate-donor",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // The private key must not be accesssible on the client side.
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(
          /\\n/g,
          "\n"
        ),
      },
      databaseURL: "https://climate-donor.firebaseio.com",
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // required
      authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
      databaseURL: "https://climate-donor.firebaseio.com",
      storageBucket: "climate-donor.appspot.com",
      projectId: "climate-donor",
    },
    cookies: {
      name: "climate-donor", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // set this to false in local (non-HTTPS) development
      signed: false,
    },
  });
};

export default initAuth;
