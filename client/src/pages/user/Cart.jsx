import { useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";
export default function Cart() {
  const {
    userState: { id },
  } = useContext(AuthContext);

  return <main className="m-1 flex-1 outline">Carts of {id} </main>;
}
