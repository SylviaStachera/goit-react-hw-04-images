import { ThreeDots } from 'react-loader-spinner';

import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <ThreeDots
        height="150"
        width="150"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
