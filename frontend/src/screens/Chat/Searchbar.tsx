import { FormEventHandler } from "react";

const Searchbar = () => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchbar__input"
        placeholder="Contatos, grupos..."
      />
    </form>
  );
};

export default Searchbar;
