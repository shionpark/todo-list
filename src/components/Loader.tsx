/**
 * @file 로딩 스피너 컴포넌트
 */
const Loader = () => {
  return (
    <div
      className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-solid border-t-transparent"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    ></div>
  );
};

export default Loader;
