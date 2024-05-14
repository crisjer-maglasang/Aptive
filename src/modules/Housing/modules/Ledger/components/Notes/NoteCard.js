import moment from 'moment';

const NoteCard = ({
  author,
  at_created,
  note,
}) => {

  return (
    <div className="p-4 w-full bg-white border-b border-g-200 flex-col justify-start items-start gap-2 inline-flex">
      <div>
        { author }
        <div className="text-gray-400 text-[10px]">
          Added: { moment(at_created ?? new Date()).format('MMM D, YYYY @ h:mmA') }
        </div>
      </div>
      <div className="self-stretch justify-start items-start inline-flex">
        <div className='grow shrink basis-0 text-gray-600 text-[10px] font-normal font-["Inter"]'>
          { note }
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
