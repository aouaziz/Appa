export default function CustomLink({
    href,
    onClick,
    children,
    isHomePage,
  }: {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
    isHomePage: boolean;
  }) {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onClick();
      if (href.startsWith("/#")) {
        if (isHomePage) {
          const sectionId = href.substring(2);
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.location.href = href;
        }
      } else if (href === "/") {
        window.location.href = "/";
      }
    };
  
    return (
      <a href={href} onClick={handleClick} className="px-3 py-4 text-lg font-normal cursor-pointer flex items-center">
        {children}
      </a>
    );
  }
  