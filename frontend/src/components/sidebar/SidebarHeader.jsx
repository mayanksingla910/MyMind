import ToggleSidebar from "../ui/ToggleSidebar";

export default function SidebarHeader({ open, setOpen }) {
  return (
    <div className="flex justify-between mb-8">
      <p className="text-xl font-bold text-neutral-700">Menu</p>
      <ToggleSidebar open={open} setOpen={setOpen} />
    </div>
  );
}
