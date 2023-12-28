import { json, redirect } from "@remix-run/node";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  Outlet,
  NavLink,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { getContacts, createEmptyContact } from "./data";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStylesheet from "./app.css";
import SearchBox from "./components/SearchBox";
const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesheet }];
const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>();
  const [term, setTerm] = useState(q || "");
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching: boolean = (navigation.location &&
    new URLSearchParams(navigation.location.search).has("q")) as boolean;

  useEffect(() => {
    setTerm(q || "");
  }, [q]);

  const handleChange = (event: ChangeEvent) => {
    setTerm((event.target as HTMLInputElement).value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const isFirstSearch = q === null;

    submit(event.currentTarget as HTMLFormElement, {
      replace: !isFirstSearch,
    });
  };
  const isBodyLoading: boolean = navigation.state === "loading" && !searching;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <SearchBox
            term={term}
            searching={searching}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink
                      to={`contacts/${contact.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? <span>★</span> : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail" className={isBodyLoading ? "loading" : ""}>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export { links, loader, action };
