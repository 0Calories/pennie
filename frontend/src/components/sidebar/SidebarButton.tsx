type SidebarButtonProps = {
  text: string;
  icon?: React.ReactNode;
};

export function SidebarButton({ text, icon }: SidebarButtonProps) {
  return (
    <button className="flex items-center gap-2 p-2 rounded-md bg-pennie-500 text-white">
      {icon}
      {text}
    </button>
  );
}
