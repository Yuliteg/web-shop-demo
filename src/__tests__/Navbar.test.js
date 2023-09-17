import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Navbar from "../components/Navbar";

const mockStore = configureStore([]);

function LocationListener() {
  const location = useLocation();
  return location.pathname;
}

describe("Navbar navigation behavior test", () => {
  it("renders Navbar component with navigation links", () => {
    const store = mockStore({
      basket: {
        basketItems: [],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
          <LocationListener />
        </MemoryRouter>
      </Provider>
    );

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();

    const homeLink = screen.getByTestId("home-link");
    const basketLink = screen.getByTestId("basket-link");
    const ordersLink = screen.getByTestId("orders-link");

    expect(homeLink).toBeInTheDocument();
    expect(basketLink).toBeInTheDocument();
    expect(ordersLink).toBeInTheDocument();

    fireEvent.click(homeLink);
    expect(screen.getByText("/")).toBeInTheDocument();

    fireEvent.click(basketLink);
    expect(screen.getByText("/basket")).toBeInTheDocument();

    fireEvent.click(ordersLink);
    expect(screen.getByText("/orders")).toBeInTheDocument();
  });
});
