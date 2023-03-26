/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ClerkLoading, SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import React from "react"
import Link from "next/link"

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

// // Main component using <SignedIn> and <SignedOut>.
// //
// // The SignedIn and SignedOut components are used to control rendering
// // depending on whether or not a visitor is signed in.
// //
// // https://clerk.dev/docs/component-reference/signed-in
// const Main = () => (
//   <main className={styles.main}>
//     <h1 className={styles.title}>Welcome to your new app</h1>
//     <SignedIn>
//       <p className={styles.description}>You have successfully signed in</p>
//     </SignedIn>
//     <SignedOut>
//       <p className={styles.description}>
//         Sign up for an account to get started
//       </p>
//     </SignedOut>

//     <div className={styles.cards}>
//       <SignedIn>
//         <div className={styles.card}>
//           <SSRDemoLink />
//         </div>
//         <div className={styles.card}>
//           <ClerkFeatures />
//         </div>
//       </SignedIn>
//       <SignedOut>
//         <div className={styles.card}>
//           <SignupLink />
//         </div>
//       </SignedOut>

//       <div className={styles.card}>
//         <Link
//           target="_blank"
//           rel="noopener"
//           className={styles.cardContent}
//           href="https://dashboard.clerk.dev/last-active?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
//         >
//           <img src="/icons/settings.svg" />
//           <div>
//             <h3>Configure settings for your app</h3>
//             <p>
//               Visit Clerk to manage instances and configure settings for user
//               management, theme, and more
//             </p>
//           </div>
//           <div className={styles.arrow}>
//             <img src="/icons/arrow-right.svg" />
//           </div>
//         </Link>
//       </div>
//     </div>

//     <SignedIn>
//       <APIRequest />
//     </SignedIn>

//     <div className={styles.links}>
//       <Link
//         target="_blank"
//         rel="noopener"
//         className={styles.link}
//         href="https://clerk.dev/docs?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
//       >
//         <span className={styles.linkText}>Read Clerk documentation</span>
//       </Link>
//       <Link
//         target="_blank"
//         rel="noopener"
//         className={styles.link}
//         href="https://nextjs.org/docs"
//       >
//         <span className={styles.linkText}>Read NextJS documentation</span>
//       </Link>
//     </div>
//   </main>
// )

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

import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  Grid,
  List,
  ListItem,
  Flex,
  Icon,
  Button,
  Bold,
  Metric,
  BarChart,
} from "@tremor/react"
import {
  BriefcaseIcon,
  ComputerDesktopIcon,
  ShieldExclamationIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  BoltIcon,
  HomeIcon,
  TruckIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon,
  ShoppingCartIcon,
  TvIcon,
} from "@heroicons/react/24/solid"
import dayjs from "dayjs"
import numeral from "numeral"
import { CategoryStat, StatsResponse } from "@/types"
import { categoryIconDict } from "@/constants/category-icons"
import { capitalize, classNames, valueFormatter } from "@/helpers"

const data = [
  {
    Month: "Jan 21",
    Failed: 2890,
    Completed: 1400,
    "In Progress": 4938,
  },
  {
    Month: "Feb 21",
    Failed: 1890,
    Completed: 998,
    "In Progress": 2938,
  },
  {
    Month: "Mar 21",
    Failed: 2190,
    Completed: 1400,
    "In Progress": 1638,
  },
  {
    Month: "Apr 21",
    Failed: 3470,
    Completed: 2108,
    "In Progress": 2138,
  },
  {
    Month: "May 21",
    Failed: 2170,
    Completed: 1800,
    "In Progress": 2142,
  },
  {
    Month: "Jun 21",
    Failed: 3170,
    Completed: 1800,
    "In Progress": 5120,
  },
  {
    Month: "Jul 21",
    Failed: 3490,
    Completed: 2300,
    "In Progress": 3890,
  },
  {
    Month: "Aug 21",
    Failed: 2190,
    Completed: 1100,
    "In Progress": 3165,
  },
  {
    Month: "Sep 21",
    Failed: 3344,
    Completed: 1934,
    "In Progress": 1945,
  },
  {
    Month: "Oct 21",
    Failed: 1564,
    Completed: 1245,
    "In Progress": 2345,
  },
  {
    Month: "Nov 21",
    Failed: 3345,
    Completed: 2654,
    "In Progress": 4845,
  },
  {
    Month: "Dec 21",
    Failed: 2740,
    Completed: 2421,
    "In Progress": 2945,
  },
  {
    Month: "Jan 22",
    Failed: 3890,
    Completed: 2980,
    "In Progress": 2645,
  },
]
const Home = () => {
  const { user } = useUser()
  const [loading, setLoading] = React.useState(true)
  const [selectedView, setSelectedView] = React.useState("1")
  const [months, setMonths] = React.useState<CategoryStat[]>([])

  React.useEffect(() => {
    const getMonths = async () => {
      setLoading(true)
      const statsRes = await fetch("/api/stats")
      const stats: StatsResponse = await statsRes.json()
      const _months = stats.months
      _months.forEach((month) => {
        const _3rdAmount = month.dataList[2]?.amount || 0
        month.dataList.forEach((category, i) => {
          if (category.amount < _3rdAmount) {
            delete month.dataList[i]
          }
          //
          else {
            // @ts-ignore
            // console.log(category)
            // @ts-ignore
            category.icon = categoryIconDict[category.name]?.icon
            // @ts-ignore
            category.color = categoryIconDict[category.name]?.color
          }
        })
      })

      console.log(_months)
      setMonths(_months)
      setLoading(false)
    }
    if (user) getMonths()
  }, [user])

  if (!user) return <></>
  return (
    <main className="max-w-7xl mx-auto mt-10 px-4 xl:px-0">
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab value="1" text="Categories" />
        <Tab value="2" text="Accounts" />
      </TabList>

      {selectedView === "1" ? (
        <>
          <Grid numColsSm={2} numColsLg={3} className="gap-6 mt-4">
            {loading
              ? [1, 2, 3].map((i) => (
                  <Card key={i} className="shadow-md">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-300 rounded"></div>
                          <div className="h-4 bg-slate-300 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              : months.map((item) => (
                  <Card key={item.name} className="shadow-md">
                    <Title>{item.name}</Title>
                    {/* <Text>{item.name}</Text> */}
                    <List className="mt-4">
                      {item.dataList.map((category) => (
                        <ListItem key={category.name}>
                          <Flex
                            justifyContent="start"
                            className="truncate space-x-4"
                          >
                            <Icon
                              variant="light"
                              icon={category.icon || QuestionMarkCircleIcon}
                              size="md"
                              color={category.color}
                            />
                            <div className="truncate">
                              <Text className="truncate">
                                <Bold>{capitalize(category.name)}</Bold>
                              </Text>
                              <Text className="truncate">
                                {`${category.numTransactions} transactions`}
                              </Text>
                            </div>
                          </Flex>
                          <Text
                            className={classNames(
                              category.amount < 0 ? "text-green-600" : ""
                            )}
                          >
                            {numeral(category.amount)
                              .format("$0,0.00")
                              .replace("-", "")}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      size="sm"
                      variant="light"
                      icon={ArrowRightIcon}
                      iconPosition="right"
                      className="mt-4"
                    >
                      View more categories
                    </Button>
                  </Card>
                ))}
          </Grid>

          <div className="mt-6">
            {loading ? (
              <Card>
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-12 bg-slate-300 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-12 bg-slate-300 rounded"></div>
                      <div className="h-12 bg-slate-300 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="shadow-md">
                <Title>Ticket Monitoring</Title>
                <Text>Tickets by Status</Text>
                <BarChart
                  className="mt-4 h-80"
                  data={data}
                  index="Month"
                  categories={["Completed", "In Progress", "Failed"]}
                  colors={["sky", "violet", "fuchsia"]}
                  valueFormatter={valueFormatter}
                  stack={true}
                  relative={true}
                />
              </Card>
            )}
          </div>
        </>
      ) : (
        <div className="mt-6">
          <Card>
            <div className="h-96" />
          </Card>
        </div>
      )}
    </main>
  )
}

export default Home
