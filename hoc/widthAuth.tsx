import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedPage(props: P) {
    const { user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/signin");
      }
    }, [user, router]);

    if (!user) return null; 
    return <Component {...props} />;
  };
}
