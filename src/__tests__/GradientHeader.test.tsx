import React from "react";
import { Dimensions, Text, View } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";

import GradientHeader, { HeaderContent, Shape } from "../index";

const flatten = (style: unknown): Record<string, unknown> =>
  Object.assign(
    {},
    ...(Array.isArray(style) ? style.flat(Infinity) : [style]).filter(Boolean),
  );

describe("GradientHeader", () => {
  it("renders the default title and subtitle", () => {
    render(<GradientHeader />);

    expect(screen.getByText("Today")).toBeTruthy();
    expect(screen.getByText("Have a nice day")).toBeTruthy();
  });

  it("renders custom title and subtitle", () => {
    render(<GradientHeader title="Welcome" subtitle="Good morning" />);

    expect(screen.getByText("Welcome")).toBeTruthy();
    expect(screen.getByText("Good morning")).toBeTruthy();
    expect(screen.queryByText("Today")).toBeNull();
  });

  it("renders the gradient shape by default", () => {
    render(<GradientHeader />);

    expect(
      screen.getByTestId("linear-gradient", { includeHiddenElements: true }),
    ).toBeTruthy();
  });

  it("renders a solid shape (no gradient) when gradient is false", () => {
    render(<GradientHeader gradient={false} />);

    expect(screen.queryByTestId("linear-gradient")).toBeNull();
  });

  it("passes custom gradient colors through to the gradient backend", () => {
    const colors = ["#00416A", "#E4E5E6"];
    render(<GradientHeader gradientColors={colors} />);

    expect(
      screen.getByTestId("linear-gradient", { includeHiddenElements: true })
        .props.colors,
    ).toEqual(colors);
  });

  it("fires imageOnPress when the avatar is tapped", () => {
    const onPress = jest.fn();
    render(<GradientHeader imageOnPress={onPress} />);

    fireEvent.press(screen.getByLabelText("Profile"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders a custom headerContentComponent instead of the default content", () => {
    render(
      <GradientHeader headerContentComponent={<Text>Custom content</Text>} />,
    );

    expect(screen.getByText("Custom content")).toBeTruthy();
    expect(screen.queryByText("Today")).toBeNull();
  });

  it("pins the container to the full window width regardless of content (#9)", () => {
    const { width } = Dimensions.get("window");
    const tree = render(
      <GradientHeader
        headerContentComponent={<View accessibilityLabel="tiny" />}
      />,
    ).toJSON();

    const root = Array.isArray(tree) ? tree[0] : tree;
    const style = flatten(root?.props?.style);
    expect(style.width).toBe(width);
    expect(style.position).toBe("absolute");
  });

  it("uses the supplied shadowStyle over the default shadow", () => {
    const shadowStyle = { shadowRadius: 99 };
    const tree = render(<GradientHeader shadowStyle={shadowStyle} />).toJSON();
    const root = Array.isArray(tree) ? tree[0] : tree;
    const style = flatten(root?.props?.style);

    expect(style.shadowRadius).toBe(99);
  });

  it("forwards a ref to the underlying host view", () => {
    const ref = React.createRef<View>();
    render(<GradientHeader ref={ref} />);

    expect(ref.current).not.toBeNull();
  });
});

describe("HeaderContent", () => {
  it("does not render the avatar when imageSource is null", () => {
    render(<HeaderContent imageSource={null} />);

    expect(screen.queryByLabelText("Profile")).toBeNull();
  });

  it("renders the avatar button with an accessibility role", () => {
    render(<HeaderContent imageSource={1} />);

    expect(screen.getByLabelText("Profile")).toBeTruthy();
  });
});

describe("Shape", () => {
  it("renders the gradient backend when gradient is true", () => {
    render(<Shape gradient />);

    expect(
      screen.getByTestId("linear-gradient", { includeHiddenElements: true }),
    ).toBeTruthy();
  });

  it("applies the solid color when gradient is false", () => {
    const tree = render(
      <Shape gradient={false} shapeColor="#123456" />,
    ).toJSON();
    const root = Array.isArray(tree) ? tree[0] : tree;
    const style = flatten(root?.props?.style);

    expect(style.backgroundColor).toBe("#123456");
  });

  it("honors an explicit position override", () => {
    const tree = render(
      <Shape gradient={false} position={{ top: 42 }} />,
    ).toJSON();
    const root = Array.isArray(tree) ? tree[0] : tree;
    const style = flatten(root?.props?.style);

    expect(style.top).toBe(42);
  });
});
