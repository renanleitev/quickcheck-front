import { ZoomControl } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
import PropTypes from 'prop-types';

import ResetButton from '../../Button/ResetButton';
import SearchButton from '../../Button/SearchButton';

MapButtons.propTypes = {
  setOpen: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default function MapButtons({ setOpen, onReset }) {
  return (
    <>
      <Control position="bottomright">
        {/* Reset Button */}
        <ResetButton onReset={onReset} />
        {/* Search Button */}
        <SearchButton setOpen={setOpen} />
      </Control>
      {/* Zoom Buttons */}
      <ZoomControl position="bottomright" />
    </>
  );
}
