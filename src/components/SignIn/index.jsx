import React, { Fragment, useEffect, useState } from "react";
import AuthButton from "../AuthButton";
import styles from "./SignIn.module.scss";

import { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import socialConfig from "../../configs/social-auth-config";

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  const clickHandler = () => {};

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      // eslint-disable-next-line default-case
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setCustomState(data);
          console.log(customState);
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        setUser(currentUser);
        console.log(user);
      })
      .catch((e) => console.log(e));

    return unsubscribe;
  }, []);

  const authenticateWithSocialNetwork = (config) => {
    sessionStorage.setItem("lastUsedAuthProvider", config.provider);

    if (config.CognitoHostedUIIdentityProvider) {
      return Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider[config.provider],
      });
    } else {
      return Auth.federatedSignIn({
        provider: config.provider,
      });
    }
  };

  return (
    <div className={styles.authCardScreen}>
      <div className={styles.authCardScreen__typography}>
        <h1 className={styles.authCardScreen__title}>Create an Account</h1>
        <p className={styles.authCardScreen__subTitle}>
          How do you want to create your account?
        </p>
      </div>

      <div className={styles.authCardScreen__btnWrapper}>
        <AuthButton
          title="Sign up with Email"
          variant="envelope"
          clickHandler={clickHandler}
        />
        {socialConfig.map((socialNetwork) => {
          return (
            <Fragment key={socialNetwork.id}>
              <AuthButton
                title={`Sign up with ${socialNetwork.name}`}
                variant={socialNetwork.id}
                clickHandler={() =>
                  authenticateWithSocialNetwork(socialNetwork)
                }
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SignIn;
