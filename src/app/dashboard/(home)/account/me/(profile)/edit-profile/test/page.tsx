const gogogo = () => {
  return (
    <div
      className="w-full rounded-lg aspect-video p-3 bg-slate-800"
      style={{
        aspectRatio: '16 / 9',
        // backgroundImage: `url(/banner/)`,
        backgroundSize: 'cover',
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="grid grid-cols-12 gap-y-2 gap-x-2 place-content-center">
          <div className="col-span-10 row-span-1">
            <div className="flex flex-col">
              <h3 className="text-xl text-white font-bold">
                Eugene Cheng cholo komolo
              </h3>
              <p className="text-sm text-green-500 font-medium">
                Creative Director
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="w-full h-auto">
              {/* <img
                //   src="{{logo_url}}"
                src="/profile/profile.png"
                alt="company-logo-alt"
                className="-z-10 w-full h-full object-contain"
              /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch font-normal text-xs text-white/75 gap-1">
          <p>(65) 8123 2362</p>
          <p>compelling.co</p>
          <p>eugnene@compelling.co</p>
        </div>
      </div>
    </div>
  );
};

export default gogogo;
