import { type FC } from "react";
import { useFetcher } from "@remix-run/react";
import { type ContactRecord } from "../data";

const Favorite: FC<{ contact: Pick<ContactRecord, "favorite"> }> = ({
  contact,
}) => {
  const fetcher = useFetcher();
  const favorite = contact.favorite;
  const ariaLableText: string = favorite
    ? "Remove from favorites"
    : "Add to favorites";

  const buttonText: string = favorite ? "★" : "☆";
  return (
    <fetcher.Form method="post">
      <button
        aria-label={ariaLableText}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {buttonText}
      </button>
    </fetcher.Form>
  );
};

export default Favorite;
