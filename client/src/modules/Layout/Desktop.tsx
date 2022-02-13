import { WaitForAuth } from "../auth/WaitForAuth";
import { MainLayout } from "./MainLayout";

export const DefaultDesktopLayout: React.FC = ({
    children,
  }) => {
    return (
      <WaitForAuth>
        <MainLayout>
          {children}
        </MainLayout>
      </WaitForAuth>
    );
  };