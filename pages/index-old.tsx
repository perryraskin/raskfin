// const ClerkFeatures = () => (
//   <Link href="/user" className={styles.cardContent}>
//     <img alt="Explore Clerk components" src="/icons/layout.svg" />
//     <div>
//       <h3>Explore features provided by Clerk</h3>
//       <p>
//         Interact with the user button, user profile, and more to preview what
//         your users will see
//       </p>
//     </div>
//     <div className={styles.arrow}>
//       <img src="/icons/arrow-right.svg" />
//     </div>
//   </Link>
// )

// const SSRDemoLink = () => (
//   <Link href="/ssr-demo" className={styles.cardContent}>
//     <img alt="SSR demo" src="/icons/sparkles.svg" width={25} />
//     <div>
//       <h3>Visit the SSR demo page</h3>
//       <p>
//         See how Clerk hydrates the auth state during SSR and CSR, enabling
//         server-side generation even for authenticated pages
//       </p>
//     </div>
//     <div className={styles.arrow}>
//       <img src="/icons/arrow-right.svg" />
//     </div>
//   </Link>
// )

// const SignupLink = () => (
//   <Link href="/sign-up" className={styles.cardContent}>
//     <img alt="Sign up" src="/icons/user-plus.svg" />
//     <div>
//       <h3>Sign up for an account</h3>
//       <p>
//         Sign up and sign in to explore all the features provided by Clerk
//         out-of-the-box
//       </p>
//     </div>
//     <div className={styles.arrow}>
//       <img src="/icons/arrow-right.svg" />
//     </div>
//   </Link>
// )

// const apiSample = `
// import { getAuth } from "@clerk/nextjs/server";

// export default function handler(req, res) {
//   const { sessionId, userId } = getAuth(req);

//   if (!sessionId) {
//     return res.status(401).json({ id: null });
//   }
//   return res.status(200).json({ id: userId });
// };
// `.trim()

// Main component using <SignedIn> and <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering
// depending on whether or not a visitor is signed in.
//
// https://clerk.dev/docs/component-reference/signed-in
const Main = () => (
  <main
  // className={styles.main}
  >
    {/* <h1 className={styles.title}>Welcome to your new app</h1>
    <SignedIn>
      <p className={styles.description}>You have successfully signed in</p>
    </SignedIn>
    <SignedOut>
      <p className={styles.description}>
        Sign up for an account to get started
      </p>
    </SignedOut>

    <div className={styles.cards}>
      <SignedIn>
        <div className={styles.card}>
          <SSRDemoLink />
        </div>
        <div className={styles.card}>
          <ClerkFeatures />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={styles.card}>
          <SignupLink />
        </div>
      </SignedOut>

      <div className={styles.card}>
        <Link
          target="_blank"
          rel="noopener"
          className={styles.cardContent}
          href="https://dashboard.clerk.dev/last-active?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
        >
          <img src="/icons/settings.svg" />
          <div>
            <h3>Configure settings for your app</h3>
            <p>
              Visit Clerk to manage instances and configure settings for user
              management, theme, and more
            </p>
          </div>
          <div className={styles.arrow}>
            <img src="/icons/arrow-right.svg" />
          </div>
        </Link>
      </div>
    </div>

    <SignedIn>
      <APIRequest />
    </SignedIn>

    <div className={styles.links}>
      <Link
        target="_blank"
        rel="noopener"
        className={styles.link}
        href="https://clerk.dev/docs?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
      >
        <span className={styles.linkText}>Read Clerk documentation</span>
      </Link>
      <Link
        target="_blank"
        rel="noopener"
        className={styles.link}
        href="https://nextjs.org/docs"
      >
        <span className={styles.linkText}>Read NextJS documentation</span>
      </Link>
    </div> */}
  </main>
)

export default Main

// const APIRequest = () => {
//   React.useEffect(() => {
//     // @ts-ignore
//     if (window.Prism) {
//       // @ts-ignore
//       window.Prism.highlightAll()
//     }
//   })
//   const [response, setResponse] = React.useState(
//     "// Click above to run the request"
//   )
//   const makeRequest = async () => {
//     setResponse("// Loading...")

//     try {
//       const res = await fetch("/api/getAuthenticatedUserId")
//       const body = await res.json()
//       setResponse(JSON.stringify(body, null, "  "))
//     } catch (e) {
//       setResponse(
//         "// There was an error with the request. Please contact support@clerk.dev"
//       )
//     }
//   }
//   return (
//     <div className={styles.backend}>
//       <h2>API request example</h2>
//       <div className={styles.card}>
//         <a
//           target="_blank"
//           rel="noopener"
//           className={styles.cardContent}
//           onClick={() => makeRequest()}
//         >
//           <img src="/icons/server.svg" />
//           <div>
//             <h3>fetch('/api/getAuthenticatedUserId')</h3>
//             <p>
//               Retrieve the user ID of the signed in user, or null if there is no
//               user
//             </p>
//           </div>
//           <div className={styles.arrow}>
//             <img src="/icons/download.svg" />
//           </div>
//         </a>
//       </div>
//       <h4>
//         Response
//         <em>
//           <SignedIn>
//             You are signed in, so the request will return your user ID
//           </SignedIn>
//           <SignedOut>
//             You are signed out, so the request will return null
//           </SignedOut>
//         </em>
//       </h4>
//       <pre>
//         <code className="language-js">{response}</code>
//       </pre>
//       <h4>pages/api/getAuthenticatedUserId.js</h4>
//       <pre>
//         <code className="language-js">{apiSample}</code>
//       </pre>
//     </div>
//   )
// }

// // Footer component
// const Footer = () => (
//   <footer className={styles.footer}>
//     Powered by{" "}
//     <a
//       href="https://clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
//       target="_blank"
//       rel="noopener"
//     >
//       <img src="/clerk.svg" alt="Clerk" className={styles.logo} />
//     </a>
//     +
//     <a href="https://nextjs.org/" target="_blank" rel="noopener">
//       <img src="/nextjs.svg" alt="Next.js" className={styles.logo} />
//     </a>
//   </footer>
// )
