import { beforeEach, describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Outlet,
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from "react-router-dom";

import Dummy from "./Dummy";

const LocationTestWrapper = () => {
  const location = useLocation();

  return (
    <div>
      Location Pathname
      <div data-testid="location-display">{location.pathname}</div>
      <Outlet />
    </div>
  );
};

describe("redirect test", () => {
  beforeEach(() => {
    const memoryRouter = createMemoryRouter(
      [
        {
          path: "/",
          element: <LocationTestWrapper />,
          children: [
            {
              index: true,
              element: <Dummy />,
            },
            {
              path: "create",
              element: <Dummy />,
            },
          ],
        },
      ],
      {
        initialEntries: ["/"],
        initialIndex: 0,
      }
    );

    render(<RouterProvider router={memoryRouter} />);
  });

  test("redirect to relationship creation", async () => {
    const createButton = screen.getByText("Click Me");
    await userEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId("location-display")).toHaveTextContent(
        "/create"
      );
    });
  });
});
