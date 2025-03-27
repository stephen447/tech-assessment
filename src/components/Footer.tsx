const Footer: React.FC = () => {
  return (
    <footer className="bg-background_light dark:bg-background_dark  text-center p-4 border-border_light dark:border-border_dark  border-t-4 h-[13%]">
      <div>
        <h3 className="text-lg font-semibold  mb-4">Follow Me</h3>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/stephen447"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 text-2xl"
            aria-label="Visit my GitHub profile"
          >
            <i className="fab fa-github"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/stephen-byrne-b4729321b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 text-2xl"
            aria-label="Visit my LinkedIn Profile"
          >
            <i className="fab fa-linkedin"></i>
          </a>

          <a
            href="https://stephenbyrne.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 text-2xl"
            aria-label="Visit my Personal Website"
          >
            <i className="fas fa-globe"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
