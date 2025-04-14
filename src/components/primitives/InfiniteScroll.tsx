import React from "react";

/**
 * @Documentation
 * This component is used to create an infinite scroll effect.
 * 
 * Usage:
 * 
 * No pagination Example
    
	const onSearch = useCallback((searchParam: string) => productService.search(searchParam).then((products) => setRows(buildRows(products))), []);
 
    useEffect(() => {
		productService.getLastProductSheets().then((products) => setRows(buildRows(products)));
	}, []);
 * 
 *
 * 
 * With pagination Example
 * 
	const fetchClients = useCallback(
		() =>
			clientService.get(pagination.current, search.current).then((clients) => {
				if (clients.length === 0) return [];
				setRows((_rows) => [..._rows, ...buildRows(clients)]);
				pagination.current.skip += pagination.current.take;
				return clients;
			}),
		[],
	);

	const onNext = useCallback(
		(release: () => void) => {
			fetchClients().then((clients) => {
				if (!clients.length) return console.warn("No more value to load");
				release();
			});
		},
		[fetchClients],
	);

	const onSearch = useCallback((searchParam: string) => {
		pagination.current.skip = 0;
		search.current = (searchParam && searchParam.trim()) || null;
		setRows([]);
	}, []);
 * 
 */
export type IPagination = {
  take: number;
  skip: number;
};

type IProps = {
  offset?: number;
  orientation?: "vertical" | "horizontal";
  /**
   * @description
   * If `onNext` is set to `null`, it indicates that there is no pagination and the infinite scroll effect will not be triggered.
   */
  onNext?: ((release: () => void, reset?: () => void) => Promise<void> | void) | null;
  children: React.ReactElement;
};

export default function InfiniteScroll({ children, onNext, offset = 20, orientation = "vertical" }: IProps) {
  const isWaiting = React.useRef<boolean>(false);
  const elementRef = React.useRef<HTMLElement>();

  const onChange = React.useCallback(() => {
    if (!onNext) return;
    const element = elementRef.current;
    if (!element || isWaiting.current) return;
    const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } = element;
    let isChange = false;

    if (orientation === "vertical") isChange = scrollTop + clientHeight >= scrollHeight - offset;
    if (orientation === "horizontal") isChange = scrollLeft + clientWidth >= scrollWidth - offset;

    if (isChange) {
      isWaiting.current = true;
      onNext(() => (isWaiting.current = false));
    }
  }, [onNext, offset, orientation]);

  React.useEffect(() => onChange(), [onChange]);

  React.useEffect(() => {
    const observer = new MutationObserver(onChange);
    elementRef.current && observer.observe(elementRef.current, { childList: true, subtree: true });
    window.addEventListener("resize", onChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onChange);
    };
  }, [onChange]);

  if (!onNext) return children;

  const clonedChild = React.cloneElement(children, {
    onScroll: onChange,
    ref: elementRef,
  });

  return clonedChild;
}
