import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App component", () => {
  test("contains h1 element", () => {
    //arrange
    render(<App />);
    let heading = screen.getByRole("heading");

    //act
    //assert
    expect(heading).toBeInTheDocument();
  });

  test("incremnt counter by 1", async () => {
    //arrange
    render(<App />);
    let btn = screen.getByRole("button");
    let user = userEvent.setup();
    let para = screen.getByRole("para");

    //act
    await user.click(btn);
    await user.click(btn);

    //assert
    expect(para.textContent).toEqual("2");
  });



  // test("heading contains welcome to react", () => {
  //   //arrange
  //   render(<App />);
  //   let heading = screen.getByRole("heading");
  //   //assert
  //   expect(heading.textContent).toEqual("Welcome to react");
  // });

  // test("contains counter value as 0", () => {
  //   //arrange
  //   render(<App />);
  //   let p = screen.getByRole("para");

  //   //assert
  //   expect(p.textContent).toEqual("0");
  // });

  test('get users data',async()=>{
    //arrange
    render(<App />)
    let users=await screen.findAllByRole('listitem')
    //assert
    expect(users).toHaveLength(2)
  })
});