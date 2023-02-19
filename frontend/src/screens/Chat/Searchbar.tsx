import { FormEventHandler } from 'react';
import useUsers from '../../hooks/useUsers';

const Searchbar = () => {
  const { search, setSearch } = useUsers();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchbar__input"
        placeholder="Contatos, grupos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Searchbar;
