import { Form, useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();

  return (
    <Form action="/products" className="form-control">
      <input
        type="search"
        name="search"
        placeholder="Search..."
        className="input input-bordered input-sm w-24 md:w-auto"
      />
    </Form>
  );
};
export default SearchInput;
