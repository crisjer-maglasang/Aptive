const NotesFooter = ({ children }) => {
  return (
    <div className="p-4 border-t border-gray-200 w-full absolute bottom-0">
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default NotesFooter;
