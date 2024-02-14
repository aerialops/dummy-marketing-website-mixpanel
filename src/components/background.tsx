export const Background: React.FC<{ children: JSX.Element[] }> = ({
  children,
}) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-b from-slate-50 to-blue-500">
      {children}
    </div>
  );
};
