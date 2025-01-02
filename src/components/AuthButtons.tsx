import { useOAuthContext } from "@/hooks/useOAuthContext";
import BiGoogle from "./icons/BiGoogle";
import { Button } from "./ui/button";

const AuthButtons = () => {
  const { user, OAuthLogin, OAuthSignOut } = useOAuthContext();

  if (!user)
    return (
      <Button
        onClick={() => {
          OAuthLogin();
        }}
        className="flex items-center justify-center gap-2 font-semibold"
      >
        <BiGoogle /> Login
      </Button>
    );
  else return <Button onClick={OAuthSignOut}>SignOut</Button>;
};

export default AuthButtons;
