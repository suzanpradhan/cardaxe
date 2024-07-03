import 'react-toastify/dist/ReactToastify.css';
import Footer from './(components)/(common)/Footer';
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
