import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow">Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}