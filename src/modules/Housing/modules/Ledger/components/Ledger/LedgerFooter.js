import ledgerFooterImage from '../../assets/ledgermodalfooter.png';

const LedgerFooter = ({ children }) => {
  return (
    <div className="relative p-4 border-t border-gray-200">
      <img src={ledgerFooterImage} className="absolute top-0 left-0 w-full h-full rounded-b-lg opacity-50"/>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default LedgerFooter;
