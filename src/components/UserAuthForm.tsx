"use client";
import { FC, HTMLAttributes, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

interface IUserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<IUserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (err) {
      //toast notification
      toast({
        title: "There was as error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        isLoading={isLoading}
      >
        {isLoading ? null : (
          <>
            <Icons.google className="h-4 w-4" /> Google
          </>
        )}
      </Button>
    </div>
  );
};

export default UserAuthForm;
