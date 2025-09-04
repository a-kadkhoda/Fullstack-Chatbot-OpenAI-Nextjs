"use client";

import Login from "@/features/login/components/Login";
import Signup from "@/features/signup/components/Signup";
import { Card, CardBody } from "@heroui/card";
import { Tab, Tabs } from "@heroui/tabs";
import { useState } from "react";

export enum AuthSteps {
  Login = "Login",
  Signup = "Sign Up",
}

const Auth = () => {
  const [selected, setSelected] = useState(AuthSteps.Login);

  return (
    <div className="flex flex-col size-full items-center justify-center ">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={(key) => setSelected(key as AuthSteps)}
          >
            <Tab key={AuthSteps.Login} title={AuthSteps.Login}>
              <Login onSelected={setSelected} />
            </Tab>

            <Tab key={AuthSteps.Signup} title={AuthSteps.Signup}>
              <Signup onSelected={setSelected} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Auth;
