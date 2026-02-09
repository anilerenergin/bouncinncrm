import { ROUTES } from "@/src/lib/constants/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTES.OVERVIEW);
}
