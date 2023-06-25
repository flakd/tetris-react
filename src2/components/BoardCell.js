import './BoardCell.css';

const BoardCell = ({cell}) => {
  return (
    <div className={`BoardCell ${cell.className}`}>
      <div className='sparkle'></div>
    </div>
  );
};
export default BoardCell;
