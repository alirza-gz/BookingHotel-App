import MenuItems from "../MenuItems/MenuItems";

function MobileMenu({ onCloseHandler }) {
  return (
    <div className="bg-white mt-2 border border-slate-300 mx-4 py-6 font-medium text-secondary-400 rounded-2xl shadow-[0_0_10px_#efefef]">
      <MenuItems onCloseHandler={onCloseHandler} />
    </div>
  );
}

export default MobileMenu;
