import { useRouter } from "@tanstack/react-router";

export const useHref = () => {
  const router = useRouter();

  const location = router.parseLocation();
  console.log(location);
  return location.href;
};
