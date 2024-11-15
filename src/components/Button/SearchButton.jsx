import { Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import PropTypes from 'prop-types';

SearchButton.propTypes = {
  setOpen: PropTypes.func.isRequired
};

export default function SearchButton({ setOpen }) {
  return (
    <Button
      variant="contained"
      onClick={() => setOpen(true)}
      sx={{
        borderRadius: '50%',
        width: 50,
        height: 50,
        marginBottom: '7rem',
        position: 'absolute',
        bottom: 0,
        right: 0,
        minWidth: 0,
        padding: 0
      }}
    >
      <Search />
    </Button>
  );
}
