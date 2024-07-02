import Footer from '@/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './(components)/(common)/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
}
