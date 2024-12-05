type OnClickEvent<Element extends HTMLElement = HTMLDivElement> = React.MouseEvent<Element, MouseEvent>;
export const blockEvent = <Element extends HTMLElement = HTMLDivElement>(
  // biome-ignore lint/suspicious/noExplicitAny: required any
  callback?: (e: OnClickEvent<Element>) => any,
) => {
  return (e: OnClickEvent<Element>) => {
    e.preventDefault();
    e.stopPropagation();

    callback?.(e);
  };
};
