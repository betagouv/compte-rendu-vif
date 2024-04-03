import { useRouter } from "@tanstack/react-router";

export const useHref = () => {
  const router = useRouter();

  const location = router.parseLocation();
  return location.href;
};
