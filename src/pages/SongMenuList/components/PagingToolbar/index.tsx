interface PagingTollbarProps {
  pageNumber: number;
  setPageNumber: (value: number) => void;
}

const PagingTollbar: React.FC<PagingTollbarProps> = (props) => {
  return (
    <div className='btn-group flex justify-center mt-10'>
      <button className='btn btn-sm mr-2 bg-white text-gray-600 border-gray-300 hover:bg-gray-100'>
        «
      </button>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
        return (
          <button
            className={`
              btn btn-sm ml-2 mr-2 bg-white border-gray-300
              ${
                props.pageNumber === item
                  ? 'bg-red-500 hover:bg-red-500'
                  : 'text-gray-500 hover:bg-gray-100'
              }
            `}
            key={index}
            onClick={() => {
              props.setPageNumber(item);
            }}>
            {item + 1}
          </button>
        );
      })}
      <button className='btn btn-sm bg-white text-gray-600 border-gray-300 hover:bg-gray-100'>
        »
      </button>
    </div>
  );
};

export default PagingTollbar;
