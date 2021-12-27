import React from 'react';
import ReactDom from 'react-dom';
import book from './book.svg';
import cover from './image.jpeg';
import './index.less';

const App: React.FC = () => {
  return (
    <div>
      this is rollup1
      <i className="iconfont">&#xeb61;</i>
      <img src={book} alt="" width={100} height={100} />
      <img src={cover} alt="" />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
