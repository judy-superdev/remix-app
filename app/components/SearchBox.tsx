import { ChangeEvent, FC, FormEvent } from "react";
import { Form } from "@remix-run/react";

interface SearchBoxProps {
  term: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent) => void;
  searching: boolean;
}

const SearchBox: FC<SearchBoxProps> = (props) => {
  const { term, handleChange, handleSubmit, searching } = props;
  return (
    <div>
      <Form id="search-form" role="search" onChange={handleSubmit}>
        <input
          id="q"
          value={term}
          onChange={handleChange}
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
          className={searching ? "loading" : ""}
        />
        <div id="search-spinner" aria-hidden hidden={!searching} />
      </Form>
      <Form method="post">
        <button type="submit">New</button>
      </Form>
    </div>
  );
};

export default SearchBox;
