import { useComponentContext } from "./contexts/componentContext";

export default function OutLet() {
  const { componentChildren } = useComponentContext();

  return componentChildren ?? <></>;
}
