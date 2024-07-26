import { forwardRef, useEffect } from "react";
// import { useIntl } from "react-intl";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  docTitle?: string;
  children: React.ReactNode;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ docTitle, children, ...rest }, ref) => {
    useEffect(() => {
      const baseTitle = "Candy Cloudy";
      document.title = docTitle ? `${docTitle} | ${baseTitle}` : baseTitle;
    }, [docTitle]);

    return (
      <div {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

export default Page;
