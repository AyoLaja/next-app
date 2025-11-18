interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className='flex gap-6'>
      <aside className='bg-amber-500 p-5 mr-5'>Sidebar</aside>
      <main className='flex-1'>{children}</main>
    </div>
  );
}
