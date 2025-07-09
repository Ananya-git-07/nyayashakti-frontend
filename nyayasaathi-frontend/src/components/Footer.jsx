const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center p-4 mt-auto">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} Nyaya Saathi. All rights reserved.</p>
        <p className="text-sm text-blue-200 mt-1">न्याय, सरलता से। (Justice, with Simplicity.)</p>
      </div>
    </footer>
  );
};
export default Footer;