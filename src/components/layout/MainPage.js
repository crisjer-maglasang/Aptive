const MainPage = ({ sideNav, children }) => (
  <div className="flex grow mx-auto w-[1440px] max-w-full">
    <div className="w-1/6 xl:w-[256px] flex flex-col  bg-white min-h-max ">
      {sideNav}
    </div>
    <div className="w-5/6 xl:w-[1184px] 2xl:max-w-[calc(100%-256px)] flex flex-col">
      {children}
    </div>
  </div>
)

export default MainPage
